<div class="body">
    <header class="container-w">
        <div class="row">
            <div class="col"> 
                <!--{Logo_web_S}--> 
                <?php echo $logohtml ?>
                <!--{Logo_web_E}--> 
            </div>
            <div class="col"> 
                <!--{Menu_web_S}-->   
                <div class="w-nav">
                 <?php echo $menuhtml ?>
                </div>
                <!--{Menu_web_E}--> 
            </div>
            <div class="mobile-nav-toggle"><i class="fa fa-navicon fa-2x"></i></div>
            <div class="w-nav-mobile"> 
                <!--{Menu_wap_S}-->    
                <?php echo $menuhtml ?>
                <!--{Menu_wap_E}--> 
            </div>
        </div>
    </header>
    <section class="container-w body-noHeader"><!--{bannerClass->body-tallHeader}-->
        <div class="banner w-bannerbg">
            <div class="row">
                <div class="col"> 
                    <!--{Banner_web_S}-->  
                     <?php echo $bannerhtml ?>
                    <!--{Banner_web_E}--> 
                </div>
            </div>
        </div>
    </section>
    <main class="container-w">
        <div class="row"> 
            <!--{Spublic_web_S}-->  
             <?php echo $mainhtml ?>
            <!--{Spublic_web_E}--> 
        </div>
    </main>
    <footer class="w-footer">
        <div class="w-footer-in"> 
            <!--{Footer_web_S}--> 
            <?php echo $footerhtml ?>
            <!--{Footer_web_E}--> 
        </div>
    </footer>
</div>