import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductsList from '../components/product/ProductsList';
import ListEditProduct from '../components/product/ListEditProduct';
import ProductSet from '../components/product/Set';
import ProductRecycle from '../components/product/Recycle';
import ProductCategorys from '../components/product/Categorys';

import ArticlesList from '../components/article/ProductsList';
import ListEditArticle from '../components/article/ListEditArticle';
import ArticleSet from '../components/article/Set';
import ArticleRecycle from '../components/article/Recycle';
import ArticleCategorys from '../components/article/Categorys';



export default class ContentApp extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    $(this.refs.systemsroll).slimScroll({height:'100%',allowPageScroll:true,color:'#576568'});
  }
  render() {
  	const {ctl} = this.props;
  	let show = '';

    switch(ctl.menu){
      case 'LIST':
          if(ctl.isShowEdit){
            if(ctl.systemTypeId == '1'){
              show = <ListEditProduct />
            }else{
              show = <ListEditArticle />
            }
          }else{
            if(ctl.systemTypeId == '1'){
              show = <ProductsList />
            }else{
              show = <ArticlesList />
            }
          }
          break;
      case 'CATEGORY':
          if(ctl.systemTypeId == '1'){
            show = <ProductCategorys />
          }else{
            show = <ArticleCategorys />
          }
          break;
      case 'SET':
        if(ctl.systemTypeId == '1'){
          show = <ProductSet />
        }else{
          show = <ArticleSet />
        }
          break;
      case 'RECYCLE':
        if(ctl.systemTypeId == '1'){
          show = <ProductRecycle />
        }else{
          show = <ArticleRecycle />
        }
          
          break;
    }
    
    return (
    	<div className="slide-body-in" style={{overflow: 'hidden',width: 'auto',height: '100%'}} ref='systemsroll'> 
    		{show}
    	</div>
    )
  }
}

function system(state) {
  return {
    ctl: state.system.ctl,
  };
}

export default connect(system,{})(ContentApp);
