import { PAGE_MENU,PAGE_REQUEST,PAGE_SUCCESS,PAGE_FAILURE,PAGE_UPDATE_REQUEST,PAGE_UPDATE_SUCCESS,PAGE_UPDATE_FAILURE,PAGE_CHANGE,PAGE_COPY,PAGE_DELETE,PAGE_SYS_SUCCESS,PAGE_CREATE_SUCCESS,PAGE_HIDE } from '../constants/ActionTypes';
import { CALL_API } from '../../../constants/Common';
import {isEmpty}  from '../../../common/utils/objects';

// 组装action，请求访问连接。
// 依靠中间件api.js
function fetch(api,type,data={}) {
  return {
    [CALL_API]: {
      successType:type,
      endpoint: 'page/page/'+api,
      data:data
    }
  }
}


// page信息必要字段
const requiredFields = ['id','parent_id','system_id','type','name','status','order_num','url','target'];
const updateRequiredFields = ['id','name','status','page_title','page_keywords','page_description','header_code','footer_code'];

// 初始化seo数据
export function loadPages() {
  return (dispatch, getState) => {
    // const pages = getState().page.pages
    // if (!isEmpty(pages)) {
    //   return null
    // }
    return dispatch(fetch('pages',PAGE_SUCCESS))
  }
}

// 更新普通页面
export function updatePages(data) {
  return (dispatch, getState) => {
    const pages = getState().page
    const page = pages.pagesObj[data['id']];
    if (data && updateRequiredFields.every(key => page.hasOwnProperty(key)&&data[key]===page[key])) {
      window.alert('没有修改的内容');
      return null
    }

    return dispatch(fetch('update',PAGE_UPDATE_SUCCESS,data))
  }
}

// 更新系统页面
export function updatePageSystem(data) {
  return (dispatch, getState) => {
    updateRequiredFields.push('system_id');
    const pages = getState().page
    const page = pages.pagesObj[data['id']];
    if (data && updateRequiredFields.every(key => page.hasOwnProperty(key)&&data[key]===page[key])) {
      window.alert('没有修改的内容');
      return null
    }
    return dispatch(fetch('update',PAGE_UPDATE_SUCCESS,data))
  }
}

// 创建页面
export function createPage(data) {
  return (dispatch, getState) => {
    if(data.type == '1' || data.type == '2' || data.type == '3' ){
      return dispatch(fetch('create',PAGE_CREATE_SUCCESS,data))
    }
  }
}

// 系统数据
export function loadSystems() {
  return (dispatch, getState) => {
    return dispatch(fetch('systems',PAGE_SYS_SUCCESS))
  }
}

// 切换页面数据
export function changePage(showId,e) {
    e.preventDefault();
    return {
      'type': PAGE_CHANGE,
      'showId':showId,
    }
}

// 复制页面
export function copyPage(pageId,e) {
    e.preventDefault();
    return (dispatch, getState) => {
        return dispatch(fetch('copy',PAGE_COPY,{id:pageId}))
    }
}

// 删除页面
export function deletePage(pageId,e) {
    e.preventDefault();
    return (dispatch, getState) => {
        return dispatch(fetch('delete',PAGE_DELETE,{id:pageId}))
    }
}

// 删除页面
export function updateMenu(res) {
    return (dispatch, getState) => {
        return dispatch(fetch('menu',PAGE_MENU,res))
    }
}
// 删除页面
export function pageHide() {
  return {
      'type': PAGE_HIDE,
    }
}