package com.sunny.joke.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sunny.joke.po.Manager;
import com.sunny.joke.vo.PageRequest;

public interface ManagerMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Manager record);

    int insertSelective(Manager record);

    Manager selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Manager record);

    int updateByPrimaryKey(Manager record);
    
    

    /**
     * 
     * @description: <p class="detail">根据用户名查询用户信息</p>
     * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
     */
	Manager selectManagerByName(@Param("name")String name);

	/**
	 * 
	 * @description: <p class="detail">查询管理员总数</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	long selectManagerCount();

	
	/**
	 * 
	 * @description: <p class="detail"></p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	List<Manager> selectManagerList(PageRequest pageRequest);
}