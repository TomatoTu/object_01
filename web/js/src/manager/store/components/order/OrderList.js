import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {menuOrder} from '../../actions/CtlActions'
import {loadList,orderCancel,orderDelete,orderPay} from '../../actions/OrderActions'

import ChooseStatus from './ChooseStatus';
import TableApp from './TableApp';
import Pagination from '../Pagination';

 class OrderList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount(){
    const {orderList} = this.props;
    this.props.loadList({
      status:orderList.status,
      cur:orderList.cur
    });
  }

  handleChangeCur(cur){
    const {orderList} = this.props;
    this.props.loadList({
      status:orderList.status,
      cur
    });
  }
  handleChangeStatus(status){
    const {orderList} = this.props;
    this.props.loadList({
      status,
      cur:0,
    });
  }
  handleCancel(id){
    const {orderList,orderCancel} = this.props;
    orderCancel({
      id,
      status:orderList.status,
      cur:orderList.cur
    });
  }
  handleDelete(id){

    const {orderList,orderDelete} = this.props;

    orderDelete({
      id,
      status:orderList.status,
      cur:orderList.cur
    });
  }
  handlePay(id){

    const {orderList,orderPay} = this.props;

    orderPay({
      id,
      status:orderList.status,
      cur:orderList.cur
    });
  }
  render() {
    const handleChangeStatus = ::this.handleChangeStatus;
    const handleChangeCur = ::this.handleChangeCur;
    const handleCancel = ::this.handleCancel;
    const handleDelete = ::this.handleDelete;
    const handlePay = ::this.handlePay;
    const {orderList,menuOrder} = this.props;
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>订单管理</h2>
          </div>
          <div className="prd-list-set">
              <ChooseStatus handleChangeStatus={handleChangeStatus} status={orderList.status} />
              <TableApp orders={orderList.orders} menuOrder={menuOrder} handleCancel={handleCancel} handleDelete={handleDelete} handlePay={handlePay}/>
              <Pagination {...orderList} handlePagination={handleChangeCur} />
          </div>
      </div>
    )
  }
}

function orderList(state){
  return {
    orderList:state.store.orderList
  }
}

export default connect(orderList,{loadList,menuOrder,orderCancel,orderDelete,orderPay})(OrderList);