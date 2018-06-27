$(function() {
	/* 表单项的值点击后转换为可编辑状态 */
	$('.form_value').click(function() {
		var formItem = $(this);
		if (!$('.form_btns').is(':visible')) {
			formItem.parent().addClass('form_open');
			$('.form_btns').show();
			$('.form_btns').css({
				'left' : formItem.next().offset().left + 70 + 'px',
				'top' : formItem.next().offset().top - 30 + 'px'
			});
			$('.form_sure,.form_cancel').click(function() {
				$('.form_btns').hide();
				formItem.parent().removeClass('form_open');
			});
		}
	});

	$('#punishmentChoose').change(function() {
		var thirdId = $("input[name='storeId']:checked").val();

		$("#up_id").val(thirdId);
		if ($(this).val() == '') {
			$('.punishment_1,.punishment_2').hide();
		} else if ($(this).val() == 2) {
			$('.punishment_1,.punishment_2').hide();
			$('.punishment_1').show();
			$("#reduceMoney").addClass("required isNoInteger");
			$("#staTime").removeClass("required error");
			$("#enTime").removeClass("required error");
			$("#moneylabel span").html("");
		} else if ($(this).val() == 3) {
			$('.punishment_1,.punishment_2').hide();
			$('.punishment_2').show();
			$("#reduceMoney").removeClass("required isNoInteger");
			$("#staTime").addClass("required");
			$("#enTime").addClass("required");
		}
	});
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
	$('.form_date').datetimepicker({
		format : 'yyyy-mm-dd',
		weekStart : 1,
		autoclose : true,
		language : 'zh-CN',
		pickerPosition : 'bottom-left',
		minView : 2,
		todayBtn : true
	});

	/* 下面是表单里面的日期时间选择相关的 END */

	/* 下面是时间选择器开始时间不能大于结束时间设置 START */
	// 关店的开始结束时间配置
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	$('#endpicker').datetimepicker('setStartDate', startTime);
	$('#startpicker').datetimepicker('setEndDate', endTime);
	$('#endpicker').datetimepicker().on('show', function(ev) {
		startTime = $("#startTime").val();
		endTime = $("#endTime").val();
		$('#endpicker').datetimepicker('setStartDate', startTime);
		$('#startpicker').datetimepicker('setEndDate', endTime);
	});
	$('#startpicker').datetimepicker().on('show', function(ev) {
		endTime = $("#endTime").val();
		startTime = $("#startTime").val();
		$('#startpicker').datetimepicker('setEndDate', endTime);
		$('#endpicker').datetimepicker('setStartDate', startTime);
	});

	// 开始时间的配置
	var staTime = $("#staTime").val();
	var enTime = $("#enTime").val();
	$('#enpicker').datetimepicker('setStartDate', staTime);
	$('#stapicker').datetimepicker('setEndDate', enTime);
	$('#enpicker').datetimepicker().on('show', function(ev) {
		startTime = $("#staTime").val();
		endTime = $("#enTime").val();
		$('#enpicker').datetimepicker('setStartDate', staTime);
		$('#stapicker').datetimepicker('setEndDate', enTime);
	});
	$('#stapicker').datetimepicker().on('show', function(ev) {
		endTime = $("#enTime").val();
		startTime = $("#staTime").val();
		$('#stapicker').datetimepicker('setEndDate', enTime);
		$('#enpicker').datetimepicker('setStartDate', staTime);
	});
      
	$("#addStoreForm").validate();
	// 添加支付
	$("#addPay").click(function() {
		var str = "", pay = $("#payway"), pFlag = true;
		$("#pay_tb tr input").each(function() {
			if ($(this).val() == pay.val()) {
				showTipAlert("请不要重复添加!");
				pFlag = false;
				// return;
			}
		});
		if (pFlag) {
			str = '<tr><input type="hidden" name="payIds" value="'
					+ $("#payway").val()
					+ '" /><td>'
					+ $("#payway").find("option:selected")
							.text()
					+ '</td><td><div class="form-inline"><div class="form-group"><input type="text" class="form-control checkNum" id="deduction'
					+ $("#payway").val()
					+ '" name="deduction" /><label class="control-label"></label></div></div></td><td><div class="form-inline"><div class="form-group"><input type="text" class="form-control checkNum" id="brokerage'
					+ $("#payway").val()
					+ '" name="brokerage"/><label class="control-label"></label></div></div></td><td><button type="button" class="btn btn-default" onclick="delpay(this)">删除</button></td></tr>';
			$("#pay_tb").append(str);
		}
	});

	// 保存审核信息
	$("#savepay").click(function() {
		if ($("span[name='tab']").length < 1) {
			showTipAlert("请添加结算周期!");
			return;
		} else {
			if ($("#pay_form").valid()) {
				var cTime = new Array();
				$($("span[name='tab']")).each(function() {
					cTime.push($(this).find('b').html());
				});
				$("#aTime").val(cTime);
				$.ajax({
					url : "newupdateclassifypay.htm?CSRFToken="
							+ $("#CSRFToken").val(),
					data : $("#pay_form").serialize(),
					success : function(data) {
						location.reload();
					}
				});
			}
		}
	});
	// 保存审核信息
	$("#savecheck").click(function() {
		// if($("#pay_tb tr").length < 1 ){
		// showTipAlert("请添加支付方式!");
		// return;
		// }
		if ($(".tabinput").length < 2) {
			showTipAlert("请添加结算周期!");
			return;
		} else {
			var falg = true;
			var nums = $(".checkNum");
			for (var i = 0; i < nums.length; i++) {
				var num = Number($(nums[i]).val());
				if (!isNaN(num)) {
					if (num <= 0 || num >= 1) {
						$($(".checkNum")[i]).addClass("error");
						$($(".checkNum")[i]).next().html("请输入0-1之间的小数").addClass("error");
						falg = false;
					}
				} else {
					$($(".checkNum")[i]).addClass("error");
					$($(".checkNum")[i]).next().html("请输入0-1之间的小数").addClass("error");
					falg = false;
				}
			}
			if (falg) {
				var cTime = new Array();
				$($("span[name='tab']")).each(function() {
					cTime.push($(this).find('b').html());
				});
				var checkedList = new Array();
				$("input[name='storeId']:checked").each(function() {
					checkedList.push($(this).val());
				});
				if (checkedList.length > 0) {
					$("#addStoreForm").append('<input value="' + checkedList + '" type="hidden" name="thirdIds" />');
				}
				$("#addStoreForm").append('<input value="' + cTime + '" type="hidden" name="cellTime" />');
				// $("#addStoreForm").submit();
				$("#savecheck").attr("disabled", true);
				$.ajax({
					url : "newupdatestore.htm?CSRFToken=" + $("#CSRFToken").val(),
					data : $("#addStoreForm").serialize(),
					success : function(data) {
						location.reload();
					}
				});
			}
		}
	});
	// 保存打回原因
	$("#saveRefuse").click(function() {
		var checkedList = new Array();
		$("input[name='storeId']:checked").each(function() {
			checkedList.push($(this).val());
		});
		if ($("#refuseForm").valid()) {
			if (checkedList.length > 0) {
				$("#refuseForm").append('<input value="' + checkedList + '" type="hidden" name="thirdIds" />');
			}
			$.ajax({
				url : "newrefusestore.htm?CSRFToken=" + $("#CSRFToken").val(),
				data : $("#refuseForm").serialize(),
				type : "post",
				success : function(data) {
					location.reload();
				}
			});
		}
	});

	// 取消按钮事件
	$(".hycCancle").click(function() {
		$("#savecheck").attr("disabled", false);
	});
	
	$('.pro_weight_tip').popover({
		content : '单个邮箱输入完成后请回车',
		trigger : 'hover'
	});
});

