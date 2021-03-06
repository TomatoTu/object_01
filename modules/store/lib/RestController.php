<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\lib;

use node\modules\store\lib\MissFieldsHttpException;
use yii\web\ServerErrorHttpException;
use Yii;
use node\lib\controller\AjaxController;

/**
 * Description of RestController
 *
 * @author dingjj
 */
class RestController extends AjaxController{
    
    public function getModel($class){
        $model = new $class();
        $model->setAttributes(Yii::$app->request->get());
        $model->setAttributes(Yii::$app->request->post());
        
        if (!$model->validate()) {
            $this->checkErrors($model);
        }
        
        return $model;
    }
    
    public function checkErrors($model){
        if($model->hasErrors()){
            Yii::warning($model->getErrors());
            $errors = '';
            foreach ($model->getErrors() as $key => $error) {
                $errors .= $error[0] ."\n";
            }
            throw new MissFieldsHttpException($errors);
        }
    }
    
    public function CheckDelete($mun){
        if(!$mun){
            throw new ServerErrorHttpException('Error Delete.');
        }
    }
}
