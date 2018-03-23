<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Payment;
/**
 * Description of PaymentInfoForm
 *
 * @author dingjj
 */
class PaymentInfoForm extends Payment{
    public function rules(){
        return [
        ];
    }
    public function getInfo(){
        $pays = self::find()->where(self::whereDefault())->asArray()->all();
        
        $map = [];
        foreach($pays as $pay){
            $pay['config'] = json_decode($pay['config'],true);
            $map[$pay['type']] = $pay;
        }
        
        return array_values($map);
    }
}
