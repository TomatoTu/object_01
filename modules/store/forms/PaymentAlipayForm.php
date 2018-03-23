<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Payment;
use node\lib\models\BaseModel;
/**
 * Description of PaymentUpdateForm
 *
 * @author dingjj
 */
class PaymentAlipayForm extends BaseModel{
    
    public $partner;
    public $seller_id;
    public $key;
    public function rules()
    {
        return [
            [['partner', 'seller_id','key'], 'required'],
            [['partner', 'seller_id','key'], 'string', 'max' => 255]
        ];
    }
    
    public function modelUpdate(){
        $aly = Payment::findOne(self::whereMerge(['type'=>0]));
        
        if(!$aly){
            $aly = new Payment();
            $aly->setAttributes(self::dataDefault());
        }
        
        $aly->config = json_encode($this->toArray());
        
        $aly->save();
        
        return $aly;
    }
}
