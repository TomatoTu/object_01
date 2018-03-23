
/*单选框*/
$(function() {
$('.w-option').click(function() {
	$(this).siblings('.w-option').children('input').removeClass('checked');
	$(this).children('input').addClass('checked');	
});
});
/*复选框*/
$(function(){
$('input[type="checkbox"]').on('change', function() {
  $(this)[$(this).prop('checked') ? 'addClass' : 'removeClass']('checked');
});
});
/*选择下拉框*/ 
$(function() {
var selects=$(".w-select-box");
	var i;
	for(i=0;i<selects.length;i++){
		selects.eq(i).parent().parent().css({'z-index':100-i});
		selects.eq(i).css({'z-index':100-i,'position':'relative'});
	}
	$('.w-select-option').hide();
	$('.w-select-box .w-select-dt').bind('click',function(e){
		  $(this).children('.select-icon').addClass('select-down');
		  $(this).parent().find('.w-select-option').slideDown(); 
		  $(this).parent().find('div').hover(function(){$(this).addClass('itemhover')},function()
{$(this).removeClass('itemhover')});
		  e.stopPropagation();
	})	
	
	
	$(document).bind("click",function(e){
		$('.w-select-option').slideUp();
		$('.w-select-dt').children('.select-icon').removeClass('select-down');
		/*e.stopPropagation();
		$(document).unbind("click");*/
  	});
	$('.w-select-option div').click(function(){
		var itemContent = $(this).html();
		$(this).parents('.w-select-dl').find('.w-select-dt .selected').html(itemContent);
		$(this).parents('.w-select-dl').find('.w-select-option').slideUp();
		$(this).parents('.w-select-dl').find('.w-select-dt').children('.select-icon').removeClass('select-down');
	});
});
/*会员选择下拉框*/
$(function () {
    var selects = $(".select-box-gw");
    var i;
    for (i = 0; i < selects.length; i++) {
        selects.eq(i).parent().parent().css({'z-index': 100 - i});
        selects.eq(i).css({'z-index': 100 - i, 'position': 'relative'});
    }
    $('.select-option-gw').hide();
    $('.select-box-gw .select-dt-gw').bind('click', function (e) {
        if($(this).data("select") === false){
            return '';
        }
        $(this).parent().find('.select-option-gw').slideDown();
        $(this).parent().find('div').hover(function () {
            $(this).addClass('itemhover')
        }, function ()
        {
            $(this).removeClass('itemhover')
        });
        e.stopPropagation();
        $(this).parents('.select-dl-gw').find('.select-option-gw div').click(function () {
            var itemContent = $(this).html();
            $(this).parents('.select-dl-gw').find('.select-dt-gw .selected').html(itemContent);
            $(this).parents('.select-dl-gw').find('.select-option-gw').slideUp();
        });

    })
    $(document).bind("click", function (e) {
        $('.select-option-gw').slideUp();
        /*e.stopPropagation();
         $(document).unbind("click");*/
    });
});

/*tab切换*/
$(function(){
  $(".info_tab li[data-tab]").click(function (){
	$(this).siblings().removeClass('cur_tab');
	$(this).addClass('cur_tab');
    var data = $(this).attr('data-tab');
    $("div[id^='Tabitem']").hide();
    $("#Tabitem"+data).show();
  });
});
/*收藏滚动*/
$(function(){
	var slideC=function(){
		var visC;
		if($(window).width()>960){
			visC=5;
		}else if($(window).width()>767){
			visC=4;
		}else{
			visC=3;
		}
		$(".myCollectA").slide({
			mainCell:".collect_listA ul",
			autoPage:false,
			effect:"leftLoop",
			autoPlay:true,
			scroll:1,
			vis:visC,
			prevCell:".slide_lA",
			nextCell:".slide_rA"
		});
	}
	slideC();
	$(window).resize(function(){
      
	});
});
/*新闻组件3的右边图片大小自适应*/
/*图片位置计算*/
var imgCount=function(){
								$('.img-count').each(function(index, element) {
									var imgH=$(this).height();
								    var imgW=$(this).width();
									 var $thisimg=$(this).find('img');
									 var img = new Image();
									  img.src =$thisimg.attr("src") ;
                                     img.onload = function(){
                                         var imgWidth = img.width; 
									     var imgHeight = img.height;
										 	if( (imgWidth/imgHeight)>(imgW/imgH)){
												$thisimg.css({'width':(imgH/imgW)*((imgWidth*1.00)/imgHeight)*100+'%','max-width':(imgH/imgW)*((imgWidth*1.00)/imgHeight)*100+'%','left':-((imgH/imgW)*((imgWidth*1.00)/imgHeight)*100-100)/2+'%'})
											}else{
												$thisimg.css({'height':(imgW/imgH)*((imgHeight*1.00)/imgWidth)*100+'%','max-height':(imgW/imgH)*((imgHeight*1.00)/imgWidth)*100+'%','top':-((imgW/imgH)*((imgHeight*1.00)/imgWidth)*100-100)/2+'%'})
											}
								    }
                                });
								}
$(function(){
	var adimgwh=function(){
		var $adnews=$('.w-adNews3');
		for(var i=0; i<$adnews.length;i++){
		    var adimgw=$adnews.eq(i).find('.w-adNews-imgs').width();
			var adimgh=$adnews.eq(i).find('.w-adNews-texts').height();
			$adnews.eq(i).find('.news-img .aspectRatio').css('padding-bottom',(adimgh*1.0/adimgw)*100+'%');
			
	   }
	}
	adimgwh();
	imgCount();
	$(window).resize(function(){
		adimgwh();
		imgCount();
	});
});
