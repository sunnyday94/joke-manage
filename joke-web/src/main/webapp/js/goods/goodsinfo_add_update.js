var editor;
KindEditor.ready(function(K) {
	editor = K.create('textarea[name="productDetail"]',
	{
		width : "692px",
		height : "425px",
		cssPath : 'js/kindeditor/plugins/code/prettify.css',
		uploadJson : 'js/kindeditor/jsp/upload_json.jsp',
		fileManagerJson : 'js/kindeditor/jsp/file_manager_json.jsp',
		allowFileManager : true,
		afterCreate : function() {
			var self = this;
			K.ctrl(document, 13, function() {
				self.sync();
				document.forms['example'].submit();
			});
			K.ctrl(self.edit.doc, 13, function() {
				self.sync();
				document.forms['example'].submit();
			});
		},
		urlType : 'domain' // "" 空为不修改URL "relative": 相对路径  "absolute": 绝对路径	"domain": 带域名的绝对路径。
	});
	prettyPrint();
});

/*******************************************************************************
 * 设置库存
 * 
 * @param obj
 */
function displayBatchSetStock(obj) {
	$(".batch_set_stock").css("display", "inline-block");
	$(obj).hide();
	$(".do_batch_set_stock_ctrl").show();
	$(".cancel_batch_set_stock_ctrl").show();
}

/*******************************************************************************
 * 设置价格
 * 
 * @param obj
 */
function displayBatchSetPrice(obj) {
	$(".batch_set_price").css("display", "inline-block");
	$(obj).hide();
	$(".do_batch_set_price_ctrl").show();
	$(".cancel_batch_set_price_ctrl").show();
}

/*******************************************************************************
 * 取消设置库存
 * 
 * @param obj
 */
function hideBatchSetStock(obj) {
	$(".batch_set_stock").hide();
	$(".batch_set_stock_ctrl").show();

	$(".do_batch_set_stock_ctrl").hide();
	$(".cancel_batch_set_stock_ctrl").hide();
}

/*******************************************************************************
 * 取消设置价格
 * 
 * @param obj
 */
function hideBatchSetPrice(obj) {
	$(".batch_set_price").hide();
	$(".batch_set_price_ctrl").show();

	$(".do_batch_set_price_ctrl").hide();
	$(".cancel_batch_set_price_ctrl").hide();
}

/*******************************************************************************
 * 确定设置库存
 * 
 * @param obj
 */
function doBatchSetStock(obj) {
	var stock = $(".batch_set_stock").val();
	var digitsReg = /^[0-9]+$/;
	if (stock != '' && (digitsReg.test(stock))) {
		$(obj).removeClass('error');
		$(obj).prev('.error').remove();
	} else {
		$(obj).addClass('error');
		$(obj).prev('.error').remove();
		$(obj).before('<label class="error">请输入整数</label>');
		return;
	}
	$(".update_productStock").each(function() {
		$(this).val(stock);
	})
	// checkProductForm();
	hideBatchSetStock(obj);
}

/*******************************************************************************
 * 确定设置价格
 * 
 * @param obj
 */
function doBatchSetPrice(obj) {
	var price = $(".batch_set_price").val();
	var numberReg = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;
	if (price != '' && (numberReg.test(price))) {
		$(obj).removeClass('error');
		$(obj).prev('.error').remove();
	} else {
		$(obj).addClass('error');
		$(obj).prev('.error').remove();
		$(obj).before('<label class="error">请输入数字</label>');
		return;
	}
	$(".update_productPrice").each(function() {
		$(this).val(price);
	})
	// checkProductForm();
	hideBatchSetPrice(obj);
}

