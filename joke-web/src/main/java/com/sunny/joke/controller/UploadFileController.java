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
 * File Created @ [2017年9月26日, 上午11:12:25 (CST)]
 */
package com.sunny.joke.controller;

import java.io.File;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.sunny.joke.utils.FileUtils;
import com.sunny.joke.utils.MessageExceptionEnum;
import com.sunny.joke.utils.Response;

@Controller
@RequestMapping(value="/file")
public class UploadFileController {
	
	/**
	 * 
	 * @description: <p class="detail">上传图片</p>
	 * @author: <a href="mailto:wangzhifang@chunmi.com ">wangzhifang</a>
	 */
	@RequestMapping(value="uploadFile")
	@ResponseBody
 	public Response uploadImg(MultipartFile file,HttpServletRequest request){
		if (file.getSize() > 2 * 1024 * 1024) {
			return Response.getError(MessageExceptionEnum.PIC_TOO_LARGE);
		} else {
			String projectRootPath = request.getServletContext().getRealPath("/");  //项目路径
			String targetPath = projectRootPath.concat("/image/headPic");
//			String targetPath = new File(projectRootPath).getParent().concat("/headPic");
			File saveDir = new File(targetPath);
			if(!saveDir.exists())
				saveDir.mkdir();
			try {
				String newFileName = UUID.randomUUID().toString().replace("-","").concat(".jpg");
				File newFile = new File(saveDir,newFileName);
				FileUtils.copyInputStreamToFile(file.getInputStream(), newFile);
				return Response.getSuccess(newFileName);
			} catch (Exception e) {
				e.getMessage();
			}
		}
		return null;
 	}

}
