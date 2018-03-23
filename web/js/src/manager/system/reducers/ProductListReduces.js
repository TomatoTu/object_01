import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';
import Immutable from 'immutable';
import {sortBy} from '../../../common/utils/array'

const init = [];

export const products = createReducer(init, {
  // 加载产品列表
  [ActionTypes.PRODUCT_LIST_LOAD_SUCCESS](state, action) {

    return action.response;
  },
  // 置顶产品
  [ActionTypes.PRODUCT_LIST_TOP_SUCCESS](state, action) {

  	return Immutable.fromJS(sort(setTop(state,action.response))).toJS();
  },
  // 取消置顶产品
  [ActionTypes.PRODUCT_LIST_UNTOP_SUCCESS](state, action) {

    return Immutable.fromJS(sort(setTop(state,action.response))).toJS();
  },
  // 删除产品
  [ActionTypes.PRODUCT_LIST_DELETE_SUCCESS](state, action) {

    return del(state,action.response);
  },
  // 多产品删除
  [ActionTypes.PRODUCT_LIST_DELETE_MANY_SUCCESS](state, action) {

    return delMany(state,action.response);
  },
  // 多产品删除
  [ActionTypes.PRODUCT_LIST_DELETE_ALL_SUCCESS](state, action) {

    return [];
  },
});

function sort(arr){
	arr.sort(sortBy('id',true));
	arr.sort(sortBy('order_num',true));
	arr.sort(sortBy('is_top',true));
	return arr;
}

function del(arr,id){
	var newArr=[];
	for(let i in arr){
		if(arr[i]['id'] != id){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
function delMany(arr,ids){

	var newArr=[];
	for(let i in arr){
		if(!inArray(arr[i]['id'],ids)){
			newArr.push(arr[i]);
		}
		
	}
	return newArr;
}
function setTop(arr,obj){
	for(let i in arr){
		if(arr[i]['id'] == obj['id']){
			arr[i]['is_top'] = obj['is_top'];
		}
	}

	return arr;
}

function inArray(needle,array,bool){
	if(typeof needle=="string"||typeof needle=="number"){
	    var len=array.length;
		for(var i=0;i<len;i++){
			if(needle===array[i]){
				if(bool){
					return i;
				}
				return true;
			}
		}
		return false;
	}
}