<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\system\forms;
use node\lib\models\BaseModel;
use node\modules\system\models\Product;
use node\modules\system\lib\ProductFunctions;
/**
 * Description of ProductIdsForm
 *
 * @author dingjj
 */
class ProductIdsForm extends BaseModel{
     public $ids;
     
     public $idArr;
    
     /**
     * @inheritdoc
     */
    public function rules(){
        return [
            [['ids'], 'required'],
        ];
    }
    
    public function deleteMany(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ProductFunctions::DeleteProduct($id);
        }
        return $this->idArr;
    }
    
    public function deleteManyr(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ProductFunctions::DeleteProductr($id);
        }
        return $this->idArr;
    }
    
    public function recoveryMany(){
        $ids = explode(',', $this->ids);
        $this->idArr = $ids;
        foreach ($ids as $id) {
            ProductFunctions::recoveryProduct($id);
        }
        return $this->idArr;
    }
}
