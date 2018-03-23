<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\controllers;
use node\modules\set\lib\RestController;
use node\modules\set\forms\SiteInfoForm;
use node\modules\set\forms\DomainCreateForm;
use node\modules\set\forms\DomainDeleteForm;
use node\modules\set\forms\SiteTitleForm;
use node\modules\set\forms\FactorIconForm;
use node\modules\set\forms\NodeHostEmailForm;
use Yii;

/**
 * Description of SiteController
 *
 * @author dingjj
 */
class SiteController extends RestController{
    /*
     * 获取站点信息
     */
    public function actionLoad() {
        return $this->getModel(SiteInfoForm::className())->SiteInfo();
    }
    
    public function actionUpdatetitle(){
        $model = $this->getModel(SiteTitleForm::className())->updateTitle();
        
        $this->checkErrors($model);
        $this->getDefaultHost();
        $this->getDefaultSite();
        return $model->name;
    }
    
    public function actionCreatedomain(){
        if($this->naples['NODE_HOST']->is_trial == 0){
            throw new \yii\web\BadRequestHttpException('测试用户不能绑定域名。');
        }
        $model = $this->getModel(DomainCreateForm::className())->createDoamin();
        
        $this->checkErrors($model);
        return $this->getModel(SiteInfoForm::className())->getDomains();
    }
    
    public function actionDeletedomain(){
        $model = $this->getModel(DomainDeleteForm::className())->deleteDomian();
        
        return $this->getModel(SiteInfoForm::className())->getDomains();
    }
    
    public function actionUpdateicon(){
        $model = $this->getModel(FactorIconForm::className())->updateTitle();
        
        $this->checkErrors($model);
        
        return $this->getModel(SiteInfoForm::className())->getRef();
    }
    
    public function actionUpdateemail(){
        $model = $this->getModel(NodeHostEmailForm::className())->updateEmail();
        
        $this->checkErrors($model);
        $this->getDefaultSite();
        return $model->email;
    }
}
