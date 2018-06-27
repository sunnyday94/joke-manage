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
 * File Created @ [2017年10月10日, 上午9:50:49 (CST)]
 */
package com.sunny.joke.test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSONObject;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class SunnyTestList {
	public static final String DEF_CHARSET = "utf-8";
	
	@SuppressWarnings("resource")
	public static void main(String[] args) throws InterruptedException {
//		Scanner sc = new Scanner(System.in);
//		System.out.print("请输入一个字符串:");
//		String str = sc.next();
//		System.out.println("判断回文中,请稍后.....");
//		Thread.sleep(3000);
//		boolean result  = judgePalindrome(str, 0, str.length()-1);
//		System.out.println(result ? "您输入的是回文" : "您输入的不是回文");
//		int left = 10;
//		int right = 8;
//		left = left + right;
//		right = left -right;
//		left = left - right;
//		System.out.println("交换后:left is"+left +"\t right is"+right);
		Student stu = new Student();
		stu.setName("sunnyday");
		stu.setAge(23);
		stu.setGender("男");
		System.out.println(stu);
	}
	
	/**
	 * 
	 * @description: <p class="detail">my Tel</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-上午9:51:41
	 * @param 
	 * @return void
	 */
	public static void sunnyTel(){
		StringBuilder builder = new StringBuilder();
		String[] nums = {"6","1","3","5","2","0","8"};
		List<Integer> indexs = new ArrayList<Integer>(Arrays.asList(1,3,5,4,1,0,0,6,2,3,2));
		indexs.forEach(index -> {
			builder.append(nums[index]);
		});
		System.out.println("my telphone num is "+builder.toString());		
	}
	
	/**
	 * 
	 * @description: <p class="detail">迭代器测试</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-上午9:52:18
	 * @param 
	 * @return void
	 */
	public static void testIterator(){
		List<String> nameList = new ArrayList<String>(Arrays.asList(new String[]{"sunnyday","rainny","cloudy","windy"}));
		Iterator<String> it = nameList.iterator();
		while(it.hasNext()){
			String name = it.next();
			if(name.equals("rainny"))
				it.remove();
		}
		nameList.forEach(n -> {
			System.out.println(n);
		});		
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">递归调用(判断字符串是否为回文)</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-上午10:06:43
	 * @param @param str
	 * @param @param startIndex
	 * @param @param endIndex
	 * @param @param index
	 * @return void
	 */
	public static boolean judgePalindrome(String str,int startIndex,int endIndex){
		if(startIndex == endIndex){
			return true;
		}else{
			return str.charAt(startIndex)==str.charAt(endIndex) ? judgePalindrome(str, ++startIndex,--endIndex) : false;
		}
	}
	
	/**
	 * 
	 * @description: <p class="detail">i++和++i区别</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-上午10:58:03
	 * @param 
	 * @return void
	 */
	public static void test(){
		int a = 5,b =5;
		int c = a++;
		int d = ++b;
		System.out.println("c:"+c+"\t d:"+d);
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">连接到redis服务</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-下午3:54:24
	 * @param 
	 * @return void
	 */
	public static void connectRedisServer(){
		//连接本地的redis服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("连接成功");
		//查看服务是否运行
		System.out.println("服务正在运行:"+jedis.ping());
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">Redis Java String(字符串) 实例</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-下午4:00:59
	 * @param 
	 * @return void
	 */
	public static void redisJavaString(){
		//连接本地redis服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("连接成功");
		if(jedis.exists("name"))
			jedis.del("name");
		//往redis存入字符串
		jedis.set("name","sunnyday");
		//获取存入redis的字符串
		System.out.println("存入redis的字符串为:"+jedis.get("name"));
		//关闭Jedis
		jedis.close();
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">Redis Java sorted set(有序集合) 实例</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-下午4:15:00
	 * @param 
	 * @return void
	 */
	public static void redisJavaZset(){
		//连接本地redis服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("连接成功");
		if(jedis.exists("name"))
			jedis.del("name");
		jedis.zadd("name", 1, "sunnyday");
		jedis.zadd("name", 4,"windy");
		jedis.zadd("name",3,"rainny");
		jedis.zadd("name",2,"cloudy");
		//获取有序集合
		Set<String> zSet = jedis.zrangeByScore("name",1, 4);
		//循环遍历
		zSet.forEach(s -> {
			System.out.println(s);
		});
		//关闭Jedis
		jedis.close();
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">Redis Java List(列表) 实例</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-下午4:21:54
	 * @param 
	 * @return void
	 */
	public static void redisJavaList(){
		//连接本地redis服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("连接成功");
		//往redis放入列表元素，先判断key是否存在，若存在，则先删除
		if(jedis.exists("username"))
			jedis.del("username");
		//从右边(列表尾部)放入元素
		jedis.rpush("username","王晴天");
		jedis.rpush("username", "黄映然");
		jedis.rpush("username", "邓政");
		jedis.rpush("username", "熊程程");
		jedis.rpush("username", "王丞");
		//获取存入redis的列表元素(-1代表最后边一个元素)
		List<String> userNameList = jedis.lrange("username", 0, -1);
		//循环遍历
		userNameList.forEach(userName -> {
			System.out.println(userName);
		});
		//关闭Jedis
		jedis.close();
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">Redis Java Keys 实例</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月10日-下午5:13:44
	 * @param 
	 * @return void
	 */
	public static void redisJavaKeys(){
		Jedis jedis = new Jedis("localhost");
		System.out.println("连接成功");
		Set<String> keys = jedis.keys("*");
		keys.forEach(key -> {
			System.out.println(key);
		});
		//关闭Jedis
		jedis.close();
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">jedis连接池</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月11日-下午2:30:28
	 * @param 
	 * @return void
	 */
	public static void jedisPool(){
		//JedisPool
		JedisPool jedisPool = new JedisPool("192.168.1.11", 6379);
		//通过连接池获取jedis对象
		Jedis jedis = jedisPool.getResource();
		jedis.set("爱好","音乐");
		System.out.println("存入redis的字符串为:"+jedis.get("爱好"));
		//关闭jedis客户端
		jedis.close();
		//关闭连接池
		jedisPool.close();
	}
	
	
	/**
	 * 
	 * @description: <p class="detail">httpPost请求</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 * @date: 2017年10月13日-下午1:14:10
	 * @param @param url
	 * @param @param params
	 * @param @return
	 * @return String
	 */
	public static String httpPostWithJson(String url,Map<String,Object> params){
		HttpClient httpClient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(url);
		String result = null;
		JSONObject json = new JSONObject();
		for(Map.Entry<String, Object> map : params.entrySet()){
			json.put(map.getKey(), map.getValue());
		}
		try {
			StringEntity entity = new StringEntity(json.toJSONString(),DEF_CHARSET); //解决中文乱码
			entity.setContentType("application/json");
			entity.setContentEncoding(DEF_CHARSET);
			httpPost.setEntity(entity);
			HttpResponse response = httpClient.execute(httpPost);
			result = EntityUtils.toString(response.getEntity());
		} catch (Exception e) {
			e.getMessage();
		}
		return result;
	}
	
	
	
}
