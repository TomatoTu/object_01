import * as ActionTypes from '../constants/ActionTypes';
import {createReducer} from '../../../common/createReducer';
import Immutable from 'immutable';
import {sortBy} from '../../../common/utils/array'

const init = {
	options:[],
	items:[],
	groups:[],
};

export const product = createReducer(init, {
  // 新建产品
  [ActionTypes.PRODUCT_CREATE_SUCCESS](state, action) {
	
    return Object.assign({}, state,action.response);
  },
  // 加载产品
  [ActionTypes.PRODUCT_LOAD_SUCCESS](state, action) {

  	return Object.assign({}, state,action.response);
  },
  // 提交产品
  [ActionTypes.PRODUCT_SUBMIT_SUCCESS](state, action) {

    return Object.assign({}, state,action.response);
  },
  // before产品属性
  [ActionTypes.PRODUCT_BEFORE_OPTIONS](state, action) {

    return Object.assign({}, state,action.response);
  },
  // 产品属性
  [ActionTypes.PRODUCT_UPDATE_OPTIONS](state, action) {
  	for(let group of state.groups){
  		if(!group.itemArr){
  			group.itemArr = group.items.split(',');
  		}
  	}
  	const aaa=setGroup(Immutable.fromJS(action.data.options),state);
  	console.log(aaa);
    return Object.assign({}, state,aaa);
  },
});


function setGroup(nOptions,product){


    product = Immutable.fromJS(product);
	const {items,itemsMap,options,optionsMap,optionsItems,groups} = getOld(product);

	const {newOptions,newOptionsMap,newItems,newItemsMap,newOptionsItems} = getNew(nOptions,itemsMap.keySeq(),optionsMap.keySeq());

	// 属性为空
	if(newOptions.size == 0){
		return {options:[],items:[],groups:[]};
	}

	// group为空，属性全新建
	if(groups.size == 0){

		return {options:newOptions.toJS(),items:newItems.toJS(),groups:groupCase1(newOptionsItems,product)};
	}

	let newGroups = Immutable.List([]);
	newGroups = newGroups.concat(groups);

	let {deleteArr:deleteOptions,addArr:addOptions} = compareObj(optionsItems,newOptionsItems);
	const {deleteArr:deleteItemsPre,addArr:addItemsPre} = compareObj(itemsMap,newItemsMap);

	const {sameArr:sameArr,newItems:deleteItems} = compareItems(optionsItems,deleteItemsPre);
	const {newItems:addItems} = compareItems(newOptionsItems,addItemsPre);

	for(let same of sameArr){
		if(!deleteOptions.includes(same)){
			deleteOptions = deleteOptions.push(same);
			addOptions = addOptions.push(same);
		}
	}

	if(Immutable.is(deleteOptions.keySeq(), optionsMap.keySeq())){
		return {options:newOptions.toJS(),items:newItems.toJS(),groups:groupCase1(newOptionsItems,product)};
	}

	if(Immutable.is(deleteItems.keySeq(), itemsMap.keySeq())){
		return {options:newOptions.toJS(),items:newItems.toJS(),groups:groupCase1(newOptionsItems,product)};
	}


	newGroups = deleteOptionsFunc(deleteOptions,options,newGroups);

	newGroups = deleteItemsFunc(deleteItems,itemsMap,options,newGroups);

	newGroups = addOptionsFunc(addOptions,newOptionsItems,newOptions,newGroups);

	newGroups = addItemsFunc(addItems,newOptionsItems,newOptions,newGroups);

	return {options:newOptions.toJS(),items:newItems.toJS(),groups:newGroups.toJS()};
}

function addItemsFunc(addItems,newOptionsItems,newOptions,groups){
	if(addItems.size == 0) return groups;
	let addIndexs = Immutable.Map({});
	let options = Immutable.Map({});
	addItems.map(function(itemId,index){
		let optionId = newOptionsItems.findKey((items)=>items.includes(itemId));
		let optionIndex = newOptions.findKey((option)=>option.get('id')==optionId);

		if(!options.get({optionId,optionIndex})){
			options = options.set({optionId,optionIndex},Immutable.List([]));
		}
		options = options.map((x,{optionId:key})=>key==optionId?x.push(itemId):x);
		// options = options.set({optionId,optionIndex},options.get({optionId,optionIndex}).push(itemId));
	})

	options.map(function(items,{optionId,optionIndex}){
		let fiterGroup = deleteGroup(optionIndex,groups)

		items.map(function(itemId){
			groups = groups.concat(combination(fiterGroup,itemId,optionIndex));
		})
	});

	return groups;
}

