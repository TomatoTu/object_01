/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function($) {
    
    $.fn.liDrag = function(options) {
        var $this = null;
        var doc = $(document);
        
        var drag={},status={},action={};
        var $target=null,pos={},posLis=new Array();
        
        var dom = {
             ul:null
            ,li:null
            ,div:null
            ,target:null
        }
        
        status = {
            mousedown:false
            ,mousemove:false
            ,mouseup:false
            ,change:0
        }
        
//        drag.init = function(){
//            if(options.li){
//                $(options.li).on('mousedown',action.mouseDown);
//            }else{
//               doc.on('mousemove',action.mouseMove);
//                doc.on('mouseup',action.mouseUp); 
//            }
//        }
        drag.init = function(){
//            console.log('on');
            $this.find('.glyphicon-move').on('mousedown.drag',action.mouseDown);
            doc.on('mousemove.drag',action.mouseMove);
            doc.on('mouseup.drag',action.mouseUp); 
        }
        
        drag.destroy = function(){
//            console.log('off');
            $this.find('.glyphicon-move').off('.drag');
            doc.off('.drag');
            doc.off('.drag'); 
        }
        
        action = {
            mouseDown:function(e){
//                console.log('down');
                e.stopPropagation();
                $target = $(this);
                
                dom = {
                    ul:$target.closest('ul')
                   ,li:$target.closest('li')
                   ,div:$target.closest('.col-cate')
                   ,target:$target
                }
                var pp = dom.li.position();
                dom.li.addClass('cur');
                dom.li.find('li[class*="drag"]').addClass('cur');
                pos.old = {
                    x:e.pageX
                    ,y:e.pageY
                }
                pos.cur = {
                    x:pp.left
                    ,y:pp.top
                }
//                dom.dragLi = dom.li.clone();
                var name = dom.li.find('span').html();
                
                dom.dragLi = $('<li>'+name+'</li>')
                
                dom.dragLi.css({'position': 'absolute', 'left': pp.left, 'top': pp.top, 'width': dom.li.width(), 'height': dom.li.height()});
                
                $('>ul',$this).append(dom.dragLi);
                func.getPosAll();
                status.mousedown = true;
            },
            mouseMove:function(e){
                
                if(!status.mousedown){
                    return '';
                }
//                console.log('move');
                pos.new = {
                    x:e.pageX -pos.old.x+pos.cur.x
                    ,y:e.pageY-pos.old.y+pos.cur.y
                }
                dom.dragLi.css({'top': pos.new.y, 'left': pos.new.x});
                
                pos.cur = pos.new;
                pos.old = {
                    x:e.pageX
                    ,y:e.pageY
                }
                
                func.checkPosHor(pos.cur);
                options.ver && func.checkPosVer(pos.cur);
            },
            mouseUp:function(){
                
                if(!status.mousedown){
                    return '';
                }
//                console.log('up');
                dom.li.removeClass('cur');
                dom.li.find('li[class*="drag"]').removeClass('cur');
                
                status.mousedown = false;
                dom.dragLi.remove();
                $.isFunction(options.end) && options.end(dom.li);
            }
        }
        
        var func = {
            getPosAll:function(){
                var Lis = $('>ul li[class*="drag"]',$this);
                var li = null,posLi=null;
                posLis = new Array();
                $('>ul li[class*="drag"]',$this).each(function(){
                    li = $(this);
                    if(!li.hasClass('cur')){
                        posLi = li.position();
                        posLis.push({
                            li:li,
                            x:posLi.left,
                            y:posLi.top,
                            w:li.find('>div').width(),
                            h:li.find('>div').height(),
                        });
                    }
                });
            },
            checkPosHor:function(pos){
                for(var i in posLis){
                    
                    var x = pos.x-posLis[i].x;
                    var y = pos.y-posLis[i].y;
                    
                    if(y>0 && y<posLis[i].h-3){
                        
                        if(y>posLis[i].h/2){
                            
                            if(status.change == 1) return '';
                            if(posLis[i].li.find('>ul li').length > 0) return '';
                            func.moveDown(posLis[i].li);
                            status.change = 1;
                        }else{
                            if(status.change == 2) return '';
                            func.moveUp(posLis[i].li);
                            status.change = 2;
                        }
                    }else if(y+posLis[i].h>3 && y<0){
                        if(y+posLis[i].h>posLis[i].h/2+3){
                            if(status.change == 3) return '';
                            if(posLis[i].li.find('>ul li').length > 0) return '';
                            func.moveDown(posLis[i].li);
                            status.change = 3;
                        }else{
                            if(status.change == 4) return '';
                            func.moveUp(posLis[i].li);
                            status.change = 4;
                        }
                    }
                }
            },
            checkPosVer:function(pos){
                func.verDown(pos);
                func.verUp(pos);
            },
            verUp:function(pos){
                
                var ul = dom.li.closest('ul');
                var LI = ul.closest('li');
                
                if(LI.length == 0) return '';
                
                if(pos.x - LI.position().left > 40) return '';
                if(dom.li.nextAll().length > 0) return '';
                
                func.moveDown(LI);
            },
            verDown:function(pos){
                var LI = dom.li.prev('li');
                
                if(LI.length == 0) return '';
                
                if(pos.x - LI.position().left < 40) return '';
                
                func.moveChild(LI);
            },
            moveDown:function(li){
                $.isFunction(options.moveDown) && options.moveDown(li,dom.li);
                dom.li.insertAfter(li);
                func.getPosAll();
            },
            moveUp:function(li){
                $.isFunction(options.moveUp) && options.moveUp(li,dom.li);
                dom.li.insertBefore(li);
                func.getPosAll();
            },
            moveChild:function(li){
                $.isFunction(options.moveChild) && options.moveChild(li,dom.li);
                
                var ul = li.parent('ul');
                var Li = ul.parent('li');
                
                if(Li.length == 0 && dom.li.find('ul').length==0){
                    if(li.find('>ul').length == 0){
                        $('<ul></ul>').appendTo(li);
                    }
                    dom.li.appendTo($('>ul',li));
                    func.getPosAll();
                }
            }
        }
        
        var defaults = {
            ver:false,
            moveDown:null,
            moveUp:null,
            moveChild:null,
            end:null
        };

        var options = $.extend(defaults, options);


        this.each(function() {
            $this = $(this);
            drag.destroy();
            drag.init();
        });
    }
})(jQuery);