function getWebTitle(num, json) {
    if (!json)
        json = {'name': '标题名称', 'info': 'TITLE', 'link': ''};
    if ($.isEmpty(json['name']))
        json['name'] = '标题名称';
    var html = '<div class="w-edit-com w-title w-title' + num + '">';
    var fun = eval('webTitle' + num);
    var innerHtml = fun.call(this, json);
    innerHtml = $(innerHtml);
    innerHtml.find('[data-type="title"]').text(json['name']);
    innerHtml.find('[data-type="subtitle"]').text(json['info']);
    html += innerHtml.prop('outerHTML');
    html += '</div>';
    return html;

}
function webTitle1(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title" ></h2><span data-type="subtitle"></span><div class="simpline"></div></div></div></div>';
}

function webTitle2(json) {
    var titleHtml = '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span>';
    titleHtml += '<a class="more" href="#" data-type="link" style="' + ($.isEmpty(json['link']) ? "display:none" : "") + '"><span>更多&gt;&gt;</span></a>';
    titleHtml += '</div></div></div>';
    return titleHtml;
}

function webTitle3(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span></div></div></div>';
}

function webTitle4(json) {
    var titleHtml = '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span>';
    titleHtml += '<a class="more" href="#" data-type="link" style="' + ($.isEmpty(json['link']) ? "display:none" : "") + '"><span>更多&gt;&gt;</span></a>';
    titleHtml += '</div></div></div>';
    return titleHtml;
}
function webTitle5(json) {
    var titleHtml = '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span>';
    titleHtml += '<a class="more" href="#" data-type="link" style="' + ($.isEmpty(json['link']) ? "display:none" : "") + '"><span>更多&gt;&gt;</span></a>';
    titleHtml += '</div></div></div>';
    return titleHtml;
}
function webTitle6(json) {
    return '<div class="w-title-in"><div class="title-h-in"><div class="tith"><h2 data-type="title"></h2><div class="tit_left"></div><div class="tit_right"></div></div><span data-type="subtitle"></span></div></div>';
}
function webTitle7(json) {
    var titleHtml = '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span>';
    titleHtml += '<a class="more" href="#" data-type="link" style="' + ($.isEmpty(json['link']) ? "display:none" : "") + '"><span>更多&gt;&gt;</span></a>';
    titleHtml += '</div></div></div>';
    return titleHtml;
}
function webTitle8(json) {
    var titleHtml = '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2><em data-type="title"></em><span data-type="subtitle"></span></h2>';
    titleHtml += '<a class="more" href="#" data-type="link" style="' + ($.isEmpty(json['link']) ? "display:none" : "") + '"><span>更多&gt;&gt;</span></a>';
    titleHtml += '</div></div></div>';
    return titleHtml;
}
function webTitle9(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span></div></div></div>';
}

function webTitle10(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span></div></div></div>';
}
function webTitle11(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span></div></div></div>';
}
function webTitle12(json) {
    return '<div class="w-title-in"><div class="w-title-inner"><div class="title-h-in"><h2 data-type="title"></h2><span data-type="subtitle"></span></div></div></div>';
}