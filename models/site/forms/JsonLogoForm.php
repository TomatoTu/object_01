<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\SiteConfig;
use node\models\site\ResourceRefrence;
use node\models\site\Resource;
/**
 * Description of JsonLogoForm
 *
 * @author dingjj
 */
class JsonLogoForm extends SiteConfig{
    
    // 获取logo
    public static function getLogo(){
        return self::find()->where(self::whereMerge())->with(['resources'])->asArray()->one();
    }
    // 图片关系
    public function getRef(){
        $query = $this->hasMany(ResourceRefrence::className(), ['aim_id'=>'id']);
        return $query->andWhere(['type'=>1]);
    }
    // 图片
    public function getResources(){
        return $this->hasMany(Resource::className(), ['id'=>'resource_id'])->via('ref');
    }
}
