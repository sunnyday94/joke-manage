$(function(){

});
var replyType;
var imageNumbers=0;
var originCommentDisplayFlag = false;
var againCommentDisplayFlag = false;
function showConsultDetail(consultId) {
    $.ajax({
        url: 'queryByCommentIdAjax.htm?commentId=' + consultId + '&CSRFToken=' + $("#CSRFToken").val(),
        success: function (data) {
            var comment = data.comment;
            var replist = data.replist;
            var show = false;
            var replyTypeArray = new Array();
            for(var i = 0; i<replist.length; i++){
            	replyTypeArray.push(replist[i].type);
            }           
            if(replyTypeArray.toString().indexOf("0") > -1){
            	if(replyTypeArray.toString().indexOf("2") == -1){
            		show = true;
            	}else{
            		show = false;
            	}
            }
            
            if(replyTypeArray.toString().indexOf("1") > -1){
            	if(replyTypeArray.toString().indexOf("3") == -1){
            		show = true;
            	}else{
            		show = false;
            	}
            }
            
            var html =
                '<img class="good_img" alt="" src="' + comment.goodsImg + '">' +
                '<div class="recommend_cont">' +
                '   <h4>' + comment.goodsName + '</h4>' +
                '   <p>发表人：<em class="text-info">' + comment.customerNickname + '</em></p>' +
                '   <p>' +
                '       <span>时间：'+format(comment.publishTime,"yyyy-MM-dd HH:mm:ss")+'</span>' +
                '   </p>' +
                '</div>' +
                '<div class="recommend_cont btn_b">';
            /*if (comment.isDisplay == '1') {
                html += '   <p>内容：<a href="javascript:;" onclick="updateCommentDisplay(this)" display="0" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=0&commentContent=' + comment.commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示到商品页</a></p>';
            } else {
                html += '   <p>内容：<a href="javascript:;" onclick="updateCommentDisplay(this)" display="1" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=1&commentContent=' + comment.commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a></p>';
            }*/
            
            for(var i = 0; i<replist.length; i++){
            	if(replist[i].type == '0'){
            		html += '   <p>原评论：' + replist[i].commentContent;
            		if(replist[i].imageList.length != 0){
            			html += '<br/>';
            		}
                    for(var j = 0; j<replist[i].imageList.length;j++){
                    	html += '<img class="comment_img" alt="" src="' + replist[i].imageList[j].imageName + '" onclick="showBigImage(this)">';
                    }
            		/*if (replist[i].isDisplay == '1') {                       
                        html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentDisplay(this)" display="0" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=0&commentContent=' + replist[i].commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示到商品页</a></p>';
            		
            		} else {                      
                        html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentDisplay(this)" display="1" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=1&commentContent=' + replist[i].commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a></p>';
            		}*/
            		
            		if(replist[i].isDisplay=='1') {
                        html += '<a style="margin-left:8px;" data-status="changeStatus" status="0" href="javascript:;" onclick="updateDisplayStatus(this)" display="1" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=0&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示到商品页</a>'
                        originCommentDisplayFlag = true;
            		} else {
                        html += '<a style="margin-left:8px;" data-status="changeStatus" status="0" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a>'
                    }
            		
            		replyType = 2;
            	}
            	if(replist[i].type == '1'){
            		html += '   <p>追评：' + replist[i].commentContent;
            		if(replist[i].imageList.length != 0){
            			html += '<br/>';
            		}
                    for(var j = 0; j<replist[i].imageList.length;j++){
                    	html += '<img class="comment_img" alt="" src="' + replist[i].imageList[j].imageName + '" onclick="showBigImage(this)">';
                    }
            		/*if (replist[i].isDisplay == '1') {                        
                        html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentDisplay(this)" display="0" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=0&commentContent=' + replist[i].commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示到商品页</a></p>';            		
            		} else {
                        html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentDisplay(this)" display="1" comment_id="'+comment.commentId+'" url="updatecomment.htm?commentId=' + consultId + '&isDisplay=1&commentContent=' + replist[i].commentContent + '&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a></p>';
                    }*/
            		if(replist[i].isDisplay=='1') {
                        html += '<a style="margin-left:8px;" data-status="changeStatus" status="1" href="javascript:;" onclick="updateDisplayStatus(this)" display="1" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=0&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示到商品页</a>'
                        againCommentDisplayFlag = true;
            		} else {
            			if(originCommentDisplayFlag){            				
            				html += '<a style="margin-left:8px;" data-status="changeStatus" status="1" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a>'
            			}else{
            				html += '<a style="margin-left:8px;" data-status="changeStatus" status="1" disabled="disabled" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示到商品页</a>'

            			}
                    }
            		replyType = 3;
            	}
            	
            }
            
            

            html +=               
                '</div>' +
                '<div class="reply_form btn_b" style="width:90%">';
            for (var i = 0; i < replist.length; i++) {
            	if(replist[i].type == '2'){
            		html += '   <p>'+format(replist[i].publishTime,"yyyy-MM-dd HH:mm:ss")+' <em class="text-info">'+replist[i].managerName+'</em>  回复 <em class="text-info">原评论</em> ：' + replist[i].commentContent;
            		if(replist[i].imageList.length != 0){
            			html += '<br/>';
            		}
            		for(var j = 0; j<replist[i].imageList.length;j++){
                    	html += '<img class="comment_img" alt="" src="' + replist[i].imageList[j].imageName + '">';
                    }
                    if(replist[i].isDisplay=='1') {
                        html += '<a style="margin-left:8px;" data-status="changeStatus" status="2" href="javascript:;" onclick="updateDisplayStatus(this)" display="1" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=0&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示</a>'
                    } else {
                    	if(originCommentDisplayFlag){                    		
                    		html += '<a style="margin-left:8px;" data-status="changeStatus" status="2" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a>'
                    	}else{
                    		html += '<a style="margin-left:8px;" data-status="changeStatus" status="2" disabled="disabled" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a>'

                    	}
                    }
            		
            	}
            	if(replist[i].type == '3'){
            		html += '   <p>'+format(replist[i].publishTime,"yyyy-MM-dd HH:mm:ss")+' <em class="text-info">'+replist[i].managerName+'</em>  回复 <em class="text-info">追评</em> ：' + replist[i].commentContent;
            		if(replist[i].imageList.length != 0){
            			html += '<br/>';
            		}
            		for(var j = 0; j<replist[i].imageList.length;j++){
                    	html += '<img class="comment_img" alt="" src="' + replist[i].imageList[j].imageName + '">';
                    }
            		if(replist[i].isDisplay=='1') {
                        html += '<a style="margin-left:8px;" data-status="changeStatus" status="3" href="javascript:;" onclick="updateDisplayStatus(this)" display="1" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=0&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示</a>'
                    } else {
                    	if(originCommentDisplayFlag && againCommentDisplayFlag){                    		
                    		html += '<a style="margin-left:8px;" data-status="changeStatus" status="3" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a>'
                    	}else{
                    		html += '<a style="margin-left:8px;" data-status="changeStatus" status="3" disabled="disabled" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a>'

                    	}
                    }
            	}
            	
                /*html += '   <p>'+format(replist[i].publishTime,"yyyy-MM-dd HH:mm:ss")+' <em class="text-info">'+replist[i].customerNickname+'</em>  回复 <em class="text-info">' + comment.customerNickname + '</em> ：' + replist[i].commentContent;
                if(replist[i].isDisplay=='1') {
                    html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentRepDisplay(this)" display="0" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=0&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-success">点击取消显示</a>'
                } else {
                    html += '<a style="margin-left:8px;" href="javascript:;" onclick="updateCommentRepDisplay(this)" display="1" url="updatecommentrep.htm?commentId='+comment.commentId+'&replayId=' + replist[i].replayId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a>'
                }
                html += '</p>';*/
            }           
            html += '<p id="replyP"></p>';
            if(show){
            	html += '<div id="replyDiv"><div class="clearfix">' +
            	'      			<form id="replyForm"><input type="hidden" name="customerId" value="'+comment.customerId +'"/>' +
            	'       			<input type="hidden" name="commentId" value="'+comment.commentId +'"/>' +
            	'       			<input type="hidden" name="type" value="'+ replyType +'" />'+
            	'       			<input type="text" class="form-control pull-left w200" name="commentContent" id="commentContent">' +
            	'       		</form>' +
            	'   	 </div>' +
            	'		<div class="form-group mt20">'+
            	'			<div class="" style="display:inline-block" id="choosedImage"></div>'+
            	'				<a href="#" id="choosedImageButton" onclick="chooseImage();" class="btn btn-default chooseProimg btn-sm btn-success">上传图片</a>'+
            	'			</div>'+
            	'		<div><button type="button" id="rpbt" class="btn btn-info" onclick="submitReplyForm(\''+comment.customerNickname+'\','+comment.commentId+')">回复</button></div></div>'+
            	'</div>';            	
            }
            $("#consult_detail").html(html);
        }
    });
    $('#scanAdvisory').modal('show');
}
/**
 * 修改咨询的显示状态
 * @param obj
 */
