import React, { Component, PropTypes } from 'react';
import clickaway from '../../../../common/higherorder/clickaway';
import { connect } from 'react-redux';


class Select extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  handleChangeSelect(name,id){
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
    const {value,selects} = this.props;
    let _this = this;
    return (
        <div className="select-box select-box-wall" style={{zIndex: '999', position: 'relative',width:'20%'}}>
            <div className="select-dl">
                <div className="select-dt" ref="dt" onClick={::this.open}>
                    <div className="selected">
                        <span ref="selected">
                            {selects.map(function(select,index){
                                if(select['id'] == value){
                                    return select['name'];
                                }
                            })}
                        </span>
                    </div>
                    <div className="select-icon"></div>
                </div>
                <div className="select-option" ref="options" >
                    {selects.map(function(select,index){
                        return <div className="" onClick={()=>(::_this.handleChangeSelect(select['name'],select['id']))} key={index}><span>{select['name']}</span></div>
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default clickaway(Select);