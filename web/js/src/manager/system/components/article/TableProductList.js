import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {deleteProduct,topProduct,untopProduct,deleteManyProduct} from '../../actions/ArticleListAction';
import {inArray,ArrayUtils} from '../../../../common/utils/array';
import CheckBox from '../CheckBox';
import {changeEdit} from '../../actions/CtlAction';


class TableProductList extends Component {
  // 初始化
  constructor(props, context) {
    super(props, context);
    this.state = {
      cur:0,
      size:10,
      checked:[],
      checkedIndex:[],
      productsCur:[],
      products:[],
      checkAll:false
    }
  }
  // 分页动作
  handlePagination(cur){
  	this.setState({
      cur,
      checked:[],
      checkedIndex:[],
      checkAll:false
    });
  }
  // 获取文章信息和当前分页展示文章
  changState(){
    const {products} = this.props;
    const {cur,size} = this.state;
    const dataC = products.concat();
    const showData = dataC.splice(cur*size,size);
    return {
      productsCur:showData,
      products:products,
    };
  }
  // 勾选动作
  handleCheckBox(checked){
    const {productsCur,products} = this.changState();
    let checkedArr = this.state.checked;
    // let productsCur = this.state.productsCur;
    let checkAll = this.state.checkAll;

    if(ArrayUtils.inArray(checkedArr,checked)){
      checkedArr = ArrayUtils.remove(checkedArr,checked);
    }else{
      checkedArr.push(checked);
    }

    if(checkedArr.length == productsCur.length){
      checkAll = true;
    }else{
      checkAll = false;
    }

    this.setState({
      checked:checkedArr,
      checkAll,
    });
  }
  // 选择全部
  handleCheckBoxAll(){
    const {productsCur,products} = this.changState();
    const {checkAll} = this.state;
    let checkedArr = [];

    if(!checkAll){
      checkedArr = productsCur.map(function(elm,index){
        return elm.id;
      })
    }

    this.setState({
      checked:checkedArr,
      checkAll:!checkAll,
    });
  }
  // 删除后置空
  handleDeleteAfter(){
    this.setState({ checked:[], checkAll:false});
  }
  handleDeleteManyProduct(checked){
    
    if(checked.length == 0){
      window.alert("请选择需要删除的列表!");
      return false;
    }

    if(confirm('确定删除？')){
      this.props.deleteManyProduct(checked);
      this.handleDeleteAfter();
    }
  }
  render() {
    const {productsCur,products} = this.changState();
  	const {system,deleteManyProduct,...actions} = this.props;
  	const {cur,size,checked,checkAll} = this.state;
    const handleCheckBox = ::this.handleCheckBox;
    const handleCheckBoxAll = ::this.handleCheckBoxAll;
    const handleDeleteAfter = ::this.handleDeleteAfter;
    return (
    	<div className="prd-list-table">
            <div className="tb-operate">
                <div className="chechbox-span">
                    <CheckBox isChecked={checkAll} handleCheckBox={handleCheckBoxAll} value={'all'}/>
                </div>
                <a href="javascript:void(0);" onClick={()=>::this.handleDeleteManyProduct(checked)}>批量删除</a> 
            </div>
	        <table cellPadding="0" cellSpacing="0" border="1" width="100%" className="slide-tb slide-tb-center prd-tb">
		        <thead>
		            <tr>
		                <th width="8%"></th>
		                <th width="6%">图片</th>
		                <th width="36%">文章名称</th>
		                <th width="25%">文章分类</th>
		                <th width="25%">操作</th>
		            </tr>
		        </thead>
		        <tbody>
		            {productsCur.map(function(elm,index){
						      return <Tr product={elm} key={index} {...actions} checkeds={checked} handleCheckBox={handleCheckBox} handleDeleteAfter={handleDeleteAfter}/>
		            })}
		        </tbody>
		    </table>
		    <Pagination cur={cur} length={products.length} size={size} handlePagination={::this.handlePagination}/>
			<div className="clear"></div>
		</div>
		
    )
  }
}

// 分页菜单
class Pagination extends Component {

  render() {
  	const {cur,length,size,handlePagination} = this.props;

  	let pags = [];
  	let N = Math.ceil(length/size);
  	// 前一页
  	if(cur != 0){
		pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(cur-1)} key='1000'>&lt;</a>);
  	}else{
  		pags.push(<a href="javascript:void(0);" key='1000'>&lt;</a>);
  	}
	
	// 中间
  	for(let i=0;i<N;i++){
  		if(cur == i){
  			pags.push(<a href="javascript:void(0);" className='cur' key={i}>{i+1}</a>);
  		}else{
  			pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(i)} key={i}>{i+1}</a>);
  		}
  	}

	//后一页
  	if(cur != N-1){
  		pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(cur+1)} key='999'>&gt;</a>);
  	}else{
  		pags.push(<a href="javascript:void(0);" key='999'>&gt;</a>);
  	}

    return (
        <div className="slide-page-b"> 
	        {pags}
        </div>
    )
  }
}

// table中tr部分内容
class Tr extends Component {
 // 删除
  handleDelete(id){
     if(confirm('确定删除吗？')){
      this.props.deleteProduct(id);
      this.handleDeleteAfter();
    }
  }
  render() {
    let {product,checkeds,deleteProduct,topProduct,untopProduct,handleCheckBox,handleDeleteAfter,changeEdit} = this.props;
    const img = (product.resources&&product.resources.length==0)?'':HOSTCONFIG.WEB_URL+product.resources[0].path;
    
    return (
        <tr>
            <td>
                <CheckBox isChecked={ArrayUtils.inArray(checkeds,product.id)} handleCheckBox={handleCheckBox} value={product.id}/>
            </td>
            <td>{img && <img className="prd_img" src={img}/>}</td>
            <td>{product.title}</td>
            <td>{product.categorie?product.categorie.name:'未分类'}</td>
            <td>
	            <a href="javascript:void(0);" onClick={()=>changeEdit(product['id'])}>编辑</a>
	            <a href="javascript:void(0);" onClick={()=>::this.handleDelete(product['id'])}>删除</a>
	            {product['is_top'] == 0&&<a href="javascript:void(0);" onClick={()=>topProduct(product['id'])}>置顶</a>}
	            {product['is_top'] > 0&&<a href="javascript:void(0);" onClick={()=>untopProduct(product['id'])}>取消置顶</a>}
            </td>
        </tr>
    )
  }
}



function system(state) {
  return {
    products: state.system.products
  };
}

export default connect(system,{deleteProduct,topProduct,untopProduct,deleteManyProduct,changeEdit})(TableProductList);