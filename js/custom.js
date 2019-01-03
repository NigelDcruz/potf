(function ($) {

    var $el = {},
        _screenWidth,
        _screenHeight,
        _footerHeight;

    $(document).ready(domReady);

    function cacheDom() {
        $el.html = $('html');
        $el.body = $('body');
        $el.header = $('header');
    }

    function domReady() {
        cacheDom();
        setEvents();
        screenResize();

        // $el.html.easeScroll();

        //Custom Code start

       

        $el.header.find('.toggle-menu-button').on('click',function(){

             $el.header.find('.menu-content').toggleClass('show-menu');
             $el.header.find('.line').toggleClass('active');

        });

        $el.header.find('#main-nav li a').on('click',function(){
            console.log('clicked');
            $el.header.find('#main-nav li a').removeClass('active');
            $(this).addClass('active');
            $el.header.find('.menu-content').removeClass('show-menu');
        });

         // Toggle Menu Code
    var previousScroll = 0;

    $(window).scroll(function () {

        //Sticky Menu
        var topOffset = $(this).scrollTop();

        // when scrolling starts adds top class
        $el.header.toggleClass("top", topOffset > 100);

        $el.header.toggleClass("sticky", topOffset > 510);

        if (topOffset > previousScroll || topOffset < 250) {
            $el.header.removeClass("sticky");
        } else if (topOffset < previousScroll) {
            $el.header.addClass("sticky");
            // Additional checking so the header will not flicker
            if (topOffset > 510) {
                $el.header.addClass('sticky');
            } else {
                $el.header.removeClass('sticky');
            }
        }

        previousScroll = topOffset;
        //Sticky Menu Ends
    });


    //Smooth scrolling code
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 5
        }, 500, 'swing');
    });



    var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
    });




        //Custom Code Ends
    }

    function setEvents() {
        $(window)
            .resize(screenResize) //Get's the current height and width
            .scroll(windowScroll); //Returns the Scroll Positopn


        // var galleryViewer = ImageViewer();
        // var productViewer = ImageViewer();
        // $el.galleryItem.click(function () {
        //     var imgSrc = $(this).data('img');
        //     var imgSrcHD = $(this).data('img-hd');
        //     galleryViewer.show(imgSrc, imgSrcHD);
        // });

        // $el.productItem.click(function () {
        //     var imgSrc = this.src;
        //     productViewer.show(imgSrc, imgSrc);
        // });

    }

    function screenResize() {
        _screenWidth = $(window).width();
        _screenHeight = $(window).height();
    }

    function windowScroll() {

        console.log($(window).scrollTop()); //Scroll position

    }

    (function init() {
        //detect mobile platform
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $("body").addClass("ios-device");
        }
        if (navigator.userAgent.match(/Android/i)) {
            $("body").addClass("android-device");
        }

        //detect desktop platform
        if (navigator.appVersion.indexOf("Win") != -1) {
            $('body').addClass("win-os");
        }
        if (navigator.appVersion.indexOf("Mac") != -1) {
            $('body').addClass("mac-os");
        }

        //detect IE 10 and 11
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
            $("html").addClass("ie10");
        }

        //detect IE Edge
        if (/Edge\/\d./i.test(navigator.userAgent)) {
            $("html").addClass("ieEdge");
        }

        //Specifically for IE8 (for replacing svg with png images)
        if ($("html").hasClass("ie8")) {
            var imgPath = "./images/the_image";
            $("header .logo img").attr("src", imgPath + "logo.png");
        }

        //show ie overlay popup for incompatible browser
        if ($('html').hasClass('ie9')) {
            var message = $('<div class="no-support"> You are using outdated browser. Please <a href="https://browsehappy.com/" target="_blank">update</a> your browser or <a href="https://browsehappy.com/" target="_blank">install</a> modern browser like Google Chrome or Firefox.<div>');
            $('body').prepend(message);
        }

    })();

})(jQuery);