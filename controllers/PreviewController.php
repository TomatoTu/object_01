<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\controllers;
use node\lib\controller\BaseController;
use node\lib\PreviewFunctions;
use Yii;
/**
 * Description of PreviewController
 *
 * @author dingjj
 */
class PreviewController extends BaseController{
    public function actionPreview($theme,$page=0,$color=100){
        $session = Yii::$app->session;
        $session->open();
        if($color==100){
            $color = $session->get('color')?:0;
        }else{
            $session->set('color',$color);
        }
        $this->layout='preview.php';
        Yii::info('$page'.$page);
        $data = PreviewFunctions::init_page($theme,$page,$color);
        
        Yii::$app->params['theme'] = $theme;
        Yii::$app->params['color'] = $color;
        return $this->render('@node/web/template/'.$theme.'/page.php',$data);
    }
}
