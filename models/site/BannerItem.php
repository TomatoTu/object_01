<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "banner_item".
 *
 * @property integer $id
 * @property integer $banner_id
 * @property integer $order_num
 */
class BannerItem extends BaseActiveRecord {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'banner_item';
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['banner_id', 'site_id'], 'required'],
            [['banner_id', 'order_num', 'site_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels() {
        return [
            'id' => 'ID',
            'banner_id' => 'Banner ID',
            'order_num' => 'Order Num',
        ];
    }

    /**
     * 删除Banner
     * @param type $type
     * @param type $aim_ids
     * @return type
     */
    public static function deleteItems($banner_id) {
        $user = Yii::$app->user->identity;
        $db = Yii::$app->db;
        $parms = [':banner_id' => $banner_id];
        $sql = 'delete from `resource_refrence` where `aim_id` in(select id from `banner_item` where banner_id=:banner_id) and `type`=' . Yii::$app->params['RES_TYPE']['Banner'];
        $db->createCommand($sql, $parms)->execute();
        $sql = 'delete from `banner_item` where banner_id=:banner_id';
        $db->createCommand($sql, $parms)->execute();
    }

}
