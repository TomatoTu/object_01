<?php

namespace node\modules\editor\controllers;

use Yii;
use yii\web\Controller;
use node\lib\controller\AjaxController;
use node\models\site\Page;
use node\models\site\Banner;
use node\models\site\Component;
use node\models\site\ComponentItem;
use node\models\site\SiteConfig;
use node\models\site\ResourceRefrence;
use node\lib\WebHtml;
use node\lib\Functions;
use \node\models\site\BannerItem;

class PageController extends AjaxController {

    //模板编号
    private $theme;
    //模板位置
    private $template_path = '@app/web/template/';
    private $component_id = 0;
    private $host_id = 0;
    private $site_id = 0;
    private $parent_id = 0;

    public function beforeAction($action) {
        if (parent::beforeAction($action)) {
            $this->host_id = Yii::$app->params['NAPLES']['HOSTID'];
            $this->site_id = Yii::$app->params['NAPLES']['SITEID'];
            return TRUE;
        }
        return FALSE;
    }

    /**
     * 构造编辑页面数据
     */
    public function actionIndex() {
        $post = Yii::$app->request->post();
        $data['host_id'] = $this->host_id;
        $data['site_id'] = $this->site_id;
        $data['status'] = 1;
        $page_id = $post['id'];
        //获取菜单信息
        $page_list = Page::find()->where($data)->orderBy('order_num')->asArray()->all();
        $cur_page = null;
        foreach ($page_list as $page) {
            if ($page['type'] != 3) {
                if ($page_id == 0 || $page_id == $page['id']) {
                    $page_id = $page['id'];
                    $page_type = $page['type'];
                    $cur_page = $page;
                    break;
                }
            }
        }
        //加载页面数据
        if ($page_id > 0) {
            return $this->createPage($cur_page, $page_list);
        }
    }

    /**
     * 创建页面(普通页面)
     * @param type $page_id
     */
    private function createPage($cur_page, $page_list) {
        $data['host_id'] = $this->host_id;
        $data['site_id'] = $this->site_id;
        $this->theme = Yii::$app->params['NAPLES']['SITE']['theme'];
        $page_type = $cur_page['type'];
        //获取logo
        $site_config = SiteConfig::findOne($data);
        $logo_html = '';
        if (!empty($site_config)) {
            $site_config = $site_config->toArray();
            $site_config['logo_resource_id'] = null;
            $site_config['logo_path'] = '';
            $logo_resource = ResourceRefrence::getResourceByOne(Yii::$app->params['RES_TYPE']['Logo']);
            if (isset($logo_resource)) {
                $site_config['logo_path'] = $logo_resource['path'];
                $site_config['logo_resource_id'] = $logo_resource['resource_id'];
            }
            $logo_html = WebHtml::run()->getLogoHtml($site_config);
        }

        //菜单
        foreach ($page_list as $key => $val) {
            $page_list[$key]['web_url'] = '';
            if ($page_list[$key]['type'] != Yii::$app->params['PAGE_TYPE']['Link'])
                $page_list[$key]['web_url'] = 'javascript:$.GetPage(' . $page_list[$key]['id'] . ');';
        }
        $menu_html = WebHtml::run()->getMenuHtml($page_list);

        //banner
        //  $banner_data = $data;
        // $banner_data['page_id'] = $cur_page['id'];
        $banner = Banner::pageBanner($cur_page['id']);
        $banner_html = '';
        if (!empty($banner)) {
            if ($banner['items']) {
                foreach ($banner['items'] as $k => $v) {
                    $banner_resource = ResourceRefrence::getResourceByOne(Yii::$app->params['RES_TYPE']['Banner'], $banner['items'][$k]['id']);
                    $banner['items'][$k]['path'] = $banner_resource['path'];
                    $banner['items'][$k]['resource_id'] = $banner_resource['resource_id'];
                }
            }
            $banner_html = WebHtml::run()->getBannerHtml($this->theme, $banner);
        }
        //组件
        $components = null;
        $main_html = '';
        //普通页面
        if ($page_type == 1) {
            //获取组件
            $components = Component::getComponents($cur_page['id']);
            if (!empty($components)) {
                $components = $this->getComponentData($cur_page['id'], $components);
            }
            $main_html = WebHtml::run()->getMainHtml($cur_page['id'], $components);
        }
        //产品页面
        if ($page_type == 2) {
//            $product_id = $cur_menu['prduct_id'];
//            $main_html = $this->getProductHtml($product_id);
            $main_html = '<div class="main-empty-notice-b">系统页面不能拖拉组件</div>';
        }
        //底部组件
        $footer_components = Component::getComponents(0);
        if (!empty($footer_components)) {
            $footer_components = $this->getComponentData(0, $footer_components);
        }
        $footer_html = '';
//        if ($main_html != '')
//            $main_html.='<script src="/template/' . $this->theme . '/js/theme.js"></script>';
        //底部信息
        $footer_html = WebHtml::run()->getFooterHtml($footer_components);
        $register_html = WebHtml::run()->getRegisterHtml();
        $shopcart_html = WebHtml::run()->getShopCartHtml();
        $html = $this->renderAjax($this->template_path . $this->theme . '/page.php', ['logohtml' => $logo_html,
            'menuhtml' => $menu_html,
            'registerhtml' => $register_html,
            'shopcarthtml' => $shopcart_html,
            'bannerhtml' => $banner_html,
            'mainhtml' => $main_html,
            'footerhtml' => $footer_html]);
        $page_info = ['theme' => $this->theme, 'color' => Yii::$app->params['NAPLES']['SITE']['color'], 'pagetype' => $page_type, 'curmenu' => $cur_page, 'menus' => $page_list, 'banner' => $banner, 'maincoms' => $components, 'footercoms' => $footer_components, 'siteconfig' => $site_config];
        return ['res' => $html, 'page_json' => $page_info];
    }

