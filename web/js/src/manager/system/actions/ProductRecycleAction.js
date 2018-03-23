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
    return dispatch(fetch('productlistrecycle',ActionTypes.PRODUCT_LIST_LOAD_SUCCESS,{'system_id':systemId}))
  }
}

// 删除产品
export function deleteProduct(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('delete',ActionTypes.PRODUCT_LIST_DELETE_SUCCESS,{id}))
  }
}

// 批量删除产品
export function deleteManyProduct(ids) {
  if(ids.length == 0){
    return [];
  }
  return (dispatch, getState) => {
    return dispatch(fetch('deletemany',ActionTypes.PRODUCT_LIST_DELETE_MANY_SUCCESS,{ids:ids}))
  }
}

// 删除所有产品
export function deleteAllProduct(systemId) {
  return (dispatch, getState) => {
    return dispatch(fetch('deleteall',ActionTypes.PRODUCT_LIST_DELETE_ALL_SUCCESS,{'system_id':systemId}))
  }
}

// 还原产品
export function recoveryProduct(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('recovery',ActionTypes.PRODUCT_LIST_DELETE_SUCCESS,{id}))
  }
}

// 批量还原产品
export function recoveryManyProduct(ids) {
  if(ids.length == 0){
    return [];
  }
  return (dispatch, getState) => {
    return dispatch(fetch('recoverymany',ActionTypes.PRODUCT_LIST_DELETE_MANY_SUCCESS,{ids:ids}))
  }
}