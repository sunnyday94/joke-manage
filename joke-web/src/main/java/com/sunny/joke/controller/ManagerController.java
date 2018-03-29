/**
 * This class was created by wangzhifang. It's distributed as
 * part of the chunmitest-web Mod.
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
 * File Created @ [2017年7月5日, 下午3:51:18 (CST)]
 */
package com.sunny.joke.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.sunny.joke.po.Manager;
import com.sunny.joke.service.ManagerService;
import com.sunny.joke.utils.Constants;
import com.sunny.joke.utils.MD5Util;
import com.sunny.joke.vo.Page;
import com.sunny.joke.vo.PageBean;

@Controller
@RequestMapping(value="/manager")
public class ManagerController {
	
	/**
	 * 日志
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ManagerController.class);
	
	@Resource(name="ManagerService")
	private ManagerService managerService;
	
	/**
	 * 
	 * @description: <p class="detail">检查用户是否登录</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="check",method=RequestMethod.POST)
	@ResponseBody
	public String checkLogin(@RequestParam("name")String name,@RequestParam("password")String password,HttpServletRequest request){
			Manager manager = managerService.selectManagerByName(name);
			if(manager==null){
				return "0";  //用户不存在
			}else{
				if(manager.getManagerPassword().equals(MD5Util.MD5Encryption(password).toLowerCase())){
					if(manager.getDelFlag().equals("1")){
						return "-1";   //用户被禁用 
					}else{
						request.getSession().setAttribute(Constants.LOGIN_MANAGER, manager);
						return "1";    //匹配成功   
					}
				}else{
					return "2";      //用户密码错误
				}
			}
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">用户退出</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="logout")
	public RedirectView logout(HttpServletRequest request,HttpServletResponse response){
		request.getSession().removeAttribute(Constants.LOGIN_MANAGER);
		return new RedirectView(Constants.PAGE_LOGIN);
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">检查原密码</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="checkPassword",method=RequestMethod.POST)
	@ResponseBody
	public String checkOrginPassword(String password,HttpServletRequest req){
		Manager manager = (Manager) req.getSession().getAttribute(Constants.LOGIN_MANAGER);
		if(manager==null){
			return "0";
		}else{
			if(manager.getManagerPassword().equals(MD5Util.MD5Encryption(password).toLowerCase())){
				return"1";
			}else{
				return "0";
			}
		}
	} 
	
	
	/**
	 * 
	 * @description: <p class="detail">更新用户信息</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="updateManager",method=RequestMethod.POST)
	@ResponseBody
	public int updateManager(String managerNickname,String managerPassword,String headPic,HttpServletRequest req){
		int result = 0;
		Manager manager = (Manager) req.getSession().getAttribute(Constants.LOGIN_MANAGER);
		if(manager==null){
			return result;
		}
		manager.setManagerNickname(managerNickname);
		manager.setManagerPassword(MD5Util.MD5Encryption(managerPassword).toLowerCase());
		manager.setHeadPic(headPic);
		try {
			result = managerService.updateByPrimaryKeySelective(manager);
			req.getSession().setAttribute(Constants.LOGIN_MANAGER, manager);
		} catch (Exception e) {
			LOGGER.error("用户信息更新失败:{}",e.getMessage());
		}
		return result;
	}
	
	/**
	 * 
	 * @description: <p class="detail">管理员列表</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="managerlist",method = RequestMethod.GET)
	public ModelAndView managerList(PageBean<Manager> pageBean){
		ModelAndView mav = new ModelAndView(Constants.PAGE_MAIN);
		Page page = new Page();
		page.setPageName(Constants.PAGE_MANAGERLIST+".jsp");
		Map<String,Object> map = new HashMap<String, Object>();
		map.put(Constants.PAGE, page);
		map.put("pb", managerService.selectManagerList(pageBean));
		mav.addAllObjects(map);
		return mav;
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">新增管理员</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="addManager",method=RequestMethod.POST)
	@ResponseBody
	public String addManager(Manager manager){
		try {
			Manager m = managerService.selectManagerByName(manager.getManagerName()); //根据用户名查询用户是否存在
			if(m!=null){
				return "2";
			}else{
				manager.setManagerPassword(MD5Util.MD5Encryption(manager.getManagerPassword()).toLowerCase());
				managerService.insertSelective(manager);
				return "1";
			}
		} catch (Exception e) {
			LOGGER.error("新增管理员失败:{}", e.getMessage());
		}
		return "0";
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">修改管理员状态</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="updateManagerStatus")
	@ResponseBody
	public String updateManagerStatus(Manager manager){
		try {
			managerService.updateByPrimaryKeySelective(manager);
			return "1";
		} catch (Exception e) {
			LOGGER.error("修改管理员状态失败:{}", e.getMessage());
		}
		return "0";
	}
	
}
