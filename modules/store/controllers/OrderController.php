<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\controllers;
use node\modules\store\lib\RestController;
use node\modules\store\forms\OrderCancelForm;
use node\modules\store\forms\OrderInfoForm;
use node\modules\store\forms\OrderListInfoForm;
use node\modules\store\forms\OrderPayForm;
use node\modules\store\forms\OrderReceivForm;
use node\modules\store\forms\OrderShipForm;
use node\modules\store\forms\OrderUpdateForm;
use node\modules\store\forms\OrderListInfo2Form;
use node\modules\store\forms\OrderDeleteForm;
use Yii;

/**
 * Description of SiteController
 *
 * @author dingjj
 */
class OrderController extends RestController{
    /*
     * 获取站点信息
     */
    public function actionLoadlist() {
        return $this->getModel(OrderListInfoForm::className())->getList();
    }
    
    public function actionLoad() {
        return $this->getModel(OrderInfoForm::className())->getInfo();
    }
    
    public function actionUpdate(){
        $model = $this->getModel(OrderUpdateForm::className())->orderUpdate();
        
        $this->checkErrors($model);
        return true;
//        return $this->getModel(OrderListInfo2Form::className())->getList();
    }
    
    public function actionCancel(){
        $model = $this->getModel(OrderCancelForm::className())->updateStatus();
        
        $this->checkErrors($model);
        
        return $this->getModel(OrderListInfoForm::className())->getList();
    }
    
    public function actionPay(){
        $model = $this->getModel(OrderPayForm::className())->updateStatus();
        
        $this->checkErrors($model);
        
        return $this->getModel(OrderListInfoForm::className())->getList();
    }
    
    public function actionShip(){
        $model = $this->getModel(OrderShipForm::className())->updateStatus();
        
        $this->checkErrors($model);
        return true;
//        return $this->getModel(OrderListInfo2Form::className())->getList();
    }
    
    public function actionReceiv(){
        $model = $this->getModel(OrderReceivForm::className())->updateStatus();
        
        $this->checkErrors($model);
        
        return $this->getModel(OrderListInfoForm::className())->getList();
    }
    
    public function actionDelete(){
        $this->getModel(OrderDeleteForm::className())->deleteInfo();
        
        return $this->getModel(OrderListInfoForm::className())->getList();
    }
    
}
