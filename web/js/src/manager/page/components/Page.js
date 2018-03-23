import React, { Component, PropTypes } from 'react';

export default class Page extends Component {

  render() {
    return (
    <div className="pages-setting-b">
        <div className="pages-setting-left">
            <div className="pages-setting-left-top"> <span className="pages-tt">Pages</span> <a className="a-btn-glyphicon a-btn-green" href="javascript:return false;"    onclick="javascript:$(function(){$('.pages-add-b').show();}); "> <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>Add</a>
                <div className="pages-add-b">
                    <div className="pop-down-arrow-b"></div>
                    <div className="pages-add-list-b">
                        <ul>
                            <li><a href="#"><i className="icon-other icon-standtardPage"></i>Standard Page</a></li>
                            <li><a href="#"><i className="icon-other icon-productPage"></i>Product Page</a></li>
                            <li><a href="#"><i className="icon-other icon-storePage"></i>Store Page</a></li>
                            <li><a href="#"><i className="icon-other icon-blogPage"></i>Blog Page</a></li>
                            <li><a href="#"><i className="icon-other icon-externalPage"></i>External Link</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="pagesnav-manage-box">
                <div className="pagesnav-manage scroll-div">
                    <div className="pagesnav-manage-in">
                        <div className="pagesnav">
                            <ul>
                                <li>
                                    <div className="active"><a href="webEdit-pages.html">standard page</a></div>
                                    <ul>
                                        <li>
                                            <div><a>pages2</a></div>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div><a href="productPage.html">product page</a></div>
                                </li>
                                <li>
                                    <div><a href="storePage.html">store page</a></div>
                                </li>
                                <li>
                                    <div><a href="blogPage.html">Blog page</a></div>
                                </li>
                                <li>
                                    <div><a href="externalLink.html">External link</a></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pages-setting-content">
            <div className="slide-body-in pages-setting-content-in">
                <div className="slide-body-hasfoot" id="standardpage">
                    <div className="title-body">
                        <h2>Edit Page</h2>
                    </div>
                    <div className="standard-page">
                        <p className="color-burn">Page Name</p>
                        <div>
                            <input type="text" className="input-text-b input-text-w380" placeholder="Untitled"/>
                        </div>
                        <p>
                            <label className="checkbox-new checkbox-gray">
                            <label htmlFor="hide-page"></label>
                            <input className="checkboxnew" type="checkbox" data-role="none" id="hide-page" />
                            
                            <span>Hide page in navigation</span>
                            </label>
                        </p>
                        <p className="color-burn mt30">Header Type</p>
                        <div className="img-style-list">
                            <ul>
                                <li>
                                    <div className="header-type-img tall-header"> </div>
                                    <p>Tall header</p>
                                </li>
                                <li className="selected">
                                    <div className="header-type-img short-header"> </div>
                                    <p>Short header</p>
                                </li>
                                <li>
                                    <div className="header-type-img no-header"> </div>
                                    <p>No header</p>
                                </li>
                                <li>
                                    <div className="header-type-img title-page"> </div>
                                    <p>Title Page</p>
                                </li>
                            </ul>
                        </div>
                        <div className="visibility mt15" style={{display:'none'}}> <span className="color-burn">Visibility</span><i className="visibiity-help"></i>
                            <div className="pop-notice visibiity-help-notice"  style={{left:'120px', top:'-10px'}}> Visibility settings allow you to restrict access to pages on you site.
                                <div className="pop-notice-left"></div>
                            </div>
                            
                        </div>
                        <div className="div-select-b clearfix" style={{display:'none'}}>
                            <div className="select-box">
                                <div className="select-dl">
                                    <div className="select-dt">
                                        <div className="selected">Public</div>
                                        <div className="select-icon"></div>
                                    </div>
                                    <div className="select-option">
                                        <div><span>Public</span></div>
                                        <div><span>Anyone with the site password (Upgrade Required)</span></div>
                                        <div><span>Specific Members or Groups (Upgrade Required)</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="visibility mt15"> <span className="color-burn">Visibility</span><i className="visibiity-help"></i>
                            <div className="pop-notice visibiity-help-notice"  style={{left:'120px', top:'-10px'}}>Visibility settings allow you to restrict access to pages on you site.
                                <div className="pop-notice-left"></div>
                            </div>
                        </div>
                        <div className="div-select-b clearfix">
                            <div className="select-box">
                                <div className="select-dl">
                                    <div className="select-dt">
                                        <div className="selected">Public</div>
                                        <div className="select-icon"></div>
                                    </div>
                                    <div className="select-option">
                                        <div><span>Public</span></div>
                                        <div><span>Anyone with the site password</span></div>
                                        <div><span>Specific Members or Groups</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mem-group-set">
                            <dl className="dl-dd175 clearfix">
                                <dd className="dd1">
                                    <label>Select Members</label>
                                </dd>
                                <dd className="dd2">
                                    <div className="select-box">
                                        <div className="select-dl">
                                            <div className="select-dt">
                                                <div className="selected"></div>
                                                <div className="select-icon"></div>
                                            </div>
                                            <div className="select-option">
                                                <div><span>1111111</span></div>
                                                <div><span>2222222222222222</span></div>
                                                <div><span>3333333333333333</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                            <dl className="dl-dd175 clearfix">
                                <dd className="dd1">
                                    <label>Select Groups</label>
                                </dd>
                                <dd className="dd2">
                                    <div className="select-box">
                                        <div className="select-dl">
                                            <div className="select-dt">
                                                <div className="selected"></div>
                                                <div className="select-icon"></div>
                                            </div>
                                            <div className="select-option">
                                                <div><span>1111111</span></div>
                                                <div><span>2222222222222222</span></div>
                                                <div><span>3333333333333333</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                            <p>
                                <label className="checkbox-new checkbox-gray">
                                <label htmlFor="Checkshow1"></label>
                                <input className="checkboxnew" type="checkbox" data-role="none" id="Checkshow1" />
                                
                                <span>Anyone with <a href="#" className="slide-a-link-b">site password</a></span>
                                </label>
                            </p>
                        </div>
                        <div className="title-border hide-show-control mt30">
                            <h3>SEO<span><i className="icon-other icon-hide-show"></i></span></h3>
                        </div>
                        <div className="div-input-normal-b hide-show-control-content advanced-setting ">
                            <div className="div-input-b">
                                <label className="input-label"> Page Title<span>(to appear in the HTML title tag)</span></label>
                                <input type="text" className="input-text-b" placeholder=""/>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">Page Description</label>
                                <input type="text" className="input-text-b" placeholder=""/>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label"> Meta Keywords<span>(separate each with a comma)</span></label>
                                <input type="text" className="input-text-b" placeholder=""/>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">Footer Code</label>
                                <textarea  className="input-textarea-b" placeholder=""></textarea>
                            </div>
                            <div className="div-input-b">
                                <label className="input-label">Header Code</label>
                                <textarea  className="input-textarea-b" placeholder=""></textarea>
                            </div>
                            <p>
                                <label className="checkbox-new checkbox-gray">
                                <label htmlFor="hide"></label>
                                <input className="checkboxnew" type="checkbox" data-role="none" id="hide" />
                                
                                <span>Hide this page from search engines</span>
                                </label>
                            </p>
                        </div>
                    </div>
                    <div className="foot-fixed-b">
                        <div className="foot-save">
                            <div className="btns-b btns-right">
                                <input type="button" value="Delete" className="btn btn-nocolor-b btn-delete-hover-red-b"/>
                                <input type="button" value="Copy" className="btn btn-nocolor-b"/>
                                <input type="button" value="Cancel" className="btn btn-nocolor-b"/>
                                <input type="button" value="Save" className="btn btn-green-b"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