function delpay(obj) {
	$(obj).parent().parent().remove();
}
// 设置商铺在店铺街 状态以及排序
function updatestore(storeId) {

	// 获取单个店铺的信息
	$.ajax({
		type : 'post',
		url : 'queryStoreBalanceByThirdId.htm?CSRFToken='
				+ $("#CSRFToken").val() + "&thirdId=" + storeId,
		async : false,
		success : function(data) {
			$('.set_tore').val(data.storeStreetort); // 排序
			if (data.storeStreetIsShow == 0 || data.storeStreetIsShow == '0') {
				$('.is_Show0').attr("checked", true);
			} else {
				$('.is_Show1').attr("checked", true);
			}
		}
	});
	// 设置要操作的店铺ID
	$('#storeId_update').val(storeId);
	// 指定action的请求路径
	$('.save_store').attr("action", "setstore.htm");
	// 弹出设置的窗体
	$('#set_store_street').modal('show');
}

// 保存设置的店铺信息
function save_store() {
	$('.save_store').submit();
}
// 验证设置店铺信息
function validateSaveStoreForm() {
	// 设置选中的 单选框的value
	$('#is_Show').val($("input[name='show']:checked").val());
	if ('' == $('.set_tore').val()) {
		$("#set_tore_tip").html("排序不能为空！");
		return false;
	}
	return true;
}

