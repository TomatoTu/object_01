import React, { Component, PropTypes } from 'react';
import { MENU_INFO, MENU_SEO, MENU_CONTACT } from '../constants/ActionTypes';

const MENU_DESIGN = 'DESIGN';

export default class LeftMenu extends Component {



  checkCur(menu){
    if(this.props.setMenu == menu){
        return 'cur';
    }
    return '';
  }

  render() {

    const { setMenu,onSetMenuChange} = this.props;

    return (
        <div className="slide-left-box">
            <div className="slide-left-menu-scroll scroll-div">
                <div className="slide-left-menu">
                    <div className="slide-close" onClick={() => this.props.onChangeMenu(MENU_DESIGN)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
                    <div className="menu-list">
                        <ul>
                            <li className={this.checkCur(MENU_INFO)} onClick={() => onSetMenuChange(MENU_INFO)}>
                                <div className="li-link"> <i className="icon-design icon-siteInfo"></i> <span className="span_name">网站信息</span> </div>
                            </li>
                            <li className={this.checkCur(MENU_SEO)} onClick={() => onSetMenuChange(MENU_SEO)}>
                                <div className="li-link"> <i className="icon-design icon-SEO"></i> <span className="span_name">SEO</span> </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
