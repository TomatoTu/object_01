<?php
/* @var $this yii\web\View */

$this->title = '刺猬智能建站系统';
?>

<div class="home-header-b"  style="background:url(/images/home_headerbg/home_headerbg_<?= Yii::$app->params['NAPLES']['SITE']['theme'] ?>.jpg) no-repeat center;">
    <div class="home-header-in-b">
        <div class="home-header-top-b clearfix">
            <div class="home-logo"><img src="/images/home_logo.png"/></div>
            <div class="home-user">
                <div class="home-user-name" ><?= $username?><i class="icon-home icon-Homeuser-down"></i></div>
                <div class="home-down home-user-down">
                    <div class="home-down-icon"></div>
                    <div class="home-down-list">
                        <ul>
                            <li><a href="javascript:;" onClick="$('.home-content-l,.home-content-r').show();$('.home-admin-con').hide();">网站信息</a></li>
                            <li><a href="javascript:;" onClick="$('.home-content-l,.home-content-r').hide();$('.home-admin-con').show();">账号管理</a></li>
                            <li><a href="/node/logout">退出</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-header-con clearfix">
            <div class="home-header-con-l clearfix">
                <div class="user-web-info">
                    <div class="user-web-name" onClick="$('.pop-user-web').toggle();"><?= $hostInfo['name'] ?>
                        <!--<div class="icon-home user-web-more"></div>-->

                    </div>
                </div>
                <!--                <div class="pop-home pop-user-web">
                                    <div class="pop-home-header">我的网站</div>
                                    <div class="pop-home-content">
                                        <div class="user-webs-list">
                                            <ul>
                                                <li class="add-new">
                                                    <a href="/node/addhost" class="">
                                                        <div class="web-smallimg"><img src="/images/webadd.png"/></div>
                                                        <span>添加网站</span>
                                                    </a>
                                                </li>
                <?php
                foreach ($hosts as $host) {
                    echo
                    '<li>
                                                <a href="/node/changehost?id=' . $host['id'] . '">
                                                    <div class="web-smallimg">
                                                        <img src="/images/webdefault.png"/>
                                                    </div>
                                                    <span>' . $host['name'] . '</span>
                                                </a>
                                            </li>';
                }
                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>-->
            </div>
            <div class="home-header-con-r"> <a href="index" class="home-green-btn">网站编辑</a><!--<a href="#" class="home-whiteborder-btn"><i class="icon-home icon-homeUpgrade"></i>升级</a>--></div>
        </div>
    </div>
</div>

