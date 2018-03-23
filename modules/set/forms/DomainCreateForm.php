<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;
use node\modules\set\models\Domain;
/**
 * Description of DomainInfoForm
 *
 * @author dingjj
 */
class DomainCreateForm extends Domain{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['domain_name'],'required'],
            [['domain_name'], 'string', 'max' => 200],
            [['host_id','status','domain_type'],'safe'],
        ];
    }
    
    public function initData(){
        return [
            'status'=>0,
            'domain_type'=>1,
        ];
    }
    
    
    public function createDoamin(){
        $this->setAttributes(self::dataDefault());
        $this->setAttributes($this->initData());
        $this->save();
        return $this;
    }
}
