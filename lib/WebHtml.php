<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\lib;

use Yii;
use node\models\site\ArticleInfo;
use node\models\site\ResourceRefrence;
use node\models\site\ProductInfo;

/**
 * 页面组件html
 * @author xiaojx 
 */
class WebHtml {

    private static $_instance = null;
    private $site_url = '';
    private $host_id = 0;
    private $site_id = 0;
    private $parent_id = 0;
    private $pos_column = 1;
    private $template_path = '@app/web/template/';
    private $is_pre = FALSE;

    public static function run() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self;
        }
        return self::$_instance;
    }

    protected function __construct() {
        $this->site_url = 'http://' . Yii::$app->params['NAPLES']['HOSTID'] . '.' . Yii::$app->params['NAPLES']['SERVER']['domain'];
        $this->host_id = Yii::$app->params['NAPLES']['HOSTID'];
        $this->site_id = Yii::$app->params['NAPLES']['SITEID'];
        return $this;
    }

    /**
     * 拼装页面logo的html
     * @return string
     */
    public function getLogoHtml($logo) {
        $txt_style = '';
        $img_style = '';
        switch ($logo['logo_type']) {
            case 0:
                $txt_style = $img_style = 'display:none';
                break;
            case 1:
                $img_style = 'display:none';
                break;
            case 2:
                $txt_style = 'display:none';
                break;
        }
        $logo_txt = '网站标题';
        if (strlen($logo['logo_txt']) > 0)
            $logo_txt = $logo['logo_txt'];
        $logo_img = '';
        if (strlen($logo['logo_path']) > 0)
            $logo_img = 'http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $logo['logo_path'];
        if (strlen($logo['logo_img_url']) > 0)
            $logo_img = $logo['logo_img_url'];
        return '<h1 contenteditable="true" style="' . $txt_style . '">' . $logo_txt . '</h1><a href="javascript:void(0)"  class="w-logo-img"  style="' . $img_style . '"><img src="' . $logo_img . '"/></a>';
    }

    /**
     * 拼装菜单html
     */
    public function getMenuHtml($page_list) {
        $html = '<ul class="nav_inner clearfix">';
        $html.=$this->createMenuHtml($page_list, 0, 1);
        $html.='</ul>';
        return $html;
    }

    /**
     * 注册
     */
    public function getRegisterHtml() {
        return '';
       // return '<div class="w-loginRegister"><a href="javascript:void(0);"  class="w-login">' . Yii::t('app', 'login') . '</a> <a href="javascript:void(0);" class="w-register">' . Yii::t('app', 'register') . '</a> </div>';
    }

    /**
     * 购物车
     */
    public function getShopCartHtml() {
        return '';
       // return '<div class="w-shopCart"> <a href="javascript:void(0);"><i class="icon_shopCart"></i>' . Yii::t('app', 'shoppingCartIcon') . '</a> </div>';
    }

    /**
     * 递归拼装菜单html
     * @param type $parent_id
     * @param type $index
     */
    private function createMenuHtml($page_list, $parent_id, $index) {
        $html = '';
        foreach ($page_list as $page) {
            if ($page['parent_id'] == $parent_id) {
                $sub_html = $this->createMenuHtml($page_list, $page['id'], $index + 1);
                if ($sub_html == '') {
                    if ($page['type'] == Yii::$app->params['PAGE_TYPE']['Link']) {
                        $html.='<li><a href="' . $page['url'] . '"  target="_blank">' . htmlspecialchars($page['name']) . '</a></li>';
                    } else {
                        $html.='<li><a href="' . $page['web_url'] . '">' . htmlspecialchars($page['name']) . '</a></li>';
                    }
                } else {
                    $html.='<li><div class="li-parent-div' . ($parent_id == 0 ? ' li-parentOne-div' : '') . '">';
                    if ($page['type'] == Yii::$app->params['PAGE_TYPE']['Link']) {
                        $html.='<a href="' . $page['url'] . '" target="_blank">' . htmlspecialchars($page['name']) . '</a>';
                    } else {
                        $html.='<a href="' . $page['web_url'] . '" >' . htmlspecialchars($page['name']) . '</a>';
                    }

                    $html.='<span class="icon-sub"></span></div><div class="submenu"><div class="back-div"><i class="i-back"></i><span>返回</span></div><ul>' . $sub_html . '</ul></div></li>';
                }
            }
        }
        return $html;
    }

    /**
     * 拼装Banner html
     */
    public function getBannerHtml($theme, $banner) {
        $html = '<div class="banner" style="' . ($banner['is_show'] == 1 ? "" : "display:none;") . '">';
        $bannerItems = $banner['items'];
        if ($banner['type'] == 1) {
            if ($bannerItems) {
                if (count($bannerItems) == 1) {
                    $html .= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $bannerItems[0]['path'] . '" />';
                } else {
                    $html .='<ul class="bxslider">';
                    foreach ($bannerItems as $item) {
                        $html.='<li><img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $item['path'] . '"></li>';
                    }
                    $html .='</ul> ';
                    $speed = 500;
                    $pause = 5;
                    $scale = '';
                    if (strlen($banner['config']) > 0) {
                        $config = json_decode($banner['config'], TRUE);
                        if ($config['scale'])
                            $scale = $config['scale'];
                        if ($config['speed'] && $config['speed'] > 0)
                            $speed = $config['speed'];
                        if ($config['pause'] && $config['pause'] > 0)
                            $pause = $config['pause'];
                    }
                    $html.='<script type="text/javascript">$(function() {$(\'.bxslider\').bxSlider({mode: \'fade\', auto: true,autoControls: false,infiniteLoop: true,hideControlOnEnd: true,adaptiveHeight: true,minSlides: 1,maxSlides: 2, scale:"' . $scale . '",speed:' . $speed . ',pause: ' . $pause . '*1000});});</script>';
                }
            }else {
                $html .= '<img src="/template/' . $theme . '/images/banner.jpg" />';
            }
        } else if ($banner['type'] == 2) {
            if ($bannerItems && count($bannerItems) > 0) {
                $html .='<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="100%">';
                $html .='<param name="movie" value="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $bannerItems[0]['path'] . '">';
                $html .= '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
                $html .= '<embed src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $bannerItems[0]['path'] . '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="100%"></object>';
            }
        }
        $html.="</div>";
        return $html;
    }

    /**
     * 拼装普通页面主体html
     */
    public function getMainHtml($page_id, $components, $is_pre = FALSE) {
        $this->is_pre = $is_pre;
        $com_type = Yii::$app->params['COM_TYPE'];
        $html = $this->getFrameHtml(0, null, $components, $com_type);
        if (strlen($html) == 0&&$this->is_pre==FALSE)
            $html = '<div class="main-empty-notice-b">请拖拉组件放置此处</div>';
        return '<div class="wrap-content-in">' . $html . '</div>';
    }

    /**
     * 拼装框架html(递归)
     */
    private function getFrameHtml($com_id, $component, $components, $com_type) {
        $html = '';
        $this->parent_id = $com_id;
        $subComponents = array_filter($components, array($this, 'filterCom'));
        $column_count = 1;
        $config = null;
        if ($com_id != 0) {
            $config = json_decode($component['config'], true);
            $column_count = count($config);
            $html = '<div id="com_' . $com_id . '" class="li-div col-li-div" data-id="' . $com_id . '" data-type="1" data-row="' . $component['pos_row'] . '" data-column="' . $component['pos_column'] . '">';
            $html.='<div class="col-table"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="div-table'.($component['parent_id']==0?' div-table-first':'').'"><tbody><tr>';
        }
        for ($i = 0; $i < $column_count; $i++) {
            $this->pos_column = $i + 1;
            $columnComponents = array_filter($subComponents, array($this, 'filterColumn'));
            if ($com_id != 0)
                $html.='<td class="td-w" data-id="' . $com_id . '" width="' . $config[$i]['width'] . '%" data-column="' . $this->pos_column . '"><div class="div-padding">';
            foreach ($columnComponents as $columnComponent) {
                if ($columnComponent['type_id'] == 1) {
                    //框架递归
                    $html.=$this->getFrameHtml($columnComponent['id'], $columnComponent, $components, $com_type);
                } else {
                    $html.='<div data-type="' . $columnComponent['type_id'] . '" data-id="' . $columnComponent['id'] . '" id="com_' . $columnComponent['id'] . '" data-row="' . $columnComponent['pos_row'] . '" data-column="' . $columnComponent['pos_column'] . '" class="li-div">';
                    //加载组件
                    $function = 'get' . $com_type[$columnComponent['type_id']];
                    $html.=$this->$function($columnComponent);
                    $html.='</div>';
                }
            }
            if ($com_id != 0)
                $html.='</div></td>';
        }
        if ($com_id != 0)
            $html.='</tr></tbody></table></div></div>';
        return $html;
    }

    /**
     * 拼装底部html
     */
    public function getFooterHtml($footer_components, $is_pre = FALSE) {
        $this->is_pre = $is_pre;
        $com_type = Yii::$app->params['COM_TYPE'];
        $html = $this->getFrameHtml(0, null, $footer_components, $com_type);
        if (strlen($html) == 0&&$this->is_pre==FALSE)
            $html = '<div class="foot-add-notice-b">请拖拉组件放置此处</div>';
        return '<div class="w-foot-main" id="comFootMain"><div class="w-foot-content" id="comFootMainInner">' . $html . '</div></div>';
    }

    /**
     * 过渡列表组件
     * @param type $data
     * @return type
     */
    private function filterColumn($data) {
        return $data['pos_column'] == $this->pos_column;
    }

    /**
     * 过滤子组件
     * @param type $data
     * @return type
     */
    private function filterCom($data) {
        return $data['parent_id'] == $this->parent_id;
    }

    /**
     * 获取标题组件
     * @param type $component
     */
    private function getTitle($component) {
        $len = strlen($component['name']);
        $title = strlen($component['name']) == 0 ? '标题名称' : htmlspecialchars($component['name']);
        $sub_title = htmlspecialchars($component['info']);
        $link = $component['link'];
        $title_type = '1';
        $title_style = '';
        $sub_title_style = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            if (isset($config['title-type']))
                $title_type = $config['title-type'];
            if (isset($config['title-font']))
                $title_style.='font-family:' . $config['title-font'] . ';';
            if (isset($config['title-size']))
                $title_style.='font-size:' . $config['title-size'] . ';';
            if (isset($config['title-weight']))
                $title_style.='font-weight:' . $config['title-weight'] . ';';
            if (isset($config['title-style']))
                $title_style.='font-style:' . $config['title-style'] . ';';
            if (isset($config['sub-title-font']))
                $sub_title_style.='font-family:' . $config['sub-title-font'] . ';';
            if (isset($config['sub-title-size']))
                $sub_title_style.='font-size:' . $config['sub-title-size'] . ';';
            if (isset($config['sub-title-weight']))
                $sub_title_style.='font-weight:' . $config['sub-title-weight'] . ';';
            if (isset($config['sub-title-style']))
                $sub_title_style.='font-style:' . $config['sub-title-style'] . ';';
        }
        $html = '<div class="w-edit-com w-title w-title' . $title_type . '">';
        $html .=Yii::$app->view->renderAjax($this->template_path . '/title/title' . $title_type, ['name' => $title, 'info' => $sub_title, 'titleStyle' => $title_style, 'subTitleStyle' => $sub_title_style, 'link' => $link]);
        $html .='</div>';
        return $html;
    }

    /**
     * 获取文本组件
     * @param type $component
     * @return string
     */
    private function getText($component) {
        $len = strlen($component['info']);
        $html = ' <div class="w-edit-com w-text"  contenteditable="true" data-empty="' . ($len > 0 ? 0 : 1) . '">' . ($len > 0 ? $component['info'] : '点击编辑文本') . '</div>';
        return $html;
    }

    /**
     * 获取富文本组件
     * @param type $component
     * @return string
     */
    private function getRichTxt($component) {
        $len = strlen($component['info']);
        $html = ' <div class="w-edit-com w-text"  data-empty="' . ($len > 0 ? 0 : 1) . '">' . ($len > 0 ? $component['info'] : '点击编辑富文本') . '</div>';
        return $html;
    }

    /**
     * 获取按钮组件
     * @param type $component
     */
    private function getButton($component) {
        $name = '按钮名称';
        $button_css = 'btn-default-b btn-default-w w-btn-large-w';
        $config;
        $style = '';
        if (strlen($component['name']) > 0)
            $name = $component['name'];
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['button-css'])) {
                switch ($config['button-css']) {
                    case 1:
                        $button_css = 'btn-default-b btn-default-w btn-small-w';
                        break;
                    case 2:
                        $button_css = 'btn-default-b btn-default-w w-btn-large-w';
                        break;
                    case 3:
                        $button_css = 'btn-default-b btn-black-w btn-small-w';
                        break;
                    case 4:
                        $button_css = 'btn-default-b btn-black-w w-btn-large-w';
                        break;
                }
            }
        }
        $html = '<div class="w-edit-com w-button" style="' . $style . '"><div class="' . $button_css . '"><span class="btn-inner">' . htmlspecialchars($name) . '</span></div></div>';
        return $html;
    }

    /**
     * 获取分隔线组件
     * @param type $component
     */
    private function getDivider($component) {
        $class = ' w-delimiters-hor';
        $style = '';
        $hr_style = 'height:1px;';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            if (isset($config['background-color'])) {
                $hr_style.='background-color:' . $config['background-color'] . ';';
            }
            if (isset($config['type'])) {

                if ($config['type'] == 1) {
                    if (isset($config['width'])) {
                        $hr_style.='width:' . $config['width'] . ';';
                    }
                } else if ($config['type'] == 2) {
                    $class = ' w-delimiters-ver';
                    $hr_style .= 'width:1px;';
                    $height = '100';
                    if (isset($config['height'])) {
                        $height = $config['height'];
                    }
                    $hr_style.='height:' . $height . 'px;';
                    if (isset($config['padding-left'])) {
                        $style.='padding-left:' . $config['padding-left'] . 'px;';
                    }
                    if (isset($config['padding-right'])) {
                        $style.='padding-right:' . $config['padding-right'] . 'px;';
                    }
                }
            }
            $style .= $this->getStyle($config);
        }


        $html = '<div style="margin: 9px auto;' . $style . '" class="w-edit-com' . $class . '"><hr class="delimiters" style="margin:0 auto;' . $hr_style . '"></div>';
        return $html;
    }

    /**
     * 获取间隔线组件
     * @param type $component
     */
    private function getSpacer($component) {
        $config = json_decode($component['config'], true);
        $height = '40px';
        if (isset($config['height']))
            $height = $config['height'] . 'px';
        $html = '<div style="height:' . $height . ';" class="w-edit-com w-space space-b noChoose">';
        if ($this->is_pre == FALSE)
            $html.='<span>间隔</span>';
        $html.='<div class="stretch-b"></div></div>';
        return $html;
    }

    /**
     * 获取搜索组件
     * @param type $component
     */
    private function getSearch($component) {
        $style = '';
        $msg = '搜索内容';
        if (strlen($component['name']) > 0)
            $msg = $component['name'];
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
        }
        // $msg=str_replace('"','\"',$msg);
        // $msg=str_replace('>','>',$msg);
        $html = '<div class="w-edit-com w-searchbox" style="' . $style . '"><div class="search-w search-defaut-w"><input type="text" class="input-text-w input-search-w" placeholder="' . htmlspecialchars($msg) . '"><div class="btn-default-w search-btn-w"><span class="btn-inner">搜索</span></div></div></div>';
        return $html;
    }

    /**
     * 获取图片组件
     * @param type $component
     */
    private function getImage($component) {
        $img_path = '';
        $style = '';
        $class = '';
        $img_html = '<div class="image-empty"><a><img src="/images/images-empty.png"></a></div>';
        if (strlen($component['path']) > 0)
            $img_path = $this->site_url . $component['path'];
        if (strlen($component['link']) > 0)
            $img_path = $component['link'];
        if (strlen($img_path) > 0) {
            $img_html = '<div style="cursor:pointer"><div class="image-w"><a><img src="' . $img_path . '" alt="' . $component['name'] . '" /></a></div></div>';
            if (strlen($component['info']) > 0)
                $img_html.='<div class="w-img-caption">' . $component['info'] . '</div>';
        }
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['border-class'])&&$config['border-class']!='') {
                $class.=' ' . $config['border-class'];
                if (isset($config['border-color-class'])) {
                    $class.=' ' . $config['border-color-class'];
                } else {
                    $class.=' w-img-border-gray';
                }
            }
        }
        $html = '<div style="cursor:pointer;' . $style . '" class="w-edit-com w-simImg' . $class . '">' . $img_html . '</div>';
        return $html;
    }

    /**
     * 获取图片集组件
     * @param type $component
     */
    private function getGallery($component) {
        $html = '';
        $style = '';
        $column = 2;
        $margin = 0;
        $pandding = '75%';
        $border_width = 0;
        $img_padding = 0;
        $outer_border_width = 0;
        $outer_padding = 0;
        $cropping = 0;
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['column']))
                $column = $config['column'];
            if (isset($config['margin']))
                $margin = $config['margin'];
            if (isset($config['img-padding'])) {
                $img_padding = $config['img-padding'];
                $outer_padding = $config['img-padding'];
            }
            if (isset($config['cropping']))
                $cropping = $config['cropping'];
        }
        if ($cropping == 0) {
            $outer_padding = 0;
        } else if ($cropping == 1) {
            $pandding = '100%';
            $img_padding = 0;
        } else if ($cropping == 2) {
            $img_padding = 0;
        }
        if ($img_padding > 0)
            $border_width = 1;
        if ($outer_padding > 0)
            $outer_border_width = 1;
        $width = 100 / $column;
        if (!empty($component['items'])) {
            $html.='<div style="cursor:pointer;' . $style . '" class="w-edit-com w-multi-imgs"><div class="multi-imgs"><ul>';
            foreach ($component['items'] as $item) {
                $link_type = 0;
                $link_url = '';
                $link_open = 0;
                $link_menuid = '';
                if (isset($item['config']) && strlen($item['config']) > 0) {
                    $item_config = json_decode($item['config'], TRUE);
                    if (isset($item_config['link-type']))
                        $link_type = $item_config['link-type'];
                    if (isset($item_config['link-url']))
                        $link_url = $item_config['link-url'];
                    if (isset($item_config['link-open']))
                        $link_open = $item_config['link-open'];
                    if (isset($item_config['link-menuid']))
                        $link_menuid = $item_config['link-menuid'];
                }
                $html.='<li data-id="' . $item['id'] . '" data-linktype="' . $link_type . '" data-linkurl="' . $link_url . '" data-linkopen="' . $link_open . '" data-linkmenuid="' . $link_menuid . '" style="width:' . $width . '%" data-resid="' . $item['resource_id'] . '" data-name="' . htmlentities($item['name']) . '"><div class="gallery-img"><div class="gallery-mar" style="margin:' . $margin . 'px;cursor: move;"><a class="fancybox-thumbs" href="javascript:void(0);"><div class="gallery-border" style="padding:' . $outer_padding . 'px;border-width:' . $outer_border_width . 'px;"><div class="gallery-aspectRatio" style="padding:0 0 ' . $pandding . '; "><div class="gallery-img-in"><img src="' . $this->site_url . $item['path'] . '" style="top: 0%;left: 0%;padding:' . $img_padding . 'px;border-width:' . $border_width . 'px;" /></div></div></div></a></div></div></li>';
            }
            $html.='</ul></div></div>';
        } else {
            $html.='<div style="cursor:pointer" class="w-edit-com w-multi-imgs"><div class="image-empty"><a title="点击上传"><img src="/images/gallery-empty.png"></a></div></div>';
        }
        return $html;
    }

    /**
     * 获取幻灯片组件
     * @param type $component
     */
    private function getSlideShow($component) {
        $html = '';
        $style = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
        }
        if (!empty($component['items'])) {
            $html.='<div style="cursor:pointer" class="w-edit-com w-slide" style="' . $style . '"><div class="w-slide-page-num"><div class="w-page-bottom"><div class="w-slide-content"><div class="slide-panel">';
            foreach ($component['items'] as $item) {
                $html.='<div class="slide-item"><div class="slide-item-div"><div class="slide-item-div-inner"><img src="' . $this->site_url . $item['path'] . '" class="slide-img" />';
                if (strlen($item['name']) > 0) {
                    $html.= '<div class="slide-caption"><div class="slide-captionbg"></div><div class="slide-caption-text"><div class="slide-caption-text-in">' . $item['name'] . '</div></div></div>';
                }
                $html.='</div></div></div>';
            }
            $html.='<div class="cycle-prev"></div><div class="cycle-next"></div>';
            $html.='</div></div></div></div></div>';
        } else {
            $html.='<div style="cursor:pointer" class="w-edit-com w-slide"><div class="image-empty"><a title="点击上传"><img src="/images/gallery-empty.png"></a></div></div>';
        }

        return $html;
    }

    /**
     * 获取代码组件
     * @param type $component
     */
    private function getCode($component) {
        $code = '点击编辑代码组件。';
        if (strlen($component['info']) > 0) {
            $code = $component['info'];
        }
        $style = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
        }
        $html = '<div class="w-edit-com w-code" style="' . $style . '"><div class="custom-code"><div class="code-info">' . $code . '</div></div></div>';
        return $html;
    }

    /**
     * 获取地图组件
     * @param type $component
     * @return string
     */
    private function getMap($component) {
        $style = '';
        $height = '250';
        $url = '?t=' . date('ymdhis', time());

        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['height']))
                $height = $config['height'];
            if (isset($config['width'])) {
                $url.='&width=' . ($config['width'] > 0 ? ($config['width'] . 'px') : '100%');
            }
