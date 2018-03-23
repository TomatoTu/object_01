import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TableProductList from './TableProductListDel'
import {loadProductList,deleteAllProduct} from '../../actions/ProductRecycleAction'
import {changeEdit} from '../../actions/CtlAction'



 class Recycle extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    const {systemId,loadProductList} = this.props;
    loadProductList(systemId);
  }
  render() {
    const {systemId,deleteAllProduct} = this.props;
    return (
      <div className="slide-body-hasfoot" id="slide_body1">
          <div className="title-body">
              <h2>产品列表</h2>
          </div>
          <div className="prd-list-set">
              <div className="clearfix">
                  
                  <div className="text-right fr">
                      <input type="button" value="清空回收站" className="btn btn-nocolor-b" onClick={()=>deleteAllProduct(systemId)}/>
                  </div>
              </div>
                  <TableProductList />
          </div>
      </div>
    )
  }
}

export default connect((state)=>({systemId:state.system.ctl.showSystemId}),{loadProductList,deleteAllProduct})(Recycle);