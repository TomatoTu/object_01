<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Page;
use node\models\site\Banner;
use node\models\site\SeoInfo;
use node\models\site\System;
/**
 * Description of PageDeleteForm
 *
 * @author dingjj
 */
class PageCopyDeleteForm extends Page{
    public function getNpages(){
        return $this->hasMany(self::className(), ['parent_id'=>'id']);
    }
    public function getBanner(){
        return $this->hasOne(Banner::className(), ['page_id'=>'id']);
    }
    public function getSeo(){
        $query = $this->hasOne(SeoInfo::className(), ['aim_id'=>'id']);
        return $query->andWhere(['type'=>SeoInfo::TYPE_PAGE]);
    }
    public function getSystem(){
        return $this->hasOne(System::className(), ['id'=>'system_id']);
    }
    
    public function setSeo($seo){
        return $this->seo = $seo;
    }
    public function setBanner($banner){
        return $this->banner = $banner;
    }
    public function setSystem($system){
        return $this->system = $system;
    }
}
