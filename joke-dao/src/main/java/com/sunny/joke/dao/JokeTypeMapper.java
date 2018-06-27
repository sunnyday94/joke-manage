package com.sunny.joke.dao;

import java.util.List;

import com.sunny.joke.po.JokeType;

public interface JokeTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(JokeType record);

    int insertSelective(JokeType record);

    JokeType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(JokeType record);

    int updateByPrimaryKey(JokeType record);

	List<JokeType> queryJokeTypeList();
}