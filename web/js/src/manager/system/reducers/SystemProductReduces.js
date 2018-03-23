import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';

const initi = {}

export const SystemProductReduces = createReducer(initi, {
  [ActionTypes.PRODUCT_SYSTEM_LOAD_SUCCESS](state, action) {
  	if (action.response) {
  		return Object.assign({}, state,action.response);
  	}
  }
});