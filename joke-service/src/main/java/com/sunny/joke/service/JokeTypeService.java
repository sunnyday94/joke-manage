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
 * File Created @ [2017年9月14日, 下午2:51:25 (CST)]
 */
package com.sunny.joke.service;

import java.util.List;

import com.sunny.joke.po.JokeType;

public interface JokeTypeService {

	List<JokeType> queryJokeTypeList();
}
