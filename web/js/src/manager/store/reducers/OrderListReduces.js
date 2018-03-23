import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
  cur:0,
  status:10,
  orders:[],
  count:0,
  size:20,
}

export const orderList = createReducer(initi, {
  // 切换按钮-订单列表
  [ActionTypes.ORDERLIST_LOAD](state, action) {
    return Object.assign({}, state,action.response);
  },
  // 切换按钮-订单详情
  [ActionTypes.ORDER_LOAD](state, action) {
    return Object.assign({}, state,action.response);
  },
  // 切换按钮-会员列表
  [ActionTypes.ORDER_CANCEL](state, action) {
    return Object.assign({}, state,action.response);
  },
  // 切换按钮-会员详细
  [ActionTypes.ORDER_PAY](state, action) {
    return Object.assign({}, state,action.response);
  },
  // 切换按钮-会员新建
  [ActionTypes.ORDER_SHIP](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 切换按钮-支付
  [ActionTypes.ORDER_RECEIV](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 切换按钮-商城
  [ActionTypes.ORDER_DELETE](state, action) {
    return Object.assign({}, state,action.response);
  },
});
