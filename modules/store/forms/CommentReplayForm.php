<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Comment;
/**
 * Description of CommentReplayForm
 *
 * @author dingjj
 */
class CommentReplayForm extends Comment{
    public function rules(){
        return [
            [['id','reply'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
            [['reply'], 'string', 'max' => 1000],
        ];
    }
    
    public function modelUpdate(){
        $comment = Comment::findOne($this->id);
        $comment->reply = $this->reply;
        $comment->save();
        return $comment;
    }
}
