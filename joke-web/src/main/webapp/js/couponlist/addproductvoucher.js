$(function() {
	$('.couponImg').popover({
		content : '建议465*252px',
		trigger : 'hover'
	});

	$("#brandShow").hide();
	$("#cateShow").hide();
	$("#subFormOne").validate();

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
	/* 下面是时间选择器开始时间不能大于结束时间设置 END */
	/* 富文本编辑框 */
	$('.summernote').summernote({
		height : 300,
		tabsize : 2,
		lang : 'zh-CN',
		onImageUpload : function(files, editor, $editable) {
			sendFile(files, editor, $editable);
		}
	});

	/* 富文本编辑框 */
	$('.summernoteTwo').summernote({
		height : 300,
		tabsize : 2,
		lang : 'zh-CN',
		onImageUpload : function(files, editor, $editable) {
			sendFile(files, editor, $editable);
		}
	});

	/* 富文本编辑框 */
	$('.summernoteThree').summernote({
		height : 300,
		tabsize : 2,
		lang : 'zh-CN',
		onImageUpload : function(files, editor, $editable) {
			sendFile(files, editor, $editable);
		}
	});

	/* 下面是关于树形菜单 END */

	/* 下面是表单里面的填写项提示相关的 */
	$('.cuxiaomingchen').popover({
		content : '促销名称',
		trigger : 'hover'
	});
});


$("#choose").click(function() {
	i = 1;
	art.dialog.open('queryImageManageByPbAndCidForChoose.htm?CSRFToken=' + $("#CSRFToken").val() + '&size=10000', {
		lock : true,
		opacity : 0.3,
		width : '900px',
		height : '620px',
		title : '选择图片'
	});
});

function changeStatus(obj) {

	if (obj == 0) {
		$("#brandShow").hide();
		$("#cateShow").hide();
		$("#goodsShow").show();
	} else if (obj == 1) {
		$("#brandShow").hide();
		$("#cateShow").show();
		$("#goodsShow").hide();
	} else {
		$("#brandShow").show();
		$("#cateShow").hide();
		$("#goodsShow").hide();

	}
	$("#c_statu").val(obj);
}

// 图片回调
function saveChoooseImage(url) {
	if (typeof (url) != 'string') {
		url = url[0];
	}
	if (url.indexOf(',') != -1) {
		url = url.substring(0, url.indexOf(','));
	}
	$("#img").attr("src", url);
	$("#couponImg").val(url);

}

/* 点击添加货品的时候 */
/* 选择规则 */
function selectChange(obj) {
	var str = "";
	$(hiddenPrice).html("");
	if ($(obj).val() == 2) {
		str += '<div class="form-group">';
		str += ' <label class="control-label col-sm-4"><span style="color: #ff0000;">*</span>满：</label>';
		str += '<div class="col-sm-1"></div>'
		str += '<div class="col-sm-5">'
		str += '<input name="fullPrice" class="form-control required number">'
		str += '</div></div>';
		str += '<div class="form-group">';
		str += ' <label class="control-label col-sm-4"><span style="color: red;">*</span>减：</label>';
		str += '<div class="col-sm-1"></div>'
		str += '<div class="col-sm-5">'
		str += '<input name="reductionPrice" class="form-control required number">'
		str += '</div></div>';
	} else if ($(obj).val() == 3) {

	} else {

		str += '<div class="form-group">';
		str += ' <label class="control-label col-sm-4"><span style="color: #ff0000;">*</span>减：</label>';
		str += '<div class="col-sm-1"></div>'
		str += '<div class="col-sm-5">'
		str += '<input name="downPrice" class="form-control required number">'
		str += '</div></div>';
	}
	$(hiddenPrice).html(str);
}

