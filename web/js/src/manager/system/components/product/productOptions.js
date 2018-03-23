import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {updateOptions,beforeUpdateOptions} from '../../actions/ProductActions';
import Select from '../Select';
import List from '../List';
import { Schema, arrayOf, normalize } from 'normalizr'
import Immutable from 'immutable';



const fields = [
    "options[].id",
    "options[].title",
    "options[].is_new",
    "options[].items[].id",
    "options[].items[].content",
    "options[].items[].is_new",
];

class ProductOptions extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
  }
  render() {
    const { fields: { options }, handleSubmit, submitting,handleShowModal,updateOptions,handleSubmitParent,beforeUpdateOptions} = this.props;
    return (
        <div className="pop-prd-option-set-b pop-prdClassfiy-set" style={{display: 'block'}}>
            <form >
                <div className="pop-header">
                    <h2>属性设置</h2>
                </div>
                <div className="pop-main">
                  <div className="option-tb">
                    <table cellPadding="0" cellSpacing="0" border="0" className="opt-tb" width="100%">
                        <tbody>
                        <tr>
                            <th width="5%">&nbsp;</th>
                            <th width="25%">
                                <div className="opt-th-div">
                                    <span>属性名称</span>
                                </div>
                            </th>
                            <th width="65%">
                                <div className="opt-th-div">
                                    <span>属性组合项</span>
                                </div>
                            </th>
                            <th width="5%">&nbsp;</th> 
                        </tr>
                        {options.map(function(option, index) {
                            return <Tr option={option} key={option['id'].value+'option'+index} deleteOptions={()=>{
                                        options.removeField(index)
                                    }}/>
                        })}
                    </tbody></table>
                </div>
               </div>
               <div className="pop-footer">
                    <input type="button" value="+ 新增属性" className="btn btn-nocolor-b" onClick={()=>{
                        if(options.length < 3){
                            options.addField({

                                "title":'',
                                "is_new":'add',
                                "items":{}
                            })
                        }
                    }}/>
                    <div className="btns-b fr btns-right">
                        <input type="button" value="取消" className="btn btn-nocolor-b" onClick={()=>handleShowModal(false)}/>
                        <input type="button" value="确认" className="btn btn-green-b btn-save-b" onClick={handleSubmit((data)=>{handleSubmitParent(data1=>window.alert(data1)),updateOptions(data),handleShowModal(false)})}/>
                    </div>
                </div>
               
            </form>
        </div>
    )
  }
}

class Tr extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
  }
  handleBlur(e,elms,index){
    if(elms[index].content.value == ''){
        elms.removeField(index);
    }
  }
  render() {
    const {option,deleteOptions} = this.props;
    const handleBlur = ::this.handleBlur;
    return (
        <tr style={{zIndex: '998'}}>
            <td><span className="i-move"><span className="glyphicon glyphicon-move" aria-hidden="true"></span></span></td>
            <td><input type="text" className="input-text-b" placeholder="例：颜色" {...option.title}/></td>
            <td>
                <div className="choice-box" onClick={()=>{
                    if(option.items.length < 5){
                        option.items.addField({
                            "content":'',
                            "is_new":'add',
                        })
                    }
                }}>
                    <div className="choice-box-in">
                        <ul className="clearfix">
                            {option.items.map(function(item,index){
                                let key = index+'item1';
                                var name = 'item'+index
                                return (<li key={key} onClick={function(e){
                                        e.stopPropagation();
                                    }}> 
                                    <span className="choice-option-move">
                                    </span> 
                                    <span className="choice-option-value" > 
                                        <input type="text" className="input-text-edit" size={item.content.value.length>0?item.content.value.length+1:3} ref='content_input' style={{display:'block'}} {...item.content} onBlur={(e)=>handleBlur(e,option.items,index)}/>
                                    </span>
                                    <div className="delete-small" onClick={function(e){
                                        e.stopPropagation();
                                        option.items.removeField(index);
                                    }}><span className="glyphicon glyphicon-remove"></span></div>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </td>
            <td><span className="i-delete" onClick={deleteOptions}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span></td>
        </tr>
    )
  }
}

ProductOptions = reduxForm({
  form: 'options',
  fields,
},
function(state){
    let initialValues = [];

    let options = Immutable.fromJS(state.system.product.options).toJS();
    let items = Immutable.fromJS(state.system.product.items).toJS();

    for(var option of options){
        option['items'] = [];
        for(var item of items){
            if(item['options_id'] == option['id']){
                if(!option['items']){
                    option['items']=[];
                }
                item['is_new'] = 'normal';
                option['items'].push(item);
            }
        }
        option['is_new'] = 'normal';
    }
    initialValues = {options};
    return {initialValues}
},
{updateOptions,beforeUpdateOptions}
)(ProductOptions)

export default ProductOptions;



// <div className="clearfix">
//     <div className="color-burn fl">产品参数</div>
//     <div className="text-right fr">
//         <input type="button" onclick="" className="btn btn-nocolor-b" value="新建产品参数"/>
//     </div>
// </div>
// <table cellSpacing="0" cellPadding="0" border="1" width="100%" className="slide-tb slide-tb-center shipping-tb">
//     <thead>
//         <tr>
//             <th>名称</th>
//             <th>属性</th>
//             <th>价格</th>
//             <th width="95">操作</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td><div className="color-div-td"><span style={{background:'#ff0000'}} className="color-edit"></span>
//                     <input type="text" className="input-hidden" value="产品颜色"/>
//                 </div></td>
//             <td><input type="text" className="input-hidden" value="红色"/></td>
//             <td><input type="text" className="input-hidden" value="100"/></td>
//             <td><span className="i-img i-hasimg"><span aria-hidden="true" className="glyphicon glyphicon-picture"></span></span> <span className="i-delete"><span aria-hidden="true" className="glyphicon glyphicon-remove"></span></span></td>
//         </tr>
//     </tbody>
// </table>