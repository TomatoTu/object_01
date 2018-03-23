import React, { Component, PropTypes } from 'react';
import clickaway from '../../../../common/higherorder/clickaway';
import { connect } from 'react-redux';
import {loadCategoriesForProduct} from '../../actions/ArticleCategoriesActions';


class Select extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  componentDidMount(){
    const {ctl,loadCategoriesForProduct} = this.props;
    loadCategoriesForProduct(ctl.showSystemId);
  }
  handleChangeSelect(name,id,update){
    this.close();
    this.props.onUpdate(id);
  }
  componentClickAway () {
    this.close();
  }
  open () {
    this.refs.options.style.display = 'block';
    this.unbindClickAway();
    this.bindClickAway();
  }
  close () {
    this.refs.options.style.display = 'none';
    this.unbindClickAway();
  }
  render() {
    const {value,categories,...selects} = this.props;
    let checkedClass = value?'checked':'';
    let className = 'checkboxnew '+checkedClass;
    let _this = this;
    return (
        <div className="select-box select-box-wall" style={{zIndex: '999', position: 'relative'}}>
            <input type="hidden" value={value}  {...selects} ref="innn"/>
            <div className="select-dl">
                <div className="select-dt" ref="dt" onClick={::this.open}>
                    <div className="selected">
                        <span ref="selected">
                            {categories.map(function(system,index){
                                if(system['id'] == value){
                                    return system['name'];
                                }
                            })}
                        </span>
                    </div>
                    <div className="select-icon"></div>
                </div>
                <div className="select-option" ref="options" >
                    {categories.map(function(system,index){
                        return <div className="" onClick={()=>(::_this.handleChangeSelect(system['name'],system['id']))} key={index}><span>{system['name']}</span></div>
                    })}
                </div>
            </div>
        </div>
    );
  }
}

function data(state) {
  return {
    categories: state.system.categories.categories,
    ctl:state.system.ctl,
  };
}

clickaway(Select);

export default connect(data,{loadCategoriesForProduct})(Select)