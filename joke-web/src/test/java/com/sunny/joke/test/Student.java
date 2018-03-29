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
 * File Created @ [2017年10月13日, 下午3:03:51 (CST)]
 */
package com.sunny.joke.test;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Student implements Serializable{

	private Long id;
	private int age;
	private String name;
	private String gender;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", age=" + age + ", name=" + name + ", gender=" + gender + "]";
	}
	
	
	
}
