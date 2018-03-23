<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\models;
use node\models\site\MemberSign;
use node\modules\store\models\MemberInfo;

/**
 * Description of Member
 *
 * @author dingjj
 */
class Member extends MemberSign{
    public function getInfo(){
        return $this->hasOne(MemberInfo::className(), ['member_id'=>'id']);
    }
}
