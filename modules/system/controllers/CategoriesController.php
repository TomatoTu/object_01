<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;
use node\modules\system\lib\RestController;
use node\modules\system\forms\CategoriesInfoForm;
use node\modules\system\forms\CategoriesUpdateForm;
use node\modules\system\forms\CategoriesDeleteForm;
use node\modules\system\forms\CategoriesCreateForm;
use Yii;
/**
 * Description of CategoriesController
 *
 * @author dingjj
 */
class CategoriesController extends RestController{
    /*
     * 加载产品
     */
    public function actionLoadcategories() {
        
        $categories = $this->getModel(CategoriesInfoForm::className())->getInfo(); 
        
        return $categories; //array_merge([['id'=>0,'name'=>'未分类']],$categories);
    }
    
    /*
     * 加载产品
     */
    public function actionUpdate() {
        if(Yii::$app->request->post('is_new')){
            $categories = $this->getModel(CategoriesCreateForm::className())->updateCategory(); 
        }else{
            $categories = $this->getModel(CategoriesUpdateForm::className())->updateCategory(); 
        }
        $this->checkErrors($categories);
        return $this->getModel(CategoriesInfoForm::className())->getInfo(); 
//        return $categories; //array_merge([['id'=>0,'name'=>'未分类']],$categories);
    }
    
    /*
     * 加载产品
     */
    public function actionDelete() {
        
        $categoriesId = $this->getModel(CategoriesDeleteForm::className())->deleteCategory(); 
        
        return $categoriesId; //array_merge([['id'=>0,'name'=>'未分类']],$categories);
    }
}