/*function updateCommentDisplay(obj) {
    var display = $(obj).attr("display");
    var commentId = $(obj).attr("comment_id");
    $.ajax({
        url:$(obj).attr("url"),
        success:function(data) {
            if(display=='1') {
                $(obj).attr("url",$(obj).attr("url").replace("isDisplay=1","isDisplay=0"));
                $(obj).text("点击取消显示到商品页");
                $(obj).removeClass("btn-default");
                $(obj).addClass("btn-success");
                $(obj).attr("display","0");

                $("#comment_display"+commentId).removeClass("label-default");
                $("#comment_display"+commentId).addClass("label-success");
                $("#comment_display"+commentId).text("是");
            } else {
                $(obj).attr("url",$(obj).attr("url").replace("isDisplay=0","isDisplay=1"));
                $(obj).text("点击显示到商品页");
                $(obj).removeClass("btn-success");
                $(obj).addClass("btn-default");
                $(obj).attr("display","1");

                $("#comment_display"+commentId).removeClass("label-success");
                $("#comment_display"+commentId).addClass("label-default");
                $("#comment_display"+commentId).text("否");
            }
        }
    });
}*/

function updateDisplayStatus(obj){
	var status = $(obj).attr("status");
	var display = $(obj).attr("display");
	if(display == "1"){		
		if(status == "0"){
			$("a[data-status=changeStatus]").each(function(){
				if($(this).attr("status") != "0"){
					if($(this).attr("display") == "1"){						
						changeDisplayStatus(this);					
					}
					$(this).attr("disabled","true");
				} 
			})
		} 
		if(status == "1"){
			$("a[data-status=changeStatus]").each(function(){
				if($(this).attr("status") == "3"){
					if($(this).attr("display") == "1"){						
						changeDisplayStatus(this);					
					}
					$(this).attr("disabled","true");
				} 
			})
		}
	}else{
		if(status == "0"){
			$("a[data-status=changeStatus]").each(function(){
				if($(this).attr("status") != "0" && $(this).attr("status") != "3"){
					$(this).removeAttr("disabled");
				} 
			})
		} 
		if(status == "1"){
			$("a[data-status=changeStatus]").each(function(){
				if($(this).attr("status") == "3"){
					$(this).removeAttr("disabled");
				} 
			})
		}
	}
	changeDisplayStatus(obj);
}

