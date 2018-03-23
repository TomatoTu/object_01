<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Article;
use node\lib\models\BaseModel;
use node\modules\system\lib\ArticleFunctions;
/**
 * Description of ArticleIdForm
 *
 * @author dingjj
 */
class ArticleIdForm extends BaseModel{
    public $id;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['id'], 'required'],
            ['id', 'exist', 'targetClass' => Article::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
        ];
    }
    
    public function delete(){
        ArticleFunctions::Delete($this->id);
        return $this->id;
    }
    
    public function deleter(){
        ArticleFunctions::Deleter($this->id);
        return $this->id;
    }
    
    public function recovery(){
        ArticleFunctions::recovery($this->id);
        return $this->id;
    }
    
    public function top(){
        $product = Article::findOne(self::whereMerge(['id'=>  $this->id]));
        
        if(!$product){
            throw new \yii\web\HttpException();
        }
        
        $count = Article::find()->where(self::whereDefault())->andWhere(['>', 'is_top', 0])->max('is_top');
        
        $product->is_top = $count+1;
        $product->save();
        
        return $product;
    }
    public function untop(){
        $product = Article::findOne(self::whereMerge(['id'=>  $this->id]));
        
        if(!$product){
            throw new \yii\web\HttpException();
        }
        $product->is_top = 0;
        $product->save();
        
        return $product;
    }
}
