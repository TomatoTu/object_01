import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TableProductList from './TableProductList'
import {loadProductList} from '../../actions/ArticleListAction'
import {changeEdit} from '../../actions/CtlAction'



 class ProductsList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {systemId,loadProductList} = this.props;
    loadProductList(systemId);
  }
  render() {
    const changeEdit = this.props.changeEdit;
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>文章列表</h2>
          </div>
          <div className="prd-list-set">
              <div className="clearfix">
                  
                  <div className="text-right fr">
                      <input type="button" value="新建文章" className="btn btn-nocolor-b" onClick={()=>changeEdit(0)}/>
                  </div>
              </div>
                  <TableProductList />
          </div>
      </div>
    )
  }
}

export default connect((state)=>({systemId:state.system.ctl.showSystemId}),{loadProductList,changeEdit})(ProductsList);