function changeDisplayStatus(obj){
	var status = $(obj).attr("status");
	var display = $(obj).attr("display");
    $.ajax({
        url:$(obj).attr("url"),
        success:function(data) {
            if(display=='0') {
                $(obj).attr("url",$(obj).attr("url").replace("isDisplay=1","isDisplay=0"));
                if(status == "0" || status == "1"){                	
                	$(obj).text("点击取消显示到商品页");
                }else{
                	$(obj).text("点击取消显示");
                }
                $(obj).removeClass("btn-default");
                $(obj).addClass("btn-success");
                $(obj).attr("display","1");
            } else {
                $(obj).attr("url",$(obj).attr("url").replace("isDisplay=0","isDisplay=1"));
                if(status == "0" || status == "1"){
                	$(obj).text("点击显示到商品页");                	
                }else{
                	 $(obj).text("点击显示");
                }
                $(obj).removeClass("btn-success");
                $(obj).addClass("btn-default");
                $(obj).attr("display","0");
            }
        }
    });	
}

/**
 * 咨询回复
 * @param customerNicknam   e 用户昵称
 */
var num=0;
function submitReplyForm(customerNickname,commentId) {
	var operatorName = $("#operatorName").val();
    var commentContent = $("#commentContent").val();
    var disabledFlag = true;
    if(commentContent.trim().length == 0){
    	alert("内容不能为空");
    	return null;
    }
    if(containSpecial(commentContent)){
        showTipAlert("内容包含特殊字符");
        return null;
    }
    var replyTarget;
    if(replyType == 2){
		replyTarget = "原评论";
		if($("p [status=0]").attr("display") == "1"){
			disabledFlag = false;
		}
	}
	if(replyType == 3){
		replyTarget = "追评";
		if($("p [status=0]").attr("display") == "1" && $("p [status=1]").attr("display") == "1"){
			disabledFlag = false;
		}
	}
    
    if(commentContent!=''){
        $.ajax({
            url:'addCommReplay.htm?new=1&CSRFToken='+$("#CSRFToken").val()+'&'+$("#replyForm").serialize(),
            beforeSend:function(){
            	$("#rpbt").attr("disabled","true");
            },
            success:function(data) {
            	$("#replyP").append('<p>');            	
            	$("#replyP").append(format(new Date().getTime(),"yyyy-MM-dd HH:mm:ss")+' <em class="text-info">' + operatorName + '</em> 回复 <em class="text-info">' + replyTarget + '</em> ：'+commentContent);
            	var imageUrls = $("#replyForm").children("[name=imageUrl]");
            	if(imageUrls.length > 0){
            		$("#replyP").append("<br/>");
            	}
            	for(var i=0;i<imageUrls.length;i++){
            		var imageSrc = imageUrls.eq(i).val();
            		$("#replyP").append('<img class="comment_img" alt="" src="' + imageSrc + '">');           		
            	}
            	if(disabledFlag){
            		$("#replyP").append('<a style="margin-left:8px;" data-status="changeStatus" status="'+ replyType +'" disabled="disabled" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+commentId+'&replayId=' + data.replyId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a></p>');           	

            	}else{            		
            		$("#replyP").append('<a style="margin-left:8px;" data-status="changeStatus" status="'+ replyType +'" href="javascript:;" onclick="updateDisplayStatus(this)" display="0" url="updatecommentrep.htm?commentId='+commentId+'&replayId=' + data.replyId + '&isDisplay=1&CSRFToken=' + $("#CSRFToken").val()+'" role="button" class="btn btn-sm btn-default">点击显示</a></p>');           	
            	}
            	$("#replyP").append()
            	$("#commentContent").val("");
                $("#replyDiv").hide();
            },
            complete:function(){
            	$("#rpbt").removeAttr("disabled");
            }
        });
    }


}

