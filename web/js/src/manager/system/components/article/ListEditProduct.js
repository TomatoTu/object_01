import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select';
import {Pictures, NonePictures, ShowPictures} from './Pictures';
import {Ueditor} from './Ueditor';


const fields = [
    "id",
    "category_id",
    'resources[].id',
    'resources[].path',
    "title",
    "info",
    "sale_price",
    "price",
    "inventory",
    "tax_rate",
]

class ListEditProduct extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {ctl,loadProduct} = this.props;
    loadProduct(ctl.showListId,ctl.showSystemId);
  }
  render() {
    const {ctl} = this.props;
    return (
    <div className="slide-body-hasfoot" id="prdEdit">
        {!ctl.loaded && <div className="title-body"><h2>加载中。。。</h2></div>}
        {ctl.loaded && <ProductForm />}
    </div>
      
    )
  }
}

class ProductForm extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){


        const _self = this;
        console.log(_self);
        const uploader = WebUploader.create({

            // 自动上传。
            auto: true,

            // swf文件路径
            swf: HOSTCONFIG.WEB_URL + '/js/lib/webupload/Uploader.swf',

            // 文件接收服务端。
            server: 'http://webuploader.duapp.com/server/fileupload.php',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: _self.refs.uploadimg,

            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        console.log(uploader);
    }
    render() {
        const { fields: { id,category_id,title,info,sale_price,price,inventory,tax_rate,resources }, handleSubmit, submitting } = this.props;
        const imgPath = HOSTCONFIG.WEB_URL;
        return (
            <form onSubmit={handleSubmit}>
                <input type="hidden" {...id}/>
                <div className="title-body">
                    <h2>文章编辑</h2>
                </div>
                <div className="prd-con-set">
                    <div className="div-sechalf clearfix">
                        <div className="div-secL">
                            <div className="color-burn">文章基本属性</div>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章名称：</dd>
                                <dd className="dd2">
                                    <input type="text" placeholder="" className="input-text-b" {...title}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章分类：</dd>
                                <dd className="dd2">
                                    <Select {...category_id}/>
                                </dd>
                            </dl>
                            <div className="div-sechalf clearfix">
                                <div className="div-secL">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">文章价格：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...sale_price}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="div-secR">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">市场价格：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...price}/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="div-sechalf clearfix">
                                <div className="div-secL">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">库存：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...inventory}/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章邮费：</dd>
                                <dd className="dd2">
                                    <input type="text" placeholder="00.00" className="input-text-b" {...tax_rate}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">文章简介：</dd>
                                <dd className="dd2">
                                    <textarea placeholder="" className="input-textarea-b" {...info}></textarea>
                                </dd>
                            </dl>
                        </div>
                        <div className="div-secR">
                            {!resources.length && (<div className="images-b">
                                <div className="images-upload" ref='uploadimg'>
                                    <div className="images-upload-in">
                                        <div className="images-empty"> <span><img src="/images/mulimages-empty.png"/></span><br/>
                                            
                                            <a href="javascript:void(0);" className="a-btn-glyphicon btn-upload-image"> <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>上传图片</a> </div>
                                    </div>
                                </div>
                            </div>)}
                            {resources.length > 0 && (<div className="images-b">
                                <div className="images-upload">
                                    <div className="images-upload-in">
                                        <div className="images-list images-list2">
                                            <ul className="clearfix">
                                                {resources.map(function(resource,index){

                                                    return (<li key={index}><img src={imgPath+resource.path.value}/>
                                                        <div className="delete-b" onClick={()=>{
                                                            resources.removeField(index)
                                                        }}>
                                                            <div className="btn-delete-b"><span aria-hidden="true" className="glyphicon glyphicon-remove"></span></div>
                                                        </div>
                                                    </li>)
                                                })}
                                                <li ref='uploadimg' id='uploadimg11'> 
                                                    <img src="/images/slide1.jpg"/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <Ueditor value={'123'} id="content" height="200" disabled={false}/> 
                </div>
                <div className="foot-fixed-b">
                    <div className="foot-save">
                        <div className="btns-b btns-right">
                            <input type="button" className="btn btn-nocolor-b" value="取消"/>
                            <input type="submit" className="btn btn-green-b" value="保存"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ProductForm = reduxForm({
  form: 'product',
  fields,
},
state => ({
  initialValues: state.system.product
}),
{}
)(ProductForm)

function ctl(state){
    return {
        ctl:state.system.ctl,
    }
}

export default connect(ctl,{loadProduct,submitProduct,changeMenu})(ListEditProduct);