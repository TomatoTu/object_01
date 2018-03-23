import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select'


export class ProductSeo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {show:false};
  }
  handleShow(){
    if(this.state.show){
        this.setState({show:false});
    }else{
        this.setState({show:true});
    }
  }
  render() {
    const handleShow = ::this.handleShow;
    const {show:isShow} = this.state;
    const {seo} = this.props;
    return (
        <div>
            <div className={isShow?"title-border hide-show-control mt30 open":"title-border hide-show-control mt30 "}>
                <h3>SEO<span><i className="icon-other icon-hide-show" onClick={handleShow}></i></span></h3>
            </div>
            {isShow && (
                <div className="div-input-normal-b hide-show-control-content advanced-setting" style={{display:'block'}}>
                    <div className="div-input-b">
                        <label className="input-label"> 页面标题</label>
                        <input type="text" placeholder="" className="input-text-b" {...seo.page_title}/>
                    </div>
                    <div className="div-input-b">
                        <label className="input-label">描述</label>
                        <input type="text" placeholder="" className="input-text-b" {...seo.page_description}/>
                    </div>
                    <div className="div-input-b">
                        <label className="input-label">关键字</label>
                        <input type="text" placeholder="" className="input-text-b" {...seo.page_keywords}/>
                    </div>
                    <div className="div-input-b">
                        <label className="input-label">页脚代码</label>
                        <textarea placeholder="" className="input-textarea-b" {...seo.footer_code}></textarea>
                    </div>
                    <div className="div-input-b">
                        <label className="input-label">页首代码</label>
                        <textarea placeholder="" className="input-textarea-b"  {...seo.header_code}></textarea>
                    </div>
                </div>
            )}
        </div>
    )
  }

}