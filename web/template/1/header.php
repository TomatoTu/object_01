<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="yes" name="apple-touch-fullscreen">
<title>Template</title>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/base.js"></script>
<script src="js/common.js"></script>
<link rel="stylesheet" href="css/fontawesome/css/font-awesome.css">
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/widget.css">
<link rel="stylesheet" href="css/cart.css">

<link rel="stylesheet" href="<?PHP echo $_REQUEST['theme'].'/';?>css/theme.css">
<link rel="stylesheet" href="<?PHP echo $_REQUEST['theme'].'/';?>css/color_0.css">
<!--[if lt IE 9]>
      <link rel="stylesheet" href="css/fontawesome/css/font-awesome-ie7.min.css">
      <script src="js/selectivizr.js"></script>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<!--这套模板独有的js-->
<script src="<?PHP echo $_REQUEST['theme'].'/';?>js/theme.js"></script>
</head>
<body>
<div class="body">
<header class="container-w">
        <div class="row">
            <div class="col"> 
                <!--{Logo_web_S}-->
                <div class="w-logo">
                    <h1><a href="#">MY SITE</a></h1>
                    <a href="/"  class="w-logo-img"  style="display:none;"> <img src="<?PHP echo $_REQUEST['theme'].'/';?>images/logo.png"/> </a>  </div>
                <!--{Logo_web_E}--> 
            </div>
            <div class="col"> 
                <!--{Menu_web_S}-->
                <div class="w-nav">
                    <ul class="nav_inner clearfix" id="g-web-ul-menu">
                    <li class="active">
                        <div class="li-parent-div li-parentOne-div"><a href="#">HOME</a><span class="icon-sub"></span></div>
                        <div class="submenu">
                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                            <ul>
                                <li>
                                    <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                    <div class="submenu">
                                        <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                        <ul>
                                            <li><a href="#">contact</a></li>
                                            <li>
                                                <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                                <div class="submenu">
                                                    <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                    <ul>
                                                        <li><a href="#">company</a></li>
                                                        <li>
                                                            <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                            <div class="submenu">
                                                                <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                <ul>
                                                                    <li><a href="#">company</a></li>
                                                                    <li>
                                                                        <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                                        <div class="submenu">
                                                                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                            <ul>
                                                                                <li><a href="#">company</a></li>
                                                                                <li><a href="#">contact</a> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="#">contact</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">contact</a></li>
                            </ul>
                        </div>
                    </li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT ABOUT</a></li>
                    <li>
                        <div class="li-parent-div li-parentOne-div"><a href="#">HOME</a><span class="icon-sub"></span></div>
                        <div class="submenu">
                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                            <ul>
                                <li>
                                    <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                    <div class="submenu">
                                        <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                        <ul>
                                            <li><a href="#">contact</a></li>
                                            <li>
                                                <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                                <div class="submenu">
                                                    <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                    <ul>
                                                        <li><a href="#">company</a></li>
                                                        <li>
                                                            <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                            <div class="submenu">
                                                                <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                <ul>
                                                                    <li><a href="#">company</a></li>
                                                                    <li>
                                                                        <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                                        <div class="submenu">
                                                                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                            <ul>
                                                                                <li><a href="#">company</a></li>
                                                                                <li><a href="#">contact</a> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="#">contact</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">contact</a></li>
                            </ul>
                        </div>
                    </li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li> <a href="#">ABOUT</a></li>
                    <li>
                        <div class="li-parent-div li-parentOne-div"><a href="#">CONTACT</a><span class="icon-sub"></span></div>
                        <div class="submenu">
                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                            <ul>
                                <li>
                                    <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                    <div class="submenu">
                                        <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                        <ul>
                                            <li><a href="#">contact</a></li>
                                            <li>
                                                <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                                <div class="submenu">
                                                    <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                    <ul >
                                                        <li><a href="#">company</a></li>
                                                        <li>
                                                            <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                            <div class="submenu">
                                                                <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                <ul >
                                                                    <li><a href="#">company</a></li>
                                                                    <li>
                                                                        <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                                        <div class="submenu">
                                                                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                            <ul >
                                                                                <li><a href="#">company</a></li>
                                                                                <li><a href="#">contact</a> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="#">contact</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">contact</a></li>
                            </ul>
                        </div>
                    </li>
                    <li> <a href="#">Login|Register</a></li>
                </ul>
                </div>
                <!--{Menu_web_E}--> 
            </div>
            <div class="mobile-nav-toggle"><i class="fa fa-navicon fa-2x"></i></div>
            <div class="w-nav-mobile">
                <!--{Menu_wap_S}-->
                <ul class="nav_inner clearfix">
                    <li class="active">
                        <div class="li-parent-div li-parentOne-div"><a href="#">HOME</a><span class="icon-sub"></span></div>
                        <div class="submenu">
                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                            <ul>
                                <li>
                                    <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                    <div class="submenu">
                                        <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                        <ul>
                                            <li><a href="#">contact</a></li>
                                            <li>
                                                <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                                <div class="submenu">
                                                    <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                    <ul>
                                                        <li><a href="#">company</a></li>
                                                        <li>
                                                            <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                            <div class="submenu">
                                                                <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                <ul>
                                                                    <li><a href="#">company</a></li>
                                                                    <li>
                                                                        <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                                        <div class="submenu">
                                                                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                            <ul>
                                                                                <li><a href="#">company</a></li>
                                                                                <li><a href="#">contact</a> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="#">contact</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">contact</a></li>
                            </ul>
                        </div>
                    </li>
                    <li> <a href="#">ABOUT</a></li>
                    <li>
                        <div class="li-parent-div li-parentOne-div"><a href="#">CONTACT</a><span class="icon-sub"></span></div>
                        <div class="submenu">
                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                            <ul>
                                <li>
                                    <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                    <div class="submenu">
                                        <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                        <ul>
                                            <li><a href="#">contact</a></li>
                                            <li>
                                                <div class="li-parent-div"><a href="#">company</a><span class="icon-sub"></span></div>
                                                <div class="submenu">
                                                    <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                    <ul >
                                                        <li><a href="#">company</a></li>
                                                        <li>
                                                            <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                            <div class="submenu">
                                                                <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                <ul >
                                                                    <li><a href="#">company</a></li>
                                                                    <li>
                                                                        <div class="li-parent-div"><a href="#">contact</a><span class="icon-sub"></span></div>
                                                                        <div class="submenu">
                                                                            <div class="back-div"><i class="i-back"></i><span>BACK</span></div>
                                                                            <ul >
                                                                                <li><a href="#">company</a></li>
                                                                                <li><a href="#">contact</a> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="#">contact</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">contact</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <!--{Menu_wap_E}-->
            </div>
        </div>
    </header>
    <section class="container-w body-tallHeader"><!--{bannerClass->body-tallHeader}-->
        <div class="banner w-bannerbg">
            <div class="row">
                <div class="col">
                    <!--{Banner_web_S}-->
                    <div class="w-banner">
                        <div class="w-title">
                            <h2>click to add headline</h2>
                        </div>
                        <div class="w-text">
                            <h5>单击此处添加说明。Lorem ipsum dolor sit amet,consectetur adipiscing elit.</h5>
                        </div>
                        <div class="w-button">
                            <div class="btn-default-w"> <span class="btn-inner">BUTTON TEXT</span> </div>
                        </div>
                    </div>
                     <!--{Banner_web_E}-->
                </div>
            </div>
        </div>
    </section>
