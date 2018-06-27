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
		content : '代金券名称',
		trigger : 'hover'
	});
});

// 保存商品促销
var num = 0;
function subFormOne() {
	var f = true;
	var reg = new RegExp("&nbsp;", "g");
	var reg1 = new RegExp("<p>", "g");
	var reg2 = new RegExp("</p>", "g");
	var reg3 = new RegExp("<br>", "g");
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

//	if (parseInt(couponCount) <= 0) {
//		showTipAlert("代金券张数必须大于0！");
//		f = false;
//		$("#couponCount").focus();
//	}
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
	if ($("#subFormOne").valid() && f) {
		$("#subFormOne").submit();
	}

}

/* 处理时间格式化 */
function timeStamp2String(time) {
	var date = new Date(parseFloat(time));
	var datetime = new Date();
	datetime.setTime(date);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1)
			: datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime
			.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime
			.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes()
			: datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds()
			: datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":"
			+ second;
}