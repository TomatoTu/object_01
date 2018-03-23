<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\lib\models\BaseModel;
use node\modules\store\models\Comment;
/**
 * Description of CommentDeleteForm
 *
 * @author dingjj
 */
class CommentDeleteForm extends BaseModel{
    
    public $ids;
    
    /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['ids'], 'required'],
        ];
    }
    
    public function deleteInfo(){
        
        $ids = explode(',', $this->ids);
        $members = [];
        foreach($ids as $id){
            $member = Comment::findOne(self::whereMerge(['id'=>$id]));
            if(!$member){
                throw new \yii\web\BadRequestHttpException('错误的id');
            }
            
            $members[] = $member;
        }
        
        foreach($members as $member){
            $member->delete();
        }
    }
}