function checkProductForm() {
	var f = true;
	var forms = $("#updateGoodsInfoForm");
	
	for (var i = 0; i < forms.length; i++) {
		var requireds = $(forms[i]).find(".required");
		for (var j = 0; j < requireds.length; j++) {
			if (requireds[j].value == '') {
				$(requireds[j]).addClass('error');
				$(requireds[j]).next('.error').remove();
				$(requireds[j]).after('<label class="error">不能为空</label>');
				f = f && false;
			} else {
				$(requireds[j]).removeClass('error');
				$(requireds[j]).next('.error').remove();
			}
		}
		var numbers = $(forms[i]).find(".number");
		var numberReg = /^[0-9]+[.]{0,1}[0-9]{0,2}$/;
		for (var j = 0; j < numbers.length; j++) {
			if (numbers[j].value != '' && (numberReg.test(numbers[j].value))) {
				$(numbers[j]).removeClass('error');
				$(numbers[j]).next('.error').remove();
			} else {
				if (numbers[j])
					$(numbers[j]).addClass('error');
				$(numbers[j]).next('.error').remove();
				$(numbers[j]).after('<label class="error">请输入合法的数字</label>');
				f = f && false;
			}
		}

		var digits = $(forms[i]).find(".digits");
		var digitsReg = /^[0-9]+$/;
		for (var j = 0; j < digits.length; j++) {
			if (digits[j].value != '' && (digitsReg.test(digits[j].value))) {
				$(digits[j]).removeClass('error');
				$(digits[j]).next('.error').remove();
			} else {
				$(digits[j]).addClass('error');
				$(digits[j]).next('.error').remove();
				$(digits[j]).after('<label class="error">请输入整数</label>');
				f = f && false;
			}
		}

		var barcode = $(forms[i]).find(".barcode_input");
		var digitsReg = /^[0-9]+$/;
		for (var j = 0; j < barcode.length; j++) {
			if (barcode[j].value != '' && (!digitsReg.test(barcode[j].value))) {
				$(barcode[j]).addClass('error');
				$(barcode[j]).next('.error').remove();
				$(barcode[j]).after('<label class="error">请输入整数</label>');
				f = f && false;
			} else {
				$(barcode[j]).removeClass('error');
				$(barcode[j]).next('.error').remove();
			}
		}

	}
	
	/*var goodsInfoComposition = $("#goodsInfoComposition").val();
	if(goodsInfoComposition == '' || goodsInfoComposition == null || goodsInfoComposition == undefined) {
		$("#reasontip").html("商品组成不能为空");
		f = f && false;
	} else {
		$("#reasontip").html("");
	}*/
	return f;
}

/*******************************************************************************
 * 更新规格值验证
 * 
 * @returns {Boolean}
 */
function checkUpdateSpec() {
	var bValid = true;
	// selProductParam('update_param_Tips', 1);
	if ($(".checkProdcutExists").val() == "0") {
		$(".update_param_Tips").addClass("ui-state-highlight");
		updateTips("所选参数已经生成货品,请重新选择!", $(".update_param_Tips"));
		bValid = false;
	}
	var params = $(".up_sel_spec");
	for (var i = 0; i < params.length; i++) {
		$(".up_remark_" + $(params[i]).attr("spec_id")).val($(params[i]).find("option:selected").text().trim());
	}
	/* 验证分仓的信息 */
	var productStock = $(".update_productStock");
	for (var i = 0; i < productStock.length; i++) {
		bValid = checkRegexp($(productStock[i]), /^[0-9]+$/, "", null) && bValid;
	}
	var productPrice = $(".update_productPrice");
	for (var i = 0; i < productPrice.length; i++) {
		bValid = checkRegexp($(productPrice[i]), /^[0-9]+(.[0-9]{0,2})?$/, "", null) && bValid;
	}
	return bValid;
}

/*******************************************************************************
 * 输入参数验证
 * 
 * @returns {Boolean}
 */
