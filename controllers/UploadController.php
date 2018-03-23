<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\controllers;
use Yii;
use node\models\site\Resource;
use node\lib\controller\ActiveController;
use node\models\models\UploadForm;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;
use node\lib\HostresFunctions;
/**
 * 上传操作
 * Site controller
 */
class UploadController extends ActiveController {
    
    public $enableCsrfValidation = false;
    private $extensions;
    private $stateInfo;
    private $fullName;
    private $fileName;
    private $oriName;
    private $fileType;
    private $fileSize;
    private $resourceId;
    
    private $stateMap = array( //上传状态映射表，国际化用户需考虑此处数据的国际化
        0=>"SUCCESS", //上传成功标记，在UEditor中内不可改变，否则flash判断会出错
        1=>"发送请求方的IP地址没有被运行访问",
        2=>"请求的方式有问题",
        3=>"传入的数据有有些不能为空的数据为空",
        4=>"站点端生成文件路径错误",
        5=>"参数没能正确传入，确保参数 site_id,key,type 这三个全部存在，缺一不可",
        6=>"文件大小超出了传输的范围或者文件的大小超出了限制的范围",
        7=>"传入的 site_id 未能从数据库中找到对应的数据，也就是说 site_id 不存在",
        11=>"上传文件至的路径不能为空",
        12=>"验证文件上传的 error code 不为 0 报错",
        13=>"上传文件后缀不被允许,允许的后缀",
        14=>"上传文件类型不被允许,允许的类型",
        15=>"不是上传过来得到的文件",
        110=>"非法操作，可能:传入的Host ID 在站点端未能找到或者用户名跟安全码不对",
        500=>"服务器内部错误",
        20=> "type参数错误",
        30=>'图片资源达到上限',
        101=>'网站空间达到上限',
    );
    
    private $resType = [
        'upImage' => 0,
        'upFlash' => 1,
        'upFile' => 2,
        'upCompressed' => 3,
        'other' => 4,
    ];
    
    public function verbs() {
        return ['*' => ['post','get']];
    }

    public function saveResource() {
        $this->addModels('ResourceForm');
        $this->updates();
    }
    
    public function actionUploadimage(){
        $this->extensions = ['png', 'jpg','jpeg', 'gif','bmp'];
        $this->upload('upImage');
    }
    
    public function actionUploadfile(){
        $this->extensions = ['pdf','xla','xls','xlsx','xlt','xlw','doc','docx','rar','zip','txt'];
        $this->upload('upFile');
    }
    
    public function actionUploadcompressed(){
        $this->extensions = ['zip','rar'];
        $this->upload('upCompressed');
    }
    
    public function actionUploadflash(){
        $this->extensions = ['swf'];
        $this->upload('upFlash');
    }
    
    // 添加资源数量
    public function addRes($class,$resource){
        if($class=='upImage'){
            $hostres = $this->hostres;
            $hostres = HostresFunctions::addPics($hostres);
            $this->hostres = $hostres;
        }
    }
    
    private function upload($class){
//        $magicFile = Yii::getAlias(null);
//        finfo_open(FILEINFO_MIME_TYPE, $magicFile);
//        die('{"state":"SUCCESS","id":302,"url":"\/htdocs\/62\/57\/resource\/image\/jpeg\/5642ea9f2b627.jpg","title":"5642ea9f2b627.jpg","original":"44.jpg","type":".jpg","size":8594}');
        $hostres = $this->hostres;
        
//        // 验证空间大小
//        if(!HostresFunctions::checkSpace($hostres)){
//            $this->stateInfo = $this->getStateInfo(40);
//            $this->returnAjax();
//        }
        // 验证图片数量
        if(!HostresFunctions::checkPics($hostres)){
            $this->stateInfo = $this->getStateInfo(30);
            $this->returnAjax();
        }
        
        if (Yii::$app->request->isPost) {
            $model = new UploadForm();
            $model->$class = UploadedFile::getInstanceByName('upLoad');
            $request = Yii::$app->request;
            if(!$type = $request->post('type')){
                $this->stateInfo = $this->getStateInfo(20);
                $this->returnAjax();
            }
            Yii::warning($model->toArray());
            if(!$this->validateExtension($model->$class)){
                $this->stateInfo = $this->getStateInfo(14);
                $this->returnAjax();
            }
            
            if($upload = $model->upload($type,$class,$hostres['host_type']['space'])){
                $resource = new Resource();
                
                $resource->setAttributes($upload);
                $resource->type = $this->resType[$class];
                $resource->relname = $model->$class->name;
                $this->_setHostSite($resource);
                
                if(!$resource->save()){
                    $this->stateInfo = $model->getErrors();
                }else{
                    $this->resourceId = $resource->id;
                    $this->fullName = $resource->path;
                    $this->fileName = $resource->name.'.'.$resource->exten;
                    $this->oriName  = $resource->relname;
                    $this->fileType = '.'.$resource->exten;
                    $this->fileSize = $resource->size;
                    $this->stateInfo = $this->getStateInfo(0);
                    $this->addRes($class,$resource);
                }
            }else{
                if($status = $model->getErrors('remote')){
                    $this->stateInfo = $this->getStateInfo($status);
                }else{
                    $this->stateInfo = $model->getErrors();
                }
            }
        }else{
            $this->stateInfo = $this->getStateInfo(2);
        }
        $this->returnAjax();
    }
    
    public function actionConfig(){
        $CONFIG = json_decode(preg_replace("/\/\*[\s\S]+?\*\//", "", file_get_contents(Yii::getAlias('@webroot')."/js/lib/ueditor/config.json")), true);
        $CONFIG['imageUrlPrefix']='http://' . Yii::$app->params['NAPLES']['SERVER']['domain'];
        return json_encode($CONFIG);
    }
    
    /**
     * 上传错误检查
     * @param $errCode
     * @return string
     */
    private function getStateInfo($errCode)
    {
        if(is_array($errCode))
            $errCode=$errCode[0];
//        echo $errCode;
        return !$this->stateMap[$errCode] ? $this->stateMap["ERROR_UNKNOWN"] : $this->stateMap[$errCode];
    }
    
    // 设置默认的hostid 和 siteid
    public function _setHostSite($form){
     //   $user = Yii::$app->user->getIdentity();
        if($form->hasAttribute('host_id')){
            $form->host_id = $this->naples['HOSTID'];
        }
        if($form->hasAttribute('site_id')){
            $form->site_id = $this->naples['SITEID'];
        }
    }
    
    private function returnAjax(){
        die(json_encode([
            "state"    => $this->stateInfo,
            'id'       => $this->resourceId,
            "url"      => $this->fullName,
            "title"    => $this->fileName,
            "original" => $this->oriName,
            "type"     => $this->fileType,
            "size"     => $this->fileSize
        ]));
    }
    
    protected function validateExtension($file)
    {
        $extension = mb_strtolower($file->extension, 'utf-8');

        $mimeType = $file->type;
        if ($mimeType === null) {
            return false;
        }

        $extensionsByMimeType = FileHelper::getExtensionsByMimeType($mimeType);

        if (!in_array($extension, $extensionsByMimeType, true)) {
            return false;
        }

        if (!in_array($extension, $this->extensions, true)) {
            return false;
        }

        return true;
    }
}
