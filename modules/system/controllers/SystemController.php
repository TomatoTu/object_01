<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\controllers;

use node\modules\system\lib\RestController;
use node\modules\system\models\System;
use node\modules\system\forms\SystemCreateForm;
use node\modules\system\forms\SystemDeleteForm;
use node\modules\system\forms\SystemInfoForm;
use node\modules\system\forms\SystemUpdateForm;
use node\lib\HostresFunctions;
use node\modules\system\forms\ProductListForm;
use node\modules\system\forms\ArticleListForm;
use Yii;

/**
 * Description of UserController
 *
 * @author dingjj
 */
class SystemController extends RestController {

    /*
     * 获取系统信息
     */
    public function actionSystems() {
        $systems = System::getSystems();
        Yii::info($systems);
        foreach ($systems as $key=>$system) {
            $systems[$key]['articlescount'] = ['count'=>count($system['articles'])];
            $systems[$key]['productscount'] = ['count'=>count($system['products'])];
            unset($systems[$key]['articles']);
            unset($systems[$key]['products']);
        }
        
        return ['systems'=>$systems];
    }
    
    /*
     * 新增系统
     */
    public function actionCreate() {
        $hostres = $this->hostres;
        
        // 验证系统数量
        if(!HostresFunctions::checkSystems($hostres)){
            throw new \yii\web\BadRequestHttpException('系统数量达到上限');
        }
        
        $system = $this->getModel(SystemCreateForm::className())->createSystem(); 
        
        $this->checkErrors($system);
        
        $this->hostres = HostresFunctions::addSystems($hostres);
        
        return $this->formmatSystem($system); 
    }
    
    /*
     * 删除系统
     */
    public function actionDelete() {
        
        $systemid = $this->getModel(SystemDeleteForm::className())->deleteSystem(); 
        
        $this->hostres = HostresFunctions::minusSystems($this->hostres);
        
        // 删除产品
        $products = new ProductListForm();
        $products->setAttribute('system_id', $systemid);
        $res = $products->productDeleteAllBySystem(); 
        $this->hostres = HostresFunctions::minusProducts($this->hostres,count($res['count']));
        // 删除文章
        $articles = new ArticleListForm();
        $articles->setAttribute('system_id', $systemid);
        $articles->articleDeleteAllBySystem(); 
        
        return ['id'=>$systemid];
    }
    
    /*
     * 加载单系统
     */
    public function actionLoad() {
        $system = $this->getModel(SystemInfoForm::className())->getInfo(); 
        
        $system['config'] = array_merge($this->getDefaultConfig($system['system_type_id']),json_decode($system['config'],true)?:[]);
        
        return $system;
    }
    
    /*
     * 加载单系统
     */
    public function actionUpdate() {
        $system = $this->getModel(SystemUpdateForm::className())->updateSystem(); 
        
        $this->checkErrors($system);
        
        $systemArr =  $system->toArray();
        
        $systemArr['config'] = array_merge($this->getDefaultConfig($systemArr['system_type_id']),json_decode($systemArr['config'],true)?:[]);
        return $systemArr;
    }
    
    public function getDefaultConfig($type){
        if($type == '1'){
            return [
                'system'=>[
                    'is_shipping'=>'0',// 0,1
                    
                ],
                'list'=>[
                    'style'=>'1',// 1,2
                    'per_row'=>'1',//1-6
                    'per_page'=>'10',//n
                    'order'=>'1',// 1,2
                    'is_show_title'=>'0',// 0,1
                    'is_show_price'=>'0',// 0,1
                    'is_show_info'=>'0',// 0,1
                    'position'=>'1',//1-3
                    'structure'=>'1',//1,2
                ],
                'detail'=>[
                    'style'=>'1',//1-3
                    'is_price'=>'1',// 0,1
                    'is_collection'=>'0',// 0,1
                    'is_share'=>'0',// 0,1
                    'is_comment'=>'0',// 0,1
                ],
            ];
        }else{
            return [
                'system'=>[
                    'is_share'=>'0',// 0,1
                    'is_comment'=>'0',// 0,1
                    'comment_limit'=>'1',// 1,2
                ],
                'list'=>[
                    'style'=>'1',// 1,2
                    'per_page'=>'10',//n
                    'order'=>'1',// 1,2
                    'structure'=>'1',//1,2
                    'is_showtime'=>'1',//0,1
                ],
            ];
        }
    }
    
    public function actionTest(){
        $a = [
            'system'=>[
                'is_shipping'=>false,
                'is_collection'=>false,
                'is_share'=>false,
                'is_comment'=>false,
            ],
            'list'=>[
                'style'=>1,// 1,2
                'per_row'=>1,//1-6
                'per_page'=>10,//n
                'order'=>1,// 1,2
                'is_show_title'=>false,
                'is_show_price'=>false,
                'is_show_info'=>false,
                'position'=>1,//1-3
            ],
            'detail'=>[
                'style'=>1,//1-3
            ],
        ];
        
        
        $b = [
            'system'=>[
                'is_shipping'=>true,
//                'is_collection'=>true,
//                'is_share'=>true,
//                'is_comment'=>true,
            ],
            'list'=>[
                'style'=>2,// 1,2
                'per_row'=>2,//1-6
                'per_page'=>10,//n
                'order'=>2,// 1,2
                'is_show_title'=>true,
                'is_show_price'=>true,
                'is_show_info'=>true,
                'position'=>3,//1-3
            ],
            'detail'=>[
                'style'=>3,//1-3
            ],
        ];
        
        return array_merge_recursive($a,$b);
    }
    
    public function formmatSystem($system){
        $system->articlescount = ['count'=>0];
        $system->productscount = ['count'=>0];
        return $system;
    }
}