function checkUpdateBase() {
	var bValid = true;
	$(".ui-state-error").removeClass("ui-state-error");
	$(".ui-state-highlight").removeClass("ui-state-highlight");
	
	if (checkSpecSymb("update_goodsInfoName", "update_goodsInfoName_Tips")) {
		bValid = checkLength($("#update_goodsInfoName"), "货品名称", $(".update_goodsInfoName_Tips"), 3, 50) && bValid;
	}
	
	if (checkRegexp($("#update_goodsInfoItemNo"), /^[A-Za-z0-9]+$/, "货品编号必须为数字.", $(".update_goodsInfoItemNo_Tips"))) {
		bValid = checkLength($("#update_goodsInfoItemNo"), "货品编号", $(".update_goodsInfoItemNo_Tips"), 10, 32) && bValid;
	}
	
	bValid = checkRegexp($("#update_goodsInfoPreferPrice"), /^[0-9]+[.]{0,1}[0-9]{0,2}$/, "销售价格输入格式不正确.", $(".update_goodsInfoPreferPrice_Tips")) && bValid;
	bValid = checkRegexp($("#update_goodsInfoCostPrice"), /^[0-9]+[.]{0,1}[0-9]{0,2}$/, "成本价输入格式不正确.", $(".update_goodsInfoCostPrice_Tips")) && bValid;
	bValid = checkRegexp($("#update_goodsInfoMarketPrice"), /^[0-9]+[.]{0,1}[0-9]{0,2}$/, "市场价格输入格式不正确.", $(".update_goodsInfoMarketPrice_Tips")) && bValid;
	bValid = checkRegexp($("#update_goodsInfoWeight"), /^[0-9]+(.[0-9]+)?$/, "重量输入格式不正确.", $(".update_goodsInfoWeight_Tips")) && bValid;
	
	bValid = checkSpecSymb("update_goodsInfoName", "update_goodsInfoName_Tips") && bValid;
	bValid = checkSpecSymb("update_goodsInfoSubtitle", "update_goodsInfoSubtitle_Tips") && bValid;
	bValid = checkSpecSymb("update_goodsInfoStock", "update_goodsInfoStock_Tips") && bValid;
	bValid = checkRegexp($("#update_goodsInfoItemNo"), /^[A-Za-z0-9]+$/, "货品编号必须为数字.", $(".update_goodsInfoItemNo_Tips")) && bValid;
	bValid = checkSpecSymb("update_goodsInfoWeight", "update_goodsInfoWeight_Tips") && bValid;
	
	if ($(".checkExistsFlag").val() == "0") {
		$("#update_goodsInfoItemNo").addClass("ui-state-error");
		$(".update_goodsInfoItemNo_Tips").addClass("ui-state-highlight");
		$(".update_goodsInfoItemNo_Tips").text("名称或编号已经存在!");
		bValid = false;
	}
	
	var params = $(".up_sel_spec");
	for (var i = 0; i < params.length; i++) {
		$(".up_remark_" + $(params[i]).attr("spec_id")).val($(params[i]).find("option:selected").text().trim());
	}
	/* 验证分仓的信息 */
	var productStock = $(".update_productStock");
	for (var i = 0; i < productStock.length; i++) {
		bValid = checkRegexp($(productStock[i]), /^[0-9]+$/, "", null) && bValid;
	}
	var productPrice = $(".update_productPrice");
	for (var i = 0; i < productPrice.length; i++) {
		bValid = checkRegexp($(productPrice[i]), /^[0-9]+(.[0-9]{0,2})?$/, "", null) && bValid;
	}
	return bValid;
}

/*******************************************************************************
 * 保存货品
 */
function saveProductNew() {

	if (!checkProductForm()) {
		console.info("参数验证错误");
	} else {
		if (!checkUpdateBase()) {
			console.info("规格验证错误");
		} else {
			$("#Js_updateGoodsInfoButton").addClass("ui-state-disabled");
			$("#update_goods_info_desc").val(editor.html());
			var goodsInfoName = $("#goodsName").val() + "(";
			var params = $(".up_sel_spec");
			for (var i = 0; i < params.length; i++) {
				goodsInfoName += $(params[i]).find("option:selected").text().trim();
			}
			$("#update_goodsInfoName").val(goodsInfoName + ")");
			$("#updateGoodsInfoForm").submit();
		}
	}
}

/*******************************************************************************
 * 修改货品信息
 */
function updateGoodsInfo() {
	if (!checkProductForm()) {
		console.info("参数验证错误");
	} else {
		if (!checkUpdateBase()) {
			console.info("规格验证错误");
		} else {
			$("#Js_updateGoodsInfoButton").addClass("ui-state-disabled");
			$("#update_goods_info_desc").val(editor.html());
			
			var goodsInfoName = $("#goodsName").val() + "(";
			var params = $(".up_sel_spec");
			for (var i = 0; i < params.length; i++) {
				goodsInfoName += $(params[i]).find("option:selected").text().trim();
			}
			$("#update_goodsInfoName").val(goodsInfoName + ")");
			$("#updateGoodsInfoForm").submit();
		}
	}
}