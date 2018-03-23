<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\lib\models\BaseModel;
use node\modules\store\models\Order;
use Yii;
/**
 * Description of OrderInfoForm
 *
 * @author dingjj
 */
class OrderInfoForm extends Order{
    /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
        ];
    }
    
    public function getInfo(){
        return Order::find()->where(self::whereMerge(['id'=>  $this->id]))->with('products')->asArray()->one();
    }
}
