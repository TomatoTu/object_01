import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {inArray,ArrayUtils} from '../../../../common/utils/array';
import Pagination from '../Pagination'


export default class TableProductList extends Component {
  // 初始化
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkedArr:[],
      isCheckAll:false
    }
  }
  // 勾选动作
  handleCheckBox(checked){
    const {models:{members:models}} = this.props;
    let {checkedArr,isCheckAll} = this.state;

    if(ArrayUtils.inArray(checkedArr,checked)){
      checkedArr = ArrayUtils.remove(checkedArr,checked);
    }else{
      checkedArr.push(checked);
    }

    if(checkedArr.length == models.length){
      isCheckAll = true;
    }else{
      isCheckAll = false;
    }

    this.setState({
      checkedArr,
      isCheckAll,
    });
  }
  // 选择全部
  handleCheckBoxAll(){
    const {models:{members:models}} = this.props;
    const {isCheckAll} = this.state;
    let checkedArr = [];

    if(!isCheckAll){
      checkedArr = models.map(function(elm,index){
        return elm.id;
      })
    }

    this.setState({
      checkedArr,
      isCheckAll:!isCheckAll,
    });
  }
  // 删除后置空
  handleDeleteAfter(){
    this.setState({ checkedArr:[], isCheckAll:false});
  }

  handleDeleteMany(checked){
    if(checked.length == 0){
      return false;
    }

    if(confirm('确定删除？')){
      this.props.handleDelete(checked.join(','));
      this.handleDeleteAfter();
    }
  }

  handleDeleteOne(id){

    if(confirm('确定删除？')){
      this.props.handleDelete(id);
      this.handleDeleteAfter();
    }
  }
  handlePaginationCur(id){

      this.props.handleChangeCur(id);
      this.handleDeleteAfter();
  }
  render() {
    const {models,handleChangeCur,...actions} = this.props;
    const {checkedArr,isCheckAll} = this.state;

    const handleCheckBox = ::this.handleCheckBox;
    const handleCheckBoxAll = ::this.handleCheckBoxAll;

    const handleDeleteMany = ::this.handleDeleteMany;
    const handleDeleteOne = ::this.handleDeleteOne;
    const handlePaginationCur = ::this.handlePaginationCur;

    return (
      <div className="prd-list-table">
          <div className="tb-operate">
              <div className="chechbox-span">
                  <CheckBox isChecked={isCheckAll} handleCheckBox={handleCheckBoxAll} value={'all'}/>
              </div>
              <a href="javascript:void(0);" onClick={()=>handleDeleteMany(checkedArr)}>批量删除</a> 
          </div>
          <table cellPadding="0" cellSpacing="0" border="1" width="100%" className="slide-tb slide-tb-center prd-tb">
              <thead>
                  <tr>
                      <th width="8%"></th>
                      <th width="20%">账号/邮箱</th>
                      <th width="10%">昵称</th>
                      <th width="15%">手机</th>
                      <th width="25%">操作</th>
                  </tr>
              </thead>
              <tbody>
                  {models.members.map(function(model,index){
                    return <Tr model={model} key={index} {...actions} isChecked={ArrayUtils.inArray(checkedArr,model.id)} handleCheckBox={handleCheckBox} handleDeleteOne={handleDeleteOne}/>
                  })}
              </tbody>
          </table>
          <Pagination {...models} handlePagination={handlePaginationCur} />
          <div className="clear"></div>
      </div>
    
    )
  }
}
// table中tr部分内容
class Tr extends Component {

  render() {
    let {model,isChecked,handleDeleteOne,handleCheckBox,menuEdit} = this.props;
  
    return (
        <tr>
            <td>
                <CheckBox isChecked={isChecked} handleCheckBox={handleCheckBox} value={model.id}/>
            </td>
            <td>{model.email}</td>
            <td>{model.info?model.info.uname:''}</td>
            <td>{model.info?model.info.uphone:''}</td>
            <td>
              <a href="javascript:void(0);" onClick={()=>menuEdit(model)}>编辑</a>
              <a href="javascript:void(0);" onClick={()=>handleDeleteOne(model['id'])}>删除</a>
            </td>
        </tr>
    )
  }
}

class CheckBox extends Component {
  render() {
    const {isChecked,handleCheckBox,value} = this.props;
    let checkedClass = isChecked?'checked':'';
    let className = 'checkboxnew '+checkedClass;
    return (
        <label className="checkbox-new checkbox-gray">
            
            <input className={className} type="checkbox" data-role="none" id={'checkbox'+value} value={value} checked={isChecked} onChange={()=>handleCheckBox(value)}/>
            <label htmlFor={'checkbox'+value}></label>
        </label>
    );
  }
}