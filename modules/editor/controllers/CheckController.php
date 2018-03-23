<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\editor\controllers;

use Yii;
use yii\web\Controller;
use node\lib\GetVideoLink;
use node\lib\controller\AjaxController;
/**
 * Description of CheckController
 *
 * @author xiaojx
 */
class CheckController extends AjaxController {

    /**
     * 验证视频链接
     */
    public function actionVideo() {
        $post = Yii::$app->request->post();
        $url=$post['url'];
        $web_video = new GetVideoLink();
        $url = $web_video->getUrl($url);
        return ['url'=>$url];
    }

}
