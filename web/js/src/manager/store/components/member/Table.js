import React, { Component, PropTypes } from 'react';
import {DEFAULT_IMG,IMG_BASE_URL} from '../../../../constants/Common';

const statusAll = {
  0:'等待付款',
  1:'等待发货',
  2:'等待收货',
  3:'等待评价',
  4:'已完成',
  5:'已取消',
}

const All = 10;
const UNPAY = 0;
const UNSHIP = 1;
const UNREVICE = 2;
const UNCOMMENT = 3;
const FINISH = 4;
const CANCEL = 5;


export default class Table extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    
  }
  handleConfirmPay(id){
    if(window.confirm('请确认收到支付款，及订单信息的完整性。')){
      this.props.handlePay(id);
    }
  }
  render() {
    const {order,menuOrder, handleCancel, handleDelete,handlePay} = this.props;
    const handleConfirmPay = ::this.handleConfirmPay;


    const unpay = <div className="td_btn" key={'unpay'}><a href="javascript:void(0)" className="btn btn-nocolor-b" onClick={()=>menuOrder(order,UNPAY)}>修改价格</a></div>;
    const cancel = <div className="td_quit" key={'cancel'}><a href="javascript:void(0)" onClick={()=>handleCancel(order.id)}>取消订单</a></div>;
    const unship = <div className="td_btn" key={'unship'}><a href="javascript:void(0)" className="btn btn-nocolor-b" onClick={()=>menuOrder(order,UNSHIP)}>物流配送</a></div>;
    const del = <div className="td_quit" key={'del'}><a href="javascript:void(0)" onClick={()=>handleDelete(order.id)}>删除订单</a></div>;
    const pay = <div className="td_quit" key={'pay'}><a href="javascript:void(0)" onClick={()=>handleConfirmPay(order.id)}>支付完成</a></div>;

    let btns = [];
    switch(order.status){
      case '0':
        btns.push(unpay);
        btns.push(cancel);
        btns.push(pay);
        break;
      case '1':
        btns.push(unship);
        btns.push(cancel);
        break;
      case '2':
        btns.push(cancel);
        break;
      case '3':
        btns.push(cancel);
        break;
      case '4':
        
        break;
      case '5':
        btns.push(del);
        break;
    }
    return (
          <table cellSpacing="0" cellPadding="0" border="0" width="100%" className="orderC-tb-b orderC-tb-border-b">
            <thead>
              <tr>
                <th colSpan="3" className="text-left">
                <span className="timeA-b">{order.created_at}</span> 订单号：{order.order_no}</th>
                <th className="text-right">
                  <a href="javascipt:void(0);" onClick={()=>menuOrder(order,All)}>查看订单</a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">
                  {order.products.map(function(product, index) {
                    return <Product product={product} key={index}/>;
                  })}
                </td>
                <td width="12.5%">
                  <div className="rednum-b">{order.total}</div>
                </td>
                <td width="12.5%">{statusAll[order.status]}</td>
                <td width="12.5%">
                  {btns}
                </td>
              </tr>
            </tbody>
          </table>
    )
  }
}

class Product extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    
  }
  getImgPath(path){
      return path?IMG_BASE_URL+path:DEFAULT_IMG;
  }
  render() {
    const {product} = this.props;
    const getImgPath = ::this.getImgPath;
    return (
        <div className="order-gw-b clearfix">
          <div className="order-img-b">
            <div className="img-count-b">
              <div className="aspectRatio" style={{paddingBottom:"100%"}}></div>
              <div className="img-count-in">
                <img src={getImgPath(product.imagePath)} />
              </div>
            </div>
          </div>
          <div className="order-sum-b">
            <h2>
              {product.product_name}
            </h2>
            <div className="parameter">{product.product_options}</div>
          </div>
        </div>
    )
  }
}



