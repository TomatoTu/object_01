<?php

namespace node\models\node;

use Yii;
use node\models\site\Host as siteHost;
use node\models\node\Server;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use node\models\site\Site;
use node\models\node\HostType;
use node\models\site\Domain;

/**
 * This is the model class for table "host".
 *
 * @property integer $id
 * @property string $name
 * @property integer $user_id
 * @property integer $server_id
 * @property string $email
 * @property integer $host_type_id
 * @property integer $status
 * @property integer $init
 * @property string $create_time
 * @property string $end_time
 * @property string $auth_key
 */
class Host extends ActiveRecord implements IdentityInterface
{
    
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 1;
    const INIT_UNFINISH = 0;
    const INIT_FINISHED = 1;
    
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'host';
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
            [['name', 'auth_key'], 'required'],
            [['user_id', 'server_id', 'host_type_id', 'status','is_trial'], 'integer'],
            [['create_time', 'end_time'], 'safe'],
            [['name', 'auth_key'], 'string', 'max' => 32],
            [['email', 'init'], 'string', 'max' => 150]
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
            'user_id' => 'User ID',
            'server_id' => 'Server ID',
            'email' => 'Email',
            'host_type_id' => 'Host Type ID',
            'status' => 'Status',
            'init' => 'Init',
            'create_time' => 'Create Time',
            'end_time' => 'End Time',
            'auth_key' => 'Auth Key',
        ];
    }
    
    
    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

     public function getAuthKey() {
        return $this->auth_key;
    }

    public function getId() {
        return $this->getPrimaryKey();
    }

    public function validateAuthKey($authKey) {
        return $this->getAuthKey() === $authKey;
    }

    public static function findIdentity($id) {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }
    
    public static function findIdentityBy($id,$user_id) {
        return static::findOne(['id' => $id,'user_id'=>$user_id, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findIdentityByAccessToken($token, $type = null) {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }
    
    // 获取server数据
    public function getServer()
    {
        return $this->hasOne(Server::className(), ['id' => 'server_id']);
    }
    
    // 获取server数据
    public function getSitehost()
    {
        return $this->hasOne(siteHost::className(), ['id' => 'id']);
    }
    
    // 获取server数据
    public function getHosttype()
    {
        return $this->hasOne(HostType::className(), ['id' => 'host_type_id']);
    }
    
    // 获取server数据
    public function getSites()
    {
        return $this->hasMany(Site::className(), ['host_id' => 'id'])->orderBy('id');
    }
    
    // 获取server数据
    public function getDomain()
    {
        return $this->hasOne(Domain::className(), ['host_id' => 'id'])->andWhere(['domain_type'=>0]);
    }
    
    // 获取server数据
    public function getSite()
    {
        $cache = Yii::$app->cache;
        if($cache->exists('host.id'.$this->id.'.site.id')){
            return $this->hasOne(Site::className(), ['host_id' => 'id'])->andFilterWhere(['id'=>$cache->get('host.id'.$this->id.'.site.id')]);
        }else{
            return $this->hasOne(Site::className(), ['host_id' => 'id'])->orderBy('id');
        }
    }
    
    public function createHost($userId,$host_type_id=1,$init='',$time='',$is_trial=0){
        if(!$is_trial) $is_trial= 0; 
        if(!$init) $init=  json_encode ([1]); 
        if(!$time) $time=  date("Y-m-d H:i:s", strtotime("+1 months", time()));
        
        $server = Server::getActiveServerOne();
        
        $this->loadDefaultValues();
        $this->user_id = $userId;
        $this->name = Yii::$app->params['DEFAULT_HOST_NAME'];
        $this->host_type_id = $host_type_id;
        $this->is_trial = $is_trial;
        $this->server_id = $server->id;
        $this->status = self::STATUS_ACTIVE;
        $this->init = $init;
        $this->end_time = $time;
        $this->generateAuthKey();
        
        if($this->validate()){
            return $this->save();
        }else{
            return false;
        }
    }
    
    // 通过user_id获取host
    public static function getHostsByUser($user_id){
        return self::find()->where(['user_id'=>$user_id])->asArray()->all();
    }
    
    public static function setInitHost(){
        self::findIdentity($id);
    }
}
