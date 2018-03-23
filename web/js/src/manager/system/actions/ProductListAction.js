import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'system/productlist/'+api,
      data:data
    }
  }
}

// 进入产品列表
export function loadProductList(systemId) {
  return (dispatch, getState) => {
    return dispatch(fetch('productlist',ActionTypes.PRODUCT_LIST_LOAD_SUCCESS,{'system_id':systemId}))
  }
}

// 删除产品
export function deleteProduct(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('deleter',ActionTypes.PRODUCT_LIST_DELETE_SUCCESS,{id}))
  }
}

// 置顶产品
export function topProduct(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('top',ActionTypes.PRODUCT_LIST_TOP_SUCCESS,{id}))
  }
}

// 取消置顶产品
export function untopProduct(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('untop',ActionTypes.PRODUCT_LIST_UNTOP_SUCCESS,{id}))
  }
}

// 批量删除产品
export function deleteManyProduct(ids) {
  if(ids.length == 0){
    return [];
  }
  return (dispatch, getState) => {
    return dispatch(fetch('deletemanyr',ActionTypes.PRODUCT_LIST_DELETE_MANY_SUCCESS,{ids:ids}))
  }
}