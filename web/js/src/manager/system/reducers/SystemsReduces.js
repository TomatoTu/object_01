import * as actionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';



export default function Systems(state = [], action) {

	// 加载多系统
	if(action.type == actionTypes.SYSTEMS_LOAD_SUCCESS){
		if (action.response) {
			let {systems} = action.response;
	    	return systems;
    	}
	}

	//删除系统
	if(action.type == actionTypes.SYSTEMS_DELETE_SUCCESS){
		if (action.response) {
			var systems = [];
			for(let key in state){
				if(state[key]['id'] != action.response['id']){
					systems.push(state[key]);
				}
			}

			return systems;
		}
	}

	//新建系统
	if(action.type == actionTypes.SYSTEMS_CREATE_SUCCESS){
		if (action.response) {
			let newState = [];
			for(let val of state){
				newState.push(val);
			}
			newState.push(action.response);
			return newState;
		}
	}

	return state;
}