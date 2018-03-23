var nav=function(){
	$('.w-nav li').hover(function(){
	var $submenu1 = $(".w-nav > ul >li > .submenu");
	for(var i=0; i<$submenu1.length;i++){
		var position_left=$submenu1.eq(i).offset().left;
		if((position_left+$submenu1.eq(i).width())>document.body.clientWidth ){
			$submenu1.eq(i).css({'right':0,'left':'auto'});
		}
	}
	var $submenu2 = $(".submenu .submenu");
	for(var i=0; i<$submenu2.length;i++){
		var position_left=$submenu2.eq(i).offset().left;
		if((position_left+$submenu2.eq(i).width())>document.body.clientWidth ){
			$submenu2.eq(i).css({'right':$submenu2.eq(i).width(),'left':'auto'});
		}
	}
	});
}
var nav_mobile=function(){
	$('.mobile-nav-toggle').click(function(){
		 if( $('.col-right').is(':hidden') ){
		 	$('.col-right').slideDown();
		 }else{
			$('.col-right').slideUp();
		 }
		 if( $('.w-admin-nav').is(':hidden') ){
		 	$('.w-admin-nav').slideDown();
		 }else{
			$('.w-admin-nav').slideUp();
		 }
		 return false;
	});
	$('.w-nav li .fa').click(function(){
		$(this).parent().parent().parent().siblings().find('.li-parent-div').removeClass('open');
		$(this).parent().parent().parent().siblings().find('.submenu').slideUp();
			if($(this).parent().parent().hasClass('open')){
				$(this).parent().parent().removeClass('open');
				$(this).parent().parent().siblings().find('.open').removeClass('open');
				$(this).parent().parent().siblings().slideUp();
				$(this).parent().parent().siblings().find('.submenu').slideUp();
			}else{
				$(this).parent().parent().addClass('open');
				$(this).parent().parent().siblings().slideDown();
				}
		return false;
	});
}
var conMenu=function(){
	$('.w-com-menu-H li').hover(function(){
	var $conSubMenu=$('.w-com-menu-H').find('.ul-submenu');
	for(var i=0; i<$conSubMenu.length;i++){
		var wid_parent=$conSubMenu.eq(i).parent().width();
		var wid_parent_left=$conSubMenu.eq(i).parent().offset().left;
		var window_w=$(window).width();
		var wid=0;
		var $conSubMenuli=$conSubMenu.eq(i).children('ul').children('li');
		for(var j=0; j<$conSubMenuli.length;j++){
			var li_width=$conSubMenuli.eq(j).width();
			wid=wid+li_width;
		}
		if(wid_parent_left>(wid-wid_parent)/2){
			if((window_w-wid_parent_left)>(wid+wid_parent/2)){
		        $conSubMenu.eq(i).css({'width':wid+1,'left':-(wid-wid_parent)/2});
			}else{
				$conSubMenu.eq(i).css({'width':wid+1,'right':-(window_w-wid_parent_left-wid_parent)});
			}
		}else{
			$conSubMenu.eq(i).css({'width':wid+1,'left':-wid_parent_left});
		}
	}
	});
	$('.w-com-menu-V li .div-parent .fa').click(function(){
		$(this).parent().parent().siblings().find('.ul-submenu').slideUp();
		$(this).parent().parent().siblings().removeClass('open');
		$(this).parent().parent().siblings().find('.open').removeClass('open');
		if($(this).parent().siblings('.ul-submenu').is(':hidden')){
			$(this).parent().siblings('.ul-submenu').slideDown();
			$(this).parent().parent().addClass('open');
		}else{
			$(this).parent().siblings('.ul-submenu').slideUp();
			$(this).parent().siblings('.ul-submenu').find('.ul-submenu').slideUp();
			$(this).parent().parent().removeClass('open');
			$(this).parent().parent().find('.open').removeClass('open');
		}
	});
}
var conMenu_tel=function(){
	$('.w-com-menu .fa-plus').click(function(){
		$(this).parent().parent().siblings('li').find('.ul-submenu').slideUp();
		$(this).parent().parent().siblings('li').removeClass('open');
		$(this).parent().parent().siblings('li').find('.open').removeClass('open');
		if($(this).parent().siblings('.ul-submenu').is(':hidden')){
			$(this).parent().siblings('.ul-submenu').slideDown();
			$(this).parent().parent().addClass('open');
		}else{
			$(this).parent().siblings('.ul-submenu').slideUp();
			$(this).parent().siblings('.ul-submenu').find('.ul-submenu').slideUp();
			$(this).parent().parent().removeClass('open');
			$(this).parent().parent().find('.open').removeClass('open');
		}
	});
}
$(function(){
	if($(window).width()>767){
	 nav();
	 conMenu();
     $('.w-header .row').css('padding-top',$('.topLogBox').height());
	}else{
	 nav_mobile();
	conMenu_tel();
	}
	var oldWidth=$(window).width();
	$(window).resize(function(){
		var newWidth=$(window).width();
		if(oldWidth>767){
		    if(newWidth<768){
		       location=location;
		    }
		}else{
			if(newWidth>767){
		       location=location;
		    }
		}
	});
});
