<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<link href="<%=basePath%>css/third/bootstrap-select.min.css" rel="stylesheet" type="text/css"/>
<link href="<%=basePath%>css/third/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/>
<style>

  .level_left {
     width: 580px;
     overflow: hidden;
     min-height: 420px;
     float: left;
     border: 1px solid #ddd;
   }

   .level_left .title, .level_rig .title {
      font-size: 14px;
      padding: 10px 0px;
   }
</style>

<div>
	<legend class="content-header">
		<h1>内涵段子列表&nbsp;<label style="font-size: 15px;">(共${pb.rows}条)</label></h1>
		<ol class="breadcrumb text-right">
			<li><a href="#"><i class="fa fa-dashboard"></i> 当前位置</a></li>
			<li><a href="#">系统</a></li>
			<li class="active">内涵段子列表</li>
		</ol>
	</legend>
	<section class="content">
		<div class="box-header with-border">
			<form action="${pageContext.request.contextPath }/joke/jokelist" id="searchJokelistForm" method="get"
				class="form-inline">
				<div class="form-group">
					<div class="input-group" style="margin-left: -10px;">
						<span class="input-group-addon">段子名称</span> <input type="text"
							class="form-control" id="jokeName" name="jokeName" value="${pb.objectBean.jokeName }">
					</div>
				</div>
				<div class="form-group" style="margin-left: 5px;">
					<div class="input-group" style="margin-left: 5px;">
				        <span class="input-group-addon">段子分类</span>
						<select class="form-control cate_selector"  name="jokeTypeId" id="jokeTypeId">
							<option value="0">全部</option>
							<c:forEach items="${jokeTypeList }" var="jokeType">
								<option value="${jokeType.id }" 
									<c:if test="${jokeType.id == pb.objectBean.jokeTypeId }">selected=selected</c:if>>
									${jokeType.typeName }
								</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<div class="input-group" style="margin-left: 5px;">
						<span class="input-group-addon">上传者</span> <input type="text"
							class="form-control" id="managerName" name="managerName" value="${pb.objectBean.manager.managerName }">
					</div>
				</div>
				<div class="form-group">
					<div class="input-group date form_datetime w300" style="margin-left: 5px;">
						<span class="input-group-addon">上传时间</span>
						<input class="form-control" type="text" value="${pb.objectBean.createTimeStr}"  name="createTimeStr" id="createTimeStr" readonly/> 
						<span class="input-group-addon"><i class="glyphicon glyphicon-remove"></i></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div><br/>
				<div class="form-group" style="margin-top:10px; margin-left: -10px;">
					<input type="submit" class="btn btn-primary" value="搜索"/>
				</div>
				<div class="form-group" style="margin-top:10px; margin-left: 15px;">
					<button type="button" class="btn btn-info" style="margin-left: -10px;"
						onclick="showAddJokeDiv();">
						<i class="fa fa-plus"></i> 添加
					</button >
				</div>
				<div class="form-group" style=" margin-top:10px;margin-left: 5px;">
					<button type="button" class="btn btn-info"
						onclick="delJoke('${loginManager.managerName}');" <c:if test="${fn:length(pb.list)==0 }">disabled="disabled"</c:if>>
						<i class="glyphicon glyphicon-trash"></i> 删除
					</button >
				</div>
				<input name="pageNo" id="pageNo" value="1" type="hidden">
				<input name="pageSize" id="pageSize" value="10" type="hidden">
			</form>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="box">
					<div class="box-body table-responsive no-padding" style="margin-top: 15px;">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>
										<input type="checkbox" onclick="allunchecked(this,'id');"/>
									</th>
									<th>段子名称</th>
									<th>段子类型</th>
									<th>上传者</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<c:if test="${fn:length(pb.list)==0 }">
									<tr>
										<td colspan="5" align="center" style="font-weight: bold;">暂无可用数据!</td>
									</tr>
								</c:if>
								<c:forEach items="${pb.list }" var ="jokeInfo">
									<tr>
										<td>
											<input type="checkbox" name="id" value="${jokeInfo.id}" manager="${jokeInfo.manager.managerName }"/>
										</td>
										<td>${jokeInfo.jokeName }</td>
										<td>
											<c:if test="${not empty jokeInfo.jokeType }">
												${jokeInfo.jokeType.typeName }
											</c:if>
										</td>
										<td>${jokeInfo.manager.managerName }</td>
										<td>
											<div class="btnGroup" >
												<button type="button" class="btn bg-maroon btn-flat" onclick="editJokeInfo(${jokeInfo.id },'${loginManager.managerName}',
												'${jokeInfo.manager.managerName}','${jokeInfo.jokeName }',${jokeInfo.jokeTypeId },'${jokeInfo.jokeContent }');">编辑</button>
												<button type="button" class="btn bg-green btn-flat" onclick="selectJokeInfoDetail(${jokeInfo.id});">查看详情</button>
											</div>
										</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
					<jsp:include page="../page/paging.jsp"></jsp:include>
				</div>
			</div>
		</div>
    </section>
