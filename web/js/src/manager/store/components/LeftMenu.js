import React, { Component, PropTypes } from 'react';
import { MENU_INFO, MENU_SEO, MENU_CONTACT } from '../constants/ActionTypes';
// 共同字段
import * as ActionTypes from '../constants/ActionTypes'

const MENU_DESIGN = 'DESIGN';

export default class LeftMenu extends Component {



  checkCur(menu){
    if(this.props.menu.name == menu){
        return 'cur';
    }
    return '';
  }

  render() {

    const { menu,...Actions} = this.props;

    return (
        <div className="slide-left-box">
            <div className="slide-left-menu-scroll scroll-div">
                <div className="slide-left-menu">
                    <div className="slide-close" onClick={() => this.props.onChangeMenu(MENU_DESIGN)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
                    <div className="menu-list">
                        <ul>
                            <li className={this.checkCur(ActionTypes.MENU_ORDER_LIST)} onClick={Actions.menuOrderList}>
                                <div className="li-link"> <i className="icon-design icon-sysSet1"></i> <span className="span_name">订单管理</span> </div>
                            </li>
                            <li className={this.checkCur(ActionTypes.MENU_COMMENT_LIST)} onClick={Actions.menuCommentList}>
                                <div className="li-link"> <i className="icon-design icon-sysSet2"></i> <span className="span_name">评论管理</span> </div>
                            </li>
                            <li className={this.checkCur(ActionTypes.MENU_MEMBER_LIST)} onClick={Actions.menuMemberList}>
                                <div className="li-link"> <i className="icon-design icon-sysSet3"></i> <span className="span_name">会员管理</span> </div>
                            </li>
                            <li className={this.checkCur(ActionTypes.MENU_PAYMENT)} onClick={Actions.menuPay}>
                                <div className="li-link"> <i className="icon-design icon-sysSet4"></i> <span className="span_name">支付设置</span> </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
