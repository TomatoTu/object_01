<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\models;
use node\models\site\Orders;
use node\modules\store\models\OrderProduct;
/**
 * Description of order
 *
 * @author dingjj
 */
class Order extends Orders{
    public function getProducts(){
        return $this->hasMany(OrderProduct::className(), ['order_id'=>'id']);
    }
}
