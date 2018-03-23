import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {
	menu:{
    name:ActionTypes.MENU_ORDER_LIST,
    status:10,
  },
}

export const ctl = createReducer(initi, {
  // 订单
  [ActionTypes.MENU_ORDER_LIST](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 
  [ActionTypes.MENU_ORDER_SINGLE](state, action) {
    return Object.assign({}, state,{menu:{name:action.type,order:action.order,status:action.status}});
  },
  // 会员
  [ActionTypes.MENU_MEMBER_LIST](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 
  [ActionTypes.MENU_MEMBER_SINGLE](state, action) {
    return Object.assign({}, state,{menu:{name:action.type,member:action.member}});
  },

  // 评论
  [ActionTypes.MENU_COMMENT_LIST](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 
  [ActionTypes.MENU_COMMENT_SINGLE](state, action) {
    return Object.assign({}, state,{menu:{name:action.type,comment:action.comment}});
  },
  
  // 
  [ActionTypes.MENU_PAYMENT](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
  // 
  [ActionTypes.MENU_STOREMENT](state, action) {
    return Object.assign({}, state,{menu:{name:action.type}});
  },
});
