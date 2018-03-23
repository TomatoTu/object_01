<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "page".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $parent_id
 * @property string $system_id
 * @property integer $type
 * @property string $name
 * @property integer $status
 * @property string $rewrite
 * @property integer $order_num
 * @property string $url
 * @property string $target
 * @property string $create_time
 * @property string $edit_time
 */
class Page extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'page';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'parent_id', 'system_id', 'type', 'status', 'order_num'], 'integer'],
            [['order_num'], 'required'],
            [['create_time', 'edit_time'], 'safe'],
            [['name'], 'string', 'max' => 100],
            [['rewrite'], 'string', 'max' => 50],
            [['url'], 'string', 'max' => 200],
            [['target'], 'string', 'max' => 20]
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
            'parent_id' => 'Parent ID',
            'system_id' => 'System ID',
            'type' => 'Type',
            'name' => 'Name',
            'status' => 'Status',
            'rewrite' => 'Rewrite',
            'order_num' => 'Order Num',
            'url' => 'Url',
            'target' => 'Target',
            'create_time' => 'Create Time',
            'edit_time' => 'Edit Time',
        ];
    }
}