</div>

	<!-- Modal -->
	<!-- 添加段子   修改段子(共用)-->
	<div class="modal fade" id="addJokeDiv" tabindex="-1" role="dialog"
		aria-labelledby="ModalTitle" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="addModalTitle" style="display: block;">添加段子</h4>
					<h4 class="modal-title" id="updateModalTitle" style="display: none;">修改段子</h4>
				</div>
				<form class="form-horizontal" method="post" id="addJokeForm" action="${pageContext.request.contextPath}/joke/addJoke" enctype="multipart/form-data">
					<div class="box-body">
						<div class="form-group">
							<label class="col-sm-3 control-label">段子名称：</label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="addJokeName" name="jokeName" placeholder="输入段子名称"/>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label">段子内容：</label>
							<div class="col-sm-5">
								<textarea cols="32" style="height:150px;overflow-y:auto;word-break: break-all;" name="jokeContent" id="addJokeContent" placeholder="输入段子内容"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3">段子分类：</label>
							<div class="col-sm-5">
								<select class="form-control cate_selector"  name="jokeTypeId" id="addJokeTypeId">
									<c:forEach items="${jokeTypeList }" var="jokeType">
										<option value="${jokeType.id }" <c:if test="${jokeType.id ==1 }">selected=selected</c:if>  >
											${jokeType.typeName }
										</option>
									</c:forEach>
							    </select>
							</div>
						</div>
					</div>
					<input id="addJokeUploadUser" name="uploadUserId" type="hidden" value="${loginManager.id }"/>
					<input name="id" id = "jokeId" type="hidden" value=""/>
				</form>
				<div class="modal-footer" id="addConfirmBtn">
					<button type="button" class="btn btn-primary" onclick="subAddJokeForm();">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 段子详情 -->
	<div class="modal fade" id="showJokeInfoDetail" role="dialog">
		<div class="modal-dialog modal-lg" style="margin:30px auto 0;">
			<div class="modal-content">
				<div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   <h4 class="modal-title" id="settingTitle">段子详情</h4>
               	</div>
               	<div class="modal-body" id="showJokeInfoDetailBody">
               		 
               	</div>
			</div>
		</div>
	</div>
	
<script id="showJokeInfoDetailTemplate" type="text/x-template">
	<table class="table table-striped table-hover table-bordered" style="margin-bottom:0px;">
		{{if data }}
			<tr>
				<td width ="100px">段子名称</td>
				<td width ="300px">{{data.jokeName }}</td>
				<td width ="100px">段子分类</td>
				<td width ="300px">{{data.jokeType.typeName }}</td>
			</tr>
			<tr>
				<td width ="100px">上传者</td>
				<td width ="300px">{{data.manager.managerName}}</td>
				<td width ="100px">上传时间</td>
				<td width ="300px">{{data.createTimeStr }}</td>
			</tr>
			<tr>
				<td width ="100px">段子内容</td>
				<td colspan="3">
					<div style="height:200px;overflow-y:auto;word-break: break-all;">{{data.jokeContent }}</div>
				</td>
			</tr>
			<tr>

				<td width ="100px">更新时间</td> 
				<td width ="300px">{{data.updateTimeStr }}</td>
				<td width ="100px">备注</td>
				<td width ="300px">{{data.remark}}</td>
			</tr>
	{{/if}}
  </table>
</script>