//            if (isset($config['latitude'])) {
//                $url.='&lat=' . $config['latitude'];
//            }
//            if (isset($config['longitude'])) {
//                $url.='&long=' . $config['longitude'];
//            }
            if (isset($config['zoom'])) {
                $url.='&zoom=' . $config['zoom'];
            }
            if (isset($config['marker'])) {
                $url.='&marker=' . $config['marker'];
            }
            if (isset($config['align'])) {
                $url.='&align=' . $config['align'];
            }
            if (isset($config['address'])) {
                $url.='&address=' . $config['address'];
            }
//            if (isset($config['overview'])) {
//                $url.='&overview=' . $config['overview'];
//            }
//            if (isset($config['control'])) {
//                $url.='&control=' . $config['control'];
//            }
//            if (isset($config['scale'])) {
//                $url.='&scale=' . $config['scale'];
//            }
        }
        $url.='&height=' . $height . 'px';
        $html = '<div class="w-edit-com w-map" style="' . $style . '"><div class="map"><iframe frameborder="0" src="/js/editor/bar/baidumap.html' . $url . '" style="width:100%; height:' . $height . 'px;" scrolling="no" frameborder="no" border="0" allowtransparency="true" id="gframe_' . $component['id'] . '"></iframe>';
        if ($this->is_pre == FALSE)
            $html .='<div style="width:100%;left:0;top:0;height:' . $height . 'px;position:absolute;" class="maptop"></div>';
        $html .='</div></div>';
        return $html;
    }

    /**
     * 获取Flash组件
     * @param type $component
     * @return string
     */
    private function getFlash($component) {
        $style = '';
        $width = '';
        $height = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['width']) && $config['width'] > 0)
                $width = $config['width'] . 'px';
            if (isset($config['height']) && $config['height'] > 0)
                $height = $config['height'] . 'px';
        }
        if (strlen($height) == 0 && strlen($width) == 0) {
            $width = '100%';
        }
        $html = '<div class="w-edit-com w-flash"><div class="w-flash-empty"></div></div>';
        if (strlen($component['path']) > 0) {
            $html = '<div class="w-edit-com w-flash"  style="' . $style . '">';
            $html .='<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="' . $width . '" height="' . $height . '">';
            $html .='<param name="movie" value="' . $this->site_url . $component['path'] . '">';
            $html .= '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
            $html .= '<embed src="' . $this->site_url . $component['path'] . '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="' . $width . '" height="' . $height . '"></object>';
            if ($this->is_pre == FALSE)
                $html .='<div style="width:100%;left:0;top:0;height:100%;position:absolute;" class="flashtop"></div>';
            $html .='</div>';
        }
        return $html;
    }

    /**
     * 获取文件组件
     * @param type $component
     * @return string
     */
    private function getFile($component) {
        $style = '';
        $innerStyle = 'float: left; margin-right: 1em;';
        $innerStyle1 = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            if (isset($config['text-align'])) {
                switch ($config['text-align']) {
                    case 'left':
                        $innerStyle = 'float: left; margin-right: 1em;';
                        break;
                    case 'center':
                        $style = 'text-align:center;';
                        $innerStyle = '';
                        break;
                    case 'right':
                        $innerStyle = 'float: right; margin-left: 1em;';
                        $innerStyle1 = 'float: right;';
                        break;
                }
            }
        }
        $name = $component['name'];
        if (strlen($name) == 0) {
            $name = '文件名称';
        }
        $down_style = 'display:none;';
        if (strlen($component['path']) > 0) {
            $down_style = '';
        }
        $html = '<div class="w-edit-com w-file" style="' . $style . '"><a class="clearfix" href="javascript:void(0)"><span style="' . $innerStyle . '" class="w-file-img"><img src="../../images/file.png"></span><span class="w-file-info" style="' . $innerStyle1 . '"><span class="w-file-name">' . $name . '</span><span style="' . $down_style . '" class="w-file-down">下载文件</span></span></a></div>';
        return $html;
    }

    /**
     * 获取文件组件
     * @param type $component
     * @return string
     */
    private function getVideoLink($component) {
        $style = '';
        $url = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
            if (isset($config['flash-url']))
                $url = $config['flash-url'];
        }
        $html = '<div class="w-edit-com w-video" style="' . $style . '">';
        if (strlen($url) > 0) {
            $html .='<object type="application/x-shockwave-flash" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" align="middle" width="100%" height="250px">';
            $html .='<param name="movie" value="' . $url . '">';
            $html .= '<param name="quality" value="high"><param name="play" value="true"> <param name="loop" value="true"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="flashvars" value="">';
            $html .= '<embed src="' . $url . '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" width="100%" height="250px"></object>';
            if ($this->is_pre == FALSE)
                $html .='<div style="width:100%;left:0;top:0;height:250px;position:absolute;" class="youtubetop"></div>';
        } else {
            $html .='<div class="w-video-in"><div class="w-video-notUpload w-video-click"><div class="w-video-info"><div class="w-video-uploading-img"><img src="../../images/video-click.png"/></div></div></div></div>';
        }
        $html .='</div>';
        return $html;
    }

    /**
     * 获取社交图标组件
     * @param type $component
     */
    private function getSocialIcons($component) {
        $style = '';
        if (strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            $style = $this->getStyle($config);
        }
        $html = '<div class="w-edit-com w-social" style="' . $style . '"><div class="w-social-in">';
        if (!empty($component['items'])) {
            foreach ($component['items'] as $item) {
                $div_class = '';
                $icon_class = '';
                switch ($item['item_type']) {
                    case 1:
                        $div_class = 'social-facebook';
                        $icon_class = 'icon-social-facebook';
                        break;
                    case 2:
                        $div_class = 'social-twitter';
                        $icon_class = 'icon-social-twitter';
                        break;
                    case 3:
                        $div_class = 'social-instagram';
                        $icon_class = 'icon-social-instagram';
                        break;
                    case 4:
                        $div_class = 'social-linkedin';
                        $icon_class = 'icon-social-linkedin';
                        break;
                    case 5:
                        $div_class = 'social-mail';
                        $icon_class = 'icon-social-mail';
                        break;
                    case 6:
                        $div_class = 'social-flickr';
                        $icon_class = 'icon-social-flickr';
                        break;
                    case 7:
                        $div_class = 'social-pinterest';
                        $icon_class = 'icon-social-pinterest';
                        break;
                    case 8:
                        $div_class = 'social-google';
                        $icon_class = 'icon-social-google';
                        break;
                    case 9:
                        $div_class = 'social-rss';
                        $icon_class = 'icon-social-rss';
                        break;
                    case 10:
                        $div_class = 'social-vimeo';
                        $icon_class = 'icon-social-vimeo';
                        break;
                    case 11:
                        $div_class = 'social-yahoo';
                        $icon_class = 'icon-social-yahoo';
                        break;
                    case 12:
                        $div_class = 'social-youtube';
                        $icon_class = 'icon-social-youtube';
                        break;
                    case 13:
                        $div_class = 'social-dribbble';
                        $icon_class = 'icon-social-dribbble';
                        break;
                    case 14:
                        $div_class = 'social-douban';
                        $icon_class = 'icon-social-douban';
                        break;
                    case 15:
                        $div_class = 'social-zhihu';
                        $icon_class = 'icon-social-zhihu';
                        break;
                    case 16:
                        $div_class = 'social-renren';
                        $icon_class = 'icon-social-renren';
                        break;
                    case 17:
                        $div_class = 'social-tenxun';
                        $icon_class = 'icon-social-tenxun';
                        break;
                    case 18:
                        $div_class = 'social-xinlang';
                        $icon_class = 'icon-social-xinlang';
                        break;
                    case 19:
                        $div_class = 'social-QQkongjian';
                        $icon_class = 'icon-social-QQkongjian';
                        break;
                    case 20:
                        $div_class = 'social-dazong';
                        $icon_class = 'icon-social-dazong';
                        break;
                    case 21:
                        $div_class = 'social-tianya';
                        $icon_class = 'icon-social-tianya';
                        break;
                    case 22:
                        $div_class = 'social-kaixin';
                        $icon_class = 'icon-social-kaixin';
                        break;
                    case 23:
                        $div_class = 'social-pengyouweb';
                        $icon_class = 'icon-social-pengyouweb';
                        break;
                }
                $html.='<a data-social="mail" data-value="' . $item['item_type'] . '" class="social-item ' . $div_class . '" href="javascript:void(0);"><i class="icon-social ' . $icon_class . '"></i></a>';
            }
        } else {
            $html.='<a href="javascript:void(0);" class="social-item social-facebook" data-social="facebook" data-value="1"><i class="icon-social icon-social-facebook"></i></a><a href="javascript:void(0);" class="social-item social-twitter" data-social="twitter" data-value="2"><i class="icon-social icon-social-twitter"></i></a><a href="javascript:void(0);" class="social-item social-instagram" data-social="instagram" data-value="3"><i class="icon-social icon-social-instagram"></i></a><a href="javascript:void(0);" class="social-item social-linkedin" data-social="linkedin"  data-value="4"><i class="icon-social icon-social-linkedin"></i></a><a href="javascript:void(0);" class="social-item social-mail" data-social="mail"  data-value="5"><i class="icon-social icon-social-mail"></i></a>';
        }
        $html.='</div></div>';
        return $html;
    }

    /**
     * 获取产品组件
     * @param type $component
     * @return string
     */
    public function getProduct($component) {
        $product_id = isset($component['choose']) ? $component['choose'] : 0;
        if (isset($component['config']) && strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
        }
        $product = null;
        if ($product_id > 0) {
            $product = ProductInfo::find()->where(['host_id' => $this->host_id, 'site_id' => $this->site_id, 'id' => $product_id, 'is_show' => 1, 'is_refuse' => 0])->asArray()->one();
            ;
            if ($product) {
                $product['path'] = '';
                $product['resource_id'] = '';
                $resource = ResourceRefrence::getResourceByOne(Yii::$app->params['RES_TYPE']['Product'], $product_id);
                if ($resource) {
                    $product['path'] = $resource['path'];
                    $product['resource_id'] = $resource['resource_id'];
                }
            }
        }
        $html = '';
        if ($product && count($product) > 0) {
            $html = '<div class="w-edit-com w-product clearfix"><div class="w-prd-list-cell"><div class="w-prd-list-cell-in"><div class="w-prd-con">';
            $html.='<div class="w-prd-imgbox"><a href="#" class="img-count w-prd-img"><div class="aspectRatio" style="padding-bottom:100%;"></div><div class="img-count-in">';
            if ($product['path'] != '') {
                $html .= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $product['path'] . '" onload="$.AutoImageSize(this)" autoimage="1" />';
            } else {
                $html.='<img src="/template/images/image-empty.png" onload="$.AutoImageSize(this)" autoimage="1" />';
            }
            $html.='</div></a></div>';
            $html.='<div class="w-prd-infobox"><h2 class="w-prd-name"><a href="#">' . htmlspecialchars($product['title']) . '</a></h2></div>';
            $html.='</div></div></div></div>';
        } else {
            $html = '<div class="w-edit-com w-product clearfix"><div class="image-empty"><img src="/images/adprd-empty.png"/></div></div>';
        }
        return $html;
    }

    /**
     * 获取文章组件
     * @param type $component
     * @return string
     */
    public function getArticle($component) {
        $style_type = 4;
        $system_id = 0;
        $system_sort = 0;
        $top_count = 4;
        $show_time = 1;
        if (isset($component['config']) && strlen($component['config']) > 0) {
            $config = json_decode($component['config'], TRUE);
            if (isset($config['style-type']))
                $style_type = $config['style-type'];
            if (isset($config['system-id']))
                $system_id = $config['system-id'];
            if (isset($config['system-sort']))
                $system_sort = $config['system-sort'];
            if (isset($config['top-count']))
                $top_count = $config['top-count'];
            if (isset($config['top-count']))
                $top_count = $config['top-count'];
            if (isset($config['show-time']))
                $show_time = $config['show-time'];
        }
        $list = null;
        if ($system_id > 0) {
            $list = ArticleInfo::ArticleInfoList($system_id, $system_sort, $top_count);
            //获取资源
            $all_id = null;
            foreach ($list as $item) {
                $all_id.=(empty($all_id) ? '' : ',') . $item['id'];
            }
            if ($all_id) {
                $resource = ResourceRefrence::getResourceByMore(Yii::$app->params['RES_TYPE']['Article'], $all_id);
                foreach ($list as $k => $v) {
                    $list[$k]['path'] = '';
                    $list[$k]['resource_id'] = '';
                    foreach ($resource as $res) {
                        if ($list[$k]['id'] == $res['aim_id']) {
                            $list[$k]['path'] = $res['path'];
                            $list[$k]['resource_id'] = $res['resource_id'];
                            break;
                        }
                    }
                }
            }
        }
        if ($list && count($list) > 0) {
            $function = 'articleHtml' . $style_type;
            $html = '<div class="w-edit-com w-adNews w-adNews' . $style_type . '"><div class="w-adNews-in clearfix">' . $this->$function($list, $show_time) . '</div></div>';
        } else {
            $html = '<div class="w-edit-com w-adNews w-adNews' . $style_type . '"><div class="image-empty"><img src="/images/news-empty.png"/></div></div>';
        }
        return $html;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml1($list, $show_time) {
        $html = '<ul>';
        $count = 1;
        foreach ($list as $item) {
            $create_time = strtotime($item['create_time']);
            $html.='<li' . ($count++ % 2 == 0 ? ' class="li-right"' : "") . '><div class="news-item">';
            if ($show_time == 1)
                $html.='<div class="date">' . date('M', $create_time) . date('Y', $create_time) . '</div><div class="data-day">' . date('d', $create_time) . '</div>';
            $html.='<div class="news-com"><div class="news-h"><a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div><div class="news-sum">' . htmlspecialchars($item['synopsis']) . '</div></div>';

            $html.='</div></li>';
        }
        $html.='</ul>';
        return $html;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml2($list, $show_time) {
        $html = '<ul>';
        $count = 1;
        foreach ($list as $item) {
            $create_time = strtotime($item['create_time']);
            $html.='<li' . ($count++ % 4 == 0 ? ' class="li-right"' : "") . '><div class="news-item">';
            $html.='<div class="news-imgbox"><a class="img-count w-news-img" href="javascript:void(0)"><div style="padding-bottom:75%;" class="aspectRatio"></div><div class="img-count-in">';
            if ($item['path'] != '') {
                $html .= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $item['path'] . '" onload="$.AutoImageSize(this)" />';
            } else {
                $html.='<img src="/template/images/image-empty.png" onload="$.AutoImageSize(this)" />';
            }
            $html.='</div></a></div>';

            $html.='<div class="news-com">';
            $html.='<div class="news-com-top clearfix">';
            if ($show_time == 1)
                $html.='<div class="date">' . date('Y-m-d', strtotime($item['create_time'])) . '</div>';
            $html.='<div class="viewDetail"><a href="#"> view  detaits<i class="icon_viewDetail"></i></a></div></div>';
            $html.='<div class="news-h"><a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div><div class="news-sum">' . htmlspecialchars($item['synopsis']) . '</div>';

            $html.='</div></div></li>';
        }
        $html.='</ul>';
        return $html;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml3($list, $show_time) {
        $html = '<div class="w-adNews-texts"><div class="w-adNews-textsIn"><ul>';
        $count = 1;
        foreach ($list as $item) {
            if ($count == 4)
                break;
            $create_time = strtotime($item['create_time']);
            $html.='<li><div class="w-adNews-textItem">';
            $html.='<div class="numberQ">' . str_pad($count++, 2, '0', STR_PAD_LEFT) . '</div>';
            $html.='<div class="w-adNews-textH"><a href="javascript:void(0)"><h3>' . htmlspecialchars($item['title']) . '<h3></a><p>' . htmlspecialchars($item['synopsis']) . '</p></div>';
            $html.='</div></li>';
        }
        $html.='</ul></div></div>';
        $sub_html = '';
        $js = '';
        $count = 1;
        if (count($list) > 3) {
            $sub_html = '<div class="w-adNews-imgs"><ul>';
            for ($i = 3; $i < count($list); $i++) {
                $sub_html.='<li' . ($count++ == 1 ? '' : ' style="display:none;"') . '><div class="news-img"><a href="#">';
                $sub_html.='<div class="img-count"><div class="aspectRatio"></div><div class="img-count-in">';
                if ($item['path'] != '') {
                    $sub_html .= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $item['path'] . '" onload="$.AutoImageSize(this)" />';
                } else {
                    $sub_html.='<img src="/template/images/image-empty.png" onload="$.AutoImageSize(this)" />';
                }
                $sub_html.='</div></div>';
                $sub_html.='<div class="news-buoy-content"><div class="mask"></div><h3>' . htmlspecialchars($item['title']) . '</h3></div>';
                $sub_html.='</a></div></li>';
            }
            $sub_html.='</ul><div class="adNews3prev"></div><div class="adNews3next"></div></div>';
            $js = '<script type="text/javascript">'
                    . '$(function(){'
                    . '$(".w-adNews3").each(function(){'
                    . 'var adimgw=$(this).find(".w-adNews-imgs").width();var adimgh=$(this).find(".w-adNews-texts").height();'
                    . '$(this).find(".news-img .aspectRatio").css("padding-bottom",(adimgh*1.0/adimgw)*100+"%");'
                    . '});});</script>';
        }
        return $sub_html . $html . $js;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml4($list, $show_time) {
        $html = '<ul>';
        foreach ($list as $item) {
            $html.='<li><div class="news-item"><div class="news-together">';
            $html.='<div class="news-h">';
            if (isset($item['categories']))
                $html.='<a class="news-kind" href="javascript:void(0)">【' . htmlspecialchars($item['categories']['name']) . '】</a>';
            $html.='<a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div>';
            if ($show_time == 1)
                $html.='<div class="date">' . date('Y-m-d', strtotime($item['create_time'])) . '</div>';
            $html.='</div></div></li>';
        }
        $html.='</ul>';
        return $html;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml5($list, $show_time) {
        $html = '<ul>';
        foreach ($list as $item) {
            $html.='<li><div class="news-item">';
            $html.='<div class="news-imgbox"><a href="#" class="img-count w-news-img"><div class="aspectRatio" style="padding-bottom:75%;"></div><div class="img-count-in">';
            if ($item['path'] != '') {
                $html.= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $item['path'] . '" onload="$.AutoImageSize(this)" />';
            } else {
                $html.='<img src="/template/images/image-empty.png" onload="$.AutoImageSize(this)" />';
            }
            $html.='</div></a></div>';
            $html.='<div class="news-com">';
            $html.='<div class="news-h">';
            if (isset($item['categories']))
                $html.='<a class="news-kind" href="javascript:void(0)">【' . htmlspecialchars($item['categories']['name']) . '】</a>';
            $html.='<a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div><div class="news-sum">' . htmlspecialchars($item['synopsis']) . '</div>';
            if ($show_time == 1)
                $html.='<div class="date">' . date('Y-m-d', strtotime($item['create_time'])) . '</div>';

            $html.='</div></div></li>';
        }
        $html.='</ul>';
        return $html;
    }

    /**
     * 文章组件列表
     * @param type $list
     * @return string
     */
    private function articleHtml6($list, $show_time) {
        $count = 0;
        $html = '';
        $sub_html = '<div class="adNewsTL"><ul>';
        foreach ($list as $item) {
            if ($count++ == 0) {
                $html.='<div class="adNewsF"><div class="news-item">';
                $html.='<div class="news-imgbox"><a href="#" class="img-count w-news-img"><div class="aspectRatio" style="padding-bottom:75%;"></div><div class="img-count-in">';
                if ($item['path'] != '') {
                    $html.= '<img src="http://' . Yii::$app->params['NAPLES']['SERVER']['domain'] . $item['path'] . '" onload="$.AutoImageSize(this)" />';
                } else {
                    $html.='<img src="/template/images/image-empty.png" onload="$.AutoImageSize(this)" />';
                }
                $html.='</div></a></div>';
                $html.='<div class="news-com">';
                $html.='<div class="news-together"><div class="news-h"><a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div>';
                if ($show_time == 1)
                    $html.='<div class="date">' . date('Y-m-d', strtotime($item['create_time'])) . '</div>';
                $html.='</div><div class="news-sum">' . htmlspecialchars($item['synopsis']) . '</div>';
                $html.='</div></div></div>';
            }else {
                $sub_html.='<li><div class="news-item"><div class="news-together">';
                $sub_html.='<div class="news-h">';
                if (isset($item['categories']))
                    $sub_html.='<a class="news-kind" href="javascript:void(0)">【' . htmlspecialchars($item['categories']['name']) . '】</a>';
                $sub_html.='<a href="javascript:void(0)">' . htmlspecialchars($item['title']) . '</a></div>';
                if ($show_time == 1)
                    $sub_html.='<div class="date">' . date('Y-m-d', strtotime($item['create_time'])) . '</div>';
                $sub_html.='</div></div></li>';
            }
        }
        $sub_html.='</div></ul>';
        if (count($list) > 1)
            $html .= $sub_html;
        return $html;
    }

    /**
     * 获取样式
     * @param type $config
     * @return type
     */
    private function getStyle($config) {
        $style = '';
        if (isset($config['text-align'])) {
            $style.='text-align:' . $config['text-align'] . ';';
        }
        if (isset($config['padding-top'])) {
            $style.='padding-top:' . $config['padding-top'] . 'px;';
        }
        if (isset($config['padding-bottom'])) {
            $style.='padding-bottom:' . $config['padding-bottom'] . 'px;';
        }
        return $style;
    }

}
