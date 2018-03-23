<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\controllers;

use node\modules\store\lib\RestController;
use node\modules\store\forms\MemberListForm;
use node\modules\store\forms\MemberUpdateForm;
use node\modules\store\forms\MemberCreateForm;
use node\modules\store\forms\MemberDeleteForm;

/**
 * Description of MemberController
 *
 * @author dingjj
 */
class MemberController extends RestController {

    public function actionLoadlist() {
        return $this->getModel(MemberListForm::className())->getList();
    }

    public function actionUpdate() {
        $model = $this->getModel(MemberUpdateForm::className())->orderUpdate();

        $this->checkErrors($model);

        return true;
    }

    public function actionCreate() {

        $model = $this->getModel(MemberCreateForm::className())->createMember();

        $this->checkErrors($model);

        return true;
    }

    public function actionDelete() {
        $this->getModel(MemberDeleteForm::className())->deleteInfo();

        return $this->getModel(MemberListForm::className())->getList();
    }

}