<script src="<%=basePath%>js/third/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="<%=basePath%>js/third/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
<script type="text/javascript">
	/* 下面是表单里面的日期时间选择相关的 */
	$('.form_datetime').datetimepicker({
		format : 'yyyy-mm-dd hh:ii:00',
		weekStart : 1,
		autoclose : true,
		language : 'zh-CN',
		pickerPosition : 'bottom-left',
		todayBtn : true,
		viewSelect : 'hour'
	});
	/* 下面是表单里面的日期时间选择相关的 END */
	
	$(function(){
		siderBar("managerList");
    });
	
	/*分页加载数据*/
	function loadingPage(pageNo, pageSize){
		$("input[name='pageNo']").val(pageNo);
		$("input[name='pageSize']").val(pageSize);
		$("#searchJokelistForm").submit();
	}
	
	/*添加按钮*/
	function showAddJokeDiv(){
		$('#addJokeName').val('');
		$('#addJokeContent').val('');
		
		$("#addJokeForm").attr('action','<%=basePath%>joke/addJoke');
		
		$("#addModalTitle").css('display','block');
		$("#updateModalTitle").css('display','none');
		
		$('#addJokeDiv').modal('show');
	}
	
	/*提交添加段子表单*/
	function subAddJokeForm(){
		var jokeName = $("#addJokeForm").find("input[name='jokeName']").val();
		var jokeContent = $("#addJokeForm").find("textarea[name='jokeContent']").val();
		if(jokeName == null || jokeName == ""){
			parent.layer.msg("段子名称不能为空", {time : 1000});
			return;
		} else if(jokeContent == null || jokeContent == ""){
			parent.layer.msg("段子内容不能为空", {time : 1000});
			return;
		}
		$("#addJokeForm").submit();
		$("#addJokeDiv").modal('hide');
	}
	
	/*查看段子详情*/
	function selectJokeInfoDetail(jokeInfoId){
		$.ajax({
			type : "get",
			url : "showJokeInfoDetailById/"+jokeInfoId,
		    success: function (data) {
				var html = template('showJokeInfoDetailTemplate', {
						data : data
					});
	   		      $("#showJokeInfoDetailBody").html(html);
	   		      $("#showJokeInfoDetail").modal("show");
			}
		});
	}
	
	/*删除段子*/
	function delJoke(managerName){
		var ids = new Array();
		var managers = new Array();
		$("input[name='id']:checked").each(function(i){
			ids[i]=$(this).val();
			managers[i]=$(this).attr("manager");
		})
		 if(ids.length == 0){
			 layer.msg('请选择一行', {time: 1000, icon:5});
		}else{
			layer.confirm('确定要删除吗？', {
				  btn: ['确定','取消'] //按钮
				}, function(){
					if(managerName=='sunnyday'){
						$.post("delJoke","ids="+ids,function(msg){
							  if(msg==1){
								   location.reload();
							  }else{
								  layer.msg('删除失败', {time: 1000, icon:5});
							  }
						  });
					}else{
						$.ajax({
							type : "post",
							data : "managerName="+managerName+"&managers="+managers,
							url : "checkDelPermiss",
							success: function (data) {
								if(data==1){
									  $.post("delJoke","ids="+ids,function(msg){
										  if(msg==1){
											   location.reload();
										  }else{
											  layer.msg('删除失败', {time: 1000, icon:5});
										  }
									  });
								}else{
									layer.msg('你没有权限删除他人作品', {time: 1000, icon:5});
								}
							}
						}); 						
					} 
				}, function(){
					
				});
		}		
	}
	
	/*编辑按钮*/
	function editJokeInfo(jokeId,loginManagerName,managerName,
				jokeInfoName,jokeTypeId,jokeContent){
		if(loginManagerName!=managerName && loginManagerName!= 'sunnyday'){
			layer.msg("你没有权限修改他人作品",{time:1000 ,icon:5});
			return;
		}
		$("#addJokeName").val(jokeInfoName);
		$("#addJokeContent").val(jokeContent);
		$("#addJokeTypeId").val(jokeTypeId);
		
		$("#addModalTitle").css('display','none');
		$("#updateModalTitle").css('display','block');
		
		$("#addJokeForm").attr('action','<%=basePath%>joke/updateJoke');
		$("#jokeId").val(jokeId);
		$('#addJokeDiv').modal('show');
	}
	
</script>
