import React, { Component, PropTypes } from 'react';
import { MENU_DESIGN, MENU_THEME, MENU_PAGE, MENU_SYSTEM, MENU_SET, MENU_STORE } from '../../header/constants/ActionTypes';

export default class Design extends Component {

  render() {
    const {templates,site,onChangeMenu,urlstate} = this.props;
    let url = "/manager/page?t=" + urlstate;
    return (
        <div>
      <div className="edit-left" id="editTool">
        <div className="edit-tool">
            <div className="navbar-tool">
                <div className="navbar-inner">
                    <div className="navbar-list" id="navbarList">
                        <ul>
                            <li className="active" data-tab="1"><a href="javascript:void(0)">组件</a></li>
                            <li data-tab="2"><a href="javascript:void(0)">主题</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="toolbar" id="navbar_con1">
                <div className="scrollspy-tool scroll-edit scroll-div" data-offset="0" data-spy="scroll">
                </div>
                 <div className="edit-left-mask-b"></div>
            </div>
            <div className="themes-bar" id="navbar_con2">
                <div className="scroll-edit scroll-div" data-offset="0" data-spy="scroll">
                    <div className="themes-list-b">
                        <ul className="clearfix">
                            {templates.map(function(template, index) {
                                let cls = site.theme == template['id'] ? 'selected':'';
                                let img = "/template/themeImg/"+template.face_image+'_'+template.id+'_0.gif';
                                let temname="编号："+template.name;
                                return (<li className={cls} onClick={()=>onChangeMenu(MENU_THEME,false,template)} key={index}>
                                    <div className="theme-b">
                                        <div className="theme-pc-b">
                                            <img src={img} />
                                            <div className="nun_wx">
                                                <div className="mask"></div><span>{temname}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="viewbox">
        <div className="viewbox_in">
            <iframe style={{width:'100%',height:'100%',overflowX:'hidden',border:'0'}} src={url} seamless="seamless" id="eidtIframe">
                
            </iframe>
        </div>
    </div>
    </div>
    );
  }
}
