import React, { Component, PropTypes } from 'react';

// 分页菜单
 export default class Pagination extends Component {

  render() {
  	const {cur,count,size,handlePagination} = this.props;
    let pags = [];
    if(count > size){
      let N = Math.ceil(count/size);
      // 前一页
      if(cur != 0){
        pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(cur-1,size)} key='1000'>&lt;</a>);
      }else{
        pags.push(<a href="javascript:void(0);" key='1000'>&lt;</a>);
      }
    
    // 中间
      for(let i=0;i<N;i++){
        if(cur == i){
          pags.push(<a href="javascript:void(0);" className='cur' key={i}>{i+1}</a>);
        }else{
          pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(i,size)} key={i}>{i+1}</a>);
        }
      }

    //后一页
      if(cur != N-1){
        pags.push(<a href="javascript:void(0);" onClick={()=>handlePagination(cur+1,size)} key='999'>&gt;</a>);
      }else{
        pags.push(<a href="javascript:void(0);" key='999'>&gt;</a>);
      }
    }

    return (
        <div className="slide-page-b"> 
	        {pags}
        </div>
    )
  }
}