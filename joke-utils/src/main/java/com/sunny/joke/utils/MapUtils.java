/**
 * This class was created by Kimmyzhao. It's distributed as
 * part of the member-util Mod.
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
 * File Created @ [2017年3月6日, 下午12:41:43 (CST)]
 */
package com.sunny.joke.utils;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MapUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(MapUtils.class);
	
	/**
	 * 
	 * @description: <p class="detail">实体Bean转Map</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年5月31日-下午5:22:44
	 * @param @param obj
	 * @param @return
	 * @return Map<String,Object>
	 */
	public static Map<String, Object> transBean2Map(Object obj) {
		if (obj == null) {
			return null;
		}
		Map<String, Object> map = new HashMap<String, Object>();

		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
			PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
			for (PropertyDescriptor property : propertyDescriptors) {
				String key = property.getName();

				// 过滤class属性
				if (!key.equals("class")) {
					// 得到property对应的getter方法
					Method getter = property.getReadMethod();
					Object value = getter.invoke(obj);

					map.put(key, value);
				}

			}
			return map;
		} catch (IllegalAccessException e) {
			logger.error("Bean convert to map is error.", e);
		} catch (IllegalArgumentException e) {
			logger.error("Bean convert to map is error.", e);
		} catch (InvocationTargetException e) {
			logger.error("Bean convert to map is error.", e);
		} catch (IntrospectionException e) {
			logger.error("Bean convert to map is error.", e);
		}
		return null;
	}
	
	/***
	 * 
	 * @description: <p class="detail">把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串</p>
	 * @author: <a href="mailto:zhaoshouyi@chunmi.com ">Kimmyzhao</a>
	 * @date: 2017年3月6日-下午12:51:58
	 * @param @param params
	 * @param @return
	 * @return String
	 */
	public static String createLinkString(Map<String, Object> params) {
		List<String> keys = new ArrayList<String>(params.keySet());
		Collections.sort(keys);

		String prestr = "";
		for (int i = 0; i < keys.size(); i++) {
			String key = keys.get(i);
			Object value = params.get(key);

			if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符
				prestr = prestr + key + "=" + value;
			} else {
				prestr = prestr + key + "=" + value + "&";
			}
		}
		return prestr;
	}
	
	/***
	 * 
	 * @description: <p class="detail"></p>
	 * @author: <a href="mailto:zhaoshouyi@chunmi.com ">Kimmyzhao</a>
	 * @date: 2017年3月7日-上午9:51:55
	 * @param @param obj
	 * @param @return
	 * @return String
	 */
	public static String createLinkString(Object obj) {
		Map<String, Object> params = transBean2Map(obj);

		if (params == null) {
			return "";
		} else {
			Map<String, Object> result = new HashMap<String, Object>();
			params.forEach((key, value) -> {
				if (value != null) {
					result.put(key, value);
				}

			});
			logger.debug("转换后的map为: {}", result);
			List<String> keys = new ArrayList<String>(result.keySet());
			Collections.sort(keys);

			String prestr = "";
			for (int i = 0; i < keys.size(); i++) {
				String key = keys.get(i);
				Object value = result.get(key);

				if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符
					prestr = prestr + key + "=" + value;
				} else {
					prestr = prestr + key + "=" + value + "&";
				}

			}
			logger.debug("加密字符串: {}", prestr);
			return prestr;
		}

	}
	
}
