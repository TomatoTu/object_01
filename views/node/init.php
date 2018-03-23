<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<div class="home-header-b">
    <div class="home-header-in-b">
        <div class="home-header-top-b clearfix">
            <div class="home-logo"><img src="/images/home_logo.png"></div>
            <div class="home-user">
                <div class="home-user-name" onclick="$('.home-user-down').toggle();">rabbit<i class="icon-home icon-Homeuser-down"></i></div>
                <div class="home-down home-user-down">
                    <div class="home-down-icon"></div>
                    <div class="home-down-list">
                        <ul>
                            <li><a href="#">账号信息</a></li>
                            <li><a href="#">支持</a></li>
                            <li><a href="#">退出</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="home-content">
    <div class="home-content-in clearfix">
        <div class="theme-choose-m">
            <div class="theme-head-m">
                <h1>选择一个模板</h1>
            </div>
            <div class="themes-list-m" id="themes-choose">

            </div>
        </div>
    </div>
</div>
<script>

var thisData = <?= $model?>;

</script>

<?php
    $this->registerJsFile('/js/theme.js', ['type'=>"text/babel"]);
?>