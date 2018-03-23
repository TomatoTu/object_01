import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadProduct,submitProduct} from '../../actions/ProductActions';
import Select from './Select';
import {Ueditor} from './Ueditor';
import {UploadDiv} from './UploadDiv';
import {UploadLi} from './UploadLi';
import ProductOptions from './productOptions'
import TableProductGroup from './TableProductGroup'
import {ProductColoums} from './ProductColoums'
import {ProductSeo} from './ProductSeo'
import {changeMenu} from '../../actions/CtlAction'

const fields = [
    "id",
    'system_id',
    "category_id",
    'resources[].id',
    'resources[].path',
    "title",
    "info",
    "sale_price",
    "price",
    "inventory",
    "tax_rate",
    "options[].id",
    "options[].title",
    "options[].items[]",
    "items[].id",
    "items[].content",
    "items[].options_id",
    "groups[].id",
    "groups[].itemArr[]",
    "groups[].itemsName[]",
    "groups[].inventory",
    "groups[].sale_price",
    "groups[].price",
    'labels[].id',
    'labels[].title',
    'labels[].info',
    'seo.id',
    'seo.page_title',
    'seo.page_keywords',
    'seo.page_description',
    'seo.footer_code',
    'seo.header_code',
]

class ListEditProduct extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        showOptionsModal:false,
        reset:false,
    }
  }
  componentDidMount(){
    const {ctl,loadProduct} = this.props;
    loadProduct(ctl.showListId,ctl.showSystemId);
  }
  handleShowModal(showOptionsModal){
    this.setState({showOptionsModal});
  }
  render() {
    const {ctl,handleSubmit} = this.props;
    return (
    <div className="slide-body-hasfoot" id="prdEdit">
        {!ctl.loaded && <div className="title-body"><h2>加载中。。。</h2></div>}
        {ctl.loaded && <ProductForm handleShowModal={::this.handleShowModal} {...this.props}/>}
        {this.state.showOptionsModal && <ProductOptions handleShowModal={::this.handleShowModal} handleSubmitParent={handleSubmit}/>}
    </div>
    )
  }
}

class ProductForm extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount(){
        
    }
    handleBlurNum(e,elm,isfloat){
        let value = e.target.value;
        value = parseFloat(value) ? parseFloat(value):0;
        elm.onUpdate(isfloat?value.toFixed(2):value);
    }
    render() {
        const { fields: { id,category_id,title,info,sale_price,price,inventory,tax_rate,resources,options,items,groups,labels,seo }, handleSubmit, submitting,handleShowModal,submitProduct,changeMenu } = this.props;
        const handleBlurNum = ::this.handleBlurNum;
        const imgPath = HOSTCONFIG.WEB_URL;
        return (
            <form onSubmit={handleSubmit((data)=>submitProduct(data))}>
                <input type="hidden" {...id}/>
                <div className="title-body">
                    <h2>产品编辑</h2>
                </div>
                <div className="prd-con-set">
                    <div className="div-sechalf clearfix">
                        <div className="div-secL">
                            <div className="color-burn">产品基本属性</div>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">产品名称：</dd>
                                <dd className="dd2">
                                    <input type="text" placeholder="" className="input-text-b" {...title}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">产品分类：</dd>
                                <dd className="dd2">
                                    <Select {...category_id}/>
                                </dd>
                            </dl>
                            {groups.length == 0 && (<div className="div-sechalf clearfix">
                                <div className="div-secL">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">产品价格：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...sale_price} onBlur={(e)=>{handleBlurNum(e,sale_price,true)}}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="div-secR">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">市场价格：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...price} onBlur={(e)=>{handleBlurNum(e,price,true)}}/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>)}
                            {groups.length == 0 && (<div className="div-sechalf clearfix">
                                <div className="div-secL">
                                    <dl className="dl_dd clearfix">
                                        <dd className="dd1">库存：</dd>
                                        <dd className="dd2">
                                            <input type="text" placeholder="00.00" className="input-text-b" {...inventory} onBlur={(e)=>{handleBlurNum(e,inventory,false)}}/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>)}
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">产品邮费：</dd>
                                <dd className="dd2">
                                    <input type="text" placeholder="00.00" className="input-text-b" {...tax_rate} onBlur={(e)=>{handleBlurNum(e,tax_rate,true)}}/>
                                </dd>
                            </dl>
                            <dl className="dl_dd clearfix">
                                <dd className="dd1">产品简介：</dd>
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
                                            
                                            <UploadDiv hadnleAdd={function(resource){
                                                resources.addField({
                                                    id:resource.id,
                                                    path:resource.url,
                                                });
                                            }}/>
                                        </div>
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
                                                <UploadLi hadnleAdd={function(resource){
                                                    resources.addField({
                                                        id:resource.id,
                                                        path:resource.url,
                                                    });
                                                }} limit={10-resources.length}/>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="clearfix">
                        <div className="color-burn fl">产品属性</div>
                        <div className="text-right fr">
                            <input type="button" onClick={()=>handleShowModal(true)} className="btn btn-nocolor-b" value="属性设置"/>
                        </div>
                    </div>
                    <TableProductGroup groups={groups}  options={options}/>
                    <ProductColoums labels={labels} />
                    
                    <ProductSeo seo={seo}/>
                </div>
                <div className="foot-fixed-b">
                    <div className="foot-save">
                        <div className="btns-b btns-right">
                            <input type="button" className="btn btn-nocolor-b" value="取消" onClick={()=>changeMenu('LIST')}/>
                            <input type="submit" className="btn btn-green-b" value="保存"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ListEditProduct = reduxForm({
  form: 'product',
  fields,
},
function(state){
    let init = {
        options:[],
        items:[],
        groups:[],
    };
    let product = Object.assign({}, init,state.system.product);

    let itemsObj = {};

    for(let item of product.items){
        itemsObj[item['id']] = item;
    }

    for(let group of product.groups){
        if(!group['itemArr']){
            group['itemArr'] = group.items.split(',');
        }
        
        let names = [];
        for(let itemid of group['itemArr']){
            names.push(itemsObj[itemid].content);
        }
        group['itemsName'] = names;
    }

    return {initialValues: Object.assign({},product)}
},
// state => ({
//   initialValues: state.system.product
// }),
{submitProduct,changeMenu}
)(ListEditProduct)

function ctl(state){
    return {
        ctl:state.system.ctl,
    }
}

export default connect(ctl,{loadProduct,submitProduct})(ListEditProduct);