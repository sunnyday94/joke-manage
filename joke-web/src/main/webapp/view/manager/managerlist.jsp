<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="ctx" value="${pageContext.request.contextPath }"/>
<div>
	<legend class="content-header">
		<h1>管理员列表&nbsp;<label style="font-size: 15px;">(共${pb.rows}条)</label></h1>
		<ol class="breadcrumb text-right">
			<li><a href="#"><i class="fa fa-dashboard"></i> 当前位置</a></li>
			<li><a href="#">系统</a></li>
			<li class="active">管理员列表</li>
		</ol>
	</legend>
	<section class="content">
		<div class="box-header with-border">
			<form action="managerlist.do" id="searchManagerlistForm" method="get">
				<button type="button" class="btn btn-primary" data-toggle="modal" style="margin-left: -10px;"
				 onclick="showAddManagerDiv();">
					<i class="fa fa-plus"></i> 添加
				</button>
				<input type="hidden" name="pageNo" value=""/>
				<input type="hidden" name="pageSize" value=""/>	
			</form>	
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="box">
					<div class="box-body table-responsive no-padding" style="margin-top: 15px;">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>头像</th>
									<th>用户名</th>
									<th>用户昵称</th>
									<c:if test="${loginManager.managerName eq 'sunnyday' }">
										<th>操作</th>
									</c:if>
								</tr>
							</thead>
							<tbody>
								<c:if test="${fn:length(pb.list)==0 }">
									<tr>
										<td colspan="3" align="center" style="font-weight: bold;">暂无可用数据!</td>
									</tr>
								</c:if>
								<c:forEach items="${pb.list }" var="manager">
									<tr>
										<td>
	                						<c:if test="${empty manager.headPic }">
	                							<img class="img-circle" alt="User Image" height="30" src="${ctx }/image/avatar04.png"/>
	                						</c:if>
	                						<c:if test="${not empty manager.headPic }">
	                							<img class="img-circle" alt="User Image" height="30" src="${manager.headPic }"/>
	                						</c:if>
	                					</td>
										<td>${manager.managerName }</td>
										<td>${manager.managerNickname }</td>
										<c:if test="${loginManager.managerName eq 'sunnyday' }">
											<td>
												<c:if test="${manager.managerName !='sunnyday' }">
													<c:if test="${manager.delFlag eq '0' }">
														<button type="button" class="btn bg-maroon btn-flat" onclick="updateManagerStatus(${manager.id},'1')">禁用</button>
													</c:if>
													<c:if test="${manager.delFlag eq '1' }">
														<button type="button" class="btn bg-green btn-flat" onclick="updateManagerStatus(${manager.id},'0')">启用</button>
													</c:if>													
												</c:if>
											</td>	
										</c:if>									
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

