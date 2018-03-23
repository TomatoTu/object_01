import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {loadSystem,updateSystem} from '../../actions/SystemAction';
import Select from '../Select';
import List from '../List';



const fields = [
    "id",
    'name',
    'config.system.is_shipping',
    'config.list.style',
    'config.list.per_row',
    'config.list.per_page',
    'config.list.order',
    'config.list.is_show_title',
    'config.list.is_show_price',
    'config.list.is_show_info',
    'config.list.position',
    'config.list.structure',
    'config.detail.style',
    'config.detail.is_price',
    'config.detail.is_collection',
    'config.detail.is_share',
    'config.detail.is_comment',
]

class Set extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {ctl,loadSystem,host} = this.props;
    loadSystem(ctl.showSystemId);
  }
  render() {
    const {ctl,host} = this.props;
    return (
    <div className="slide-body-hasfoot" id="slide_body3">
        <SetForm host={host}/>
    </div>
    )
  }
}
const listClasses = [
    {id:1,name:'prdlist-type-img prdlist-type-img1'},
    {id:2,name:'prdlist-type-img prdlist-type-img2'},
];
const styleClasses = [
    {id:1,name:'prddetail-type-img prddetail-type-img1'},
    {id:2,name:'prddetail-type-img prddetail-type-img2'},
    {id:3,name:'prddetail-type-img prddetail-type-img3'},
];
const perRow = [
    {id:1,name:'1'},
    {id:2,name:'2'},
    {id:3,name:'3'},
    {id:4,name:'4'},
    {id:5,name:'5'},
    {id:6,name:'6'},
];
const perPage = [
    {id:10,name:'10'},
    {id:12,name:'12'},
    {id:16,name:'16'},
    {id:20,name:'20'},
    {id:24,name:'24'},
    {id:28,name:'28'},
    {id:32,name:'32'},
    {id:36,name:'36'},
    {id:40,name:'40'},
    {id:44,name:'44'},
];
const order = [
    {id:1,name:'倒序'},
    {id:2,name:'顺序'},
];
const structure = [
    {id:1,name:'上下'},
    {id:2,name:'左右'},
];
class SetForm extends Component {
  onHandleShipping(shipping){
    console.log('shipping');
    shipping.onUpdate(1);
    this.props.fields.config.detail.is_price.onUpdate(1);
  }
  render() {
    const {
      fields: { id, name, config },
      handleSubmit,
      resetForm,
      submitting,
      updateSystem,
      host
      } = this.props;
      const onHandleShipping = ::this.onHandleShipping;
    return (
        <form onSubmit={handleSubmit(data=>updateSystem(data))}>
            <input type="hidden" {...id}/>
            <div className="title-body">
                <h2>产品系统设置</h2>
            </div>
            <div className="prdSys-sets">
                <div className="prdSys-setAll">
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh2">系统名称：</dd>
                        <dd className="dd2"><input type="text" placeholder="系统名称" className="input-text-b input-text250-b" {...name}/></dd>
                    </dl>
                    {host.host_type_id>1 && 
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">购物功能：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide">
                              <input type="radio" name='is_shipping' {...config.system.is_shipping} value='1' checked={config.system.is_shipping.value == '1'} onClick={()=>onHandleShipping(config.system.is_shipping)}/>
                              <span>开启</span>
                            </label>
                            <label className="label label-radio-slide">
                              <input type="radio" name='is_shipping' {...config.system.is_shipping} value='0' checked={config.system.is_shipping.value == '0'} />
                              <span>关闭</span>
                            </label>
                        </dd>
                    </dl>}
                    
                </div>
                <div className="prdSys-setList">
                    <div className="title-border">
                        <h3>产品列表设置</h3>
                    </div>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品列表样式：</dd>
                        <List lists={listClasses} {...config.list.style}/>
                    </dl>
                    {config.list.style.value == '2' && (<dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh25">每行显示产品数：</dd>
                        <dd className="dd2">
                            <Select selects={perRow} zindex="999" {...config.list.per_row}/>
                        </dd>
                    </dl>)}
                     
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh25">每页显示产品数：</dd>
                        <dd className="dd2">
                            <Select selects={perPage} zindex="998" {...config.list.per_page}/>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1 lh25">分类结构：</dd>
                        <dd className="dd2">
                            <Select selects={structure} {...config.list.structure}/>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix" style={{display:"none"}}>
                        <dd className="dd1 lh25">产品排序：</dd>
                        <dd className="dd2">
                            <Select selects={order} zindex="997" {...config.list.order}/>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品标题：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name="is_show_title" {...config.list.is_show_title} value='0' checked={config.list.is_show_title.value == '0'}/><span>不显示</span></label>
                            <label className="label label-radio-slide"><input type="radio" name="is_show_title" {...config.list.is_show_title} value='1' checked={config.list.is_show_title.value == '1'}/><span>显示</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品价格：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name="is_show_price" {...config.list.is_show_price} value='0' checked={config.list.is_show_price.value == '0'}/><span>不显示</span></label>
                            <label className="label label-radio-slide"><input type="radio" name="is_show_price" {...config.list.is_show_price} value='1' checked={config.list.is_show_price.value == '1'}/><span>显示</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品简介：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name="is_show_info" {...config.list.is_show_info} value='0' checked={config.list.is_show_info.value == '0'}/><span>不显示</span></label>
                            <label className="label label-radio-slide"><input type="radio" name="is_show_info" {...config.list.is_show_info} value='1' checked={config.list.is_show_info.value == '1'}/><span>显示</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">文字显示位置：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name="position" {...config.list.position} value='1' checked={config.list.position.value == '1'}/><span>靠左</span></label>
                            <label className="label label-radio-slide"><input type="radio" name="position" {...config.list.position} value='2' checked={config.list.position.value == '2'}/><span>居中</span></label>
                            <label className="label label-radio-slide"><input type="radio" name="position" {...config.list.position} value='3' checked={config.list.position.value == '3'}/><span>靠右</span></label>
                        </dd>
                    </dl>
                </div>
                <div className="prdSys-setDetail">
                    <div className="title-border">
                        <h3>产品详细设置</h3>
                    </div>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">样式选择：</dd>
                        <List lists={styleClasses} {...config.detail.style}/>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品收藏：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_collection' {...config.detail.is_collection} value='1' checked={config.detail.is_collection.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_collection' {...config.detail.is_collection} value='0' checked={config.detail.is_collection.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品分享：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_share'  {...config.detail.is_share} value='1' checked={config.detail.is_share.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_share' {...config.detail.is_share} value='0' checked={config.detail.is_share.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>
                    <dl className="dl_dd_global clearfix" >
                        <dd className="dd1">产品价格：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_price'  {...config.detail.is_price} value='1' checked={config.system.is_shipping.value==1||config.detail.is_price.value == '1'} disabled={config.system.is_shipping.value==1}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_price' {...config.detail.is_price} value='0' checked={config.system.is_shipping.value==0&&config.detail.is_price.value == '0'} disabled={config.system.is_shipping.value==1}/><span>关闭</span></label>
                        </dd>
                    </dl>
                    {host.host_type_id>1 && 
                    <dl className="dl_dd_global clearfix">
                        <dd className="dd1">产品评论：</dd>
                        <dd className="dd2">
                            <label className="label label-radio-slide"><input type="radio" name='is_comment' {...config.detail.is_comment} value='1' checked={config.detail.is_comment.value == '1'}/><span>开启</span></label>
                            <label className="label label-radio-slide"><input type="radio" name='is_comment' {...config.detail.is_comment} value='0' checked={config.detail.is_comment.value == '0'}/><span>关闭</span></label>
                        </dd>
                    </dl>}
                </div>
            </div>
            <div className="foot-fixed-b">
                <div className="foot-save">
                    <div className="btns-b btns-right">
                        <input type="button" className="btn btn-nocolor-b" value="取消" onClick={resetForm}/>
                        <input type="submit" className="btn btn-green-b" value="保存"/>
                    </div>
                </div>
            </div>
        </form>
    )
  }
}
SetForm = reduxForm({
  form: 'set',
  fields,
},
state => ({
  initialValues: state.system.set
}),
{updateSystem}
)(SetForm)


function ctl(state){
    return {
        ctl:state.system.ctl,
        host:state.init.host,
    }
}

export default connect(ctl,{loadSystem})(Set);