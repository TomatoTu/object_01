import * as actionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'system/system/'+api,
      data:data
    }
  }
}


// 切换按钮-订单列表
export function menuOrderList() {
  return {type:actionTypes.MENU_ORDER_LIST}
}

// 切换按钮-订单详情
export function menuOrder(order,status) {
  return {type:actionTypes.MENU_ORDER_SINGLE,order,status}
}

// 切换按钮-会员列表
export function menuMemberList() {
  return {type:actionTypes.MENU_MEMBER_LIST}
}

// 切换按钮-会员详细
export function menuMember(member) {
  return {type:actionTypes.MENU_MEMBER_SINGLE,member}
}

// 切换按钮-评论列表
export function menuCommentList() {
  return {type:actionTypes.MENU_COMMENT_LIST}
}

// 切换按钮-评论详细
export function menuComment(comment) {
  return {type:actionTypes.MENU_COMMENT_SINGLE,comment}
}

// 切换按钮-会员新建
export function menuMemberCreate() {
  return {type:actionTypes.MENU_MEMBER_CREATE}
}

// 切换按钮-支付
export function menuPay() {
  return {type:actionTypes.MENU_PAYMENT}
}

// 切换按钮-商城
export function menuStore() {
  return {type:actionTypes.MENU_STOREMENT}
}