function addOptionsFunc(addOptions,newOptionsItems,newOptions,groups){
	if(addOptions.size == 0) return groups;
	let addIndexs = Immutable.Map({});
	
	addOptions.map(function(optionId,index){
		let optionIndex = newOptions.findKey((option)=>option.get('id')==optionId);

		addIndexs = addIndexs.set(optionIndex,optionId);
	})

	addIndexs = addIndexs.sort();

	addIndexs.map(function(optionId,optionIndex){
		let newGroups = Immutable.List([]);
		for(let itemId of newOptionsItems.get(optionId)){
			newGroups = newGroups.concat(combination(groups,itemId,optionIndex));
		}
		groups = newGroups;
	})
	return groups;
}

function deleteItemsFunc(deleteItems,itemsMap,options,groups){
	if(deleteItems.size == 0) return groups;
	deleteItems.map(function(itemId,index){
		let optionId = itemsMap.getIn([itemId,'options_id']);
		let optionIndex = options.findKey((option)=>option.get('id')==optionId);

		groups = delteGroupsByitem(optionIndex,itemId,groups);
	})

	return groups;
}

function delteGroupsByitem(optionIndex,itemId,groups){
	let newGroups = Immutable.List([]);

	for(let group of groups){
		if(group.getIn(['itemArr',optionIndex]) != itemId){
			newGroups = newGroups.push(group);
		}
	}

	return newGroups;
}

function deleteOptionsFunc(deleteOptions,options,groups){
	if(deleteOptions.size == 0) return groups;
	let deleteIndexs = Immutable.List([]);
	deleteOptions.map(function(optionId,index){
		let optionIndex = options.findKey((option)=>option.get('id')==optionId);
		deleteIndexs = deleteIndexs.push(optionIndex);
	})

	deleteIndexs = deleteIndexs.sort();

	for(let i=deleteIndexs.size-1;i>=0;i--){
		groups = deleteGroup(deleteIndexs.get(i),groups);
	}

	return groups;
}

function deleteGroup(index,groups){
	let newGroups = Immutable.List([]);
	let groupsMap = Immutable.Map({});
	for(let group of groups){

		group = group.set('itemArr',group.get('itemArr').delete(index));
		groupsMap = groupsMap.set(group.get('itemArr').join('_'),group);
		newGroups = newGroups.push(group);
	}

	return Immutable.fromJS(groupsMap.valueSeq().toJS());
}

function compareObj(obj1,obj2){

	let deleteArr = Immutable.List([]);
	let addArr  = Immutable.List([]);

	obj1.map(function(obj,id){
		if(!obj2.has(id)){
			deleteArr = deleteArr.push(id);
		}
	})

	obj2.map(function(obj,id){
		if(!obj1.has(id)){
			addArr = addArr.push(id);
		}
	})

	return {deleteArr,addArr};
}

function compareItems(optionsItems,deleteItems){
	let sameArr = Immutable.List([]);
	
	let newItems  = Immutable.List([]);
	optionsItems.map(function(items,optionId){

		let inItems  = Immutable.List([]);
		// 判断属性下是否全删除
		for(let itemId of items){
			if(deleteItems.includes(itemId)){
				inItems = inItems.push(itemId);
			}
		}
		if(inItems.size == items.size){
			sameArr = sameArr.push(optionId);
		}else{
			newItems= newItems.concat(inItems);
		}
	})

	return {sameArr,newItems};
}

function getOld(product){

	let items = product.get('items');
	let itemsMap = Immutable.fromJS({});
	let options = product.get('options');
	let optionsMap = Immutable.fromJS({});
	let groups = product.get('groups');

	let optionsItems = Immutable.Map({});

	items.map(function(item){

		itemsMap = itemsMap.set(item.get('id'),item);

		if(!optionsItems.get(item.get('options_id'))){
			optionsItems = optionsItems.set(item.get('options_id'),Immutable.List([]));
		}
		optionsItems = optionsItems.set(item.get('options_id'),optionsItems.get(item.get('options_id')).push(item.get('id')));
	});

	options.map(function(option){

		optionsMap = optionsMap.set(option.get('id'),option);
	});



	return {items,itemsMap,options,optionsMap,optionsItems,groups};
}


