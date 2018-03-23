import React, { Component, PropTypes } from 'react';
import Table from './Table'

export default class TableApp extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount(){
    
  }
  render() {
    const {orders,...actions} = this.props;

    return (
        <div className="sec-order-con">
            <table cellSpacing="0" cellPadding="0" border="0" width="100%" className="orderC-tb-b">
                <thead>
                    <tr>
                        <th>订单详情</th>
                        <th width="12.5%">实付款</th>
                        <th width="12.5%">订单状态</th>
                        <th width="12.5%">操作</th>
                    </tr>
                </thead>
            </table>
            {orders.map(function(order,index) {
              return <Table order={order} key={index} {...actions}/>
            })}
        </div>
    )
  }
}



