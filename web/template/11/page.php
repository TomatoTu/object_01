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
                <!--{Menu_S}-->
                <div class="w-nav">
                    <?php echo $menuhtml ?>
                </div>
                <!--{Menu_E}-->
                <div class="topLogBox">
                    <div class="topLogBox-in">
                        <div class="col-com clearfix"> 
                            <!--{Sign_S}-->
                           <?php echo $registerhtml ?>
                            <!--{Sign_E}--> 
                            <!--{Language_S}-->
                            <!--{Language_E}--> 
                            <!--{Cart_S}-->
                             <?php echo $shopcarthtml ?>
                            <!--{Cart_E}--> 
                        </div>
                    </div>
                </div>
                <div class="searchBoxTop"> 
                    <!--{Search_S}-->
                    <!--{Search_E}--> 
                </div>
            </div>
        </div>
    </div>
    <!--{Banner_S}-->
    <div class="w-container bannerBox ">
         <?php echo $bannerhtml ?>
    </div>
    <!--{Banner_E}-->
    
    <div class="w-container w-main">
        <div class="row"> 
            <!--{Spublic_S}-->
            <?php echo $mainhtml ?>
            <!--{Spublic_E}--> 
        </div>
    </div>
    <div class="w-container w-footer">
        <div class="w-footer-in"> 
            <!--{Footer_S}-->
            <?php echo $footerhtml ?>
            <!--{Footer_E}--> 
        </div>
    </div>
</div>
<?php
$this->registerJsFile('/template/11/js/theme.js');
?>