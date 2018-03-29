 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions"  prefix="fn"%>

<div class="row">
	<div class="col-sm-7">
		<div id="example1_paginate" class="dataTables_paginate paging_simple_numbers">
			<ul class="pagination">
				<c:if test="${pb.pageNo != 1}">
					<li class="paginate_button"><a href="javascript:void(0);" onclick="changeNextPage(${pb.pageSize}, ${pb.pageNo - 1})">上一页 </a></li>
				</c:if>
				<c:if test="${pb.pageNo == 1}">
            		<li class="paginate_button disabled"><a href="javascript:void(0);">上一页 </a></li>
        		</c:if>
        		<c:if test="${pb.startNo > 2}">
        			<li class="paginate_button"><a href="javascript:void(0);" onclick="changeNextPage(${pb.pageSize}, 1)">1</a></li>
        		</c:if>
        		<c:forEach begin="${pb.startNo}" end="${pb.endNo}" varStatus="sta">
        			<c:choose>
        				<c:when test="${pb.pageNo == (pb.startNo + sta.count - 1)}">
        					<li class="paginate_button active"><a href="javascript:void(0);">${pb.startNo + sta.count - 1}</a></li>
        				</c:when>
        				<c:otherwise>
        					<li class="paginate_button">
								<a href="javascript:void(0);" onclick="changeNextPage(${pb.pageSize}, ${pb.startNo + sta.count - 1})">${pb.startNo + sta.count - 1}</a>
							</li>
        				</c:otherwise>
        			</c:choose>
        		</c:forEach>
        		<c:if test="${pb.endNo < pb.totalPages}"> 
        			<li class="paginate_button">
						<a href="javascript:void(0);" onclick="changeNextPage(${pb.pageSize}, ${pb.totalPages})">${pb.totalPages}</a>
					</li>
        		</c:if>
        		<c:if test="${pb.pageNo != pb.totalPages}">
        			<li class="paginate_button">
						<a href="javascript:void(0);" onclick="changeNextPage(${pb.pageSize}, ${pb.pageNo + 1})">下一页</a>
					</li>
        		</c:if>
        		<c:if test="${pb.pageNo == pb.totalPages }">
        			<li class="paginate_button disabled"><a href="javascript:void(0);" >下一页 </a></li>
        		</c:if>
			</ul>
		</div>
	</div>
</div>
<script type="text/javascript">
	
	function changeNextPage(pageSize, pageNo){
	    loadingPage(pageNo, pageSize);
	}
</script>