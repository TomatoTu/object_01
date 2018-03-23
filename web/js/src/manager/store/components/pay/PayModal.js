import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';



const fields = [
    "config.partner",
    'config.seller_id',
    'config.key',
    'config.appid',
    'config.mchid',
    'config.appsecret',
    'type',
]

class PayModal extends Component {

  render() {
    const {
      fields: { config, type},
      handleSubmit,
      resetForm,
      submitting,
      handleClose,
      alipay,weixin,isAlipay
      } = this.props;

    return (
        <div className="pop-prd-option-set-b pop-prdClassfiy-set" style={{display: 'block'}}>
            <form >
                <div className="pop-header">
                    <h2>支付信息设置</h2>
                </div>
                <div className="pop-main">
                  {isAlipay && (<div className="pop-prdClassfiy">
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">签约账号：&nbsp;&nbsp;&nbsp;</dd>
                          <dd className="dd2" style={{width:'540px'}}><input type="text" placeholder="" className="input-text-b" {...config.partner}/></dd>
                      </dl>
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">收款账号：&nbsp;&nbsp;&nbsp;</dd>
                          <dd className="dd2" style={{width:'540px'}}><input type="text" placeholder="" className="input-text-b" {...config.seller_id}/></dd>
                      </dl>
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">安全检验码：</dd>
                          <dd className="dd2" style={{width:'540px'}}><input type="text" placeholder="" className="input-text-b" {...config.key}/></dd>
                      </dl>
                  </div>)}
                  {!isAlipay && (<div className="pop-prdClassfiy">
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">APPID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dd>
                          <dd className="dd2" style={{width:'520px'}}><input type="text" placeholder="" className="input-text-b" {...config.appid}/></dd>
                      </dl>
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">微信支付商户号：</dd>
                          <dd className="dd2" style={{width:'520px'}}><input type="text" placeholder="" className="input-text-b" {...config.mchid}/></dd>
                      </dl>
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">API密钥：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dd>
                          <dd className="dd2" style={{width:'520px'}}><input type="text" placeholder="" className="input-text-b" {...config.key}/></dd>
                      </dl>
                      <dl className="p_dl_dd clearfix">
                          <dd className="dd1">Appsecret：&nbsp;&nbsp;&nbsp;&nbsp;</dd>
                          <dd className="dd2" style={{width:'520px'}}><input type="text" placeholder="" className="input-text-b" {...config.appsecret}/></dd>
                      </dl>
                  </div>)}
               </div>
               <div className="pop-footer">
                   <div className="btns-b btns-right">
                       <input type="button" className="btn btn-nocolor-b" value="取消" onClick={handleClose}/>
                       
                       {isAlipay && <input type="button" className="btn btn-green-b btn-save-b" value="确认" onClick={handleSubmit(data=>(alipay(data),handleClose()))}/>}
                       {!isAlipay && <input type="button" className="btn btn-green-b btn-save-b" value="确认" onClick={handleSubmit(data=>(weixin(data),handleClose()))}/>}
                   </div>
               </div>
            </form>
        </div>
    )
  }
}

export default reduxForm({
  form: 'paymentModal',
  fields,
}
)(PayModal)