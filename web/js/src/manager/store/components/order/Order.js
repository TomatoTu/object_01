import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {update,orderShip} from '../../actions/OrderActions';
import {menuOrderList} from '../../actions/CtlActions';
import {DEFAULT_IMG,IMG_BASE_URL} from '../../../../constants/Common';

const fields = [
	'id',
	'products[].id',
    "products[].unit",
    'products[].total',
    'products[].product_name',
    'products[].product_options',
    'products[].qty',
    'products[].imagePath',
    'subtotal',
    'total',
    'consignee',
    'address',
    'phone',
    'status',
    'delivery_type',
    'shipping_type',
    'shipping_no',
    'zip',
];
const payType = {
	0:'网上支付',
	1:'支付宝支付',
	2:'微信支付',
	3:'货到付款',
}
const deliveryType = {
	1:'快递上门',
	2:'上门自提',
}

class Order extends Component {
  handleCountTotal(productT,indexT){
  	let {fields: {products,subtotal, total},order} = this.props;
  	let totalSub=0;
  	products.map(function(product,index){
  		if(index == indexT){
  			totalSub += productT;
  		}else{
  			totalSub += parseFloat(product.total.value);
  		}
  	})

	subtotal.onUpdate(totalSub.toFixed(2));
	total.onUpdate((totalSub+parseFloat(order.shipping)).toFixed(2));
  }
  render() {
  	const {
      fields: { id, products, subtotal, total, consignee, address, phone, status, delivery_type, shipping_type, shipping_no,zip},
      handleSubmit,
      resetForm,
      submitting,
      update,
      menuOrderList,
      orderShip,
      } = this.props;
  	const {order,cstatus} = this.props;
  	let paystatus = cstatus;
  	if(cstatus == 10){
  		paystatus = order.status;
  	}
  	const handleCountTotal = ::this.handleCountTotal;
    return (
        <div className="slide-body-nofoot">
          <form>
	      <div className="title-body title-body-lr">
	        <a className="btn btn-nocolor-b" href="javascript:void(0)" onClick={menuOrderList}>返回</a>
	      </div>
	      <div className="order-item-num-b clearfix">
	        <div className="order-item-numL-b">订单号码：{order.order_no}</div>
	        <div className="order-item-numR-b">{order.created_at}</div>
	      </div>
	      <div className="order-item-b">
	        <div className="order-item-title-b">订单详情</div>
	        <div className="order-item-con-b">
	          <div className="order-list-b">
	            <div className="orderC-table">
	              <table width="100%" cellSpacing="0" cellPadding="0" border="0" className="orderC-tb">
	                <thead>
	                  <tr>
	                    <th className="text-left">产品详情</th>
	                    <th className="text-center">单价</th>
	                    <th className="text-center">数量</th>
	                    <th className="text-right">小计</th>
	                  </tr>
	                </thead>
	                <tbody>
	                  {products.map(function(product, index) {
	                  	return <Tr product={product} key={index} index={index} cstatus={cstatus} handleCountTotal={handleCountTotal} products={products}/>
	                  })}
	                </tbody>
	              </table>
	            </div>
	            <div className="cout-b">
	              <dl className="clearfix">
	                <dd className="dd-l-b">小计：</dd>
	                <dd className="dd-r-b">{subtotal.value}</dd>
	              </dl>
	              <dl className="clearfix">
	                <dd className="dd-l-b">邮费：</dd>
	                <dd className="dd-r-b">{order.shipping}</dd>
	              </dl>
	              <dl className="count-total-b clearfix">
	                <dd className="dd-l-b">实付款（含运费）：</dd>
	                <dd className="dd-r-b">{total.value}</dd>
	              </dl>
	            </div>
	            <div className="clear"></div>
	            <div className="order-message-b">
	              <dl className="clearfix">
	                <dd className="dd-l-b">备注：</dd>
	                <dd className="dd-r-b">
	                	{order.message}
	                </dd>
	              </dl>
	            </div>
	            <div className="clear"></div>
	          </div>
	        </div>
	      </div>
	      <div className="div-three-b clearfix">
	        <div className="div-cell-b div-cell-first-b">
	          <div className="order-item-b">
	            <div className="order-item-title-b">收货信息</div>
	            <div className="order-item-con-b">
	              <div className="order-item-con-in-b">
	                <p>收件人&nbsp;&nbsp;&nbsp;：{(cstatus == '0') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...consignee} />):order.consignee}</p>
	                <p>联系方式：{(cstatus == '0') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...phone} />):order.phone}</p>
	                <p>收货地址：{(cstatus == '0') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...address} />):order.address}</p>
	                <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：{(cstatus == '0') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...zip} />):order.zip}</p>
	              </div>
	            </div>
	          </div>
	        </div>
	        <div className="div-cell-b div-cell-two-b">
	          <div className="order-item-b">
	            <div className="order-item-title-b">支付信息</div>
	            <div className="order-item-con-b">
	              <div className="order-item-con-in-b">
	                <p>支付状态：{(paystatus == '0') ? '未支付':'已支付'}</p>
	                {(paystatus != '0') && (<p>支付方式：{payType[order.pay_type]}</p>)}
	              </div>
	            </div>
	          </div>
	        </div>
	        <div className="div-cell-b div-cell-last-b">
	          <div className="order-item-b">
	            <div className="order-item-title-b">物流信息</div>
	            <div className="order-item-con-b">
	              <div className="order-item-con-in-b">
	                <p>配送方式：{deliveryType[order.delivery_type]}</p>
	                <p>配送公司：{(cstatus == '1') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...shipping_type} />):order.shipping_type}</p>
	                <p>运单号&nbsp;&nbsp;&nbsp;：{(cstatus == '1') ? (<input type="text" style={{width:'70%'}} className="input-text-b" {...shipping_no} />):order.shipping_no}</p>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	      {(cstatus != '10') && (<div className="foot-fixed-b">
	            <div className="foot-save">
	                <div className="btns-b btns-right">
	                    <input type="button" className="btn btn-nocolor-b" value="取消" onClick={resetForm}/>
	                    {(cstatus == '0') && <input type="button" className="btn btn-green-b" value="修改订单" onClick={handleSubmit((data)=>update(data))}/>}
	                    {(cstatus == '1') && <input type="button" className="btn btn-green-b" value="确定发货" onClick={handleSubmit((data)=>orderShip(data))}/>}
	                </div>
	            </div>
	       </div>)}

	      </form>
	    </div>
    );
  }
}

