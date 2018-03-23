<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\forms;

use node\modules\store\models\Member;
use Yii;

/**
 * Description of MemberCreateForm
 *
 * @author dingjj
 */
class MemberCreateForm extends Member {

    public function rules() {
        return [
            [['email'], 'required', 'message' => '会员账号不能为空'],
            [['password'], 'required', 'message' => '密码不能为空'],
            [['email'], 'email', 'message' => '会员账号必须是一个有效的电子邮件地址'],
        ];
    }

    public function createMember() {

        if (true === $this->isExistsEmailInThisHost()) {
            throw new \node\modules\store\lib\MissFieldsHttpException('会员账号已存在');
        }


        $member = new Member();
        $member->loadDefaultValues();
        $member->setAttributes(self::dataDefault());
        $member->email = $this->email;
        $member->username = 'undefined';
        $member->password = md5($this->password);
        $member->save();
        return $member;
    }

    // 判断该站点是否存在此Email
    public function isExistsEmailInThisHost() {
        // 检测会员账号是否存在
        $email = isset(\Yii::$app->request->post()['email']) && !empty(\Yii::$app->request->post()['email']) ? \Yii::$app->request->post()['email'] : NULL;
        if (!is_null($email)) {
            $center = \Yii::$app->cache->get(\Yii::$app->user->id);
            $host = $center['NODE_HOST'];
            if (empty(self::find()->where(['host_id' => $host->id, 'email' => $email])->one())) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

}
