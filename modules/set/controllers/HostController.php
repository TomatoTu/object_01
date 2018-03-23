<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\set\controllers;

use node\modules\set\lib\RestController;
use node\modules\set\forms\HostCreateForm;
use node\modules\set\forms\HostEndTimeForm;
use node\modules\set\forms\HostStatusForm;
use node\modules\set\forms\HostDeleteForm;
use node\modules\set\forms\HostSiteInfoForm;
use node\modules\set\forms\HostBindUserForm;

/**
 * Description of UserController
 *
 * @author dingjj
 */
class HostController extends RestController {

    /*
     * 获取站点信息
     */
    public function actionSite() {
        return $this->getModel(HostSiteInfoForm::className())->getSiteInfo();
    }
    
    /*
     * 增加host
     */
    public function actionCreate() {
        
        $host = $this->getModel(HostCreateForm::className())->createHost();
        
        $this->checkErrors($host);
        
        return ['host_id' => $host->id];
    }
    
    /*
     * 续费
     */
    public function actionEndtime() {
        
        $host = $this->getModel(HostEndTimeForm::className())->setHostEndTime();
        
        $this->checkErrors($host);
        
        return ['host_id' => $host->id];
    }
    
    /*
     * 停用或开启站点(1,开通，2，关闭)
     */
    public function actionStatus() {
        
        $host = $this->getModel(HostStatusForm::className())->setStatus();
        
        $this->checkErrors($host);
        
        return ['host_id' => $host->id];
    }
    
    /*
     * 删除站点
     */
    public function actionDelete() {
        
        $num = $this->getModel(HostDeleteForm::className())->setDelete();
        
        $this->CheckDelete($num);
        
        return '';
    }
    
    /*
     * 绑定站点用户
     */
    public function actionBinduser() {
        
        $host = $this->getModel(HostBindUserForm::className())->bindUser();
        
        $this->checkErrors($host);
        
        return '';
    }

    /**
     * @访问方式 ['GET','POST', 'HEAD','PUT', 'PATCH','DELETE']
     */
    protected function verbs() {
        return [
            'site' => [ 'POST'],
            'create' => [ 'POST'],
            'delete' => [ 'POST'],
            'endtime' => [ 'POST'],
            'status' => [ 'POST']
        ];
    }

}
