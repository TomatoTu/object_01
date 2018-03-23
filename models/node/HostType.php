<?php

namespace node\models\node;

use Yii;
use node\lib\models\BaseActiveRecord;
/**
 * This is the model class for table "host_type".
 *
 * @property integer $id
 * @property string $name
 * @property double $space
 * @property integer $pages
 * @property integer $systems
 * @property integer $products
 * @property integer $pictures
 */
class HostType extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'host_type';
    }

    /**
     * @return \yii\db\Connection the database connection used by this AR class.
     */
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
            [['name', 'space', 'pages', 'systems', 'products', 'pictures'], 'required'],
            [['space'], 'number'],
            [['pages', 'systems', 'products', 'pictures'], 'integer'],
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
            'space' => 'Space',
            'pages' => 'Pages',
            'systems' => 'Systems',
            'products' => 'Products',
            'pictures' => 'Pictures',
        ];
    }
}
