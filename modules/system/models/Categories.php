<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\models;
use node\models\site\Categories as baseCategories;
use node\modules\system\models\Seo;
/**
 * Description of Product
 *
 * @author dingjj
 */
class Categories extends baseCategories{
    public function getSeo(){
        return $this->hasOne(Seo::className(), ['aim_id'=>'id'])->andWhere(self::whereMerge(['type'=>  Seo::TYPE_CAG]));
    }
}
