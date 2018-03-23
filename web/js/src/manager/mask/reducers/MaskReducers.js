import {COMMON_REQUEST,COMMON_SUCCESS,COMMON_FAILURE,COMMON_ERROR,COMMON_NORMAL,COMMON_REQUESTED} from '../../../constants/Common'


export default function status(state = 0, action) {
	switch (action.type) {
		case COMMON_REQUEST:
			return COMMON_REQUEST;
		case COMMON_SUCCESS:
			return COMMON_SUCCESS;
		case COMMON_FAILURE:
			return COMMON_FAILURE;
		case COMMON_ERROR:
			return COMMON_ERROR;
		case COMMON_NORMAL:
			return COMMON_NORMAL;
		case COMMON_REQUESTED:
			return COMMON_NORMAL;
		default:
			return state;
	}
}