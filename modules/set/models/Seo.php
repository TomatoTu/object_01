<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\models;

use node\models\site\SeoInfo;
/**
 * Description of Seo
 *
 * @author dingjj
 */
class Seo extends SeoInfo{
    public static function getSeo(){
        return self::findOne(self::whereMerge(['type'=>  self::TYPE_ALL]));
    }
}
