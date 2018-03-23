import * as ActionTypes from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'manager/'+api,
      data:data
    }
  }
}


// 加载产品
export function updateTheme(data) {
  return (dispatch, getState) => {
      // 加载产品（新建）
      return dispatch(fetch('theme',ActionTypes.THEME_UPDATE,data))
  }
}