function containSpecial( s ) {
    var containSpecial = RegExp(/[(\ )(\#) (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=) (\[)(\])(\{)(\})(\|)(\\)(\')(\")(\/) (\<)(\>)(\)]+/);
    return ( containSpecial.test(s) );
}


function importComment() {
    $("#importCommentForm").submit();
    showTipAlert("正在导入。。。");

}

function import_callback(result) {
    var msg = "";
    if(result=="200") {
        msg = "导入成功";
    } else if(result=="400") {
        msg = "导入失败";
    } else if(result=="501") {
        msg = "导入失败，货品编号不能为空！";
    } else if(result=="502") {
        msg = "导入失败，是否显示字段必须为数字！";
    } else if(result=="503") {
        msg = "导入失败，评分必须为数字或小数！";
    } else if(result=="504") {
        msg = "导入失败，是否匿名字段必须为数字！";
    } else {
        msg = "导入失败！";
    }

    showTipAlert(msg);
}


var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        };
    });
};

$(function(){
	 $('select[data-live-search="true"]').select2();
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
	 
})

function showBigImage(obj){
	$(".imgBG").height($("body").height());
	var imagePath = $(obj).attr("src");
	$("#bigImageDive img").attr("src",imagePath);
	$(".imgBG").show();
	
}

function chooseImage(){
	if(imageNumbers == 3){
		alert("最多只能选择3张图片");
		return;
	}
	art.dialog.open('queryImageManageByPbAndCidForChoose.htm?CSRFToken=' + $("#CSRFToken").val() + '&size=10000', {
		lock : true,
		opacity : 0.3,
		width : '900px',
		height : '620px',
		title : '选择图片'
	});
}

//保存选择的图片信息
function saveChoooseImage(path) {
	var paths = path.toString().split(",");
	var size = paths.length;
	if(size > 3){
		alert("最多只能选择3张图片");
		return;
	}
	for(var i=0;i<paths.length;i++){
		imageNumbers += 1;
		var image = '<img class="comment_img" alt="" src="' + paths[i] + '">';
		$("#choosedImage").append('<span class="inline"><a class="del_ts" href="javascript:;" onclick="del_ts(this)"><i class="glyphicon glyphicon-remove-sign"></i></a><a href="javascript:;"><img class="comment_img" alt="" src="' + paths[i] + '"></a></span>');
		$("#replyForm").append('<input type="hidden" name="imageUrl" value="'+  paths[i] +'" />')
	}	
}

function del_ts(obj) {
	var delImageSrc = $(obj).siblings(":eq(0)").children(":eq(0)").attr("src");
	var imageUrls = $("#replyForm").children("[name=imageUrl]");
	for(var i=0;i<imageUrls.length;i++){
		var imageSrc = imageUrls.eq(i).val();
		if(delImageSrc == imageSrc){
			imageUrls.eq(i).remove();
		}
	}
	$(obj).parent().remove();
	imageNumbers -= 1;
}