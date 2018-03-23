<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_options_item".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $product_id
 * @property integer $options_id
 * @property string $content
 * @property string $color
 * @property integer $order_num
 * @property string $created_at
 */
class ProductOptionsItem extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_options_item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'product_id', 'options_id', 'content'], 'required'],
            [['host_id', 'site_id', 'product_id', 'options_id', 'order_num'], 'integer'],
            [['created_at'], 'safe'],
            [['content', 'color'], 'string', 'max' => 11]
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
            'options_id' => 'Options ID',
            'content' => 'Content',
            'color' => 'Color',
            'order_num' => 'Order Num',
            'created_at' => 'Created At',
        ];
    }
}
