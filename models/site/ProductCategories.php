<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_categories".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $system_id
 * @property string $parent_id
 * @property string $name
 * @property string $footer_code
 * @property string $header_code
 * @property integer $count
 * @property integer $image
 * @property integer $order_num
 * @property string $created_at
 */
class ProductCategories extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_categories';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'system_id', 'name'], 'required'],
            [['host_id', 'site_id', 'system_id', 'parent_id', 'count', 'image', 'order_num'], 'integer'],
            [['created_at'], 'safe'],
            [['name', 'footer_code', 'header_code'], 'string', 'max' => 50]
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
            'system_id' => 'System ID',
            'parent_id' => 'Parent ID',
            'name' => 'Name',
            'footer_code' => 'Footer Code',
            'header_code' => 'Header Code',
            'count' => 'Count',
            'image' => 'Image',
            'order_num' => 'Order Num',
            'created_at' => 'Created At',
        ];
    }
}
