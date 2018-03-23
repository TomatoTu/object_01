import React, { Component, PropTypes } from 'react';
import { MENU_DESIGN, MENU_THEME, MENU_PAGE, MENU_SYSTEM, MENU_SET,MENU_STORE } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes';

export default class Header extends Component {

  handerMenu(){
    const {onChangeMenu} = this.props;
    onChangeMenu(MENU_SYSTEM);
  }

  handlePublishPage(){
    var result = $.ReleasePage(this.props.publish);
  }

  handleScreen(type){
    $.SetIframeWith(type)
  }
  handleCheckStroe(){
    const { onChangeMenu,host} = this.props;
    if(host.host_type_id > 1){
        onChangeMenu(MENU_STORE);
    }else{
        $.ShowResultMag("请升级版本",false);
    }
  }
  render() {
    const { menu,onChangeMenu,publish,sites,host,onChangeSite,name} = this.props;
    const handlePublishPage = ::this.handlePublishPage;
    const handleScreen = ::this.handleScreen;
    const handleCheckStroe = ::this.handleCheckStroe;
    var designClass = '';
    var themeClass = '';
    var pageClass = '';
    var systemClass = '';
    var setClass = '';
    var storeClass ='';

    switch (menu) {
      case MENU_DESIGN:
        designClass = 'cur';
        break;
      case MENU_STORE:
        storeClass = 'cur';
        break;
      case MENU_PAGE:
        pageClass = 'cur';
        break;
      case MENU_SYSTEM:
        systemClass = 'cur';
        break;
      case MENU_SET:
        setClass = 'cur';
        break;
    }

    return (
      <div className="edit-top clearfix">
        <div className="edit-top-l">
            <a href="/manager/hosts">
            <div className="edit-top-back"></div></a>
            <div className="logo-div"><img src="/images/logo1.png" /></div>
        </div>
        <div className="edit-top-m clearfix">
            <div className="edit-navbox">
                <div className="edit-navbox-in">
                    <ul>
                        <li className={designClass}><a href="javascript:void(0)" onClick={() => onChangeMenu(MENU_DESIGN,true)}>设&nbsp;计</a></li>
                        <li className={pageClass}><a href="javascript:void(0)" onClick={() => onChangeMenu(MENU_PAGE)}>网&nbsp;页</a></li>
                        <li className={systemClass}><a href="javascript:void(0)" onClick={() => onChangeMenu(MENU_SYSTEM)}>系&nbsp;统</a></li>
                        <li className={storeClass}><a href="javascript:void(0)" onClick={() => handleCheckStroe()}>商&nbsp;城</a></li>
                        <li className={setClass}><a href="javascript:void(0)" onClick={() => onChangeMenu(MENU_SET)}>设&nbsp;置</a></li>
                    </ul>
                </div>
            </div>
            {menu == MENU_DESIGN && <div className="edit-device">
                <div className="device-img"></div>
                <div className="edit-top-down device-down">
                    <div className="edit-top-down-icon"></div>
                    <div className="edit-top-down-list">
                        <ul>
                            <li><a href="javascript:void(0)" onClick={()=>handleScreen(1)}><i className="icon-device icon-device-pc"></i>PC</a></li>
                            <li><a href="javascript:void(0)" onClick={()=>handleScreen(2)}><i className="icon-device icon-device-pad"></i>PAD</a></li>
                            <li style={{display:'none'}}><a href="javascript:void(0)" onClick={()=>handleScreen(3)}><i className="icon-device icon-device-Hor"></i>PAD横屏</a></li>
                            <li><a href="javascript:void(0)" onClick={()=>handleScreen(4)}><i className="icon-device icon-device-tel"></i>手机</a></li>
                        </ul>
                    </div>
                </div>
            </div>}
        </div>
        <div className="edit-top-r clearfix">
            <div className="web-option"><a href="javascript:void(0)" className="preview" onClick={()=>(window.open('http://'+HOSTCONFIG.SELF_URL))}>浏&nbsp;览</a> <a href="javascript:void(0)" className="publish" onClick={handlePublishPage}>发&nbsp;布</a></div>
            <div className="edit-language">
                <div className="edit-language-cur clearfix" id="languageButton">
                    <div className="language-name">{name}</div>
                    <div className="language-select-icon"></div>
                </div>
                <div className="edit-top-down language-down" id="languageDown">
                    <div className="edit-top-down-icon"></div>
                    <div className="edit-top-down-list">
                        <ul>
                            {sites.map(function(site, index) {
                                return <li key={index}><a href="javascript:void(0)" onClick={()=>onChangeSite(site.id,(name==site.language.name))}>{site.language.name}</a></li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}