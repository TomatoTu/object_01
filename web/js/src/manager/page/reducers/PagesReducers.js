import { PAGE_MENU,PAGE_HIDE,PAGE_REQUEST,PAGE_SUCCESS,PAGE_FAILURE,PAGE_UPDATE_REQUEST,PAGE_UPDATE_SUCCESS,PAGE_UPDATE_FAILURE,PAGE_CHANGE,PAGE_COPY,PAGE_DELETE,PAGE_SYS_SUCCESS,PAGE_CREATE_SUCCESS } from '../constants/ActionTypes';
import Immutable from 'immutable';
const initialState = Immutable.fromJS({ isAuth: false })
export default function pages(state={}, action) {
	if(action.type == PAGE_SUCCESS){
		if (action.response) {
			let{pages,systems} = action.response;
			let pagesO = setPages(pages);
	    	return Object.assign({}, pagesO,{showid:pagesO.pagesArr[0]['id'],systems,isshow:true})
    	}
	}

	if(action.type == PAGE_MENU){
		if (action.response) {
			// $.RefreshPage();
			let{pages,systems} = action.response;
			let pagesO = setPages(pages);
	    	return Object.assign({}, pagesO,{showid:pagesO.pagesArr[0]['id'],systems,isshow:true})
    	}
	}

	// 请求更新
	if(action.type == PAGE_UPDATE_SUCCESS){
		if (action.response) {
			// $.RefreshPage();
			for(let key in state.pages){
				if(state.pages[key]['id'] == action.response['id']){
					state.pages[key] = action.response;
				}
			}

	    	return Object.assign({}, state, setPages(state.pages))
    	}
	}

	//更新system
	if(action.type == PAGE_SYS_SUCCESS){
		if (action.response) {
			return Object.assign({}, state, {systems:action.response})
		}
	}

	//新建页面
	if(action.type == PAGE_CREATE_SUCCESS){
		if (action.response) {
			state.pages.push(action.response);
			return Object.assign({}, state, setPages(state.pages),{showid:action.response['id']})
		}
	}

	// 切换页面
	if(action.type == PAGE_CHANGE){
		console.log('切换页面id：'+action.showId);
		return Object.assign({}, state, {showid:action.showId,page:state.pagesObj[action.showId]})
	}

	// 复制页面
	if(action.type == PAGE_COPY){
		if (action.response) {
			state.pages.push(action.response);
			return Object.assign({}, state, setPages(state.pages),{showid:action.response['id']})
		}
	}

	// 复制页面
	if(action.type == PAGE_HIDE){
			return Object.assign({}, state, {isshow:false});
	}

	// 删除页面
	if(action.type == PAGE_DELETE){
		if (action.response) {
			var deleteKey = 0;
			for(let key in state.pages){
				if(state.pages[key]['id'] == action.response['id']){
					deleteKey = key;
				}
			}
			let del = state.pages.splice(deleteKey, 1);
			let pages = setPages(state.pages);
			let showid = {};
			if(state.showid == del[0]['id']){
				showid = {showid:pages.pagesArr[0]['id']}
			}
			return Object.assign({}, state, pages,showid)
		}
	}

    return state;
}

function setPages(pages){
	var Arr = {};
	var Obj = {};
	pages.map(function(elem,index) {

		if(!Arr[elem['parent_id']]) Arr[elem['parent_id']]=[];

		Arr[elem['parent_id']].push(elem);
		Obj[elem['id']] = elem;
	})
	var pagesArr = [];
	pages.map(function(elem,index) {

		if(Arr[elem['id']]){
			elem['spages'] = Arr[elem['id']];
		}

		if(elem['parent_id'] == '0'){
			pagesArr.push(elem);
		}
	})

	return {pagesArr:pagesArr,pages:pages,pagesObj:Obj};
}
