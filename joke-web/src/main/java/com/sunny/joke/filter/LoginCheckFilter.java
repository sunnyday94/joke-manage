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
 * File Created @ [2017年9月13日, 上午11:23:38 (CST)]
 */
package com.sunny.joke.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sunny.joke.po.Manager;
import com.sunny.joke.utils.Constants;

public class LoginCheckFilter implements Filter {

	@Override
	public void destroy() {


	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		String servletPath = req.getServletPath();
		if(!servletPath.endsWith(".css") && !servletPath.endsWith(".js") && 
				!servletPath.endsWith(".jpg") && !servletPath.endsWith("check") &&
				!servletPath.endsWith("login.jsp")){
			Manager manager = (Manager) req.getSession().getAttribute(Constants.LOGIN_MANAGER);
			if(manager==null){
				res.sendRedirect(req.getScheme().concat("://").concat(req.getServerName()).concat(":"+
						req.getServerPort()).concat(req.getContextPath()).concat("/view/login.jsp"));
				return;
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {


	}

}