    /**
     * 组装组件完整的数据
     * @param type $components
     */
    private function getComponentData($page_id, $components) {
        $com_ids = array_column($components, 'id');
        //获取资源
        $all_id = null;
        foreach ($com_ids as $com_id) {
            $all_id.=(empty($all_id) ? '' : ',') . $com_id;
        }
        $com_resource = ResourceRefrence::getResourceByMore(Yii::$app->params['RES_TYPE']['Com'], $all_id);

        //获取组件属性
        $com_items = ComponentItem::getComponentItems($page_id);
        $com_item_ids = array_column($com_items, 'id');
        if (!empty($com_items)) {
            //获取组件属性资源
            $all_id = null;
            foreach ($com_item_ids as $com_item_id) {
                $all_id.=(empty($all_id) ? '' : ',') . $com_item_id;
            }
            $com_item_resource = ResourceRefrence::getResourceByMore(Yii::$app->params['RES_TYPE']['ComItem'], $all_id);
            foreach ($com_items as $k => $v) {
                $com_items[$k]['path'] = '';
                $com_items[$k]['resource_id'] = '';
                foreach ($com_item_resource as $res) {
                    if ($com_items[$k]['id'] == $res['aim_id']) {
                        $com_items[$k]['path'] = $res['path'];
                        $com_items[$k]['resource_id'] = $res['resource_id'];
                        break;
                    }
                }
            }
        }

        foreach ($components as $k => $v) {
            //资源引用
            $components[$k]['path'] = '';
            $components[$k]['resource_id'] = '';
            foreach ($com_resource as $res) {
                if ($components[$k]['id'] == $res['aim_id']) {
                    $components[$k]['path'] = $res['path'];
                    $components[$k]['resource_id'] = $res['resource_id'];
                    break;
                }
            }
            //属性
            $this->component_id = $components[$k]['id'];
            $components[$k]['items'] = array_values(array_filter($com_items, array($this, 'filterComItem')));
        }

        //获取产品组件里的产品信息
//        $com_product = array_filter($components, array($this, 'filterComProduct'));
//        if (!empty($com_product)) {
//            $all_product_id = array_column($com_product, 'choose');
//            if (!empty($all_product_id)) {
//                $all_id = null;
//                foreach ($all_product_id as $product_id) {
//                    if (!empty($product_id))
//                        $all_id.=(empty($all_id) ? '' : ',') . $product_id;
//                }
//                $product_list = ProductInfo::getProductList($all_product_id);
//                if (!empty($all_id)) {
//                    //获取图片
//                    $product_resource = ResourceRefrence::getResourceByMore(Yii::$app->params['resType']['Product'], $all_id);
//                    foreach ($product_list as $k => $v) {
//                        //资源引用
//                        $product_list[$k]['path'] = '';
//                        $product_list[$k]['resource_id'] = '';
//                        foreach ($product_resource as $res) {
//                            if ($product_list[$k]['id'] == $res['aim_id']) {
//                                $product_list[$k]['path'] = $res['path'];
//                                $product_list[$k]['resource_id'] = $res['resource_id'];
//                                break;
//                            }
//                        }
//                    }
//                    //获取属性和价格
//                    $product_pices = ProductOptionsGroup::find()->where(['product_id' => $all_id])->orderBy('id')->asArray()->all();
//                    foreach ($product_list as $k => $v) {
//                        //资源引用
//                        foreach ($product_pices as $pice) {
//                            if ($product_list[$k]['id'] == $pice['product_id']) {
//                                $product_list[$k]['price'] = $pice['price'];
//                                $product_list[$k]['sale_price'] = $pice['sale_price'];
//                                $items = explode(',', $pice['items']);
//                                $product_items = ProductOptionsItem::find()->where(['id' => $items])->with('options')->asArray()->all();
//                                foreach ($product_items as $item) {
//                                    $product_list[$k]['option_items'][] = ['name' => $item['options']['title'], 'item_name' => $item['content']];
//                                }
//                                break;
//                            }
//                        }
//                    }
//                }
//            }
//            foreach ($components as $k => $v) {
//                foreach ($product_list as $x => $y) {
//                    if ($components[$k]['type_id'] == 19 && $components[$k]['choose'] == $product_list[$x]['id']) {
//                        $components[$k]['product'] = $product_list[$x];
//                        break;
//                    }
//                }
//            }
//        }
        return $components;
    }

