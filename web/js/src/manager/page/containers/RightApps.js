import React, { Component, PropTypes } from 'react';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';

import StandardPage from '../components/StandardPage';
import SystemPage from '../components/SystemPage';
import ExternalPage from '../components/ExternalPage';


class RightApp extends Component {
  constructor(props, context) {
    super(props, context);

  }
  componentDidMount(){
    $(this.refs.pagesroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  render() {
    let {pages,changePage} = this.props;
    let page = {};
    if(isEmpty(pages) || pages.showid==0){
        page.type = 0;
    }else{
        page = pages.pagesObj[pages.showid];
    }
    return (
        <div className="pages-setting-content" >
            <div className="slide-body-in pages-setting-content-in" ref="pagesroll" >
                {page.type == '1' && <StandardPage />}
                {page.type == '2' && <SystemPage />}
                {page.type == '3' && <ExternalPage />}
            </div>
        </div>
    );
  }
}

function pages(state) {
  return {
    pages: state.page,
  };
}

export default connect(pages)(RightApp);
