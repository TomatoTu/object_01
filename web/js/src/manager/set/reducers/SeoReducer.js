import { ACTION_SET_SEO, SEO_REQUEST,SEO_SUCCESS, SEO_FAILURE,SEO_UPDATE_REQUEST,SEO_UPDATE_SUCCESS,SEO_UPDATE_FAILURE } from '../constants/ActionTypes';


export default function seo(state = {}, action) {
	if(action.type == SEO_SUCCESS){
		if (action.response) {
	    	return Object.assign({}, state, action.response)
    	}
	}

	if(action.type == SEO_UPDATE_SUCCESS){
		if (action.response) {
	    	return Object.assign({}, state, action.response)
    	}
	}

    return state;
}
