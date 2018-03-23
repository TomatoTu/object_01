<div class="body">
    <div class="w-container w-header">
        <div class="row clearfix">
            <div class="mobile-nav-toggle"><i class="fa fa-navicon fa-2x"></i></div>
            <div class="col-logo"> 
                <!--{Logo_S}-->
                <div class="w-logo">
                    <?php echo $logohtml ?>
                </div>
                <!--{Logo_E}--> 
            </div>
            <div class="col-right clearfix">
                <div class="col-com clearfix"> 
                    <!--{Sign_S}-->
                    <?php echo $registerhtml ?>
                    <!--{Sign_E}--> 
                    <!--{Cart_S}-->
                    <?php echo $shopcarthtml ?>
                    <!--{Cart_E}--> 
                </div>
                <!--{Menu_S}-->
                <div class="w-nav">
                    <?php echo $menuhtml ?>
                </div>
                <!--{Menu_E}--> 
            </div>
        </div>
    </div>
    <!--{Banner_S}-->
    <div class="w-container bannerBox">
        <!--{CBanner_S}--> 
        <?php echo $bannerhtml ?>
        <!--{CBanner_E}--> 
    </div>
    <!--{Banner_E}--> 

    <div class="w-container w-main">
        <div class="row"> 
            <!--{Spublic_S}-->
            <?php echo $mainhtml ?>
            <!--{Spublic_E}--> 
        </div>
    </div>
    <div class="w-footer">
        <div class="w-footer-in"> 
            <!--{Footer_S}-->
            <?php echo $footerhtml ?>
            <!--{Footer_E}--> 
        </div>
    </div>
</div>

<?php
$this->registerJsFile('/template/1/js/theme.js');
?>