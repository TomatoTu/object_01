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
class OrderCancelForm extends Order{
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
        ];
    }
    
    public function updateStatus(){
        $order = Order::findOne($this->id);
        
        $order->status = 5;
        $order->cancelled_at = date('Y-m-d H:i:s',time());
        
        $order->save();
        
        return $order;
    }
}
