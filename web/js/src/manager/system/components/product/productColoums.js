import React, { Component, PropTypes } from 'react';
import {Ueditor} from './Ueditor';

export class ProductColoums extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        curIndex:0,
        showEdit:false,
    };
  }
  handleChangeShowCurIndex(curIndex){
    this.setState({curIndex,showEdit:false});
  }
  handleBlurInput(elm){
    console.log(elm);
    this.setState({showEdit:false});
    // elm.onBlur();
  }
  handleChangeSpan2Input(curIndex){
    this.setState({curIndex,showEdit:true});
  }
  render() {
    const {labels} = this.props;
    const {curIndex,showEdit} = this.state;
    const handleChangeShowCurIndex = ::this.handleChangeShowCurIndex;
    const handleBlurInput = ::this.handleBlurInput;
    const handleChangeSpan2Input = ::this.handleChangeSpan2Input;
    return (
        <div>
            <div className="color-burn">产品描述</div>
            <div className="dec-set-menu">
                <ul className="clearfix">
                    {labels.map(function(label, index) {
                        let curClass = curIndex == index ? 'cur' : '';
                        return (
                            <li className={curClass} onClick={()=>handleChangeShowCurIndex(index)} key={index}>
                                <div className="li-link">
                                    {!showEdit && (<span className="span_name">{label.title.value}</span>)}
                                    {showEdit && (<input type="text" className="input-hidden" {...label.title} onBlur={()=>{handleBlurInput(label.title)}} onClick={(e)=>{e.stopPropagation()}}/>)}
                                </div>
                                <div className="operate-o">
                                    <span className="glyphicon glyphicon-edit" aria-hidden="true" onClick={(e)=>{e.stopPropagation(),handleChangeSpan2Input(index)}}></span>
                                    <span className="glyphicon glyphicon-trash" aria-hidden="true" onClick={function(e){
                                        e.stopPropagation();
                                        if(labels.length > 1){
                                            labels.removeField(index);
                                            handleChangeShowCurIndex(0);
                                        }
                                    }}></span>
                                </div>
                            </li>
                        )
                    })}
                    <li className="add_new" onClick={function(){
                        if(labels.length<5){
                            labels.addField({title:'新标签',info:''});
                        }
                    }}>
                        <div className="li-link"><span className="span_name">+</span> </div>
                    </li>
                </ul>
            </div>
            {labels.length > 0 && <Ueditor {...labels[curIndex].info} id="content" height="200" disabled={false}/>}
        </div>
    )
  }
}





































