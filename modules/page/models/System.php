<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\models;
use node\models\site\System as oSystem;
/**
 * Description of System
 *
 * @author dingjj
 */
class System extends oSystem{
    public static function getSystems(){
        return self::find()->where(self::whereDefault())->orderBy('system_type_id asc,id asc')->asArray()->all();
    }
}
