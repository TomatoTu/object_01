<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "product_label".
 *
 * @property integer $id
 * @property integer $host_id
 * @property integer $site_id
 * @property integer $product_id
 * @property string $title
 * @property string $info
 * @property string $order_num
 * @property string $created_at
 */
class ProductLabel extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'product_label';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'product_id', 'title'], 'required'],
            [['host_id', 'site_id', 'product_id', 'order_num'], 'integer'],
            [['info'], 'string'],
            [['created_at'], 'safe'],
            [['title'], 'string', 'max' => 100]
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
            'info' => 'Info',
            'order_num' => 'Order Num',
            'created_at' => 'Created At',
        ];
    }
}
