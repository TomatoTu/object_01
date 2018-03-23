"use strict"
import { CALL_API } from '../../constants/Common';

// 组装action，请求访问连接。
// 依靠中间件api.js
export function fetch(api,type,data={},mdata={}) {
  return {
    [CALL_API]: {
      successType:type,
      isShowSuccess:false,
      endpoint: api,
      data:data,
      mdata:mdata
    }
  }
}