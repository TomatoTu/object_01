import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {menuMember} from '../../actions/CtlActions'
import {loadList,memberDelete,memberUpdate,memberCreate} from '../../actions/MemberActions'

import TableApp from './TableApp'


 class MemberList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount(){
    const {memberList} = this.props;
    this.props.loadList({
      cur:memberList.cur
    });
  }
  handleChangeCur(cur){
    const {memberList} = this.props;
    this.props.loadList({
      cur
    });
  }
  render() {
    const handleChangeCur = ::this.handleChangeCur;
    const {menuMember,memberDelete,memberList} = this.props;
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>会员管理</h2>
          </div>
          <div className="prd-list-set">
              <div className="clearfix">
                  <div className="text-right fr">
                      <input type="button" value="新建会员" className="btn btn-nocolor-b" onClick={()=>menuMember({})}/>
                  </div>
              </div>
              <TableApp models={memberList} menuEdit={menuMember} handleDelete={memberDelete} handleChangeCur={handleChangeCur}/>
          </div>
      </div>
    )
  }
}

function memberList(state){
  return {
    memberList:state.store.memberList
  }
}

export default connect(memberList,{loadList,menuMember,memberDelete,memberUpdate,memberCreate})(MemberList);