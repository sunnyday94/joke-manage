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
 * File Created @ [2017年10月13日, 下午3:15:14 (CST)]
 */
package com.sunny.joke.test;

import java.io.Serializable;

public abstract class BaseRepository<T extends Serializable> {
	public void save(T t){
		System.out.println("保存:"+t);
	}
}
