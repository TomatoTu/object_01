<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\models;
use node\models\site\ArticleInfo;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\models\Resource;
use node\modules\system\models\Categories;
/**
 * Description of Article
 *
 * @author dingjj
 */
class Article extends ArticleInfo{
    // 图片关系
    public function getRef(){
        $query = $this->hasMany(ResourceRefrence::className(), ['aim_id'=>'id']);
        return $query->andWhere(['type'=>9]);
    }
    // 图片
    public function getResources(){
        return $this->hasMany(Resource::className(), ['id'=>'resource_id'])->via('ref');
    }
    // 分类
    public function getCategorie(){
        return $this->hasOne(Categories::className(), ['id'=>'category_id']);
    }
}