    /**
     * 过滤产品组件
     * @param type $data
     * @return type
     */
    private function filterComProduct($data) {
        return $data['type_id'] == 19;
    }

    /**
     * 过滤组件属性
     * @param type $data
     * @return type
     */
    private function filterComItem($data) {
        return $data['component_id'] == $this->component_id;
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
     * 保存页面数据
     */
    public function actionSave() {
        $post = Yii::$app->request->post();
        $page_json = json_decode($post['pagejson'], true);
        //更新Logo
        $site_config = $page_json['siteconfig'];
        if (isset($site_config['update']) && $site_config['update'] == 1) {
            $this->saveLogo($site_config);
        }
        //更新Banner
        $banner = $page_json['banner'];
        if (isset($banner['update']) && $banner['update'] == 1) {
            $this->saveBanner($banner);
        }
        //中间组件
        if (isset($page_json['maincoms'])) {
            $this->saveSubCom(0, 0, $page_json['maincoms']);
        }
        //底部
        if (isset($page_json['footercoms'])) {
            $this->saveSubCom(0, 0, $page_json['footercoms']);
        }
        //底部组件
        //  $footer_com_json = $page_json['footercoms'];
//        if ($footer_com_json) {
//            $this->saveCom($footer_com_json);
//        }
        return ['code' => 1];
    }

    /**
     * 保存logo
     */
    private function saveLogo($site_config) {
        $logo = SiteConfig::findOne(['host_id' => $this->host_id, 'site_id' => $this->site_id]);
        if ($logo) {
            $logo->setAttributes($site_config);
            if ($logo->save() > 0) {
                //修改资源
                if (isset($site_config['logo_resource_id'])) {
                    $res = ResourceRefrence::findOne(['host_id' => $this->host_id, 'site_id' => $this->site_id, 'type' => Yii::$app->params['RES_TYPE']['Logo']]);
                    if ($site_config['logo_resource_id'] > 0) {
                        if (empty($res)) {
                            $res = new ResourceRefrence();
                            $res['host_id'] = $this->host_id;
                            $res['site_id'] = $this->site_id;
                            $res['type'] = Yii::$app->params['RES_TYPE']['Logo'];
                        }
                        $res['aim_id']=$logo->id;
                        $res['resource_id'] = $site_config['logo_resource_id'];
                        $res->save();
                    } else {
                        if (!empty($res))
                            $res->delete();
                    }
                }
                return TRUE;
            } else {
                return FALSE;
            }
        }
        return FALSE;
    }

    /**
     * 保存Banner
     * @param type $banner
     */
    private function saveBanner($banner) {
        $old_banner = Banner::findOne(['host_id' => $this->host_id, 'site_id' => $this->site_id, 'page_id' => $banner['page_id']]);
        if ($old_banner) {
            $old_banner->setAttributes($banner);
            if ($old_banner->save() > 0) {
                BannerItem::deleteItems($old_banner->id);
                if (isset($banner['items'])) {
                    $banner_items = $banner['items'];
                    foreach ($banner_items as $item) {
                        $temItem = new BannerItem();
                        $temItem->setAttributes($item);
                        $temItem['banner_id'] = $old_banner->id;
                        $temItem['site_id'] = $this->site_id;
                        if ($temItem->save() > 0 && isset($item['resource_id']) && !isset($item['delete'])) {
                            $temItemRes = new ResourceRefrence();
                            $temItemRes['host_id'] = $this->host_id;
                            $temItemRes['site_id'] = $this->site_id;
                            $temItemRes['resource_id'] = $item['resource_id'];
                            $temItemRes['aim_id'] = $temItem['id'];
                            $temItemRes['type'] = Yii::$app->params['RES_TYPE']['Banner'];
                            $temItemRes->save();
                        }
                    }
                }
            }
            return TRUE;
        }
        return FALSE;
    }

    /**
     * 保存组件
     * @param type $com_json
     */
    private function saveSubCom($parent_id, $cur_parent_id, $com_json) {
        $this->parent_id = $parent_id;
        $sub_coms = array_filter($com_json, array($this, 'filterCom'));
        foreach ($sub_coms as $sub_com) {
            $cur_id = $this->saveCom($cur_parent_id, $sub_com);
            if ($sub_com['type_id'] == 1 && !isset($sub_com['delete']))
                $this->saveSubCom($sub_com['id'], $cur_id, $com_json);
        }
    }

    /**
     * 保存组件
     * @param type $com
     */
    private function saveCom($cur_parent_id, $com) {
        $com['host_id'] = $this->host_id;
        $com['site_id'] = $this->site_id;
        $com['parent_id'] = $cur_parent_id;
        foreach ($com as $k => $v) {
            if (is_string($v))
                $com[$k] = Functions::clearPhpCode($v);
        }
        //删除
        if (isset($com['delete']) && $com['delete'] == 1) {
            $old_com = Component::findOne(['id' => $com['id'], 'page_id' => $com['page_id'], 'host_id' => $this->host_id, 'site_id' => $this->site_id]);
            if ($old_com) {
                Component::deleteComponent($com['id']);
            }
        } else {
            //新增
            if (isset($com['add']) && $com['add'] == 1) {
                $component = new Component;
                $component->setAttributes($com);
                $component->id = 0;
                if ($component->save() > 0) {
                    $this->saveComResource($component->id, $com);
                    if (isset($com['items']))
                        $this->saveComItem($component->id, $component->page_id, $com['items']);
                }
                return $component->id;
            }
            //编辑
            if (isset($com['update']) && $com['update'] == 1) {
                $old_com = Component::findOne(['id' => $com['id'], 'page_id' => $com['page_id'], 'host_id' => $this->host_id, 'site_id' => $this->site_id]);
                if ($old_com) {
                    $old_com->setAttributes($com);
                    $old_com->save();
                    $this->saveComResource($old_com->id, $com);
                    if (isset($com['items']))
                        $this->saveComItem($old_com->id, $old_com->page_id, $com['items']);
                }
            }
        }
        return $com['id'];
    }

    /**
     * 编辑组件资源
     */
    private function saveComResource($com_id, $com) {
        ResourceRefrence::deleteAll(['aim_id' => $com_id, 'type' => Yii::$app->params['RES_TYPE']['Com'], 'host_id' => $this->host_id, 'site_id' => $this->site_id]);
        if (isset($com['resource_id']) && $com['resource_id'] > 0) {
            $res = new ResourceRefrence();
            $res['host_id'] = $this->host_id;
            $res['site_id'] = $this->site_id;
            $res['resource_id'] = $com['resource_id'];
            $res['aim_id'] = $com_id;
            $res['type'] = Yii::$app->params['RES_TYPE']['Com'];
            $res->save();
        }
    }

    /**
     * 编辑组件属性
     */
    private function saveComItem($com_id, $page_id, $items) {
        ResourceRefrence::deleteComItemRes($com_id);
        ComponentItem::deleteAll(['host_id' => $this->host_id, 'site_id' => $this->site_id, 'page_id' => $page_id, 'component_id' => $com_id]);
        if (isset($items) && $items != null) {
            $order_num = 1;
            foreach ($items as $item) {
                $temItem = new ComponentItem();
                $temItem['host_id'] = $this->host_id;
                $temItem['site_id'] = $this->site_id;
                $temItem['page_id'] = $page_id;
                $temItem['component_id'] = $com_id;
                $temItem['order_num'] = $order_num;
                $temItem->setAttributes($item);
                if ($temItem->save() > 0 && isset($item['resource_id'])) {
                    $temItemRes = new ResourceRefrence();
                    $temItemRes['host_id'] = $this->host_id;
                    $temItemRes['site_id'] = $this->site_id;
                    $temItemRes['resource_id'] = $item['resource_id'];
                    $temItemRes['aim_id'] = $temItem['id'];
                    $temItemRes['type'] = Yii::$app->params['RES_TYPE']['ComItem'];
                    $temItemRes->save();
                }
                $order_num++;
            }
        }
    }

    /**
     * 移动或复制组件
     */
    public function actionCopyCom() {
        $post = Yii::$app->request->post();
        $page_id = $post['pageid'];
        $copytype = $post['copytype'];
        $com = json_decode($post['com'], TRUE);
        $com['id'] = 0;
        $com['page_id'] = $page_id;
        $com['parent_id'] = 0;
        $com['pos_row'] = 1;
        $com['pos_column'] = 1;
        $component = new Component;
        $component->setAttributes($com);
        $component->id = 0;
        //移动到其他页面
        Component::setComponentsRow($page_id, 0, 1, 1);
        if ($component->save() > 0) {
            $this->saveComResource($component->id, $com);
            if (isset($com['items']))
                $this->saveComItem($component->id, $component->page_id, $com['items']);
            return ['code' => 1];
        }
        return ['code' => 0];
    }

}