<div class="modal fade" id="addmanagerDiv" tabindex="-1" role="dialog"
	aria-labelledby="ModalTitle" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="ModalTitle">新增</h4>
			</div>
			<div class="register-box-body" style="padding:20px 40px;">
				<form action="addManager" method="post" id="addManagerForm">		
              		<div class="form-group">
                		<label class="control-label col-sm-3">预览头像：</label>
                		<div class="col-sm-1"></div>
                		<div class="col-sm-5">
                			<input name="headPic" id="headpic" type="hidden" value=""/>
                  			<img class="img-circle" alt="User Image" id="img" src="${ctx}/image/default_head.jpg" height="30"> 
                 			<input type="button" id="choose" value="选择"/> 
               				<input type="file" id="imgUpload" name="file" onchange="uploadImg(this)"
               				style="display: none;" multiple />
               			</div>	
              		</div><br/><br/>
			    	<div class="form-group has-feedback">
			    		<input type="text" class="form-control" placeholder="用户名" name="managerName" id="addManagerName">
			    		<span class="glyphicon glyphicon-user form-control-feedback"></span>
			    	</div>
			    	<div class="form-group has-feedback">
			    		<input type="text" class="form-control" placeholder="昵称" name="managerNickname" id="addManagerNickname">
			    		<span class="glyphicon glyphicon-user form-control-feedback"></span>
			    	</div>
			    	<div class="form-group has-feedback">
			    		<input type="password" class="form-control" placeholder="密码" name="managerPassword" id="addManagerPassword">
			    		<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			    	</div>
			    </form>
			    <div class="row">
			    	<div class="col-xs-3 pull-right">
			    		<button type="submit" class="btn btn-primary btn-block btn-flat" onclick="saveManager()">保存</button>
			    	</div>
		    	</div>
		    </div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(function(){
		siderBar("managerList");
		
		$("#choose").click(function() {
			$("#imgUpload").click();
		});

    });
	
	
	/*分页加载数据*/
	function loadingPage(pageNo, pageSize){
		$("input[name='pageNo']").val(pageNo);
		$("input[name='pageSize']").val(pageSize);
		$("#searchManagerlistForm").submit();
	}
	
	/*添加按钮*/
	function showAddManagerDiv(){
		$('#addManagerName').val('');
		$('#addManagerPassword').val('');
		$('#addManagerNickname').val('');
		$('#addmanagerDiv').modal('show');
	}
	
	/*新增管理员*/
	function saveManager(){
		if($('#addManagerName').val()==null || $('#addManagerName').val()==''){
			layer.msg("用户名不能为空!",{time:1000});
			return;
		}
		if($('#addManagerPassword').val()==null || $('#addManagerPassword').val()==''){
			layer.msg("密码不能为空!",{time:1000});
			return;
		}else{
			if($('#addManagerPassword').val().length<6){
				layer.msg("密码需要六位以上有效数字或字符!",{time:1000});
				return;
			}
		}		
		$.ajax({
			type : "POST",
			async : false,
			url: "addManager",
			data:$('#addManagerForm').serialize(),
			success:function(message){
				if(message=="1"){
					location.reload();
				}else if(message == "2"){
					layer.msg("该用户已存在!",{time:1000});
				}else{
					layer.msg("添加失败!",{time:1000});
				}
			}
		});
	}
	
	
	/*更改管理员状态(启用或禁用)*/
	function updateManagerStatus(id,delFlag){
		if(delFlag=="1"){
			layer.confirm('确认禁用该用户?',{
				btn:['确认','取消']
			},function(){
				$.ajax({
					type : "POST",
					async: false,
					url : "updateManagerStatus",
					data: "id="+id+"&delFlag="+delFlag,
					success: function(message){
						if(message==1){
							location.reload();
						}else{
							layer.msg('禁用失败!',{time:1000});
						}
					}
				});
			},function(){
				
			});
		}else{
			$.ajax({
				type : "POST",
				async: false,
				url : "updateManagerStatus",
				data: "id="+id+"&delFlag="+delFlag,
				success: function(message){
					if(message==1){
						location.reload();
					}else{
						layer.msg('启用失败!',{time:1000});
					}
				}
			});			
		}
	}
	
	/*上传图片*/
	function uploadImg(obj) {
		var ctxValue = $(obj).val();
		var extStart = ctxValue.lastIndexOf(".");
		var ext = ctxValue.substring(extStart, ctxValue.length).toUpperCase();
		if(ext==".BMP"||ext==".PNG"||ext==".GIF"||ext==".JPG"||ext==".JPEG"){
			var fileElementId = $(obj).attr("id");
			$.ajaxFileUpload({
				url : "${ctx}/file/uploadFile",
				type : 'post',
				dataType : 'json',
				fileElementId : fileElementId,// file标签的id
				success : function(data) {
					if (data.code == 10000) {
						$("#headpic").val("${ctx}/image/headPic/"+data.result);
						$("#img").attr("src", "${ctx}/image/headPic/"+data.result);
						parent.layer.msg("上传成功", {time : 1000});
					}
					if (data.code == 10062){   //图片过大
						parent.layer.msg(data.message, {time : 1000});
					}
				},
				error : function(data,e) {

				}
			});
			 
		}else{
			layer.msg("图片限于bmp,png,gif,jpeg,jpg格式", {time: 1500});
			//Js中清空文件上传字段
			return false;
		}
	}
</script>
