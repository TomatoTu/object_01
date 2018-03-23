<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\ResourceRefrence;
use node\models\site\Resource;
use node\models\site\Categories;
use node\models\site\ArticleInfo;
/**
 * Description of JsonArticlesForm
 *
 * @author dingjj
 */
class JsonArticlesForm extends ArticleInfo{
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
