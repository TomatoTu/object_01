'use strict';
// 模板颜色选择
var ThemesLiColor = React.createClass({
    render: function(){
        var isSelect = this.props.isSelect ? 'selected':'';
        var spanClass = "color-square " + isSelect;
        var color = this.props.colors;
        return (
                <span className={spanClass} style={{backgroundColor:color}} onClick={this.toggleClick} ref="color"></span>
        );
    },
    toggleClick:function(){
//        $(this.refs.color).toggleClass('selected');
        this.props.onChangeColor(this.props.index);
    }
});
//模板选择
var ThemesLi = React.createClass({
    getInitialState: function(){
        return {selectIndex: 0};
    },
    handleChangeColor:function(selectIndex){
        this.setState({selectIndex: selectIndex});
    },
    handleBeforeSubmit:function(e){
        e.preventDefault();
        var themeid = this.refs.themeid.value.trim();
        var colorid = this.refs.colorid.value.trim();
        this.props.handleSubmit(themeid,colorid);
    },
    handleAlert:function(){
        var themeid = this.refs.themeid.value.trim();
        this.props.showPre(this.props.themeIndex,true);
    },
    render: function() {
        var strimg = '_'+this.props.data.id+'_'+this.state.selectIndex+'.gif';
        var webImg = '/template/themeImg/'+ this.props.data.face_image+strimg;
        var phoneImg = '/template/themeImg/templateTel'+strimg;
        var colorConfig = eval('(' + this.props.data.color_config + ')');
        var selectIndex = this.state.selectIndex;
        var handleChangeColor = this.handleChangeColor;
        var url = 'preview?theme='+this.props.data.id;
        var name=this.props.data.name;
        return (
            <li>
                <div className="theme-m">
                <div className="theme-pc-m">
                    <img src={webImg} />
                    <div className="theme-bottom-m">
                        <input type="hidden" ref="themeid" value={this.props.data.id} />
                        <input type="hidden" ref="colorid" value={this.state.selectIndex} />
                        <a href="javascript:void(0);" onClick={this.handleBeforeSubmit}>选择</a>
                        <a href="javascript:void(0);" onClick={this.handleAlert} >预览</a>
                        <span className="nun_x">编号：{name}</span>
                    </div>
                    <div className="theme-color-m">
                        <div className="theme-mask-m"></div>
                        <div className="theme-color-list-m">
                            {colorConfig.map(function(result,i) {
                                return <ThemesLiColor colors={result} isSelect={i == selectIndex} index={i} onChangeColor={handleChangeColor} key={result} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="theme-tel-m"><img src={phoneImg} /></div>
            </div>
            </li>    
        );
    },
    
});
//模板选择ul
var ThemesUl = React.createClass({
    
    render: function() {
        var showPre = this.props.showPre;
        var handleSubmit = this.props.handleSubmit;
        return (
            <ul className="clearfix"> 
                {this.props.data.map(function(result,themeIndex) {
                    return <ThemesLi 
                            data={result} 
                            key={result.id} 
                            handleSubmit={handleSubmit} 
                            showPre={showPre}
                            themeIndex={themeIndex}/>
                })}
            </ul>
        );
    },
});
//模板选择
var Themes = React.createClass({
    
    render: function() {
        return (
            <div className="home-b">
                <div className="home-in-b">
                    <div className="home-header-b">
                        <div className="home-header-in-b">
                            <div className="home-header-top-b clearfix">
                                <div className="home-logo"><img src="/images/home_logo.png"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="home-content">
                        <div className="home-content-in clearfix">
                            <div className="theme-choose-m">
                                <div className="theme-head-m">
                                    <h1>选择一个模板</h1>
                                </div>
                                <div className="themes-list-m" id="themes-choose">
                                    <ThemesUl {...this.props}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-foot">
                       <div className="home-foot-in clearfix">
                        <div className="web-logo"><img src="/images/web-logo.png"/></div>
                        <div className="home-copyright">Copyright © 2009-2016 cavan</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

// 预览页面
var PreView = React.createClass({
    getInitialState: function(){
        return {downWidth: '100%',preselectIndex:0};
    },
    componentWillMount:function(){
        this.setCookie(this.state.preselectIndex);
    },
    setCookie:function(colorIndex){
        let url = window.location.host;
        let urls = url.split('.');
        const domain = urls[urls.length - 2] +'.' + urls[urls.length - 1];
        document.cookie = 'color=' + colorIndex + '; domain=' + domain+';path='+'/';
    },
    handleSetWidth:function(data){
        console.log(data.width);
        this.setState({downWidth: data.width});
    },
    handleChangeColor:function(selectIndex){
        this.setState({preselectIndex: selectIndex});
        this.setCookie(selectIndex);
    },
    handleBeforeSubmit:function(e){
        
        e.preventDefault();
//        var themeid = this.refs.prethemeid.value.trim();
//        var colorid = this.refs.precolorid.value.trim();
        this.props.handleSubmit(this.props.data.id,this.state.preselectIndex);
    },
    render: function() {
        return (
            <div className="preview-b">
                <PreTop {...this.props} handleSetWidth={this.handleSetWidth} handleChangeColor={this.handleChangeColor} handleBeforeSubmit={this.handleBeforeSubmit} selectIndex={this.state.preselectIndex}/>
                <PreDown {...this.props} width={this.state.downWidth} color={this.state.preselectIndex}/>
            </div>
        );
    },
});
//预览header
var PreTop = React.createClass({
//    getInitialState: function(){
//        return {preselectIndex: 0};
//    },
//    handleChangeColor:function(selectIndex){
//        this.setState({preselectIndex: selectIndex});
//    },
//    handleBeforeSubmit:function(e){
//        
//        e.preventDefault();
//        var themeid = this.refs.prethemeid.value.trim();
//        var colorid = this.refs.precolorid.value.trim();
//        this.props.handleSubmit(this.props.data.id,colorid);
//    },
    handleHide:function(){
        this.props.showPre(0,false);
    },
    render: function() {
        var buttons = [
            {name:'bpc',class:'icon_device_preview_pc',width:'100%'},
            {name:'bpadH',class:'icon_device_preview_padH',width:'1024'},
            {name:'bpadV',class:'icon_device_preview_padV',width:'768'},
            {name:'btelH',class:'icon_device_preview_telH',width:'480'},
            {name:'btelV',class:'icon_device_preview_telV',width:'320'}
        ];
        var webImg = '/images/'+ this.props.data.face_image+'.jpg';
        var colorConfig = eval('(' + this.props.data.color_config + ')');
        var selectIndex = this.props.selectIndex;
        var handleChangeColor = this.props.handleChangeColor;
        var url = 'preview?theme='+this.props.data.id;
        return (
            <div className="preview-top-b">
                <PreButtons buttons={buttons} handleSetWidth={this.props.handleSetWidth}/>
                <div className="btns-right-b">
                    <div className="btn-green-c" onClick={this.props.handleBeforeSubmit}>选择</div>
                    <div className="btn-white-c" id="pback" onClick={this.handleHide}>返回</div>
                </div>
                <div className="theme-top-color-b">
                    <div className="theme-mask-b"></div>
                    <div className="theme-bottom-con-b clearfix">
                        <div className="theme-color-list-b">
                            {colorConfig.map(function(result,i) {
                                return <ThemesLiColor colors={result} isSelect={i == selectIndex} index={i} onChangeColor={handleChangeColor} key={result} selected={selectIndex}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
// 预览宽度选择
var PreButtons = React.createClass({
    getInitialState: function(){
        return {btnName: 'bpc'};
    },
    handleSetName:function(e,data){
        e.preventDefault();
        this.setState({btnName: data.name});
        this.props.handleSetWidth(data);
    },
    handleShowQR:function(){
         $(this.refs.qr).toggle();
    },
    render: function() {
        var buttons = this.props.buttons;
        var btnName = this.state.btnName;
        var handleSetName = this.handleSetName;
        return (
           <div className="preview_link">
                {buttons.map(function(result,i) {
                    return <PreButton data={result} name={btnName} handleSetName={handleSetName}  key={i} />
                })}
                <span className="QR" onMouseOver={this.handleShowQR} onMouseOut={this.handleShowQR} style={{display:'none'}}><i className="icon_device_preview icon_device_preview_QR"></i></span> 
                <div className="QR-pop-b" ref="qr" style={{display:'none'}}>
                    <p>扫描二维码</p>
                    <img src="/images/QR.jpg"/>
                </div>
            </div>
        );
    },
});
// 预览宽度按钮
var PreButton = React.createClass({
    render: function() {
        var cur = this.props.data.name == this.props.name ? ' cur':'';
        var classSpan = 'preview_link_span '+ cur;
        var classI = 'icon_device_preview '+this.props.data.class;
        return (
            <span className={classSpan} onClick={(e)=>(this.props.handleSetName(e,this.props.data))}><i className={classI} ></i></span>
        );
    },
});

// 预览下部iframe
var PreDown = React.createClass({
    componentDidMount:function(){
        $(this.refs.scroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
    },
    render: function() {
        var url = this.props.data.url+'?time='+new Date().getTime();
        return (
            <div className="preview-containt-b">
                
                <div className="web_view_box_b" style={{width:this.props.width}}>
                    <div className="web_view_box_in scroll-box" ref="scroll">
                            <iframe style={{width:'100%',height:'100%',overflowX:'hidden',border:'0'}} src={url} seamless="seamless" id="eidtIframe">

                            </iframe>
                    </div> 
                </div>  
            </div>
        );
    },
});
// 动画组件
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

// 初始化
var Init = React.createClass({
    handleSubmit:function(themeid,colorid){
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        console.log(themeid+':*:'+colorid);
        $('#showwaitlong').show();
        $.ajax({
            url: '/init/theme',
            dataType: 'json',
            type: 'POST',
            data: {'theme':themeid,'color':colorid,_csrf:csrfToken},
            success: function(data) {
                if(data.code){
                    window.location.href = data.data.url;
                }else{
                    alert(data.data.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        
    },
    handleShowPre:function(showIndex,isShow){
        console.log(showIndex+':::'+isShow);
        this.setState({showIndex: showIndex,show:isShow});
    },
    getInitialState: function(){
        return {showIndex: 0,show:false};
    },
    render: function() {
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        
        return (
            <div>
                {!this.state.show && <Themes data={this.props.data} handleSubmit={this.handleSubmit} showPre={this.handleShowPre}/>}
                <CSSTransitionGroup transitionName="reactpreview" transitionEnterTimeout={100} component="div" transitionLeaveTimeout={500}>
                      {this.state.show && <PreView data={this.props.data[this.state.showIndex]} handleSubmit={this.handleSubmit} showPre={this.handleShowPre}/>}
                </CSSTransitionGroup>
            </div>
        );
    },
});

ReactDOM.render(<Init data={thisData}/>, document.getElementById('init'));