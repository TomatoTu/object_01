<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Article;
use node\modules\system\models\Categories;
use node\modules\system\models\ResourceRefrence;
use node\modules\system\models\System;
use node\lib\models\BaseModel;
use node\lib\Functions;
use Yii;
/**
 * Description of ArticleCreateForm
 *
 * @author dingjj
 */
class ArticleUpdateForm extends Article{
    
    public $resources;
     /**
     * @inheritdoc
     */
    
     public function rules() {
         return [
            [['id','category_id','title'], 'required'],
            ['id', 'exist', 'targetClass' => Article::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
//            ['category_id', 'exist', 'targetClass' => Categories::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
            [['title'], 'string', 'max' => 250],
            [['info','synopsis'], 'string', 'max' => 50000],
            [['resources'], 'safe'],
        ];
     }

    public function updateInfo($data=[]){
        
        $resourcesInfo = json_decode($this->resources,true);
        
        $article = Article::findOne($this->id);
        
        $article->setAttributes($this->toArray());
        $article->info = Functions::clearPhpCode($article->info);
        $article->synopsis = Functions::clearPhpCode($article->synopsis);
        $refs = $article->ref;
         if(count($refs) > 0){
             if(count($resourcesInfo) > 0){
                $refs[0]->resource_id = $resourcesInfo[0]['id'];
                $refs[0]->save();
             }else{
                 $refs[0]->delete();
             }
         }else{
             if(count($resourcesInfo) > 0){
                 $resourceRefrence = new ResourceRefrence();
                $resourceRefrence->setAttributes(self::dataDefault());
                $resourceRefrence->loadDefaultValues();
                $resourceRefrence->setAttributes(['type'=>'9',
                    'aim_id'=>$article->id,
                    'resource_id'=>$resourcesInfo[0]['id']]);
                $resourceRefrence->save();
             }
         }
        $article->is_refuse = 0;
        $article->save();
        return $this;
    }
}
