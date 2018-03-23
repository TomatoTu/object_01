<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\lib\models\BaseModel;
use node\modules\system\models\Article;
use node\modules\system\lib\ArticleFunctions;
/**
 * Description of ArticleIdsForm
 *
 * @author dingjj
 */
class ArticleIdsForm extends BaseModel{
     public $ids;
     
     public $idArr;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['ids'], 'required'],
        ];
    }
    
    public function deleteMany(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ArticleFunctions::Delete($id);
        }
        return $this->idArr;
    }
    
    public function deleteManyr(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ArticleFunctions::Deleter($id);
        }
        return $this->idArr;
    }
    
    public function recoveryMany(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ArticleFunctions::recovery($id);
        }
        return $this->idArr;
    }
}