function updatePay(oId, bCycle) {
	$(".tags").html("");
	$.ajax({
		type : 'post',
		url : 'findpayAll.htm?CSRFToken=' + $("#CSRFToken").val(),
		async : false,
		success : function(data) {
			var ss = "";
			for (var i = 0; i < data.length; i++) {
				ss += '<option value="' + data[i].payId + '">' + data[i].payName + '</option>';
			}
			$("#payway").html(ss);
		}
	});
	$.ajax({
		url : 'selectDeduByStoreId.htm?storeId=' + oId + "&CSRFToken=" + $("#hi_token").val(),
		success : function(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html += '<tr><input type="hidden" name="payIds" value="'
						+ data[i].payId
						+ '" /><td>'
						+ data[i].payName
						+ '</td><td><div class="form-inline">',
				html += '<div class="form-group"><input type="text" class="form-control checkNum" name="deduction" value='
						+ data[i].deduction
						+ '><label class="control-label"></label></div></div></td>',
				html += '<td><div class="form-inline"><div class="form-group"><input type="text" class="form-control checkNum" name="brokerage" value='
						+ data[i].brokerage
						+ '><label class="control-label"></label></td><td><button type="button" class="btn btn-default" onclick="delpay(this)">删除</button></td></tr>';
			}
			$("#pay_tb").html(html);
		}
	});
	// var emp = $(".tabinput").val();
	$("#payTime").val(bCycle);
	var times = bCycle.split("|");
	var ts = new Array();
	/*
	 * for(var i = 0;i<times.length;i++){ if(times[i] == emp){ return; }else{
	 * $(".tags").append('<input class="tabinput" name="tabinput" style="width:
	 * 80px; height: 25px; display: none;" type="text">'); var t="<span
	 * name='tab' id='radius'><b>" + times[i] + "</b><a id='deltab'>×</a></span>";
	 * $(".tags").append(t); } } var i='<input class="tabinput" name="tabinput"
	 * style="width:80px;height:25px;" type="text">'; $(".tags").append(i);
	 */
	for (var i = 0; i < times.length; i++) {
		ts.push(times[i]);
	}
	$('.tags').tabControl({
		regularEx : '^[A-Z]+$',
		maxTabCount : 5/* 最大标签数 */,
		tabW : 80/* 标签最大长度 */,
		tabH : 25,
		errorcontent : '请输入1-31之间的正整数',
		regularEx : /^([1-9]|[1-2]\d|3[0-1])$/
	/* 匹配正则 */}, ts + ",");
	// $("#aTime").val(bCycle);
	$("#storeId").val(oId);
	// $("#pageNo2").val($("#list_pageno").val());
	// $("#audit_from").attr("action","updateClassifyPay.htm");
	$('#settleInfo').modal('show');
}

function addstore() {
	$('#storeIdToUpdate').val("");
	$('#storeName').val("");
	$('#companyName').val("");
	$('#companyAddrDel').val("");
	$('#companyTel').val("");
	$('#companyEmail').val("");
	$('#companyContactName').val("");
	$('#companyContactTel').val("");
	$('#orderBelongsEmail').val("");
	$('#orderCcEmail').val("");
	$("#addstoreDialog").modal("show");
	$('.order_cc_email').tabControlEmail({
		maxTabCount : 5/* 最大标签数 */,
		tabW : 300/* 标签最大长度 */,
		tabH : 30,
		errorcontent : '请输入合法的邮箱',
		regularEx : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	/* 匹配正则 */}, "");
	$('.order_belongs_email').tabControlEmail({
		maxTabCount : 5/* 最大标签数 */,
		tabW : 300/* 标签最大长度 */,
		tabH : 30,
		errorcontent : '请输入合法的邮箱',
		regularEx : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	/* 匹配正则 */}, "");
}

/***
 * 保存店铺信息
 */
function saveStore() {
	if (checkStoreForm()) {
		var orderBelongsEmail = new Array();
		$($(".order_belongs_email>span[name='tab']")).each(function() {
			var email1 = $(this).find('b').html();
			if(email1 != null && email1 != ''){
				orderBelongsEmail.push(email1);
			}
			
		});
		
		var orderCcEmail = new Array();
		$($(".order_cc_email>span[name='tab']")).each(function() {
			var email2 = $(this).find('b').html();
			if(email2 != null && email2 != "" && email2 != undefined){
				orderCcEmail.push(email2);
			}
		});
		$("#orderBelongsEmail").val(orderBelongsEmail);
		$("#orderCcEmail").val(orderCcEmail);
		
		$.ajax({
			url : "saveStoreNew.htm?CSRFToken=" + $("#CSRFToken").val(),
			data : $("#cusForm").serialize(),
			success : function(data) {
				location.reload();
			}
		});
	}
}