<div class="home-content">
    <div class="home-content-in clearfix">
        <div class="home-content-l">
            <div class="home-section">
                <div class="home-sec-header"><i class="icon-home icon-homeUser"></i>账户资料</div>
                <div class="home-sec-con">
                    <div class="user-information clearfix">
                        <div class="user-info-sec user-info-l">
                            <!--                            <div class="user-info-dl clearfix">
                                                            <div class="user-info-dd-l">网站名称：</div>
                                                            <div class="user-info-dd-r">XX公司</div>
                                                        </div>-->
                            <div class="user-info-dl clearfix">
                                <div class="user-info-dd-l">网站型号：</div>
                                <div class="user-info-dd-r"><span class="color-green"><?= $hostInfo['host_type']['name'] ?></span></div>
                            </div>
                            <div class="user-info-dl clearfix">
                                <div class="user-info-dd-l">网站有效期至：</div>
                                <div class="user-info-dd-r" style="font-family: arial;"><?= date('Y',strtotime($hostInfo['end_time'])).'年'.date('m',strtotime($hostInfo['end_time'])).'月'.date('d',strtotime($hostInfo['end_time'])).'日'; ?></div>
                            </div>
                            <!--                            <div class="user-info-dl clearfix">
                                                            <div class="user-info-dd-l">网站域名：</div>
                                                            <div class="user-info-dd-r">xxx.xxx.xxx.xxx</div>
                                                        </div>-->
                        </div>
                        <div class="user-info-sec user-info-r">

                            <div class="user-info-dl clearfix">
                                <div class="user-info-dd-l">语言版本：</div>
                                <div class="user-info-dd-r">
                                    <?php
                                    foreach ($hostInfo['languages'] as $language) {
                                        echo '<span class="language-span">' . $language . '</span>';
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="user-info-dl clearfix">
                                <div class="user-info-dd-l">备案状态：</div>
                                <div class="user-info-dd-r">未备案<a href="http://beian.35.com/" target="_blank" class="home-greenborder-btn">提交备案</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-content-r">
            <div class="home-section">
                <div class="home-sec-header"><i class="icon-home icon-webResources"></i>网站资源</div>
                <div class="home-sec-con"> 
                    <div class="webResources clearfix">
                        <div class="webResources-sec">
                            <div class="webResources-label">已用：<?= $hostInfo['space'] ?>G</div>
                            <div class="webResources-progress">
                                <div class="progress-cur progress-green" style="width:<?= $hostInfo['space_pers'] > 100 ? 100 : $hostInfo['space_pers'] ?>%;"><?= $hostInfo['space_pers'] ?>%</div>
                            </div>
                            <div class="webResources-circleprogress">
                                <canvas id="webSpace" width="80" height="80"></canvas>
                                <div class="text-middle">
                                    <div><span class="text-big"><?= $hostInfo['host_type']['space'] ?></span>G</div>
                                    <div>网站空间</div>
                                </div>
                            </div>
                        </div>
                        <div class="webResources-sec">
                            <div class="webResources-label">已用：<?= $hostInfo['pages'] ?>个</div>
                            <div class="webResources-progress">
                                <div class="progress-cur progress-yellow" style="width:<?= $hostInfo['pages_pers'] > 100 ? 100 : $hostInfo['pages_pers'] ?>%;"><?= $hostInfo['pages_pers'] ?>%</div>
                            </div>
                            <div class="webResources-circleprogress">
                                <canvas id="pagesTotal" width="80" height="80"></canvas>
                                <div class="text-middle">
                                    <div><span class="text-big"><?= $hostInfo['host_type']['pages'] ?></span>个</div>
                                    <div>页面数量</div>
                                </div>
                            </div>
                        </div>
                        <div class="webResources-sec">
                            <div class="webResources-label">已用：<?= $hostInfo['systems'] ?>个</div>
                            <div class="webResources-progress">
                                <div class="progress-cur progress-red" style="width:<?= $hostInfo['systems_pers'] > 100 ? 100 : $hostInfo['systems_pers'] ?>%;"><?= $hostInfo['systems_pers'] ?>%</div>
                            </div>
                            <div class="webResources-circleprogress">
                                <canvas id="systemsTotal" width="80" height="80"></canvas>
                                <div class="text-middle">
                                    <div><span class="text-big"><?= $hostInfo['host_type']['systems'] ?></span>个</div>
                                    <div>系统数量</div>
                                </div>
                            </div>
                        </div>
                        <div class="webResources-sec">
                            <div class="webResources-label">已用：<?= $hostInfo['products'] ?>个</div>
                            <div class="webResources-progress">
                                <div class="progress-cur progress-blue" style="width:<?= $hostInfo['products_pers'] > 100 ? 100 : $hostInfo['products_pers'] ?>%;"><?= $hostInfo['products_pers'] ?>%</div>
                            </div>
                            <div class="webResources-circleprogress">
                                <canvas id="productsTotal" width="80" height="80"></canvas>
                                <div class="text-middle">
                                    <div><span class="text-big"><?= $hostInfo['host_type']['products'] ?></span>个</div>
                                    <div>产品数量</div>
                                </div>
                            </div>
                        </div>
                        <div class="webResources-sec">
                            <div class="webResources-label">已用：<?= $hostInfo['pictures'] ?>张</div>
                            <div class="webResources-progress">
                                <div class="progress-cur progress-purple" style="width:<?= $hostInfo['pictures_pers'] > 100 ? 100 : $hostInfo['pictures_pers'] ?>%;"><?= $hostInfo['pictures_pers'] ?>%</div>
                            </div>
                            <div class="webResources-circleprogress">
                                <canvas id="imagesTotal" width="80" height="80"></canvas>
                                <div class="text-middle">
                                    <div><span class="text-big"><?= $hostInfo['host_type']['pictures'] ?></span>张</div>
                                    <div>图片数量</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-admin-con" style="display:none">
                <div class="home-admin-sidemenu">
                    <h2>账户管理</h2>
                    <ul class="ul-parent clearfix">
<!--                        <li class="li-parent" onclick="$(this).siblings().removeClass('cur');$(this).addClass('cur');$('.home-admin-sec').hide(); $('.admin-sec-info').show(); ">
                            <div class="div-parent">账户资料</div>
                        </li>-->
                        <li class="li-parent cur" onclick="$(this).siblings().removeClass('cur');$(this).addClass('cur');$('.home-admin-sec').hide(); $('.admin-sec-pwdchange').show(); ">
                            <div class="div-parent">修改密码</div>
                        </li>
                    </ul>
                </div>
                <div class="home-admin-main">
                    <div class="home-admin-sec admin-sec-info" style="display: none;">
                        <div class="home-section">
                            <div class="home-sec-header"><i class="icon-home icon-homeUser"></i>账户资料</div>
                            <div class="home-sec-con">
                                <div class="admin-info-form">
                                    <form>
                                        <dl>
                                            <dd class="dl_ddBL">刺猬账号：</dd>
                                            <dd class="dl_ddBR">
                                                <div>alalalalal</div>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd class="dl_ddBL">公司名称：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="text" placeholder="" class="input-admin">
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd class="dl_ddBL">公司电话：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="tel" placeholder="" class="input-admin">
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd class="dl_ddBL">联系地址：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="text" placeholder="" class="input-admin">
                                            </dd>
                                        </dl>
                                        <div class="btn-submitB">
                                            <input type="button" class="btn-grayAd" value="提交">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="home-admin-sec admin-sec-pwdchange" style="display: block;">
                        <div class="home-section">
                            <div class="home-sec-header"><i class="icon-home icon-homeUser"></i>修改密码</div>
                            <div class="home-sec-con">
                                <div class="admin-info-form">
                                    <form>
                                        <dl>
                                            <dd class="dl_ddBL">输入旧密码：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="password" placeholder="" id="oldpas" class="input-admin">
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd class="dl_ddBL">输入新密码：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="password" placeholder="" id="newpas" class="input-admin">
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd class="dl_ddBL">重输新密码：</dd>
                                            <dd class="dl_ddBR">
                                                <input type="password" placeholder="" id="newpas1" class="input-admin">
                                            </dd>
                                        </dl>
                                        <div class="btn-submitB">
                                            <input type="button" class="btn-grayAd btn-sub" value="提交" >
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
<?php
$this->registerJs("
    var CircleDial = function () {
        circleProgress({
            id: 'webSpace',
            progress: " . $hostInfo['space_pers'] . ", 
            color: '#00ce9b'
        });
		circleProgress({
            id: 'pagesTotal',
            progress: " . $hostInfo['pages_pers'] . ", 
            color: '#f4ba4a'
        });
		circleProgress({
            id: 'systemsTotal',
            progress: " . $hostInfo['systems_pers'] . ", 
            color: '#f05050'
        });
		circleProgress({
            id: 'productsTotal',
            progress: " . $hostInfo['products_pers'] . ", 
            color: '#3bc0c3'
        });
		circleProgress({
            id: 'imagesTotal',
            progress: " . $hostInfo['pictures_pers'] . ", 
            color: '#4d6abd'
        });
    };
    CircleDial();
    

    
    var subPas = function(){
        var old = $.trim($('#oldpas').val());
        var newpas = $.trim($('#newpas').val());
        var newrept = $.trim($('#newpas1').val());
        
        if(newpas == newrept){
            $.post('/manager/password', { 'oldpassword': old,'password':newpas,'_csrf':document.getElementsByName('csrf-token')[0].content },
            function(data){
              if(data.code){
                alert('修改成功');
              }else{
                alert('修改失败');
              }
            }, 'json');
        }else{
            alert('两次输入的密码不一致');
        }
    }
    $('.btn-sub').click(subPas);
    $('.home-user-name,.home-user-down').hover(
        function () {
            $('.home-user-down').show();
        },
        function () {
            $('.home-user-down').hide();
        }
    );
    
");
?>