function getNew(options,itemKeys,optionKeys){

	let newItems = Immutable.List([]);
	let newItemsMap = Immutable.Map({});
	let newOptionsMap = Immutable.Map({});
	let newOptionsItems = Immutable.Map({});
	optionKeys = Immutable.fromJS(optionKeys.toJS());
	itemKeys = Immutable.fromJS(itemKeys.toJS());

	let newOptions = Immutable.List([]);

	for(let option of options){

		if(option.get('title') == ''){
			continue;
		}

		const resId = checkId(option,optionKeys);
		option = resId.obj;
		optionKeys = resId.Keys;

		let itemsList = Immutable.List([]);
		for(let item of option.get('items')){

			if(item.get('content') == ''){
				continue;
			}

			const resId = checkId(item,itemKeys);
			item = resId.obj;
			itemKeys = resId.Keys;

			item = item.set('options_id',option.get('id'));

			// array，obj，关系
			newItems = newItems.push(item);
			newItemsMap = newItemsMap.set(item.get('id'),item);
			itemsList = itemsList.push(item.get('id'));
		}

		if(itemsList.size == 0){
			continue;
		}

		// array，obj，关系
		newOptionsMap =newOptionsMap.set(option.get('id'),option);
		newOptions = newOptions.push(option);
		newOptionsItems = newOptionsItems.set(option.get('id'),itemsList);
	}


	return {newOptions,newOptionsMap,newItems,newItemsMap,newOptionsItems};
}

function checkId(obj,Keys){
	if(obj.get('id')==null){
		let id = getId(Keys,0);
		obj = obj.set('id',id);
		Keys = Keys.push(id);
	}
	
	return {obj,Keys};
}

function getId(Keys,i){
	return Keys.includes(i)?getId(Keys,++i):i;
}

function groupCase1(optionsItems,product){
	let size = optionsItems.valueSeq().size;
	var groups = Immutable.List([]);
	// var newgroups = Immutable.List([]);

	const ItemsValue = optionsItems.valueSeq();
	for(let itemId of ItemsValue.get(0)){
		groups = groups.push(Immutable.fromJS({
			itemArr:[itemId],
			// itemsName:[newItemsMap.getIn([itemId,'content'])],
			inventory:product.get('inventory'),
			sale_price:product.get('sale_price'),
			price:product.get('price'),
		}));
	}

	if(ItemsValue.size == 1){
		
		return groups.toJS();
	}


	for(let i=1;i<size;i++){
		var newgroups = Immutable.List([]);
		for(let itemId of ItemsValue.get(i)){
			newgroups = newgroups.concat(combination(groups,itemId,i));
			console.log('itemId',newgroups);
		}
		groups = newgroups;
		console.log('groups',groups.toJS());
	}
	console.log('all',groups.toJS());
	return groups.toJS();
}

function groupCase2(groups,options,optionsItems,newItemsMap){
	// var newgroups = Immutable.List([]);
	// var restOptions = Immutable.List({});
	// options.map(function(option,index){
	// 	if(option.get('is_new')){
	// 		for(let itemId of optionsItems.get(option.get('id'))){
	// 			newgroups = newgroups.concat(combination(groups,itemId,index,newItemsMap.getIn([itemId,'content'])));
	// 		}
	// 		groups = newgroups;
	// 	}else{
	// 		restOptions.set(index,option);
	// 	}
	// })

	// restOptions.map(function(option,index){
	// 	for(let itemId of optionsItems.get(option.get('id'))){
	// 		newgroups = newgroups.concat(combination(groups,itemId,index,newItemsMap.getIn([itemId,'content'])));
	// 	}
	// }
}

function combination(groups,itemId,i){
	let newGroups = Immutable.List([]);
	for(let group of groups){
		group = group.set('itemArr',group.get('itemArr').insert(i,itemId));
		// group = group.set('itemsName',group.get('itemsName').insert(i,itemName));
		newGroups = newGroups.push(group);
	}
	return newGroups;
}