<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_options".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $product_id
 * @property string $title
 * @property integer $type
 * @property string $order_num
 * @property string $created_at
 */
class ProductOptions extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_options';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'product_id', 'title', 'type'], 'required'],
            [['host_id', 'site_id', 'product_id', 'type', 'order_num'], 'integer'],
            [['created_at'], 'safe'],
            [['title'], 'string', 'max' => 11]
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
            'title' => 'Title',
            'type' => 'Type',
            'order_num' => 'Order Num',
            'created_at' => 'Created At',
        ];
    }
}
