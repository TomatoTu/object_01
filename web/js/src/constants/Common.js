// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')
// export const API_ROOT = 'http://r1.35test.cn/'
export const API_ROOT = window.location.protocol+'//'+window.location.host+'/';
// export const API_ROOT = '/'
// export const API_ROOT = 'http://naples1.ding.com/'
export const DEFAULT_IMG = '/images/image-empty.png';
export const IMG_BASE_URL = 'http://r11.35test.cn/';
export const CSRF = document.getElementsByName("csrf-token")[0].content

export const COMMON_REQUEST = 'COMMON_REQUEST';
export const COMMON_SUCCESS = 'COMMON_SUCCESS';
export const COMMON_FAILURE = 'COMMON_FAILURE';
export const COMMON_ERROR = 'COMMON_ERROR';
export const COMMON_NORMAL = 'COMMON_NORMAL';
export const COMMON_REQUESTED = 'COMMON_REQUESTED';

export const COMMON_INIT_DATA = 'COMMON_INIT_DATA';
export const CHANGE_SITE = 'CHANGE_SITE';