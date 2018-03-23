import React, { Component } from 'react';
import { connect } from 'react-redux';

// action
import * as Actions from '../actions/CtlActions';


// 共同字段
import * as ActionTypes from '../constants/ActionTypes'
// 模板层
import Mask from '../components/Mask';
// 左边按钮
import LeftMenu from '../components/LeftMenu';

// 订单
import OrderList from '../components/order/OrderList';
import Order from '../components/order/Order';

// 评论
import CommentList from '../components/comment/CommentList';
import Comment from '../components/comment/Comment';

// 会员
import MemberList from '../components/member/MemberList';
import Member from '../components/member/Member';

// 支付
import Pay from '../components/pay/Pay';
// 商城
import Store from '../components/store/Store';


class StoreApp extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    $(this.refs.storesroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  getComponent(menuStr){
    if(this.props.menu.name == menuStr){
      return true;
    }
    return false;
  }
  render() {
    return (
  		<div className="slide-edit-containt"> 
  			<Mask />
        <div className="slide-edit-containt-in"> 
          <LeftMenu {...this.props}/>
          <div className="slide-right-body">
              <div className="slide-body-in" style={{overflow: 'hidden',width: 'auto',height: '100%'}} ref='storesroll'> 
                {::this.getComponent(ActionTypes.MENU_ORDER_LIST)    && <OrderList />}
                {::this.getComponent(ActionTypes.MENU_ORDER_SINGLE)  && <Order order={this.props.menu.order} cstatus={this.props.menu.status}/>}
                {::this.getComponent(ActionTypes.MENU_COMMENT_LIST)   && <CommentList />}
                {::this.getComponent(ActionTypes.MENU_COMMENT_SINGLE) && <Comment />}
                {::this.getComponent(ActionTypes.MENU_MEMBER_LIST)   && <MemberList />}
                {::this.getComponent(ActionTypes.MENU_MEMBER_SINGLE) && <Member />}
                {::this.getComponent(ActionTypes.MENU_PAYMENT)       && <Pay />}
                {::this.getComponent(ActionTypes.MENU_STOREMENT)     && <Store />}
              </div>
          </div>
        </div>
  		</div>
    );
  }
}

function menu(state) {
  return {
    menu: state.store.ctl.menu,
  };
}

export default connect(menu,{...Actions})(StoreApp);