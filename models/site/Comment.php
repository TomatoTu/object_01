<?php

namespace node\models\site;

use Yii;

/**
 * This is the model class for table "comment".
 *
 * @property string $id
 * @property string $host_id
 * @property string $site_id
 * @property string $member_id
 * @property string $member_email
 * @property string $system_id
 * @property string $aim_id
 * @property integer $is_show
 * @property integer $is_anonymous
 * @property string $message
 * @property string $reply
 * @property string $created_at
 * @property string $replied_at
 */
class Comment extends \node\lib\models\BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'comment';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['host_id', 'site_id', 'member_id', 'system_id', 'message'], 'required'],
            [['host_id', 'site_id', 'member_id', 'system_id', 'aim_id', 'is_show', 'is_anonymous'], 'integer'],
            [['message', 'reply'], 'string'],
            [['created_at', 'replied_at'], 'safe'],
            [['member_email'], 'string', 'max' => 255]
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
            'member_id' => 'Member ID',
            'member_email' => 'Member Email',
            'system_id' => 'System ID',
            'aim_id' => 'Aim ID',
            'is_show' => 'Is Show',
            'is_anonymous' => 'Is Anonymous',
            'message' => 'Message',
            'reply' => 'Reply',
            'created_at' => 'Created At',
            'replied_at' => 'Replied At',
        ];
    }
}
