package com.sunny.joke.utils;

/**
 * 系统接口返回消息体<br>
 * <功能描述>
 * 
 * @author Java-007 2015年2月7日
 * 
 */
public class Response {

	public static final String TOKEN = "123321";

	private Integer code;

	private String message = "处理成功";

	private Object result;

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public static Response getSuccess() {
		Response response = new Response();
		response.code = MessageExceptionEnum.SUCCER_HANDLE.getCode();
		response.message = MessageExceptionEnum.SUCCER_HANDLE.getMessage();
		response.result = null;
		return response;
	}

	public static Response getSuccess(Object result) {
		Response response = new Response();
		response.code = MessageExceptionEnum.SUCCER_HANDLE.getCode();
		response.message = MessageExceptionEnum.SUCCER_HANDLE.getMessage();
		response.result = result;
		return response;
	}

	public static Response buildSuccess(Integer code, Object result, String message) {
		Response r = new Response();
		r.code = code;
		r.result = result;
		r.message = message;
		return r;
	}

	public static Response getError(MessageExceptionEnum mess) {
		Response response = new Response();
		response.code = mess.getCode();
		response.result = null;
		response.message = mess.getMessage();
		return response;
	}

	public static Response buildResult(MessageExceptionEnum mess) {
		Response response = new Response();
		response.code = mess.getCode();
		response.result = null;
		response.message = mess.getMessage();
		return response;
	}

}