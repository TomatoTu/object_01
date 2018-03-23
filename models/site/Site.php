<?php

namespace node\models\site;

use Yii;
use node\lib\models\BaseActiveRecord;
use node\models\node\Template;
use node\models\site\Language;
/**
 * This is the model class for table "site".
 *
 * @property integer $id
 * @property string $name
 * @property integer $host_id
 * @property integer $user_id
 * @property integer $language_id
 * @property integer $theme
 * @property integer $color
 * @property string $favorites_icon
 * @property string $date_format
 * @property string $time_format
 * @property integer $ssl
 * @property string $archive_email
 * @property integer $order_top
 */
class Site extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'site';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['host_id', 'user_id', 'language_id', 'theme', 'color', 'ssl', 'order_top'], 'integer'],
            [['name'], 'string', 'max' => 32],
            [['favorites_icon'], 'string', 'max' => 255],
            [['date_format', 'time_format', 'archive_email'], 'string', 'max' => 50]
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
            'host_id' => 'Host ID',
            'user_id' => 'User ID',
            'language_id' => 'Language ID',
            'theme' => 'Theme',
            'color' => 'Color',
            'favorites_icon' => 'Favorites Icon',
            'date_format' => 'Date Format',
            'time_format' => 'Time Format',
            'ssl' => 'Ssl',
            'archive_email' => 'Archive Email',
            'order_top' => 'Order Top',
        ];
    }
    
    public function getTemplate(){
        return $this->hasOne(Template::className(), ['id'=>'theme']);
    }
    
    public function getLanguage(){
        return $this->hasOne(Language::className(), ['id'=>'language_id']);
    }
}
