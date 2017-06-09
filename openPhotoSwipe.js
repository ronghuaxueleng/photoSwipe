/**
 * Created by yope on 2016/11/1.
 * version:1.0.0
 *
 * 图片放大浏览工具
 * 快速入手使用说明
 *
 * 1.引入如下6个文件 ：地址仅供参考
 *  <link rel="stylesheet" href="../lib/photoSwipe/photoswipe.css">
 *  <link rel="stylesheet" href="../lib/photoSwipe/default-skin/default-skin.css">
 *
 *  <script type="text/javascript" src="../lib/jquery/dist/jquery.min.js"></script>
 *  <script type="text/javascript" src="../lib/photoSwipe/photoswipe.js"></script>
 *  <script type="text/javascript" src="../lib/photoSwipe/photoswipe-ui-default.js"></script>
 *  <script type="text/javascript" src="../sslib/component/jquery.photoSwipe.js"></script>
 *
 * 2.添加class
 *
 * 只需按照规定在img添加class  （如：class="enlarge-img"）
 *
 * 3.初始化
 * $.photoSwipeInit(); 或者 $.photoSwipeInit('enlarge-img');
 *
 */

/**
 * @param needEnlargeClassName 可选参数 需要放大的img添加的class 的名称
 */
function photoSwipeInit(needEnlargeClassName) {
    if (!needEnlargeClassName) {
        return false;
    }
    var openPhotoSwipe = function (items, index) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
            index: Number(index),
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
            allowUserZoom: false
        };
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    // 事件绑定
    var addEvent = function (element, eType, handle, bol) {
        if(element.addEventListener){           //如果支持addEventListener
            element.addEventListener(eType, handle, bol);
        }else if(element.attachEvent){          //如果支持attachEvent
            element.attachEvent("on"+eType, handle);
        }else{                                  //否则使用兼容的onclick绑定
            element["on"+eType] = handle;
        }
    }
    var getImgNaturalDimensions = function (img, callback) {
        var image = new Image();
        image.src = img.src;
        image.onload = function() {
            callback(image.width, image.height);
        }
    }
    var items = [];
    document.querySelectorAll(needEnlargeClassName).forEach(function(img, i){
        img.setAttribute("enlarge-img-index", i);
        getImgNaturalDimensions(img, function (width, height) {
            items.push({
                src: img.getAttribute("src"),
                w: width,
                h: height
            });
        });
        addEvent(img, 'click', function () {
            var index = this.getAttribute("enlarge-img-index");
            openPhotoSwipe(items, index);
        }, false);
    });

    if (!document.getElementById('photo-swipe-html')) {
        var photoSwipeHtmlDiv = document.createElement('div');
        photoSwipeHtmlDiv.id = 'photo-swipe-html';
        photoSwipeHtmlDiv.className = 'pswp photo-swipe-html';
        photoSwipeHtmlDiv.setAttribute('tabindex', '-1');
        photoSwipeHtmlDiv.setAttribute('role', 'dialog');
        photoSwipeHtmlDiv.setAttribute('aria-hidden', 'true');
        photoSwipeHtmlDiv.innerHTML = '<div class="pswp__bg"></div>'
        + '<div class="pswp__scroll-wrap">'
        + '<div class="pswp__container">'
        + '<div class="pswp__item"></div>'
        + '<div class="pswp__item"></div>'
        + '<div class="pswp__item"></div>'
        + '</div>'
        + '<div class="pswp__ui pswp__ui--hidden">'
        + '<div class="pswp__top-bar">'
        + '<div class="pswp__counter"></div>'
        + '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'
        + '<div class="pswp__preloader">'
        + '<div class="pswp__preloader__icn">'
        + '<div class="pswp__preloader__cut">'
        + '<div class="pswp__preloader__donut"></div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'
        + '<div class="pswp__share-tooltip"></div>'
        + '</div>'
        + '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">'
        + '</button>'
        + '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">'
        + '</button>'
        + '<div class="pswp__caption">'
        + '<div class="pswp__caption__center"></div>'
        + '</div>'
        + '</div>'
        + '</div>';
        document.body.appendChild(photoSwipeHtmlDiv);
    }
};