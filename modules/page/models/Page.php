<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\models;

use node\models\site\Page as oPage;
use node\models\site\SeoInfo;
/**
 * Description of Page
 *
 * @author dingjj
 */
class Page extends oPage{
    public static function getPages(){
        return self::find()->where(self::whereDefault())->with('seo')->asArray()->orderBy('order_num asc')->all();
    }
    public static function getPage($id){
        return self::find()->where(self::whereMerge(['id'=>$id]))->with('seo')->orderBy('order_num asc')->one();
    }
    public function getSeo(){
        return $this->hasOne(SeoInfo::className(), ['aim_id'=>'id'])->andWhere(self::whereMerge(['type'=>  SeoInfo::TYPE_PAGE]));
    }
    public function setSeo($seo){
        return $this->seo = $seo;
    }
}
