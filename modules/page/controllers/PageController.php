<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\controllers;

use node\modules\page\lib\RestController;
use node\modules\page\models\Page;
use node\modules\page\forms\PagesInfoForm;
use node\modules\page\forms\PagesUpdateForm;
use node\modules\page\models\System;
use node\lib\PageFunctions;
use node\modules\page\forms\PagesCreateForm;
use node\modules\page\forms\PagesCopyDeleteForm;
use node\modules\page\forms\PagesMenuSortForm;
use node\lib\HostresFunctions;
use Yii;

/**
 * Description of UserController
 *
 * @author dingjj
 */
class PageController extends RestController {

    /*
     * 获取页面信息
     */
    public function actionPages() {
//        return $this->getModel(PagesInfoForm::className())->getPagesInfo();
//        System::getSystems();
        return ['pages'=>$this->getModel(PagesInfoForm::className())->getPagesInfo(),'systems'=>System::getSystems()];
    }
    
    /*
     * 更新页面信息
     */
    public function actionUpdate() {
        $page = $this->getModel(PagesUpdateForm::className())->setPageInfo(); 
        
        $this->checkErrors($page);
        
        return $this->formmatPage($page); 
    }
    
    // 格式化page页面信息
    public function formmatPage($page){
        $pageArr = $page->toArray();
        
        if($page->type != '3'){
            $this->checkErrors($page->seo);
        
            $seo = $page->seo->toArray();

            $pageArr['seo'] = $seo;

            $pageArr['page_title'] = isset($seo['page_title'])?$seo['page_title']:'';
            $pageArr['page_keywords'] = isset($seo['page_keywords'])?$seo['page_keywords']:'';
            $pageArr['page_description'] = isset($seo['page_description'])?$seo['page_description']:'';
            $pageArr['footer_code'] = isset($seo['footer_code'])?$seo['footer_code']:'';
            $pageArr['header_code'] = isset($seo['header_code'])?$seo['header_code']:'';
        }
        $pageArr['status'] = $pageArr['status'] == '1';
        
        return $pageArr;
    }
    
    // 获取系统信息
    public function actionSystems() {
        return System::getSystems();
    }
    
    //新增页面
    public function actionCreate(){
        
        $hostres = $this->hostres;
        
        // 验证产品数量
        if(!HostresFunctions::checkPages($hostres)){
            throw new \yii\web\BadRequestHttpException('页面数量达到上限');
        }
        
        $model = $this->getModel(PagesCreateForm::className());
        
        $page = $this->func($model);
        
        $this->hostres = HostresFunctions::addPages($hostres);
        
        return $this->formmatPage($page); 
    }
    
    public function func($model){
        switch ($model->type) {
            case '1':
                return PageFunctions::init_standard();
                break;
            case '2':
                return PageFunctions::init_system(['system_id'=>0]);
                break;
            case '3':
                return PageFunctions::init_external();
                break;
            default:
                return PageFunctions::init_standard();
                break;
        }
    }
    
    //复制页面
    public function actionCopy(){
        $model = $this->getModel(PagesCopyDeleteForm::className());
        return PageFunctions::copyPage($model->id);
    }
    
    //删除页面
    public function actionDelete(){
        $model = $this->getModel(PagesCopyDeleteForm::className());
        PageFunctions::deletePage($model->id);
        $this->hostres = HostresFunctions::minusPages($this->hostres);
        return ['id'=>$model->id];
    }
    
    //删除页面
    public function actionMenu(){
        $this->getModel(PagesMenuSortForm::className())->menuSort();
        return ['pages'=>$this->getModel(PagesInfoForm::className())->getPagesInfo(),'systems'=>System::getSystems()];
    }
}
