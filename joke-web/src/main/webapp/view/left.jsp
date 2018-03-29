<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%-- <input type="hidden" id="activeNode" value='${page.activeNode}'/> --%>
<aside class="main-sidebar"> <!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar"> <!-- Sidebar user panel --> <!-- /.search form -->
	<!-- sidebar menu: : style can be found in sidebar.less -->
		<div class="user-panel">
        	<div class="pull-left image">
         		<img <c:if test="${empty loginManager.headPic }">src="<%=basePath%>image/avatar04.png"</c:if> 
                	<c:if test="${not empty loginManager.headPic }">src="${loginManager.headPic }"</c:if>
                class="img-circle" alt="User Image" height="30"/>
        	</div>
        	<div class="pull-left info">
          		<p>${loginManager.managerNickname}</p>
          		<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        	</div>
      	</div>
		<ul class="sidebar-menu">
			
			<li id="dashboard" class="treeview">
				<a href="#"> <i	class="fa fa-dashboard"></i> 
					<span>内涵段子</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
				</a>
				<ul class="treeview-menu">
					<li id="jokelist"><a href="<%=basePath%>joke/jokelist"><i class="fa fa-circle-o"></i>列表</a></li>
				</ul>
			</li>
			
			<li class="treeview">
				<a href="#"><i	class="fa fa-table"></i> 
					<span>系统管理</span><span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>
				</a>
				<ul class="treeview-menu">
					<li id="managerList"><a href="<%=basePath%>manager/managerlist"><i class="fa fa-circle-o"></i>管理员列表</a></li>
				</ul>
			</li>
		</ul>
	</section>
</aside>
<!-- jQuery 2.2.3 -->
<script type="text/javascript"  src="<%=basePath%>js/third/jquery-2.2.3.min.js"></script>
	
