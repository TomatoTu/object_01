<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;
use node\lib\WebHtml;
use Yii;
/**
 * Description of PreviewFunctions
 *
 * @author dingjj
 */
class PreviewFunctions {
    const TEMPLATE_PATH = '@node/web/template/';
    
    public static function init_page($theme,$page){
        
        $json = json_decode(file_get_contents(Yii::getAlias(self::TEMPLATE_PATH).$theme.'/template.json'),true);
        $page = (int)$page;
        if(!is_int($page) || $page<0 || $page > count($json['page']) ){
            $page = 0;
        }
        Yii::info($json);
        $logo_html = WebHtml::run()->getLogoHtml($json['logo']);
        $menu_html =WebHtml::run()->getMenuHtml($json['menus']);
        $banner_html =  WebHtml::run()->getBannerHtml($theme,$json['page'][$page]['banner']);
        $main_html = WebHtml::run()->getMainHtml(0, $json['page'][$page]['components'],true);
        $footer_html = WebHtml::run()->getFooterHtml($json['footer'],true);
        $registerhtml = WebHtml::run()->getRegisterHtml();
        $shopcarthtml = WebHtml::run()->getShopCartHtml();
        
        return ['logohtml' => $logo_html, 'menuhtml' => $menu_html, 'bannerhtml' => $banner_html, 'mainhtml' => $main_html, 'footerhtml' => $footer_html,'page'=>$page,'registerhtml' => $registerhtml,'shopcarthtml' => $shopcarthtml];
//        return Yii::$app->view->render(self::TEMPLATE_PATH.$theme.'/page.php',['logohtml' => $logo_html, 'menuhtml' => $menu_html, 'bannerhtml' => $banner_html, 'mainhtml' => $main_html, 'footerhtml' => $footer_html]);
    }
}
