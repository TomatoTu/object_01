import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';
import Immutable from 'immutable';
import {sortBy} from '../../../common/utils/array'

const init = {

};

export const set = createReducer(init, {
  // 加载
  [ActionTypes.SYSTEM_LOAD_SUCCESS](state, action) {
	
    return Object.assign({}, state,action.response);
  },
  // 提交
  [ActionTypes.SYSTEM_SUBMIT_SUCCESS](state, action) {
  
    return Object.assign({}, state,action.response);
  },
});