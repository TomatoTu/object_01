import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {load,alipay,weixin,payDelete} from '../../actions/PayActions'
import PayModal from './PayModal'

export default class Pay extends Component {
    constructor(props, context) {
      super(props, context);
      this.state={
        isShowModal:false,
        isAlipay:true,
      }
    }
    componentWillMount(){
      this.props.load();
    }
    handleState(isShowModal){
      this.setState({isShowModal});
    }
    handleClose(){
      this.handleState(false);
    }
    handleShow(isAlipay){
      this.setState({isShowModal:true,isAlipay});
    }
    render() {
        const {isShowModal,isAlipay} = this.state;
        const {pays,payDelete,...actions} = this.props;
        const handleShow = ::this.handleShow;
        const handleClose = ::this.handleClose;
        return (
          <div>
            <Payment pays={pays} payDelete={payDelete} handleShow={handleShow}/>
            {isShowModal && <PayModal {...actions} handleClose={handleClose} isAlipay={isAlipay}/>}
          </div>
        )
    }
}

function pays(state){
  return {
    pays:state.store.pays
  }
}

export default connect(pays,{load,alipay,weixin,payDelete})(Pay);


class Payment extends Component {

    render() {
      const {pays,payDelete,handleShow} = this.props;
      let alipay = null;
      let weixin = null;
      for(let pay of pays){
          if(pay.type && pay.type == '0'){
            alipay = pay;
          }
          if(pay.type && pay.type == '1'){
            weixin = pay;
          }
      }
      return (
          <div className="slide-body-nofoot" id="slide_body6">
        <div className="title-body">
          <h2>支付设置</h2>
        </div>
        <div className="payment-table">
          <table cellPadding="0" cellSpacing="0" border="1" className="payment-tb" width="100%">
            <tbody>
              <tr>
                <td width="20%" className="text-center"><img src='/images/ALIPAY.png'/></td>
                <td width="48%">
                  <div className="pay-list">
                    <ul className="clearfix">
                      <li>阿里巴巴旗下支付平台</li>
                      <li>中国互联网支付第一名</li>
                      <li>24小时全天候可用</li>
                    </ul>
                  </div>
                </td>
                <td width="20%" className="text-center">
                  {!alipay && <input type="button" value="开启" className="btn btn-green-b" onClick={()=>handleShow(true)}/>}
                  {alipay && (<div><span className="connect-success">连接到账户{alipay.config.seller_id}</span>
                  <br/>
                  <span className="paypal-disabled" onClick={()=>payDelete(alipay.id)}>关闭</span></div>)}
                </td>
              </tr>
              <tr >
                <td width="20%" className="text-center"><img src='/images/WEIXINPAY.png'/></td>
                <td width="48%">
                  <div className="pay-list">
                    <ul className="clearfix">
                      <li>腾讯旗下第三方支付平台</li>
                      <li>安全、快捷、高效的支付方式</li>
                      <li>7*24小时客户服务</li>
                    </ul>
                  </div>
                </td>
                <td width="20%" className="text-center">
                  {!weixin && <input type="button" value="开启" className="btn btn-green-b" onClick={()=>handleShow(false)}/>}
                  {weixin && (<div><span className="connect-success">连接到账户{weixin.config.mch_id}</span>
                  <br />
                  <span className="paypal-disabled" onClick={()=>payDelete(weixin.id)}>关闭</span></div>)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      );
    }

}
