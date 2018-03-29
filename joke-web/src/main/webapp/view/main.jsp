<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>内涵段子管理系统</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="<%=basePath%>css/third/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<%=basePath%>css/third/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="<%=basePath%>css/third/_all-skins.min.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="<%=basePath%>css/third/datepicker3.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="<%=basePath%>css/third/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="<%=basePath%>css/third/bootstrap3-wysihtml5.min.css">
  <link rel="stylesheet" href="<%=basePath%>iconfont/iconfont.css">
  <style type="text/css">
body {
	overflow-y: hidden !important;
}

.content-wrapper {
	overflow-y: auto !important;
	height: 500px !important;
}

.img_circle {
	border-radius: 50%;
	border: 1px solid #dfdfdf;
	padding: 1px;
}

.help_tips {
	display: inline-block;
	height: 30px;
	line-height: 35px;
	text-align: center;
	width: 30px;
}

</style>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="left.jsp"></jsp:include>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
     <!-- Main content -->
   	<c:if test="${not empty page.pageName}">    	
   		<jsp:include page="${page.pageName}"></jsp:include> 
   	</c:if>
</div>
<jsp:include page="footer.jsp"></jsp:include>
</div>
<!-- jQuery 2.2.3 -->
<script src="<%=basePath%>js/third/jquery-2.2.3.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/third/jquery.form.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script type="text/javascript" src="<%=basePath%>js/third/bootstrap.min.js"></script>

<!-- daterangepicker -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/third/daterangepicker.js"></script>
<!-- AdminLTE App -->
<script type="text/javascript" src="<%=basePath%>js/third/app.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/json2.js"></script>
<script type="text/javascript" src="<%=basePath%>js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>js/artDialog4.1.7/artDialog.source.js?skin=default"></script>
<script type="text/javascript" src="<%=basePath%>js/artDialog4.1.7/plugins/iframeTools.js"></script>
<script type="text/javascript" src="<%=basePath%>js/third/template-web.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common_checked.js"></script>
<script type="text/javascript" src="<%=basePath%>js/template-web.js"></script>
<script type="text/javascript" src="<%=basePath%>js/uploadify/ajaxfileupload.js"></script>

</body>
</html>