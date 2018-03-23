import React, { Component, PropTypes } from 'react';


export default class TableProductGroup extends Component {
  // 初始化
  constructor(props, context) {
    super(props, context);
    this.state = {
      cur:0,
      size:10,
    }
  }
  // 分页动作
  handlePagination(cur){
  	this.setState({
      cur,
    });
  }
  // 获取产品信息和当前分页展示产品
  changState(){
    const {groups} = this.props;
    const {cur,size} = this.state;
    const dataC = groups.concat();
    const showData = dataC.splice(cur*size,size);
    if(showData.length == 0 && cur != '0'){
      ::this.handlePagination(0);
    }
    return {
      curs:showData,
      all:groups,
    };
  }
  handleBlurNum(e,elm,isfloat){
        let value = e.target.value;
        value = parseFloat(value) ? parseFloat(value):0;
        elm.onUpdate(isfloat?value.toFixed(2):value);
    }
  render() {
    const {curs,all} = this.changState();
  	const {groups,options} = this.props;
  	const {cur,size} = this.state;
    const handleBlurNum = ::this.handleBlurNum;
    return (
      

        <div>
          {curs.length > 0 && (<table cellPadding="0" cellSpacing="0" border="1" width="100%" className="slide-tb slide-tb-center prd-tb">
              <thead>
                  <tr>
                      {options.map(function(option,index){
                         return (<th key={index}>{option.title.value}</th>)
                      })}
                      <th>库存</th>
                      <th>销售价格</th>
                      <th>价格</th>
                  </tr>
              </thead>
              <tbody>
                  {curs.map(function(elm,index){
                    return <Tr curElm={elm} key={index} handleBlurNum={handleBlurNum}/>
                  })}
              </tbody>
          </table>)}
          {all.length > size && <Pagination cur={cur} length={all.length} size={size} handlePagination={::this.handlePagination} />}
          
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
  render() {
    let {curElm,handleBlurNum} = this.props;
    return (
        <tr>
            {curElm.itemsName.map(function(name,index){
              return (<td key={index}>{name.value}</td>);
            })}
            <td><input type="text" className="input-text-b" {...curElm.inventory} onBlur={(e)=>{handleBlurNum(e,curElm.inventory,false)}}/></td>
            <td><input type="text" className="input-text-b" {...curElm.sale_price} onBlur={(e)=>{handleBlurNum(e,curElm.sale_price,true)}}/></td>
            <td><input type="text" className="input-text-b" {...curElm.price} onBlur={(e)=>{handleBlurNum(e,curElm.price,true)}}/></td>
        </tr>
    )
  }
}