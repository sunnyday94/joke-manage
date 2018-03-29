function chooseProduct() {
	doAjax(1, 8);
	$('#chooseGoods').modal('show');
}

/* 点击添加货品的时候 */
function doAjax(pageNo, pageSize) {
	$("#pageNo").val(pageNo), $("#pageSize").val(pageSize), $("#chooseAllPro").attr("checked", false);
	$.ajax({
		url : "newqueryProductForCoupon.htm",
		data : $("#searchGoodsInfo").serialize(),
		async : true,
		success : function(data) {
			var list = data.list;
			var productListHtml = "";
			for (var i = 0; i < list.length; i++) {
				productListHtml = productListHtml
						+ "<tr>"
						+ "<td class='tc'><input type='checkbox' class='productId' name='productId' onclick='addpro(this);'";

				var pro = document.getElementsByName("goodsIdP");
				for (var j = 0; j < pro.length; j++) {
					if (pro[j].value == list[i].goodsInfoId) {
						productListHtml = productListHtml
								+ ' checked="checked" ';
					}
				}
				productListHtml = productListHtml + " value='"
						+ list[i].goodsInfoId + "'/></td>";
				productListHtml += '<td><img src="'
						+ list[i].goodsInfoImgId
						+ '" class="goodsImg"  width="50" height="50"/></td>';
				productListHtml += "<td  class='goodsTag' >";
				if (list[i].specVo.length > 0) {
					for (var k = 0; k < list[i].specVo.length; k++) {
						productListHtml = productListHtml
								+ list[i].specVo[k].spec.specName;
						productListHtml = productListHtml
								+ ":"
								+ list[i].specVo[k].goodsSpecDetail.specDetailName
								+ "<br/>";
					}
				}
				productListHtml = productListHtml + "</td>"
						+ "<td class='goodsNo'>"
						+ list[i].goodsInfoItemNo + "</td>"
						+ "<td  class='goodsName' title='"
						+ list[i].goodsInfoName + "' >"
						+ list[i].goodsInfoName + "</td>"
						+ "<td class='goodsInfoPreferPrice'>"
						+ list[i].goodsInfoPreferPrice + "</tr>";
			}
			$("#productAddList tbody").html(productListHtml);
			$("input[type=button]").button();
			/* 添加页脚 */
			$("#productAddList .meneame").html("");
			var foot = "";
			var i = 1;
			for (var l = data.startNo; l <= data.endNo; l++) {
				if ((i - 1 + data.startNo) == data.pageNo) {
					foot = foot + "<span class='current'>"
							+ (i - 1 + data.startNo) + "</span>";
				} else {
					foot = foot + "<a onclick='doAjax("
							+ (i - 1 + data.startNo) + ","
							+ (data.pageSize)
							+ ")' href='javascript:void(0)'>"
							+ (i - 1 + data.startNo) + "</a>";
				}
				i++;
			}
			foot = foot + "";
			/* 添加tfoot分页信息 */
			$("#productAddList_table_foot .meneame").html(foot);
		}
	});
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

/* 选择商品时添加商品 */
function addpro(obj) {
	var productId = $(obj).val();
	var goodsImg = $(obj).parents("tr").find(".goodsImg").attr("src");
	var goodsNo = $(obj).parents("tr").find(".goodsNo").text();
	var goodsName = $(obj).parents("tr").find(".goodsName").text();
	var goodsTag = $(obj).parents("tr").find(".goodsTag").html();
	if (obj.checked == true) {
		var htm = "<tr id='goods_tr_" + productId + "'>";
		htm += '<td width="100"><img src="'
				+ goodsImg
				+ '" width="50" height="50"/><input type="hidden" name="goodsIdP" id="goods_Id_'
				+ productId + '" value="' + productId + '"/></td>';
		htm += '<td width="100">' + goodsTag + '</td>';
		htm += '<td width="150">' + goodsNo + '</td>';
		htm += '<td  width="300">' + goodsName + '</td>';
		htm += '<td width="100"><button onclick="removeTr(this);">移除</button></td>';
		htm += "</tr>";
		$("#readproduct tbody").append(htm);
	} else {
		$("#goods_tr_" + productId).remove();

	}
}

/* 移除已选择商品 */
function removeTr(obj) {
	$(obj).parents("tr").remove();
}

function subFormOne() {
	var f = true;

	var pro = document.getElementsByName("goodsIdP");
	if (pro.length == 0) {
		$("#ps").html('请选择货品');
		$("#ps").attr("style", "color:red");
		f = false;
	} else {
		f = true;
		$("#ps").html('');
	}

	if ($("#subFormOne").valid() && f) {
		$("#subFormOne").submit();
	}

}

$(function() {
	/* 下面是表单里面的填写项提示相关的 */
	$('.labelTips').popover({
		content : '标注名称',
		trigger : 'hover'
	});

	/* 下面是表单里面的日期时间选择相关的 */
	$('.form_datetime').datetimepicker({
		format : 'yyyy-mm-dd hh:ii:00',
		weekStart : 1,
		autoclose : true,
		language : 'zh-CN',
		pickerPosition : 'top-right',
		todayBtn : true,
		viewSelect : 'hour'
	});
	$('.form_date').datetimepicker({
		format : 'yyyy-mm-dd',
		weekStart : 1,
		autoclose : true,
		language : 'zh-CN',
		pickerPosition : 'top-right',
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
});