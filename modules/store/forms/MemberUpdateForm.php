<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;
use node\modules\store\models\Member;
/**
 * Description of MemberCreateForm
 *
 * @author dingjj
 */
class MemberUpdateForm extends Member{
    
    public function rules(){
        return [
            [['id','password'], 'required'],
            ['id', 'exist', 'targetClass' => self::className(),'filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
            [['password'], 'string', 'max' => 250],
        ];
    }
    
    public function orderUpdate(){
        $member = Member::findOne($this->id);
        $member->password = md5($this->password);
        $member->save();
        return $member;
    }
}
