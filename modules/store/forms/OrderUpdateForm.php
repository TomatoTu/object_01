<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Order;
/**
 * Description of OrderUpdateForm
 *
 * @author dingjj
 */
class OrderUpdateForm extends Order{
    
    public $products;
    
    public function rules(){
        return [
            [['id','subtotal','total', 'consignee','address','phone','shipping_type','shipping_no'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
            [['consignee','address','shipping_type','shipping_no'], 'string', 'max' => 250],
            [['total','subtotal'], 'double'],
            [['phone','zip'], 'number'],
            [['products'], 'safe'],
        ];
    }
    
    public function orderUpdate(){
        $productsInfo = json_decode($this->products,true);
        
        $order = Order::findOne($this->id);
        $order->setAttributes($this->toArray());
        
        $products = $order->products;
        foreach ($products as $key => $product) {
            $product->setAttributes($productsInfo[$key]);
            $product->save();
            if($product->hasErrors()){
                throw new \yii\web\BadRequestHttpException('订单产品更新失败');
            }
        }
        
        $order->save();
        return $order;
    }
}
