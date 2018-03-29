/*******************************************************************************
 * 
 * @param id
 */
function siderBar(id) {
	var ele = $('#' + id);
	ele.addClass("active");
	ele.parents("li.treeview").addClass("active");

	var lis = ele.parents("li.treeview").clone();
	lis.removeClass();
	var bread = $(".content-header>.breadcrumb");
	$("li:gt(0)", bread).remove();
	for (var i = lis.length - 1; i >= 0; --i) {
		var li = $(lis[i]);
		$("ul", li).remove();
		$("a span:last", li).remove();
		bread.append(li);
	}
	bread.append(ele.clone());
}

/**
 * * 删除单个记录的确认框 *
 * 
 * @param deleteUrl
 *            删除链接。
 */
function showDeleteOneConfirmAlert(deleteUrl, tips) {
	$("#modalDialog").remove();
	var confirmDialog = '<div class="modal fade" id="modalDialog" tabindex="-1" role="dialog">';
	confirmDialog += '<div class="modal-dialog"><div class="modal-content">';
	confirmDialog += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	confirmDialog += '<h4 class="modal-title">系统提示</h4></div><div class="modal-body">';
	if (tips != '' && tips != undefined) {
		confirmDialog += tips;
	} else {
		confirmDialog += '确认要删除这条记录吗？';
	}
	confirmDialog += '</div><div class="modal-footer">';
	confirmDialog += ' <button type="button" class="btn btn-primary" onclick="doAjaxDeleteOne(\'';
	confirmDialog += deleteUrl + '\');">确定</button>';
	confirmDialog += '<button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#modalDialog\').modal(\'hide\');">取消</button>';
	confirmDialog += '</div></div></div></div>';
	$(document.body).append(confirmDialog);
	$('#modalDialog').modal('show');
}

function doDeleteOne(deleteUrl) {
	location.href = deleteUrl;
}

function doAjaxDeleteOne(deleteUrl) {
	if (deleteUrl != null) {
		$.ajax({
			url : deleteUrl,
			success : function(data) {
				location.reload();
			}
		});
	}

}

function showNoDeleteConfirmAlert(tips) {
	$("#modalDialog").remove();
	var confirmDialog = '<div class="modal fade" id="modalDialog" tabindex="-1" role="dialog">'
			+ '    <div class="modal-dialog">'
			+ '        <div class="modal-content">'
			+ '            <div class="modal-header">'
			+ '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
			+ '               <h4 class="modal-title">系统提示</h4>'
			+ '           </div>'
			+ '           <div class="modal-body">'
			+ tips
			+ '           </div>'
			+ '           <div class="modal-footer">'
			+ '               <button type="button" class="btn btn-default" data-dismiss="modal" onclick="$(\'#modalDialog\').modal(\'hide\');">取消</button>'
			+ '           </div>' + '       </div>' + '   </div>' + '</div>';
	$(document.body).append(confirmDialog);
	$('#modalDialog').modal('show');
}