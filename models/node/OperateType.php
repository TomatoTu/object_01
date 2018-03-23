<?php

namespace node\models\node;

use Yii;

/**
 * This is the model class for table "operate_type".
 *
 * @property integer $id
 * @property string $name
 * @property integer $parent_id
 * @property integer $order_num
 */
class OperateType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'operate_type';
    }
    
     public static function getDb()
    {
        return Yii::$app->get('node');
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['parent_id', 'order_num'], 'integer'],
            [['name'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'parent_id' => 'Parent ID',
            'order_num' => 'Order Num',
        ];
    }
}
