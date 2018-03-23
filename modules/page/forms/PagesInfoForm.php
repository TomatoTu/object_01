<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\forms;
use node\modules\page\models\Page;
/**
 * Description of PagesSearchFrom
 *
 * @author dingjj
 */
class PagesInfoForm extends Page{
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [];
    }
    
    public function getPagesInfo(){
        $pages = self::getPages();
        
        foreach ($pages as $key => $page) {
            if($page['type'] == '3') continue;
            
            $seo = $page['seo'];
            $pages[$key]['page_title'] = $seo['page_title']?:'';
            $pages[$key]['page_keywords'] = $seo['page_keywords']?:'';
            $pages[$key]['page_description'] = $seo['page_description']?:'';
            $pages[$key]['footer_code'] = $seo['footer_code']?:'';
            $pages[$key]['header_code'] = $seo['header_code']?:'';
            $pages[$key]['status'] = $pages[$key]['status'] == '1';
        }
        
        return $pages;
    }
}
