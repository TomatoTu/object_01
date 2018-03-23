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
 * @property string $theme_title
 * @property string $color_config
 */
class Template extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'template';
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
            [['theme_title', 'color_config'], 'required'],
            [['name'], 'string', 'max' => 20],
            [['theme'], 'string', 'max' => 10],
            [['face_image'], 'string', 'max' => 50],
            [['theme_title'], 'string', 'max' => 3],
            [['color_config'], 'string', 'max' => 255]
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
            'theme' => 'Theme',
            'face_image' => 'Face Image',
            'theme_title' => 'Theme Title',
            'color_config' => 'Color Config',
        ];
    }
    
    public static function getAllTemplates(){
        return self::find()->asArray()->all();
    }
}
