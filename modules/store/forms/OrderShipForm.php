<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;

use node\modules\store\models\Order;

/**
 * Description of OrderCancelForm
 *
 * @author dingjj
 */
class OrderShipForm extends Order {

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['id'], 'required'],
            [['shipping_type'], 'required', 'message' => '配送公司不能为空'],
            [['shipping_no'], 'required', 'message' => '运单号不能为空'],
            [['shipping_type', 'shipping_no'], 'string', 'max' => 250],
            ['id', 'exist', 'targetClass' => self::className(), 'filter' => ['host_id' => self::hostId(), 'site_id' => self::siteId()], 'message' => '订单id不存在'],
        ];
    }

    public function updateStatus() {
        $order = Order::findOne($this->id);

        $order->status = 2;
        $order->delivery_at = date('Y-m-d H:i:s', time());

        $order->shipping_type = $this->shipping_type;
        $order->shipping_no = $this->shipping_no;

        $order->save();

        return $order;
    }

}
