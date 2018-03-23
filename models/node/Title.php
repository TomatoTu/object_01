<?php

namespace node\models\node;

use Yii;

/**
 * This is the model class for table "template".
 *
 * @property integer $id
 * @property string $name
 * @property string $theme
 * @property string $face_image
 * @property string $color_config
 */
class Title extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'title';
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
            [['num'], 'string', 'max' => 3]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'num' => 'num'
        ];
    }
}
