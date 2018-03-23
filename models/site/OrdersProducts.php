<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "orders_products".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property string $order_id
 * @property integer $product_id
 * @property string $product_group
 * @property string $product_name
 * @property string $product_options
 * @property string $unit
 * @property integer $qty
 * @property string $total
 * @property string $created_at
 * @property string $imagePath
 */
class OrdersProducts extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'orders_products';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'order_id', 'product_id', 'product_name', 'unit', 'qty', 'total'], 'required'],
            [['host_id', 'site_id', 'product_id', 'qty'], 'integer'],
            [['unit', 'total'], 'number'],
            [['created_at'], 'safe'],
            [['order_id', 'product_group', 'product_name', 'product_options', 'imagePath'], 'string', 'max' => 255]
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
            'order_id' => 'Order ID',
            'product_id' => 'Product ID',
            'product_group' => 'Product Group',
            'product_name' => 'Product Name',
            'product_options' => 'Product Options',
            'unit' => 'Unit',
            'qty' => 'Qty',
            'total' => 'Total',
            'created_at' => 'Created At',
            'imagePath' => 'Image Path',
        ];
    }
}
