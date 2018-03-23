<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\controllers;
use node\lib\controller\BaseController;
use node\modules\page\forms\PagesInfoForm;
/**
 * Description of HostController
 *
 * @author dingjj
 */
class HostController extends BaseController{
    
    public function actionInit(){
        $page = new PagesInfoForm();
        $page->ccc  =11111;
        Yii::info($page->toArray());
        return false;
    }
}
