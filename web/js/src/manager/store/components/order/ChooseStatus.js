import React, { Component, PropTypes } from 'react';

const All = 10;
const UNPAY = 0;
const UNSHIP = 1;
const UNREVICE = 2;
const UNCOMMENT = 3;
const FINISH = 4;
const CANCEL = 5;

export default class ChooseStatus extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    // const {systemId,loadProductList} = this.props;
    // loadProductList(systemId);
  }
  checkCur(Status){
    if(this.props.status == Status){
        return 'cur';
    }
    return '';
  }
  render() {
    const checkCur = ::this.checkCur;
    const {handleChangeStatus} = this.props;
    return (
        <div className="payStatue-nav-b">
            <a href="javascript:void(0);" className={checkCur(All)} onClick={()=>handleChangeStatus(All)}>全部订单</a> 
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(UNPAY)} onClick={()=>handleChangeStatus(UNPAY)}>待付款</a> 
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(UNSHIP)} onClick={()=>handleChangeStatus(UNSHIP)}>待发货</a> 
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(UNREVICE)} onClick={()=>handleChangeStatus(UNREVICE)}>待收货</a> 
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(UNCOMMENT)} onClick={()=>handleChangeStatus(UNCOMMENT)}>待评价</a> 
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(FINISH)} onClick={()=>handleChangeStatus(FINISH)}>已完成</a>
            <span>|</span> 
            <a href="javascript:void(0);" className={checkCur(CANCEL)} onClick={()=>handleChangeStatus(CANCEL)}>已取消</a>
        </div>
    )
  }
}



