<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\page\forms;
use node\modules\page\models\Page;
use node\lib\models\BaseModel;
use node\modules\page\lib\SortLogic;
/**
 * Description of PagesMenuSortForm
 *
 * @author dingjj
 */
class PagesMenuSortForm extends BaseModel{
    
    public $index;
    public $current;
    public $parent;
    
    public function rules(){
        return [
            [['index','current','parent'], 'required'],
            ['current', 'exist', 'targetClass' => Page::className(),'targetAttribute' => 'id','filter' => ['host_id'=>self::hostId(),'site_id'=>self::siteId()], 'message' => '订单id不存在'],
            [['index'], 'integer'],
        ];
    }
    
    public function menuSort(){
       SortLogic::sort(Page::className(), $this->toArray());
    }
}
