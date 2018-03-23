import React, { Component, PropTypes } from 'react';
import {isEmpty}  from '../../../common/utils/objects';
import { connect } from 'react-redux';

import StandardPage from 'StandardPage';


class Right extends Component {
  componentDidMount (){
    $(this.refs.pagesrollaaaaa).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  render() {
    let {pages,changePage} = this.props;
    if(isEmpty(pages)){
        return '';
    }
    let showId = pages.showId;
    return (
        <div className="pages-setting-content">
            <div className="slide-body-in pages-setting-content-in" ref="pagesrollaaaaa">
                
            </div>
        </div>
    );
  }
}

function pages(state) {
  return {
    pages: state.page.pages ? state.page.pages : []
  };
}

export default connect(pages,{changePage})(Right);