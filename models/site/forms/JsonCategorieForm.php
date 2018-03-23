<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\forms;
use node\models\site\Categories;
use node\models\site\SeoInfo;
use node\models\site\forms\JsonProductInfoForm;
use node\models\site\forms\JsonArticlesForm;
/**
 * Description of JsonCategorieForm
 *
 * @author dingjj
 */
class JsonCategorieForm extends Categories{
    // 产品
    public function getProducts(){
        $query = $this->hasMany(JsonProductInfoForm::className(), ['category_id'=>'id'])->andWhere(['is_refuse'=>0]);
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
    
    //文章
    public function getArticles(){
        $query = $this->hasMany(JsonArticlesForm::className(), ['category_id'=>'id'])->andWhere(['is_refuse'=>0]);
        return $query->orderBy('is_top desc,order_num desc,id desc');
    }
    
    // seo
    public function getSeo(){
        return $this->hasMany(SeoInfo::className(), ['aim_id'=>'id'])->andWhere(['type'=>2]);
    }
}