Order = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'order',                           // a unique name for this form
    fields: fields, // all the fields in your form
},
state => ({ // mapStateToProps
  initialValues: state.store.ctl.menu.order // will pull state into form's initialValues
}),
{update,menuOrderList,orderShip}  
)(Order);

export default Order;


class Tr extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    
  }
  getImgPath(path){
      return path?IMG_BASE_URL+path:DEFAULT_IMG;
  }
  handleBlurNum(){
  	const {product} = this.props;
  	let val = product.unit.value;
  	let qty = product.qty.value;

	val = parseFloat(val) ? parseFloat(val):0;

	product.unit.onUpdate(val.toFixed(2));
	product.total.onUpdate((val*qty).toFixed(2));

	this.props.handleCountTotal((val*qty),this.props.index);
  }
  render() {
    const {product,cstatus} = this.props;
    const getImgPath = ::this.getImgPath;
    const handleBlurNum = ::this.handleBlurNum;
    return (
          <tr>
	        <td className="text-left">
	          <div className="order-gw-b clearfix">
	            <div className="order-img-b">
	              <div className="img-count-b">
	                <div className="aspectRatio" style={{paddingBottom:'100%'}}></div>
	                <div className="img-count-in">
	                  <img src={getImgPath(product.imagePath.value)} />
	                </div>
	              </div>
	            </div>
	            <div className="order-sum-b">
	              <h2>
	                <a href="javascript:void(0);">{product.product_name.value}</a>
	              </h2>
	              <div className="parameter">{product.product_options.value}</div>
	            </div>
	          </div>
	        </td>
	        <td className="text-center">{(cstatus == '0') ? (<input type="text" style={{width:'20%'}}  className="input-text-b" {...product.unit} onBlur={handleBlurNum} />):product.unit.value}</td>
	        <td className="text-center">{product.qty.value}</td>
	        <td className="text-right">{product.total.value}</td>
	      </tr>
    )
  }
}
