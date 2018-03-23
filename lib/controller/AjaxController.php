<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib\controller;
use Yii;
use yii\web\Response;
use node\lib\controller\ActiveController;

/**
 * Description of AjaxController
 *
 * @author dingjj
 */
class AjaxController extends ActiveController{
    public function init() {
        parent::init();
        $this->formatResponse();
    }
}
