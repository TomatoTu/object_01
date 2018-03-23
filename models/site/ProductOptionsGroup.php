<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_options_group".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $product_id
 * @property string $items
 * @property double $price
 * @property double $sale_price
 * @property integer $weight
 * @property integer $inventory
 * @property integer $image
 * @property string $created_at
 */
class ProductOptionsGroup extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_options_group';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'product_id', 'items', 'price', 'sale_price', 'weight'], 'required'],
            [['host_id', 'site_id', 'product_id', 'weight', 'inventory', 'image'], 'integer'],
            [['price', 'sale_price'], 'number'],
            [['created_at'], 'safe'],
            [['items'], 'string', 'max' => 11]
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
            'product_id' => 'Product ID',
            'items' => 'Items',
            'price' => 'Price',
            'sale_price' => 'Sale Price',
            'weight' => 'Weight',
            'inventory' => 'Inventory',
            'image' => 'Image',
            'created_at' => 'Created At',
        ];
    }
}
