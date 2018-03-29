package com.sunny.joke.vo;


public class PageRowsUtil {
	/**
	 * 每页行数
	 */
	private static final int TEN = 10;
	/** 每页行数 */
	private static Integer pageRows = TEN;

	/**
	 * 无参构造方法
	 */
	private PageRowsUtil() {
	}

	public static Integer getPageRows() {
		return pageRows;
	}

	/**
	 * 设置分页行数
	 */
	public static void setPageRows(Integer pageRows) {
		PageRowsUtil.pageRows = pageRows;
	}
}
