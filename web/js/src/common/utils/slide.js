var slide = function(id,timelen){
 this.Objs = id;
 this.Objs.style.overflow = "hidden";
 this.timelength = timelen;
 var isNone = false;
 function getStyle(el,sty){
    return el.style[sty];
 }
 if(getStyle(id,"display")=='none'){
  this.Objs.style.display='block';
  this.Objs.style.visibility="hidden";
  isNone = true;
 }
 this.paddingTop = getStyle(id,"paddingTop");
 this.paddingBottom = getStyle(id,"paddingBottom");
 this.Objs.style.paddingTop=0;
 this.Objs.style.paddingBottom=0;
 this.contentheight = parseInt(getStyle(id,"height"));
 if (isNaN(this.contentheight)){
  this.contentheight = parseInt(this.Objs.offsetHeight);
 }
 if(isNone){
  this.Objs.style.height=0;
 }else{
  this.Objs.style.paddingTop=this.paddingTop;
  this.Objs.style.paddingBottom=this.paddingBottom;
  this.Objs.style.height=this.contentheight+'px';
 }
}
slide.prototype.engine = function(direction) {
    var elapsed = new Date().getTime() - this.startTime;
 var thisobj=this;
    if (elapsed < this.timelength) {
  var distancepercent;
  
  if(direction == "down"){
   this.Objs.style.visibility="visible";
   distancepercent = (1-Math.cos(elapsed/this.timelength*Math.PI))/2;
  }else{
   distancepercent = 1 - (1-Math.cos(elapsed/this.timelength*Math.PI))/2;
  }
  this.Objs.style.height = distancepercent * this.contentheight + "px";
  this.runtimer = setTimeout(function(){
            thisobj.engine(direction);
  },10);
    } else {
  if(direction == "down"){
   this.Objs.style.paddingTop=this.paddingTop;
   this.Objs.style.paddingBottom=this.paddingBottom;
   this.Objs.style.height = this.contentheight + "px";
  }else{
   this.Objs.style.height = 0 ;
   this.Objs.style.visibility="hidden";
  }
  this.runtimer = null;
    }
}
slide.prototype.slideDown = function() {
    if (typeof this.runtimer == "undefined" || this.runtimer == null) {
  if (parseInt(this.Objs.style.height)==0){
   this.startTime = new Date().getTime();
   this.engine("down");
  }
    }
}
slide.prototype.slideUp = function() {
    if (typeof this.runtimer == "undefined" || this.runtimer == null) {
  if (parseInt(this.Objs.style.height)==this.contentheight){ 
   this.startTime = new Date().getTime() ;
   this.engine("up");
  }
    }
}

export default slide