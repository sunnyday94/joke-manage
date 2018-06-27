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
 * File Created @ [2017年9月14日, 下午2:09:36 (CST)]
 */
package com.sunny.joke.service;

import com.sunny.joke.po.JokeInfo;
import com.sunny.joke.vo.PageBean;

public interface JokeService {

	/**
	 * 
	 * @description: <p class="detail">根据搜索条件分页查询段子列表</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	PageBean<JokeInfo> queryJokeInfoListByConditions(JokeInfo jokeInfo,PageBean<JokeInfo> pageBean);

	/**
	 * 
	 * @description: <p class="detail">添加内涵段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	Integer addJokeInfo(JokeInfo jokeInfo);

	/**
	 * 
	 * @description: <p class="detail">查询段子详情</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	JokeInfo queryJokeInfoDetailById(Long id);

	/**
	 * 
	 * @description: <p class="detail">删除段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @return Integer
	 */
	Integer delJoke(Long id);

	/**
	 * 
	 * @description: <p class="detail">更新段子</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	Integer updateJoke(JokeInfo jokeInfo);
}
