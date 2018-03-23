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
class PaymentWeixinForm extends BaseModel{
    
    public $appid;
    public $mchid;
    public $key;
    public $appsecret;
    public $payModel = 2;
    public function rules()
    {
        return [
            [['appid', 'mchid','key','appsecret'], 'required'],
            [['appid', 'mchid','key','appsecret'], 'string', 'max' => 255]
        ];
    }
    
    public function modelUpdate(){
        $aly = Payment::findOne(self::whereMerge(['type'=>1]));
        
        if(!$aly){
            $aly = new Payment();
            $aly->setAttributes(self::dataDefault());
            $aly->type = 1;
        }
        
        $aly->config = json_encode($this->toArray());
        
        $aly->save();
        
        return $aly;
    }
}
