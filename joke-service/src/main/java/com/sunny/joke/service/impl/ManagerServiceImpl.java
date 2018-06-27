/**
 * This class was created by wangzhifang. It's distributed as
 * part of the chunmitest-service Mod.
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
 * File Created @ [2017年7月5日, 下午3:53:50 (CST)]
 */
package com.sunny.joke.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunny.joke.dao.ManagerMapper;
import com.sunny.joke.po.Manager;
import com.sunny.joke.service.ManagerService;
import com.sunny.joke.vo.PageBean;
import com.sunny.joke.vo.PageRequest;

@Service("ManagerService")
public class ManagerServiceImpl implements ManagerService {
	
	@Autowired
	private ManagerMapper managerMapper;

	@Override
	public Manager selectManagerByName(String name) {
		return managerMapper.selectManagerByName(name);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public int updateByPrimaryKeySelective(Manager manager) {
		return managerMapper.updateByPrimaryKeySelective(manager);
	}

	@Override
	public PageBean<Manager> selectManagerList(PageBean<Manager> pageBean) {
		Long rows = managerMapper.selectManagerCount();
		pageBean.setRows(rows.intValue());
		// 计算分页
		Integer no = pageBean.getRows() % pageBean.getPageSize() == 0 ? pageBean.getRows() / pageBean.getPageSize()
				: (pageBean.getRows() / pageBean.getPageSize() + 1);
		// 分页
		no = no == 0 ? 1 : no;
		if (pageBean.getPageNo() >= no) {
			//设置当前页
			pageBean.setPageNo(no);
			// 设置开始行数
			pageBean.setStartRowNum((no - 1) * pageBean.getPageSize());
		}
		PageRequest pageRequest = new PageRequest(pageBean.getStartRowNum(),pageBean.getEndRowNum());
		pageBean.setList(managerMapper.selectManagerList(pageRequest));
		return pageBean;
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public int insertSelective(Manager manager) {
		return managerMapper.insertSelective(manager);
	}

}
