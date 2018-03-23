import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {menuComment} from '../../actions/CtlActions'
import {loadList,commentDelete,commentUpdate} from '../../actions/CommentActions'

import TableApp from './TableApp';
import Select from './Select'


class CommentList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount(){
    const {modelList} = this.props;
    this.props.loadList({
      system_id:modelList.system_id,
      cur:modelList.cur
    });
  }
  handleChangeCur(cur){
    const {modelList} = this.props;
    this.props.loadList({
      system_id:modelList.system_id,
      cur
    });
  }
  handleChangeSystem(system_id){
    const {modelList} = this.props;
    this.props.loadList({
      system_id,
      cur:modelList.cur
    });
  }
  render() {
    const handleChangeCur = ::this.handleChangeCur;
    const handleChangeSystem = ::this.handleChangeSystem;
    const {menuComment,commentDelete,modelList} = this.props;
    let selects = [{id:0,name:'所有系统'}];
    selects = selects.concat(modelList.systems);
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>评论管理</h2>
          </div>
          <div className="prd-list-set">

              <Select selects={selects} value={modelList.system_id} onUpdate={handleChangeSystem}/>
              <div className='clear'></div>
              <TableApp Lists={modelList} menuEdit={menuComment} handleDelete={commentDelete} handleChangeCur={handleChangeCur}/>
          </div>
      </div>
    )
  }
}

function modelList(state){
  return {
    modelList:state.store.commentList
  }
}

export default connect(modelList,{loadList,menuComment,commentDelete,commentUpdate})(CommentList);