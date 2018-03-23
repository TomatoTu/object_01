<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace node\modules\store\controllers;
use node\modules\store\lib\RestController;
use node\modules\store\forms\CommentListForm;
use node\modules\store\forms\CommentReplayForm;
use node\modules\store\forms\CommentDeleteForm;
/**
 * Description of CommentController
 *
 * @author dingjj
 */
class CommentController extends RestController{

    public function actionLoadlist() {
        return $this->getModel(CommentListForm::className())->getList();
    }

    public function actionUpdate() {
        $model = $this->getModel(CommentReplayForm::className())->modelUpdate();

        $this->checkErrors($model);

        return true;
    }

    public function actionDelete() {
        $this->getModel(CommentDeleteForm::className())->deleteInfo();

        return $this->getModel(CommentListForm::className())->getList();
    }
}
