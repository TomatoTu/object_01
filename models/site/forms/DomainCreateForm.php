<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Domain;
use Yii;
/**
 * Description of DomianCreateForm
 *
 * @author dingjj
 */
class DomainCreateForm extends Domain{
    public function initData(){
        return [
//            'id' => 'ID',
//            'host_id' => 'Host ID',
            'status' => 1,
            'domain_type' => 0,
//            'domain_name' => $this->getDomainName(),
//            'create_time' => 'Create Time',
        ];
    }
    
    public function initCreate($data=[]){
        // 设置值
        $this->setAttributes(array_merge(self::initData(),  $this->defaultData, $data),false);
        // 加载默认值，根据sql上的默认值（不覆盖）。
        $this->loadDefaultValues();
        
        return $this->save();
    }
}
