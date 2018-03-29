<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath }" />
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>内涵段子管理系统 | 登录</title>
<!-- Tell the browser to be responsive to screen width -->
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="<%=basePath%>css/third/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="<%=basePath%>css/third/AdminLTE.min.css">
  <style type="text/css">
  body {
  	background: url(${ctx}/image/bg-login.jpg) !important;
  }
  	.login-box-body {
        overflow: hidden;
		box-shadow: 0px 0px 0px 5px rgba(0,0,0,0.15);
  	}
  </style>
</head>
<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo">
			<a href="#"><b>内涵</b>段子</a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">让撩妹更简单</p>
			<div class="form-group has-feedback">
				<input type="text" class="form-control" placeholder="用户名"
					name="name" id="name" autocomplete="off"/> <span
					class="glyphicon glyphicon-envelope form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input type="password" class="form-control" placeholder="密&nbsp;码"
					name="password" id="password" autocomplete="off"/> <span
					class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<div><font color="red" id="warn"></font></div>
			<div class="row">
				<div class="col-xs-12" style="margin-top: 20px;">
					<button type="submit" class="btn btn-primary btn-block btn-flat" onclick="javascript:login()">登录</button>
				</div>
			</div>
		</div>
	</div>

<script src="<%=basePath%>js/third/jquery-2.2.3.min.js"></script>
<script src="<%=basePath%>js/third/bootstrap.min.js"></script>
<script>
	function login(){
		var name = $("#name").val();
		var password = $("#password").val();
		if($.trim($("#name").val()) == ''){
			$("#warn").text("请输入用户名");
			return;
		}
		if($.trim($("#password").val()) == ''){
			$("#warn").text("请输入密码");
			return;
		}
		
		var url =  "<%=basePath%>manager/check";
		$.ajax({
			type : "POST",
			url : url,
			data : {
					"name":name,
					"password":password
				   },
			async : false,
			success : function(message) {
				if(message=="-1"){
					$("#warn").text("用户被禁用");
				}else if(message=="0"){
					$("#warn").text("用户不存在");
				}else if(message =="2"){
					$("#warn").text("密码错误");
				}else{
					//跳转主页面(message=="1")
					window.location.href="<%=basePath%>index"
				}
			}
		});
	}
	

	$("#password").bind('keydown', function(event) {
		if (event.keyCode == "13") {
			login();
		}
	});
</script>
</body>
</html>