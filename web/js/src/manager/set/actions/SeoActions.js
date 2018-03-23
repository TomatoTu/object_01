import { ACTION_SET_SEO, SEO_REQUEST,SEO_SUCCESS, SEO_FAILURE,SEO_UPDATE_REQUEST,SEO_UPDATE_SUCCESS,SEO_UPDATE_FAILURE } from '../constants/ActionTypes';
import {Schemas} from '../schema/SeoSchemas';
import { CALL_API } from '../../../constants/Common';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetchSeo(api) {
  return {
    [CALL_API]: {
      types: [ SEO_REQUEST, SEO_SUCCESS, SEO_FAILURE ],
      endpoint: 'set/seo/'+api,
      schema: Schemas.USER,
      data:{}
    }
  }
}

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'set/seo/'+api,
      data:data
    }
  }
}

// seo信息必要字段
const requiredFields = ['page_title','page_keywords','page_description','footer_code','header_code'];


// 初始化seo数据
export function loadSeo() {
  return (dispatch, getState) => {
    const seo = getState().set.seo
    if (seo && requiredFields.every(key => seo.hasOwnProperty(key))) {
      return null
    }
    return dispatch(fetch('index',SEO_SUCCESS))
  }
}


// 组装action，请求访问连接。
// 依靠中间件api.js
function upDateSeo(api,data) {
  return {
    [CALL_API]: {
      types: [ SEO_UPDATE_REQUEST, SEO_UPDATE_SUCCESS, SEO_UPDATE_FAILURE ],
      endpoint: 'set/seo/'+api,
      schema: Schemas.USER,
      data:data
    }
  }
}


// 初始化seo数据
export function subSeo(data) {
  return (dispatch, getState) => {

    console.log('subSeo');

    const seo = getState().set.seo
    if (data && requiredFields.every(key => data.hasOwnProperty(key)&&data[key]===seo[key])) {
      return null
    }
    return dispatch(fetch('update',SEO_UPDATE_SUCCESS,data))
  }
}