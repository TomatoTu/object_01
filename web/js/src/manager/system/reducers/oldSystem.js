import { SYSTEM_SYSTEMS_SUCCESS,SYSTEM_LOAD_SUCCESS,SYSTEM_DELETE_SUCCESS,SYSTEM_CREATE_SUCCESS,SYSTEM_CHANGE,SYSTEM_BACK,MENUS_CHANGE } from '../constants/ActionTypes';
import ProductsReduces from './ProductReduces';
import ArticleReduces from './ArticleReduces';
import SystemProductReduces from './SystemProductReduces';


export default function System(state = {}, action) {
	if(action.type == SYSTEM_SYSTEMS_SUCCESS){
		if (action.response) {
			let{systems} = action.response;

	    	return Object.assign({}, state, {systems});
    	}
	}

	// 加载单系统页面
	if(action.type == SYSTEM_LOAD_SUCCESS){
		if (action.response) {
			action.response.system.productsObj =  getObj(action.response.system.products);
	    	return Object.assign({}, state,{system:Object.assign({}, state.system,{showSystemId:action.showSystemId,menu:'LIST',system:action.response.system}),isShowSystems:false})
    	}
	}

	//选择系统
	if(action.type == SYSTEM_CHANGE){
		let system = {};
		for(let key in state.systems){
			if(state.systems[key]['id'] != action.showSystemId){
				system = state.systems[key];
			}
		}
		return Object.assign({}, state,{system:Object.assign({}, state.system,{showSystemId:action.showSystemId,menu:'LIST',system}),isShowSystems:false})
	}

	//返回多系统选择
	if(action.type == SYSTEM_BACK){
		return Object.assign({}, state,{isShowSystems:true})
	}

	//删除系统
	if(action.type == SYSTEM_DELETE_SUCCESS){
		if (action.response) {
			var systems = [];
			for(let key in state.systems){
				if(state.systems[key]['id'] != action.response['id']){
					systems.push(state.systems[key]);
				}
			}

			return Object.assign({}, state,{systems})
		}
	}

	//新建页面
	if(action.type == SYSTEM_CREATE_SUCCESS){
		if (action.response) {
			var systems = [];
			for(let key in state.systems){
				systems.push(state.systems[key]);
			}
			systems.push(action.response);
			return Object.assign({}, state,{systems});
		}
	}

	//菜单切换
	if(action.type == MENUS_CHANGE){

		return Object.assign({}, state,{system:Object.assign({}, state.system,{menu:action.menu})});
	}

    return Object.assign({}, state,{system:SystemProductReduces(state.system, action)});
}

function getObj(pages){
	var Obj = {};
	pages.map(function(elem,index) {
		Obj[elem['id']] = elem;
	})

	return Obj;
}
