package com.sunny.joke.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunny.joke.po.JokeInfo;
import com.sunny.joke.vo.PageRequest;

public interface JokeInfoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(JokeInfo record);

    int insertSelective(JokeInfo record);

    JokeInfo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(JokeInfo record);

    int updateByPrimaryKey(JokeInfo record);

	Long selectJokeInfoCounts();

	List<JokeInfo> queryJokeInfoListByConditions(@Param("joke") JokeInfo jokeInfo,
			@Param("pageRequest")PageRequest pageRequest);

	Integer delJoke(@Param("id")Long id);
}