function checkStoreForm(){
	var bValid = true;
	
	if($("#storeName").val() == "" || $("#storeName").val() == undefined){
		$("#storeNameTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#storeNameTip").attr("style", "display: none;");
	}
	
	if($("#companyName").val() == "" || $("#companyName").val() == undefined){
		$("#companyNameTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#companyNameTip").attr("style", "display: none;");
	}
	
	if($("#companyAddrDel").val() == "" || $("#companyAddrDel").val() == undefined){
		$("#companyAddrDelTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#companyAddrDelTip").attr("style", "display: none;");
	}
	
	if($("#companyTel").val() == "" || $("#companyTel").val() == undefined){
		$("#companyTelTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#companyTelTip").attr("style", "display: none;");
	}
	
	if($("#companyEmail").val() == "" || $("#companyEmail").val() == undefined){
		$("#companyEmailTip").text("邮箱不能为空");
		$("#companyEmailTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!reg.test($("#companyEmail").val())){
			$("#companyEmailTip").text("邮箱不合法");
			$("#companyEmailTip").attr("style", "display: block;");
			bValid = bValid && false;
		} else {
			$("#companyEmailTip").attr("style", "display: none;");
		}
		
	}
	
	if($("#companyContactTel").val() == "" || $("#companyContactTel").val() == undefined){
		$("#companyContactTelTip").text("联系人电话不能为空");
		$("#companyContactTelTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#companyContactTelTip").attr("style", "display: none;");
	}
	
	if($("#companyContactName").val() == "" || $("#companyContactName").val() == undefined){
		$("#companyContactNameTip").attr("style", "display: block;");
		bValid = bValid && false;
	} else {
		$("#companyContactNameTip").attr("style", "display: none;");
	}
	
	if ($(".order_belongs_email>span[name='tab']").length < 1) {
		$("#orderBelongsEmailTip").attr("style", "display: block;");
		$("#orderBelongsEmailTip").text("订单专属邮箱不能为空");
		bValid = bValid && false;
	} else {
		$("#orderBelongsEmailTip").attr("style", "display: none;");
	}
	
	if ($(".order_cc_email>span[name='tab']").length < 1) {
		$("#orderCcEmailTip").attr("style", "display: block;");
		$("#orderCcEmailTip").text("订单专属邮箱不能为空");
		bValid = bValid && false;
	} else {
		$("#orderCcEmailTip").attr("style", "display: none;");
	}
	return bValid;
}

//查看店铺信息
function queryStore(storeId) {
	var token = $("#CSRFToken").val();
	$("#mainFrame").attr("src", 'sellerinfo.htm?CSRFToken=' + token + '&storeId=' + storeId);
	$('#shopDetails').modal('show');
	$('#mainFrame').css('minHeight', '950px');
}

function publishstore() {
	if (checkselect("storeId", 1)) {
		$('#punishment').modal('show');
	} else {
		return;
	}
}

function savepublish() {
	var token = $("#CSRFToken").val();
	if ($("#punishForm").valid()) {
		var rule = $("#punishmentChoose").val();
		if (rule == '') {
			$(".error-tips").remove();
			$("#punishForm").after("<p class='error-tips' style='color:#ff0000;text-indent:100px;'>请选择处罚规则</p>");
			return;
		} else {
			$(".error-tips").remove();
		}
		if (rule == 2) {
			var sumMoney = parseInt($("#moneyspan").html());
			var reduceMoney = parseInt($("#reduceMoney").val());
			if (reduceMoney > sumMoney) {
				$("#punishForm").after("<p class='error-tips' style='color:#ff0000;text-indent:100px;'>扣减的金额不能大于商家的总金额</p>");
				return;
			} else {
				$(".error-tips").remove();
			}
			
		}
		if (rule == 3) {
			$(".error-tips").remove();
		}
		$.ajax({
			url : 'punishShop.htm?CSRFToken=' + token,
			type : "post",
			data : $("#punishForm").serialize(),
			success : function(data) {
				location.reload();
			}
		});
	}
}

//删除店铺
function delstorelist() {
	showAjaxStoreDeleteBatchConfirmAlert("delallform", "storeId");
}

