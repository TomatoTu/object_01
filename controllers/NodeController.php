<?php
namespace node\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use node\models\LoginForm;
use yii\filters\VerbFilter;
use node\lib\Functions;
use node\models\node\Host;
use node\models\site\Host as sHost;
use node\models\node\Template;
use node\models\site\forms\SiteCreateForm;
use node\models\site\forms\HostUpdateForm;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use node\lib\InitFunctions;
use node\models\site\Site;

/**
 * Site controller
 */
class NodeController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['login', 'error','index'],
                        'allow' => true,
                    ],
                    [
                        'actions' => ['logout', 'index','init','addhost','changehost'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
//                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionIndex()
    {
        throw new NotFoundHttpException('页面不存在。');
        die();
        return $this->render('index');
    }

    public function actionLogin()
    {
        $request = Yii::$app->request;
        $redirectUrl = Yii::$app->params['NODE_SERVER']['center_url'];
        // 获取key的值
        Yii::info('获取key的值');
        if (!$request->get('key')) {
            Yii::info($request->get('key'));
            return $this->redirect($redirectUrl);
        }
        list($userId, $hostId, $time, $username, $cps) = Functions::getSecretKey($request->get('key'));
        $cps = json_decode($cps, true);
        
        Yii::info($cps);
        // 验证密匙到期时间
        Yii::info('验证密匙到期时间');
        if (time() > $time + 60) {
            return $this->redirect($redirectUrl);
        }
        
        // 验证用户
        Yii::info('验证用户');
        if(!$userId){
            return $this->redirect($redirectUrl);
        }
        // 判断是不是首次登录
        Yii::info('判断是不是首次登录');
        if(!$hostId){
            Yii::info('首次登录');
            $host_type_id=1;
            $init='';
            $time='';
            $is_trial = '';
            if($cps && $cps['SUCCESS']){
                $host_type_id = $cps['offer_model'];
                $time = $cps['expired_time'];
                $is_trial = 1;
                $init = json_encode($cps['languages']);
            }
            $host = new Host();
            if($host->createHost($userId,$host_type_id,$init,$time,$is_trial)){
                $ret = Functions::setCenterHost($host->toArray());
                Yii::info($ret);
                if(!$ret['success']){
                    Yii::info('失败');
                    $host->delete();
                    return $this->redirect($redirectUrl);
                }
            }
        }else{
            // 获取host信息，
            Yii::info('获取host信息');
            $host = Host::findone(['id'=>$hostId,'user_id'=>$userId]);
            if($cps && $cps['SUCCESS']){
                $host_type_id = $cps['offer_model'];
                $time = $cps['expired_time'];
                $init = $cps['languages'];
                $is_trial = $cps['is_trial'];
                if($host_type_id){
                    $host->host_type_id = $host_type_id;
                }
                if($time){
                    $host->end_time = $time;
                }
                if($is_trial){
                    $host->is_trial = $is_trial;
                }
                if($init){
                    $nInit = json_decode($host->init);
                    foreach($nInit as $nLanguage){
                        if(!in_array($nLanguage, $init)){
                            $site = Site::findOne(['language_id'=>$nLanguage,'host_id'=>$host->id]);
                            InitFunctions::deleteAll($site->id);
                        }
                    }
                    
                    foreach($init as $language){
                        if(!in_array($language, $nInit)){
                            InitFunctions::InitSingle($host, $language);
                        }
                    }
                    
                    $host->init = json_encode($init);
                }
                $sHost = HostUpdateForm::findOne(['id'=>$hostId,'user_id'=>$userId]);
                $sHost->setAttributes($host->toArray());
                
                if($host->save() 
                        && $sHost->save()){
                    Yii::info($host->toArray());
                    Yii::info($sHost->toArray());
                   $ret = Functions::setCenterHost($host->toArray()); 
                }else{
                    Yii::info($sHost->getErrors());
                }
            }
            
            if(!$host || $host->hasErrors()){
                return $this->redirect($redirectUrl);
            }
        }
        // 登录
        Yii::info('登录');
        $cache = Yii::$app->cache;
        if(Yii::$app->user->login($host)){
            $cache = Yii::$app->cache;
            $cache->delete('host.id'.$host->id.'.site.id');
            $cache->delete('hostres'.$host->id);
            $cache->delete($host->id);
            
//            if(!$cache->get('username'.$host->id)){
                $cache->set('username'.$host->id,$username);
//            }
            if($host->init == Host::INIT_UNFINISH){
                Yii::info('INIT_UNFINISH');
                return $this->redirect(['init/index']);
            }else{
                Yii::info('INIT_FINISHED');
                return $this->redirect(['host/index']);
            }
        }
    }
    
    // 新建主机
    public function actionAddhost()
    {
        Yii::info('添加主机');
        
        $redirectUrl = Yii::$app->params['NODE_SERVER']['center_url'];
        
        // 判断用户是否登录
        if(Yii::$app->user->isGuest){
            return $this->redirect($redirectUrl);
        }
        
        $userId = Yii::$app->user->identity->user_id;
        
        // 新建主机
        $host = new Host();
        if(!$host->createHost($userId)){
            return $this->redirect($redirectUrl);
        }
        
        // 调用主控接口 添加主机
        $ret = Functions::setCenterHost($host->toArray());
        if(!$ret['success']){
            Yii::info('失败');
            $host->delete();
            return $this->redirect($redirectUrl);
        }
        // 登录
        if(Yii::$app->user->login($host)){
            if($host->init == Host::INIT_UNFINISH){
                Yii::info('INIT_UNFINISH');
                return $this->redirect(['init/index']);
            }else{
                Yii::info('INIT_FINISHED');
                return $this->redirect(['host/index']);
            }
        }
    }
    
    // 切换主机
    public function actionChangehost($id)
    {
        $redirectUrl = Yii::$app->params['NODE_SERVER']['center_url'];
        
        // 判断用户是否登录
        if(Yii::$app->user->isGuest){
            return $this->redirect($redirectUrl);
        }
        
        $userId = Yii::$app->user->identity->user_id;
        
        $host = Host::findIdentityBy($id,$userId);
        
        // 判读主机存在性
        if(!$host){
            return $this->redirect($redirectUrl);
        }
        
        // 登录
        if(Yii::$app->user->login($host)){
            if($host->init == Host::INIT_UNFINISH){
                Yii::info('INIT_UNFINISH');
                return $this->redirect(['init/index']);
            }else{
                Yii::info('INIT_FINISHED');
                return $this->redirect(['host/index']);
            }
        }
    }

    public function actionLogout()
    {
       $redirectUrl = Yii::$app->params['NODE_SERVER']['center_url'];
       //Yii::$app->user->logout();
       return $this->redirect($redirectUrl);
    }
}