/* 优惠券列表底下分页页码点击doAjax */
function doAjax(pageNo, pageSize) {

	var productName = $("#searchGoodsName").val();
	if (productName != '') {
		productName = encodeURI(encodeURI(productName));
	}

	$("#chooseAllPro").attr("checked", false);
	/* AJAX查询所有的货品列表 */
	$.get("queryProductForCoupon.htm?CSRFToken=" + $(CSRFToken).val() + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&productName=" + productName, function(data) {
		var list = data.list;
		var productListHtml = "";
		for (var i = 0; i < list.length; i++) {
			productListHtml = productListHtml + "<tr>" + "<td class='tc'><input type='checkbox' class='productId' name='productId' onclick='addpro(this);'";

			var pro = document.getElementsByName("goodsIdP");
			for (var j = 0; j < pro.length; j++) {
				if (pro[j].value == list[i].goodsInfoId) {
					productListHtml = productListHtml + ' checked="checked" ';
				}
			}
			productListHtml = productListHtml + " value='" + list[i].goodsInfoId + "'/></td>";
			productListHtml += '<td><img src="' + list[i].goodsInfoImgId + '" class="goodsImg"  width="50" height="50"/></td>';
			productListHtml += "<td  class='goodsTag' >";
			if (list[i].specVo.length > 0) {
				for (var k = 0; k < list[i].specVo.length; k++) {
					productListHtml = productListHtml + list[i].specVo[k].spec.specName;
					productListHtml = productListHtml + ":" + list[i].specVo[k].goodsSpecDetail.specDetailName + "<br/>";
				}
			}
			productListHtml = productListHtml + "</td>" + "<td class='goodsNo'>" + list[i].goodsInfoItemNo + "</td>" + "<td  class='goodsName' title='" + list[i].goodsInfoName
					+ "' >" + list[i].goodsInfoName + "</td>" + "</tr>";
		}
		$("#productAddList tbody").html(productListHtml);
		$("input[type=button]").button();
		/* 添加页脚 */
		$("#productAddList .meneame").html("");
		var foot = "";
		var i = 1;
		for (var l = data.startNo; l <= data.endNo; l++) {
			if ((i - 1 + data.startNo) == data.pageNo) {
				foot = foot + "<span class='current'> " + (i - 1 + data.startNo) + "</span>";
			} else {
				foot = foot + "<a onclick='doAjax(" + (i - 1 + data.startNo) + "," + (data.pageSize) + ")' href='javascript:void(0)'>" + (i - 1 + data.startNo) + "</a>";
			}
			i++;
		}
		foot = foot + "";
		/* 添加tfoot分页信息 */
		$("#productAddList_table_foot .meneame").html(foot);
	});

}
/* 添加货品的时候 分页 */
/* 改变每页显示的行数 */
function changePageShow() {
	doAjax(1, $("#list_size").val());
}
/* 跳转到某一页 */
function changeShowPage(pageSize) {
	doAjax($("#list_pageno").val(), pageSize);

}

/* 选择商品时添加商品 */
function addpro(obj) {
	var productId = $(obj).val();
	var goodsImg = $(obj).parents("tr").find(".goodsImg").attr("src");
	var goodsNo = $(obj).parents("tr").find(".goodsNo").text();
	var goodsName = $(obj).parents("tr").find(".goodsName").text();
	var goodsTag = $(obj).parents("tr").find(".goodsTag").html();
	if (obj.checked == true) {
		var htm = "<tr id='goods_tr_" + productId + "'>";
		htm += '<td width="92"><img src="' + goodsImg + '" width="50" height="50"/><input type="hidden" name="goodsIdP" id="goods_Id_' + productId + '" value="' + productId
				+ '"/></td>';
		htm += '<td width="98">' + goodsTag + '</td>';
		htm += '<td width="120">' + goodsNo + '</td>';
		htm += '<td  width="300">' + goodsName + '</td>';
		htm += '<td width="70"><button onclick="removeTr(this);">移除</button></td>';
		htm += "</tr>";
		$("#readproduct tbody").append(htm);
	} else {
		$("#goods_tr_" + productId).remove();

	}
}


