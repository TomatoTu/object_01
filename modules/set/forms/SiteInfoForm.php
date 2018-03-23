<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\forms;
use node\modules\set\models\Site;
use node\modules\set\models\Domain;
use node\modules\set\models\ResourceRef;
use node\lib\models\BaseModel;
/**
 * Description of SiteInfoForm
 *
 * @author dingjj
 */
class SiteInfoForm extends BaseModel{
    public $title;
    public $domains;
    public $refrence;
    public $email;
    public function SiteInfo(){
        $this->title = $this->getTitle();
        $this->domains = $this->getDomains();
        $this->refrence = $this->getRef();
        $this->email = $this->getEmail();
        return $this->toArray();
    }
    public function getTitle(){
        return self::site()->name;
    }
    public function getDomains(){
        return Domain::find()->where(['host_id'=>self::hostId()])->orderBy('id')->asArray()->all();
    }
    public function getRef(){
        $refrence = ResourceRef::find()->where(self::whereMerge(['type'=>6]))->with('resource')->asArray()->one();
        return ['resource_id'=>$refrence['resource_id'],'path'=>$refrence['resource']['path']];
    }
    public function getEmail(){
        return self::nodeHost()->email;
    }
}
