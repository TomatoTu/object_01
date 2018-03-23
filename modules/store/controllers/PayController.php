<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\controllers;
use node\modules\store\forms\PaymentAlipayForm;
use node\modules\store\forms\PaymentDeleteForm;
use node\modules\store\forms\PaymentInfoForm;
use node\modules\store\forms\PaymentWeixinForm;
use node\modules\store\lib\RestController;
/**
 * Description of PayController
 *
 * @author dingjj
 */
class PayController extends RestController{
    public function actionLoad() {
        return $this->getModel(PaymentInfoForm::className())->getInfo();
    }

    public function actionAlipay() {
        $model = $this->getModel(PaymentAlipayForm::className())->modelUpdate();

        $this->checkErrors($model);

         return $this->getModel(PaymentInfoForm::className())->getInfo();
    }
    
    public function actionWeixin() {
        $model = $this->getModel(PaymentWeixinForm::className())->modelUpdate();

        $this->checkErrors($model);

         return $this->getModel(PaymentInfoForm::className())->getInfo();
    }

    public function actionDelete() {
        $this->getModel(PaymentDeleteForm::className())->deleteInfo();

        return $this->getModel(PaymentInfoForm::className())->getInfo();
    }
}
