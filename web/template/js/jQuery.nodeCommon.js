$.extend({
    AutoImageSize: function (item) {
        var imgWidth = item.width;
        var imgHeight = item.height;
        item = $(item);
        var parent = item.parent();
        var boxH = parent.height();
        var boxW = parent.width();
        if (imgWidth > boxW) {
            imgHeight = imgHeight * (boxW / imgWidth);
            imgWidth = boxW;
        }
        if (imgHeight > boxH) {
            imgWidth = imgWidth * (boxH / imgHeight);
            imgHeight = boxH;
        }
        item.attr("style","");
        item.css({'width': imgWidth + 'px', 'height': imgHeight + 'px', 'left': (boxW - imgWidth) / 2 + "px", 'top': (boxH - imgHeight) / 2 + "px"});
    }
}); 