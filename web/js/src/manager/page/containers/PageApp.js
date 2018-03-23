import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../components/Page.js';

import LeftApps from './LeftApps';
import RightApps from './RightApps';

import {loadPages} from '../actions/PagesActions';

class PageApp extends Component {
  componentWillMount(){
    this.props.loadPages();
  }
  render() {
    return (
    	<div className="pages-setting-b">
        		<LeftApps pages={this.props.pages}/>
        		<RightApps pages={this.props.pages}/>
        </div>
    );
  }
}

export default connect(()=>({}),{loadPages})(PageApp);
