<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Member;
use node\lib\models\BaseModel;
/**
 * Description of MemberDeleteForm
 *
 * @author dingjj
 */
class MemberDeleteForm extends BaseModel{
    
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
            $member = Member::findOne(self::whereMerge(['id'=>$id]));
            if(!$member){
                throw new \yii\web\BadRequestHttpException('错误的id');
            }
            
            $members[] = $member;
        }
        
        foreach($members as $member){
            $info = $member->info;
            
            if($info){
                $info->delete();
            }
            $member->delete();
        }
    }
}
