import React, { Component, PropTypes } from 'react';
import { MENU_DESIGN, MENU_THEME, MENU_PAGE, MENU_SYSTEM, MENU_SET, MENU_STORE } from '../../header/constants/ActionTypes';


export default class Theme extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={downWidth:'100%',colorIndex:0}
    }
    componentWillMount(){
        this.setCookie(this.state.colorIndex);
    }
  setCookie(colorIndex){
    let url = window.location.host;
    let urls = url.split('.');
    const domain = urls[urls.length - 2] +'.' + urls[urls.length - 1];
    document.cookie = 'color=' + colorIndex + '; domain=' + domain+';path='+'/';
  }
  handleSetWidth(downWidth){
    this.setState({downWidth});
  }
  handleChangeColor(colorIndex){
    this.setState({colorIndex});
    this.setCookie(colorIndex);
  }
  handleBeforeSubmit(e){
        e.preventDefault();
        const {template:{id:theme},updateTheme,onChangeMenu} = this.props;
        const {colorIndex:color} = this.state;
        updateTheme({theme,color});

        onChangeMenu(MENU_DESIGN);
    }
  render() {
    const handleChangeColor = ::this.handleChangeColor;
    const handleBeforeSubmit = ::this.handleBeforeSubmit;
    const {colorIndex} = this.state;
    return (
        
    <div className="preview-b" style={{zIndex:1000}}>
        <PreTop {...this.props} handleSetWidth={::this.handleSetWidth} handleChangeColor={handleChangeColor} handleBeforeSubmit={handleBeforeSubmit} selectIndex={colorIndex}/>
        <PreDown {...this.props} width={this.state.downWidth} color={colorIndex}/>
    </div>
    );
  }
}
const buttons = [
            {name:'bpc',class:'icon_device_preview_pc',width:'100%'},
            {name:'bpadH',class:'icon_device_preview_padH',width:'1024'},
            {name:'bpadV',class:'icon_device_preview_padV',width:'768'},
            {name:'btelH',class:'icon_device_preview_telH',width:'480'},
            {name:'btelV',class:'icon_device_preview_telV',width:'320'}
        ];
//预览header
class PreTop extends Component {
    constructor(props, context) {
        super(props, context);
        // this.state={preselectIndex:0}
    }
    componentDidMount(){
    }
    // handleChangeColor(preselectIndex){
    //     this.setState({preselectIndex});
    // }
    
    render() {
        const {template,onChangeMenu,handleChangeColor,handleBeforeSubmit} = this.props;
        var colorConfig = eval('(' + template.color_config + ')');
        var selectIndex = this.props.selectIndex;
        var url = 'preview?theme='+template.id;
        return (
            <div className="preview-top-b">
                <PreButtons buttons={buttons} handleSetWidth={this.props.handleSetWidth}/>
                <div className="btns-right-b">
                    <div className="btn-green-c" onClick={handleBeforeSubmit}>选择</div>
                    <div className="btn-white-c" id="pback" onClick={()=>onChangeMenu(MENU_DESIGN)}>返回</div>
                </div>
                <div className="theme-top-color-b">
                    <div className="theme-mask-b"></div>
                    <div className="theme-bottom-con-b clearfix">
                        <div className="theme-color-list-b">
                            {colorConfig.map(function(result,i) {
                                return <ThemesLiColor colors={result} isSelect={i == selectIndex} index={i} selected={selectIndex} onChangeColor={handleChangeColor} key={result} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// 预览宽度选择
class PreButtons extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={btnName:'bpc'}
    }
    handleSetName(e,data){
        e.preventDefault();
        this.setState({btnName: data.name});
        this.props.handleSetWidth(data.width);
    }
    handleShowQR(){
         $(this.refs.qr).toggle();
    }
    render() {
        var buttons = this.props.buttons;
        var btnName = this.state.btnName;
        var handleSetName = ::this.handleSetName;
        return (
           <div className="preview_link">
                {buttons.map(function(result,i) {
                    return <PreButton data={result} name={btnName} handleSetName={handleSetName}  key={i} />
                })}
                <span className="QR" onMouseOver={::this.handleShowQR} onMouseOut={::this.handleShowQR} style={{display:'none'}}><i className="icon_device_preview icon_device_preview_QR"></i></span> 
                <div className="QR-pop-b" ref="qr" style={{display:'none'}}>
                    <p>扫描二维码</p>
                    <img src="/images/QR.jpg"/>
                </div>
            </div>
        );
    }
}
// 预览宽度按钮
class PreButton extends Component {
    render() {
        var cur = this.props.data.name == this.props.name ? ' cur':'';
        var classSpan = 'preview_link_span '+ cur;
        var classI = 'icon_device_preview '+this.props.data.class;
        return (
            <span className={classSpan} onClick={(e)=>(this.props.handleSetName(e,this.props.data))}><i className={classI} ></i></span>
        );
    }
}
PreDown
// 预览下部iframe
class PreDown extends Component {
    componentDidMount(){
        $(this.refs.scroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
    }
    render() {
        const {template,color} = this.props;
        var url = template.url+'?time='+new Date().getTime();
        return (
            <div className="preview-containt-b">
                
                <div className="web_view_box_b" style={{width:this.props.width}}>
                    <div className="web_view_box_in scroll-box" ref="scroll">
                            <iframe style={{width:'100%',height:'100%',overflowX:'hidden',border:'0'}} src={url} seamless="seamless" id="themeIframe" ref='themeiframe'>

                            </iframe>
                    </div> 
                </div>  
            </div>
        );
    }
}

class ThemesLiColor extends Component {
    render(){
        var isSelect = this.props.isSelect ? 'selected':'';
        var spanClass = "color-square " + isSelect;
        var color = this.props.colors;
        return (
                <span className={spanClass} style={{backgroundColor:color}} onClick={::this.toggleClick} ref="color"></span>
        );
    }
    toggleClick(){
        // $(this.refs.color).toggleClass('selected');
        this.props.onChangeColor(this.props.index);
    }
}