<?php

namespace node\models\node;

use Yii;

/**
 * This is the model class for table "server".
 *
 * @property integer $id
 * @property string $name
 * @property string $ipaddress
 * @property string $domain
 * @property string $db_name
 * @property string $db_userid
 * @property string $db_password
 */
class Server extends \yii\db\ActiveRecord
{
    
    const STATUS_ACTIVE = 1;
    const STATUS_CLOSED = 0;

        /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'server';
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
            [['name', 'db_name'], 'string', 'max' => 20],
            [['ipaddress', 'db_userid'], 'string', 'max' => 30],
            [['domain', 'db_password'], 'string', 'max' => 50]
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
            'ipaddress' => 'Ipaddress',
            'domain' => 'Domain',
            'db_name' => 'Db Name',
            'db_userid' => 'Db Userid',
            'db_password' => 'Db Password',
        ];
    }
    
    public static function getActiveServerOne() {
        return Server::find()->where(['status'=>Server::STATUS_ACTIVE])->orderBy('id')->one();
    }
}