//根据店铺id查询签约分类
function querystorecate(storeId) {
	var token = $("#CSRFToken").val();
	$("#cateFrame").attr("src", 'newupdatesellerinfo.htm?CSRFToken=' + token + '&storeId=' + storeId);
	$('#signInfo').modal('show');
	$('#cateFrame').css('minHeight', '520px');
	$('#cateFrame').css('minWidth', '860px');

}

var goodsBelo = ''
function updateStoreValidTime(glo, time) {
	goodsBelo = glo;
	$("#expiryTime").val(time);
	$('#changeData').modal('show');
}

function savetime() {
	location.href = 'updateStoreValidTime.htm?goodsBelo=' + goodsBelo + '&endTime=' + $("#expiryTime").val();
}
//打回原因
function refuseReason(refuseContent) {
	$("#refuseContent").html(refuseContent);
	$('#refuseReason').modal('show');

}

/**
 * 批量删除记录谈出框，以表单的形式
 * @param deleteFormId 表单id
 * @param name checkbox的name
 */
function showAjaxStoreDeleteBatchConfirmAlert(deleteFormId, name, tips) {
	var checkboxs = $("input[name=" + name + "]");
	var oneSelect = false;
	for (var j = 0; j < checkboxs.length; j++) {
		if ($(checkboxs[j]).is(':checked') == true) {
			oneSelect = true;
		}
	}
	if (!oneSelect) {
		showTipAlert("请至少选择一个店铺！");
		return;
	}
	$("#modalDialog").remove();
	var url = $("#" + deleteFormId).attr("action") + "?" + $("#" + deleteFormId).serialize();
	var confirmDialog = '<div class="modal fade" id="modalDialog" tabindex="-1" role="dialog">'
			+ '    <div class="modal-dialog">'
			+ '        <div class="modal-content">'
			+ '            <div class="modal-header">'
			+ '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			+ '               <h4 class="modal-title">操作提示</h4>'
			+ '           </div>' + '           <div class="modal-body">';
	if (tips != '' && tips != undefined) {
		confirmDialog += tips;
	} else {
		confirmDialog += '确认要删除店铺吗？';
	}
	confirmDialog += '           </div>'
			+ '           <div class="modal-footer">'
			+ '             <button type="button" class="btn btn-primary" onclick="doAjaxDeleteOne(\''
			+ url
			+ '\')">确定</button>'
			+ '               <button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#modalDialog\').modal(\'hide\');">取消</button>'
			+ '           </div>' + '       </div>' + '   </div>' + '</div>';
	$(document.body).append(confirmDialog);
	$('#modalDialog').modal('show');
}


 function doAjaxDeleteOne(deleteUrl) {
	if (deleteUrl != null) {
		if ($('input[name="searchText"]').val() != ''
				&& $('input[name="searchText"]').val() != undefined) {
			deleteUrl = deleteUrl + "&searchText="
					+ $('input[name="searchText"]').val();
		}

	}
	$.ajax({
		url : deleteUrl,
		success : function(data) {
			if(data.state == 1){
        		 //添加成功
        		 location.reload();
        	 }else{
        		showTipAlert(data.message);
	             console.log(data.message); 
        	 }
			 
		}
	});
} 
 
 
 function toUpdateStore(storeId){
	 var token = $("#CSRFToken").val();
	 $.ajax({
			url : "toUpdateStore.htm?CSRFToken=" + token,
			data :{storeId:storeId},
			success : function(data) {
				console.log(data);
				$('#storeIdToUpdate').val(data.storeId);
				$('#storeName').val(data.storeName);
				$('#companyName').val(data.companyName);
				$('#companyAddrDel').val(data.companyAddrDel);
				$('#companyTel').val(data.companyTel);
				$('#companyEmail').val(data.companyEmail);
				$('#companyContactName').val(data.companyContactName);
				$('#companyContactTel').val(data.companyContactTel);
				$('.modal-title').text("修改店铺信息");
		        $('#addstoreDialog').modal('show');
		        $('.order_cc_email').tabControlEmail({
		    		maxTabCount : 5/* 最大标签数 */,
		    		tabW : 300/* 标签最大长度 */,
		    		tabH : 30,
		    		errorcontent : '请输入合法的邮箱',
		    		regularEx : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		    	/* 匹配正则 */}, data.orderCcEmail);
		    	$('.order_belongs_email').tabControlEmail({
		    		maxTabCount : 5/* 最大标签数 */,
		    		tabW : 300/* 标签最大长度 */,
		    		tabH : 30,
		    		errorcontent : '请输入合法的邮箱',
		    		regularEx : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		    	/* 匹配正则 */}, data.orderBelongsEmail);
			}
		}); 
	 
 }
 
 
 
 
 

