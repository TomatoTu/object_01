<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\models\site\init;

use node\models\site\Host;
use Yii;

/**
 * Description of HostInitForm
 *
 * @author dingjj
 */
class HostInitForm extends Host{
    
    // 创建host
    public function setInit($nodehost=false){
        if(!$nodehost) $nodehost = Yii::$app->user->identity;
        
        // 获取不重复的随机码
        do {
            $str = Yii::$app->security->generateRandomString(6);
            $str = strtolower($str);
            $str = strtr($str, '-_', 'ab');
        } while (self::find()->where(['auth_key'=>$str])->count());
        
        $nodehost->auth_key = $str;
        
        $this->setAttributes($nodehost->toArray());
        $this->save();
        return $this;
    }
    
    public function replace($search,$subject){
        return str_replace($search, 'a', $subject);
    }
}
