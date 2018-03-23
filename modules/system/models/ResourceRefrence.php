<?php

namespace node\modules\system\models;

use Yii;
use node\lib\models\BaseActiveRecord;

/**
 * This is the model class for table "resource_refrence".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $resource_id
 * @property integer $type
 * @property integer $aim_id
 */
class ResourceRefrence extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'resource_refrence';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'resource_id', 'type', 'aim_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'host_id' => 'Host ID',
            'site_id' => 'Site ID',
            'resource_id' => 'Resource ID',
            'type' => 'Type',
            'aim_id' => 'Aim ID',
        ];
    }
}
