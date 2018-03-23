import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'system/article/'+api,
      data:data
    }
  }
}

function fetchAndCompleted(api,type,completeType,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      completeType:completeType,
      endpoint: 'system/article/'+api,
      data:data
    }
  }
}

// // 加载产品（新建）
// function createProduct() {
//   return (dispatch, getState) => {
//     return dispatch(fetch('create',ActionTypes.PRODUCT_CREATE_SUCCESS))
//   }
// }

// 加载产品
export function load(id=0,system_id=0) {
  return (dispatch, getState) => {
    if(id == 0){
      // 加载产品（新建）
      return dispatch(fetchAndCompleted('create',ActionTypes.PRODUCT_CREATE_SUCCESS,ActionTypes.CTL_LOAD_COMPLETED,{system_id}))
    }else{
      return dispatch(fetchAndCompleted('load',ActionTypes.PRODUCT_LOAD_SUCCESS,ActionTypes.CTL_LOAD_COMPLETED,{id,system_id}))
    }
  }
}

// 提交产品
export function update(data) {
  data['resources'] = JSON.stringify(data['resources']);
  return (dispatch, getState) => {
    return dispatch(fetch('update',ActionTypes.CTL_MENUS_CHANGE,data))
  }
}


