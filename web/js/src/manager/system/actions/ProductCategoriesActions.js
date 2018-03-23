import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'system/categories/'+api,
      data:data
    }
  }
}

function fetchAndCompleted(api,type,completeType,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      completeType:completeType,
      endpoint: 'system/categories/'+api,
      data:data
    }
  }
}

// 加载产品
export function loadCategoriesForProduct(system_id=0) {
  return (dispatch, getState) => {
      return dispatch(fetch('loadcategories',ActionTypes.CATEGORIES_PRODUCT_LOAD_SUCCESS,{system_id}))
  }
}

// 加载产品
export function loadCategories(system_id=0) {
  return (dispatch, getState) => {
      return dispatch(fetchAndCompleted('loadcategories',ActionTypes.CATEGORIES_LOAD_SUCCESS,ActionTypes.CTL_LOAD_COMPLETED,{system_id}))
  }
}

// 提交产品
export function submitCategories(data) {
  if(data['id'] == '-1'){
    data['is_new'] = 1;
  }else{
    data['is_new'] = 0;
  }
  data['seo'] = JSON.stringify(data['seo']);
  return (dispatch, getState) => {
    return dispatch(fetchAndCompleted('update',ActionTypes.CATEGORIES_UPDATE_SUCCESS,ActionTypes.CTL_CLOSE_CATEGORY,data))
  }
}

// 删除产品
export function deleteCategory(id) {
  return (dispatch, getState) => {
    return dispatch(fetch('delete',ActionTypes.CATEGORIES_DELETE_SUCCESS,{id}))
  }
}


