<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\modules\system\models\Seo;
/**
 * Description of SeoUpdateForm
 *
 * @author dingjj
 */
class SeoUpdateForm extends Seo{
    public function rules() {
        return [
           [['id'], 'required'],
           ['id', 'exist', 'targetClass' => Product::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '产品id不存在'],
        ];
    }
}
