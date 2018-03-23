<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;

use node\modules\system\models\Categories;
use node\modules\system\models\Seo;

/**
 * Description of CategoriesUpdateForm
 *
 * @author dingjj
 */
class CategoriesCreateForm extends Categories {

    public $seo;

    public function rules() {
        return [
            [['name'], 'required', 'message' => "请填写分类名称!"],
            [['parent_id', 'system_id'], 'required'],
            //['id', 'exist', 'targetClass' => self::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '分类id不存在'],
            [['parent_id', 'system_id'], 'integer'],
            [['name'], 'string', 'max' => 50, 'message' => "分类名称不能超过50个字符!"],
            [['seo'], 'safe'],
        ];
    }

    public function updateCategory() {

        $seoInfo = json_decode($this->seo, true);

        $category = new Categories();

        $category->setAttributes(self::dataDefault());
        $category->setAttributes($this->toArray());
        $category->order_num = $this->orderNum();
        $category->save();

        if ($category->hasErrors()) {
            throw new \yii\web\BadRequestHttpException();
        }

        $seo = new Seo();
        $seo->setAttributes($seoInfo);
        $seo->setAttributes(self::dataDefault());
        $seo->loadDefaultValues();
        $seo->setAttributes(['type' => '2', 'aim_id' => $category->id]);
        $seo->save();



        return $category;
    }

    public function orderNum() {
        $maxOrder = Categories::find()->where(self::whereMerge(['system_id' => $this->system_id, 'parent_id' => $this->parent_id]))->max('order_num');
        return $maxOrder + 1;
    }

}
