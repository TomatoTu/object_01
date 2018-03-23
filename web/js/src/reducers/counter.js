const COMMON_REQUEST = 'INCREMENT_COUNTER';
const COMMON_SUCCESS = 'DECREMENT_COUNTER';
const COMMON_FAILURE = 'INCREMENT_COUNTER';
const COMMON_ERROR = 'DECREMENT_COUNTER';
import {createReducer} from '../common/createReducer';
import * as ActionTypes from '../constants/Common'
import {THEME_UPDATE} from '../manager/theme/constants/ActionTypes'

const initi={
	sites:[],
	templates:[],
	site:{
    language:{name:''}
  },
}

export const init = createReducer(initi, {
  // 切换按钮-订单列表
  [ActionTypes.COMMON_INIT_DATA](state, action) {
    return Object.assign({}, state,action.response);
  },
  // 切换按钮-订单列表
  [ActionTypes.CHANGE_SITE](state, action) {
    action.mdata();
    return state;
  },
  [THEME_UPDATE](state, action) {
  	$.RefreshPage();
    return state;
  },
});
