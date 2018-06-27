/**
 * This class was created by wangzhifang. It's distributed as
 * part of the joke-service Mod.
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
 * File Created @ [2017年9月14日, 下午2:11:20 (CST)]
 */
package com.sunny.joke.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunny.joke.dao.JokeInfoMapper;
import com.sunny.joke.po.JokeInfo;
import com.sunny.joke.service.JokeService;
import com.sunny.joke.vo.PageBean;
import com.sunny.joke.vo.PageRequest;

@Service("JokeService")
public class JokeServiceImpl implements JokeService {
	
	@Autowired
	private JokeInfoMapper jokeInfoMapper;

	@Override
	public PageBean<JokeInfo> queryJokeInfoListByConditions(JokeInfo jokeInfo,PageBean<JokeInfo> pageBean){
		Long rows = jokeInfoMapper.selectJokeInfoCounts();
		//设置段子总条目数
		pageBean.setRows(rows.intValue());
		// 计算分页
		Integer no = pageBean.getRows() % pageBean.getPageSize() == 0 ? pageBean.getRows() / pageBean.getPageSize()
				: (pageBean.getRows() / pageBean.getPageSize() + 1);
		no = no == 0 ? 1 : no;
		//如果传的当前页大于等于最大页，则设置当前页为最大页
		if (pageBean.getPageNo() >= no) {
			//设置当前页
			pageBean.setPageNo(no);
		}
		//设置查询条件
		pageBean.setObjectBean(jokeInfo);
		
		PageRequest pageRequest = new PageRequest(pageBean.getStartRowNum(),pageBean.getEndRowNum());
		pageBean.setList(jokeInfoMapper.queryJokeInfoListByConditions(jokeInfo,pageRequest));
		return pageBean;
	}

	@Override
	public Integer addJokeInfo(JokeInfo jokeInfo) {
		return jokeInfoMapper.insertSelective(jokeInfo);
	}

	@Override
	public JokeInfo queryJokeInfoDetailById(Long id) {
		return jokeInfoMapper.selectByPrimaryKey(id);
	}

	@Override
	public Integer delJoke(Long id) {
		return jokeInfoMapper.delJoke(id);
	}

	@Override
	public Integer updateJoke(JokeInfo jokeInfo) {
		return jokeInfoMapper.updateByPrimaryKeySelective(jokeInfo);
	}

}
