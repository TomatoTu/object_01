<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;
use node\lib\Functions;
use Yii;
/**
 * Description of CacheFunctions
 *
 * @author dingjj
 */
class HostresFunctions {
    
    // 验证空间大小 -- 改为在站点端验证
//    public static function checkSpace($hostres){
//        $hostInfo['space'] = Functions::getSiteSpace($this->naples['SERVER']->domain, $this->naples['HOSTID']);
//        return self::checkRes('space',$hostres);
//    }
    // 验证页面数量
    public static function checkPages($hostres){
        return self::checkRes('pages',$hostres);
    }
    // 验证系统数量
    public static function checkSystems($hostres){
        return self::checkRes('systems',$hostres);
    }
    // 验证产品数量
    public static function checkProducts($hostres){
        return self::checkRes('products',$hostres);
    }
    // 验证图片数量
    public static function checkPics($hostres){
        return self::checkRes('pictures',$hostres);
    }
    // 增加使用过的空间
    public static function addSpace($hostres,$size){
        $hostres['space'] += $size;
        return $hostres;
    }
    // 增加页面数量
    public static function addPages($hostres){
        $hostres['pages'] += 1;
        return $hostres;
    }
    // 增加系统数量
    public static function addSystems($hostres){
        $hostres['systems'] += 1;
        return $hostres;
    }
    // 增加产品数量
    public static function addProducts($hostres){
        $hostres['products'] += 1;
        Yii::info($hostres);
        return $hostres;
    }
    // 增加图片数量
    public static function addPics($hostres){
        $hostres['pictures'] += 1;
        return $hostres;
    }
    
    // 减少页面数量
    public static function minusPages($hostres){
        $hostres['pages'] -= 1;
        return $hostres;
    }
    // 减少系统数量
    public static function minusSystems($hostres){
        $hostres['systems'] -= 1;
        return $hostres;
    }
    // 减少产品数量
    public static function minusProducts($hostres,$size=1){
        $hostres['products'] -= $size;
        Yii::info($hostres);
        return $hostres;
    }
    // 减少图片数量
    public static function minusPics($hostres){
        $hostres['pictures'] -= 1;
        return $hostres;
    }
    
    // 验证方法
    private static function checkRes($class,$hostres){
        $type = $hostres['host_type'];
        if($hostres[$class]<$type[$class]){
            return true;
        }
        return false;
    }
}
