<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Host;
use node\models\site\Page;
use node\models\site\System;
use node\models\site\ProductInfo;
use node\models\site\Resource;
use node\models\site\Site;
use node\models\site\forms\SiteLanguageForm;
use node\models\node\Host as NodeHost;

/**
 * Description of SiteInfoForm
 *
 * @author dingjj
 */
class HostInfoForm extends Host{
    
    public function getPages(){
        return $this->hasMany(Page::className(),['host_id'=>'id']);
    }
    public function getSystems(){
        return $this->hasMany(System::className(),['host_id'=>'id']);
    }
    public function getProducts(){
        return $this->hasMany(ProductInfo::className(),['host_id'=>'id'])->andWhere(['is_refuse'=>[0,1]]);
    }
    public function getPictures(){
        return $this->hasMany(Resource::className(),['host_id'=>'id']);
    }
    
    public static function SiteInfo(){
        return self::find()->where(['id'=>self::hostId()])->with(['pages','systems','products','pictures'])->asArray()->one();
    }
    
    public static function HasHosts(){
        return NodeHost::find()->where(['user_id'=>self::userId()])->asArray()->all();
    }
    
    public static function HasLanguages(){
        $sites = SiteLanguageForm::Languages();
        $languages = null;
        foreach ($sites as $site) {
            $languages[] = $site['language']['name'];
        }
        return $languages;
    }
}
