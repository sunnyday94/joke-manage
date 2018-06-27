/**
 * This class was created by wangzhifang. It's distributed as
 * part of the joke-web Mod.
 *
 * 版权所有(C) 上海纯米电子科技有限公司 2014-2023
 * Copyright 2014-2023 CHUNMI TECHNOLOGY CO..
 *
 * This software is the confidential and proprietary information of
 * CHUNMI Corporation ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with CHUNMI.
 *
 * File Created @ [2017年9月14日, 下午1:44:19 (CST)]
 */
package com.sunny.joke.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.sunny.joke.po.JokeInfo;
import com.sunny.joke.po.JokeType;
import com.sunny.joke.po.Manager;
import com.sunny.joke.service.JokeService;
import com.sunny.joke.service.JokeTypeService;
import com.sunny.joke.utils.Constants;
import com.sunny.joke.vo.Page;
import com.sunny.joke.vo.PageBean;

@Controller
@RequestMapping(value="/joke")
public class JokeController {
	
	/**
	 * 日志
	 */
	public static final Logger LOGGER = LoggerFactory.getLogger(JokeController.class);
	
	private final String DATA = "yyyy-MM-dd HH:mm:ss";
	
	@Resource(name="JokeService")
	private JokeService jokeService;
	
	@Resource(name="JokeTypeService")
	private JokeTypeService jokeTypeService;
	
	
	/**
	 * @description: <p class="detai>内涵段子列表</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="jokelist")
	public ModelAndView goToJokeList(JokeInfo jokeInfo,PageBean<JokeInfo> pageBean,String managerName){
		ModelAndView mav = new ModelAndView(Constants.PAGE_MAIN);
		Map<String,Object> map  = new HashMap<String,Object>();
		Page page = new Page();
		page.setPageName(Constants.PAGE_JOKELIST.concat(".jsp"));
		if(managerName!=null && !managerName.equals("")){
			Manager manager  =  new Manager();
			manager.setManagerName(managerName);
			jokeInfo.setManager(manager);
		}
		List<JokeType> jokeTypeList = jokeTypeService.queryJokeTypeList(); //段子分类
		pageBean = jokeService.queryJokeInfoListByConditions(jokeInfo, pageBean);
		map.put(Constants.PAGE,page);
		map.put("pb",pageBean);
		map.put("jokeTypeList", jokeTypeList);
		return mav.addAllObjects(map);
	}
	
	/**
	 * 
	 * @description: <p class="detail">添加内涵段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="addJoke")
	public RedirectView addJokeInfo(JokeInfo jokeInfo){
		try {
			jokeService.addJokeInfo(jokeInfo);
			return new RedirectView("jokelist");
		} catch (Exception e) {
			LOGGER.error("添加内涵段子失败:{}",e.getMessage());
		}
		return null;
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">查看段子详情</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="showJokeInfoDetailById/{jokeInfoId}")
	@ResponseBody
	public JokeInfo queryJokeInfoDetailById(@PathVariable("jokeInfoId")Long id){
		try {
			JokeInfo jokeInfo = jokeService.queryJokeInfoDetailById(id);
			jokeInfo.setCreateTimeStr(new SimpleDateFormat(DATA).format(jokeInfo.getCreateTime()));
			jokeInfo.setUpdateTimeStr(new SimpleDateFormat(DATA).format(jokeInfo.getUpdateTime()));
			return jokeInfo;
		} catch (Exception e) {
			LOGGER.error("查询段子详情失败:{}",e.getMessage());
		}
		return null;
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">检查是否有删除权限</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="checkDelPermiss",method=RequestMethod.POST)
	@ResponseBody
	public Integer checkDelPermiss(HttpServletRequest req){
		String managerName = req.getParameter("managerName");
		String[] managers = req.getParameterValues("managers");
		for (int i = 0; i < managers.length; i++) {
			if(!managerName.equals(managers[i])){
				return 0;
			}
		}
		return 1;
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">删除段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="delJoke")
	@ResponseBody
	public Integer delJoke(Long[] ids){
		try {
			for (int i = 0; i < ids.length; i++) {
				jokeService.delJoke(ids[i]);
			}
		} catch (Exception e) {
			LOGGER.error("删除段子失败:{}",e.getMessage());
			return 0;
		}
		return 1;
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">更新段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="updateJoke")
	public RedirectView updateJoke(JokeInfo jokeInfo){
		try {
			jokeService.updateJoke(jokeInfo);
			return new RedirectView("jokelist");
		} catch (Exception e) {
			LOGGER.error("更新失败:{}",e.getMessage());
			return null;
		}
	}
	
}
