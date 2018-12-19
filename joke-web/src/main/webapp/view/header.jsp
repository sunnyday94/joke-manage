<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath }"/>
<header class="main-header">
  <!-- Logo -->
  <a href="#" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><b>段</b>子</span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg"><b>内涵段子</b></span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img <c:if test="${empty loginManager.headPic }">src="<%=basePath%>image/avatar04.png"</c:if> 
                	<c:if test="${not empty loginManager.headPic }">src="${loginManager.headPic}"</c:if>
                class="img-circle" alt="User Image" height="30"/>
              <span class="hidden-xs">${loginManager.managerNickname}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img <c:if test="${empty loginManager.headPic }">src="<%=basePath%>image/avatar04.png"</c:if> 
                	<c:if test="${not empty loginManager.headPic }">src="${loginManager.headPic}"</c:if>
                class="img-circle" alt="User Image" height="30"/>

                <p>
                  ${loginManager.managerNickname} - 
                  <c:choose>
                  	<c:when test="${loginManager.managerName eq 'sunnyday'}">
                  		超级管理员
                  	</c:when>
                  	<c:otherwise>
                  		管理员
                  	</c:otherwise>
                  </c:choose>           
                </p>
              </li>   
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="javascript:modifyManager()" class="btn btn-default btn-flat">修改</a>
                </div>
                <div class="pull-right">
                  <a href="javascript:logout()" class="btn btn-default btn-flat">退出</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </nav>
</header>

<div class="modal fade" id="modifyManagerDiv" tabindex="-1" role="dialog"
	aria-labelledby="ModalTitle" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="ModalTitle">修改</h4>
			</div>
			<div class="register-box-body" style="padding:20px 40px;">
				<form action="addManager" method="post" id="modifyManagerForm">	
              		<div class="form-group">
                		<label class="control-label col-sm-3">预览头像：</label>
                		<div class="col-sm-1"></div>
                		<div class="col-sm-5">
                			<input name="headPic" id="updateHeadPic" type="hidden" value="">
                  			<img class="img-circle" alt="User Image" id="updateImg" 
                  				<c:if test="${empty loginManager.headPic }">src="<%=basePath%>image/avatar04.png"</c:if> 
                				<c:if test="${not empty loginManager.headPic }">src="${loginManager.headPic}"</c:if>" 
                			height="30"/> 
                 			<input type="button" id="updateChoose" value="选择"/> 
               				<input type="file" id="updateImgUpload" name="file" onchange="updateUploadImg(this)"
               				style="display: none;" multiple ="multiple"/>
               			</div>	
              		</div><br/><br/>		
			    	<div class="form-group has-feedback">
			    		<input type="text" class="form-control" placeholder="昵称" name="managerNickname" id="managerNickname" value="${loginManager.managerNickname}">
			    		<span class="glyphicon glyphicon-user form-control-feedback"></span>
			    	</div>
			    	<div class="form-group has-feedback">
			    		<input type="password" class="form-control" placeholder="原密码" name="originPassword" id="originPassword" onBlur="checkPassword()">
			    		<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			    	</div>	    	
			    	<div class="form-group has-feedback">
			    		<input type="password" class="form-control" placeholder="新密码" name="newPassword" id="newPassword" readOnly>
			    		<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			    	</div>
			    	<div class="form-group has-feedback">
			    		<input type="password" class="form-control" placeholder="再次输入新密码" id="newPasswordAgain" readOnly">
			    		<span class="glyphicon glyphicon-log-in form-control-feedback"></span>
			    	</div>
			    </form>
			    <div><font color="red" id="warn"></font></div>
			    <div class="row">
			    	<div class="col-xs-3 pull-right">
			    		<button type="submit" class="btn btn-primary btn-block btn-flat" onclick="saveModification()">保存</button>
			    	</div>
		    	</div>
		    </div>
		</div>
	</div>
</div>
<script type="text/javascript" src="${ctx }/js/third/jquery-2.2.3.min.js"></script>
<script>
	$(function(){
		$("#updateChoose").click(function() {
			$("#updateImgUpload").click();
		});
	});

	function modifyManager(){
		$('#modifyManagerDiv').modal('show');
	}
	
	/*检查原密码*/
	function checkPassword(){
		var originPassword = $("#originPassword").val();
		$.ajax({
			type : "POST",
			url : "<%=basePath%>manager/checkPassword",
			data : "password=" + originPassword,
			async : false,
			success : function(message) {
				if(message == "1"){
					$("#newPassword").removeAttr("readOnly");
					$("#newPasswordAgain").removeAttr("readOnly");
				}else{
					$("#newPassword").attr("readOnly","readOnly");
					$("#newPasswordAgain").attr("readOnly","readOnly");
				}
			}
		});
	}
	
	
	/*修改用户信息*/
	function saveModification(){
		var headPic = $("#updateHeadPic").val();
		var managerNickname =  $("#managerNickname").val();
		var newPassword = $("#newPassword").val();
		var newPasswordAgain = $("#newPasswordAgain").val();
		if(newPassword.length<6){
			$("#warn").text("密码需要六位以上有效数字或字符");
			return;
		}
		if(newPassword != newPasswordAgain){
			$("#warn").text("密码两次输入不一致");
			return;
		}
		layer.confirm('确认修改用户信息？', {
			  btn: ['确认','取消'] //按钮
			}, function(){  
				$.ajax({
					type : "POST",
					url : "<%=basePath%>manager/updateManager",
					data : "managerNickname=" + managerNickname + "&managerPassword=" + newPassword+"&headPic="+headPic,
					async : false,
					success : function(message) {
						if(message==1){
							$('#modifyManagerDiv').modal('hide');
							location.reload();
						}else{
							layer.msg('信息修改失败!',{time:1000});
						}
					}
				});
			}, function(){
			   
			});
	}
	
	/*上传图片*/
	function updateUploadImg(obj) {
		var ctxValue = $(obj).val();
		var ext = ctxValue.substring(ctxValue.lastIndexOf(".")).toUpperCase();
		if(ext===".BMP"||ext===".PNG"||ext===".GIF"||ext===".JPG"||ext===".JPEG"){
			var fileElementId = $(obj).attr("id");
			$.ajaxFileUpload({
				url : "${ctx}/file/uploadFile",
				type : 'post',
				dataType : 'json',
				fileElementId : fileElementId,// file标签的id
				success : function(data) {
					if (data.code === 10000) {
						$("#updateHeadPic").val("${ctx}/image/headPic/"+data.result);
						$("#updateImg").attr("src", "${ctx}/image/headPic/"+data.result);
						parent.layer.msg("上传成功", {time : 1000});
					}
					if (data.code === 10062){   //图片过大
						parent.layer.msg(data.message, {time : 1000});
					}
				}
			});
			 
		}else{
			layer.msg("图片限于bmp,png,gif,jpeg,jpg格式", {time: 1500});
			//Js中清空文件上传字段
			return false;
		}
	}
	
	/*用户退出*/
	function logout(){
		layer.confirm('确认退出当前用户？', {
			  btn: ['确认','取消'] //按钮
			}, function(){  
				location.href = '${ctx}/manager/logout';
			}, function(){
			   
			});
		
	}
</script>
