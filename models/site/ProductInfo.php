<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_info".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $system_id
 * @property string $category_id
 * @property string $title
 * @property string $info
 * @property integer $is_show
 * @property integer $is_refuse
 * @property integer $is_top
 * @property string $sale_price
 * @property string $price
 * @property integer $type
 * @property integer $is_inventory
 * @property integer $inventory
 * @property string $tax_rate
 * @property integer $weight
 * @property string $attributes
 * @property string $config
 * @property integer $order_num
 * @property string $create_time
 * @property string $edite_time
 */
class ProductInfo extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_info';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'system_id', 'category_id', 'is_show', 'is_refuse', 'is_top', 'type', 'is_inventory', 'inventory', 'weight', 'order_num'], 'integer'],
            [['category_id'], 'required'],
            [['info', 'attributes'], 'string'],
            [['sale_price', 'price', 'tax_rate'], 'number'],
            [['create_time', 'edite_time'], 'safe'],
            [['title', 'config'], 'string', 'max' => 200]
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
            'category_id' => 'Category ID',
            'title' => 'Title',
            'info' => 'Info',
            'is_show' => 'Is Show',
            'is_refuse' => 'Is Refuse',
            'is_top' => 'Is Top',
            'sale_price' => 'Sale Price',
            'price' => 'Price',
            'type' => 'Type',
            'is_inventory' => 'Is Inventory',
            'inventory' => 'Inventory',
            'tax_rate' => 'Tax Rate',
            'weight' => 'Weight',
            'attributes' => 'Attributes',
            'config' => 'Config',
            'order_num' => 'Order Num',
            'create_time' => 'Create Time',
            'edite_time' => 'Edite Time',
        ];
    }
}