/*保存货品代金券*/
  function subFormOne(obj){
		var f = true;
		var reg = new RegExp("&nbsp;", "g");
		var reg1 = new RegExp("<p>", "g");
		var reg2 = new RegExp("</p>", "g");
		var reg3 = new RegExp("<br>", "g");
		var pro =  document.getElementsByName("goodsIdP");
		if ($("#summernote").code().replace(reg1, "").replace(reg2, "").replace(
				reg, "") != "<br>") {
			$("#couponDescription").val(
					$("#summernote").code().replace(reg1, "").replace(reg2, "")
							.replace(reg, "").replace(reg3, ""));
		}
		if ($("#summernote2").code().replace(reg1, "").replace(reg2, "").replace(
				reg, "") != "<br>") {
			$("#couponRuleDescription").val(
					$("#summernote2").code().replace(reg1, "").replace(reg2, "")
							.replace(reg, "").replace(reg3, ""));
		}
		var couponCount = $("#couponCount").val();

//		if (parseInt(couponCount) <= 0) {
//			showTipAlert("代金券张数必须大于0！");
//			f = false;
//			$("#couponCount").focus();
//		}
		var couponName = $("#couponName").val();
		if (couponName.length < 2 && couponName.length > 20) {
			showTipAlert("优惠劵名称在2到20字符之间");
			f = false;
			$("#couponName").focus();
		}
		var reg = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;
		var voucherPrice1=$("#voucherPrice").val();
		if (!reg.test($("#voucherPrice").val())) {
			showTipAlert("请输入正确的代金券金额！");
			f = false;
			$("#voucherPrice").focus();
		}
		if($("#isAll").val()=='1'){
		      if(pro.length==0){
		          $("#ps").html('请选择货品');
		          $("#ps").addClass("error");
		          f=false&&f;
		      }else{
		          f=true&&f;
		          $("#ps").html('');
		      }
		}
		if ($("#subFormOne").valid() && f) {
			$("#subFormOne").submit();
		}
  }

/* 移除已选择商品 */
function removeTr(obj) {
	$(obj).parents("tr").remove();
}

/* 添加商品时全选 */
function chooseAllPro(obj) {
	if (obj.checked) {
		$("input[name='productId']").each(function() {
			this.checked = true;
			$("#goods_tr_" + $(this).val()).remove();
			addpro(this);
		});
	} else {
		$("input[name='productId']").each(function() {
			this.checked = false;
			addpro(this);
		});
	}
}

// 保存商品促销
/*
var num = 0;
function subFormOne() {
	var f = true;
	var reg = new RegExp("&nbsp;", "g");
	var reg1 = new RegExp("<p>", "g");
	var reg2 = new RegExp("</p>", "g");
	var reg3 = new RegExp("<br>", "g");
	if ($("#summernote").code().replace(reg1, "").replace(reg2, "").replace(reg, "") != "<br>") {
		$("#countId").val($("#summernote").code().replace(reg1, "").replace(reg2, "").replace(reg, "").replace(reg3, ""));
	}

	var flag = $(".common_tabs .active").attr("data");
	if (flag == '1') {
		var pro = document.getElementsByName("goodsIdP");
		if (pro.length == 0) {
			$("#ps").html('请选择货品');
			$("#ps").attr("style", "color:red");
			f = false;
		} else {
			f = true;
			$("#ps").html('');
		}
	}

	if ($("#subFormOne").valid() && f) {
		$("#subFormOne").submit();
	}
	var couponCount = $("#couponCount").val();

	if (parseInt($("#couponGetNo").val()) > parseInt(couponCount)) {
		showTipAlert("领取张数不能大于生成张数！");
		f = false;
		$("#couponCount").focus();
	} else {
		if ($("#subFormOne").valid() && f) {
			$("#subFormOne").submit();
		}
	}

}
*/


/* 处理时间格式化 */
function timeStamp2String(time) {
	var date = new Date(parseFloat(time));
	var datetime = new Date();
	datetime.setTime(date);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}