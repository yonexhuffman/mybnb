/**
 * Main theme logic
 *
 * @author Seventhqueen
 */

var SQ = SQ || {};
(function ($) {

    // USE STRICT
    "use strict";

	SQ.responsiveClassesAdded = false;

    function imageResize() {
        var photoContainer = $(".image-wrapper");

        photoContainer.each(function () {
            var wrapperWidth = $(this).width();
            var wrapperHeight = $(this).height();
            var wrapperRatio = wrapperWidth / wrapperHeight;

            var imageWidth = $(this).find(".image-sq").width();
            var imageHeight = $(this).find(".image-sq").height();
            var imageRatio = imageWidth / imageHeight;

            if (wrapperWidth === 0 || wrapperHeight === 0) {
                return false;
            }

            $(this).css("opacity", "0");

            if (imageRatio <= wrapperRatio) {
                var newImageHeight = wrapperWidth / imageRatio;
                newImageHeight = parseInt(newImageHeight, 10);
                var semiImageHeight = parseInt((newImageHeight / 2), 10);

                $(this).find(".image-sq").css({
                    width: wrapperWidth,
                    height: newImageHeight,
                    marginTop: -semiImageHeight,
                    marginLeft: 0,
                    top: "50%",
                    left: "0"
                });

                $(this).css("opacity", "1");

            } else {

                var newImageWidth = wrapperHeight * imageRatio;
                newImageWidth = parseInt(newImageWidth, 10);
                var semiImageWidth = parseInt((newImageWidth / 2), 10);


                $(this).find(".image-sq").css({
                    width: newImageWidth,
                    height: wrapperHeight,
                    marginTop: 0,
                    marginLeft: -semiImageWidth,
                    top: "0",
                    left: "50%"
                });
                $(this).css("opacity", "1");
            }
        });
    }

    SQ.isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (SQ.isMobile.Android() || SQ.isMobile.BlackBerry() || SQ.isMobile.iOS() || SQ.isMobile.Opera() || SQ.isMobile.Windows());
        }
    };

    SQ.main = {
        /* variables for Header Builder */
        prevScroll: 0,
        middleHeaderSectionSlideUpOffset: 100,
        stickyElement: $(".sticky-element"),
        stickyElementHeight:[],
        stickyElementResponisve:[],
        windowPosition:0,
        generatedSlickGallery: [],

        /* checked */
        init: function () {
            SQ.main.responsiveClasses();
            SQ.main.stickyElementInit();
            SQ.main.stickyElementResponsive();

            $body.on("sticky-init-done", SQ.main.stickyElementScroll);

            /* Register events */

            /* on document click */
            $(document).on("click touchstart", this.documentOnClick);

            /* Dropdown function for select */
            $('.dropdown').dropdown({
                preserveHTML: false,
                onChange: function (value, text, $this) {
                    if (text) {
                        $this.closest(".dropdown").addClass("valid");
                    } else {
                        $this.closest(".dropdown").removeClass("valid");
                    }
                }
            });

	        $(".modal-ui-trigger").on('click', function() {
		        SQ.main.modalUItrigger(this);
		        return false;
	        });
				
			/* Slick next / prev */
			
			$('.sq-next-button').click(function() {
                $('.sq-slick').slick("slickNext");
             });
			
			$('.sq-prev-button').click(function() {
                $('.sq-slick').slick("slickPrev");
             });

            /* Accordion function */
            $('.ui.accordion').accordion({
               /* exclusive: false,*/
                selector: {
                    accordion: '.accordion',
                    title: '.title',
                    trigger: '.accordion-trigger',
                    content: '.content'
                }
            });

            /* hero search animation in docs */
            $(".force-animation").on('click', function(){

                var $forceThis = $(this).nextAll("[class^=h-search-]").first();

                $forceThis.hide().removeClass("animate-sq");

                setTimeout(function(){
                  $forceThis.show().addClass("animate-sq");
                  return false;
                }, 1);

                return false;
            });


            /* photo upload selected */
            $(".cover-photo-sq").on('click', function(){

                if($(this).closest(".photo-upload-item").hasClass("selected")) {
                    $(this).closest(".photo-upload-item").removeClass("selected");
                } else {
                    $(".photo-upload-item").removeClass("selected");
                    $(this).closest(".photo-upload-item").addClass("selected");
                }

                return false;
            });

            /* Sniff out Firefox, for checkbox styling */
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                jQuery('html').addClass('firefox');
            }
            if (SQ.isMobile.any()) {
                $body.addClass('device-touch');
            }

            /* Properties List triggers */
            $(".switch-view-controller .item").on('click', function (e) {
            	e.preventDefault();

                var trigger = $(this);
                var thisId = $(this).attr("id");
                var thisParent = $(this).parents(".half-layout");

                $(".switch-view-controller .item").removeClass("active");
                trigger.toggleClass("active");

                if (thisId === "only-list-trigger") {
                    thisParent.addClass("only-list");
                    thisParent.removeClass("only-map");

                } else if (thisId === "only-map-trigger") {
                    thisParent.addClass("only-map");
                    thisParent.removeClass("only-list");

                } else if (thisId === "both-trigger") {
                    thisParent.removeClass("only-map");
                    thisParent.removeClass("only-list");
                }

	            try {
		            if (typeof(Event) === 'function') {
			            window.dispatchEvent(new Event('resize'));
		            } else {
			            var evt =  window.document.createEvent('UIEvents');
			            evt.initUIEvent('resize', true, false, window, 0);
			            window.dispatchEvent(evt);
		            }
	            } catch(e) {}

                return false;

            });


            /* Datepicker */
            $('#examplecalendar').calendar({
              type: 'date',
              className: {
                 prevIcon: "icon icon-arrow-left-122",
                 nextIcon: "icon icon-arrow-right-122"
              }
            });


            $('#rangestart').calendar({
                type: 'date',
                endCalendar: $('#rangeend'),
                //inline: true,
                className: {
                    prevIcon: "icon icon-arrow-left-122",
                    nextIcon: "icon icon-arrow-right-122"
                }
            });

            $('#rangeend').calendar({
                type: 'date',
                startCalendar: $('#rangestart'),
                //inline: true,
                className: {
                    prevIcon: "icon icon-arrow-left-122",
                    nextIcon: "icon icon-arrow-right-122"
                }
            });


            $('#sticky-box-rangestart').calendar({
                type: 'date',
                endCalendar: $('#sticky-box-rangeend'),
                className: {
                    prevIcon: "icon icon-arrow-left-122",
                    nextIcon: "icon icon-arrow-right-122"
                },
                monthFirst: false,
                formatter: {
                    date: function (date, settings) {
                        if (!date) return '';
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();

                        if (month < 9) {
                            return day + ' - 0' + month;
                        } else {
                            return day + ' - ' + month;
                        }
                    }
                }
            });

            $('#sticky-box-rangeend').calendar({
                type: 'date',
                startCalendar: $('#sticky-box-rangestart'),
                className: {
                    prevIcon: "icon icon-arrow-left-122",
                    nextIcon: "icon icon-arrow-right-122"
                },
                monthFirst: false,
                formatter: {
                    date: function (date, settings) {
                        if (!date) return '';
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        if (month < 9) {
                            return day + ' - 0' + month;
                        } else {
                            return day + ' - ' + month;
                        }

                    }
                }
            });


            /* ? - se face focus pe containerul mare din sticky box */
            $(".inline-check-in input[type='text']").focus(function () {
                $(".inline-check-in").addClass("focused");
            }).blur(function () {
                $(".inline-check-in").removeClass("focused");
            });

            /* Price Range Trigger - only tablet */
            $("#price-range-trigger").on('click', function () {
                $(this).toggleClass("active");
                $(".price-range-slider").toggleClass("visible");

                return false;
            });

            $('.return-car-to-location').on('click', function() {
				$(this).closest('.search-item').prev('.search-return-location').toggleClass('disabled');
            });

            /* Price Range Slider */
            var startSlider = document.getElementById('price-range-slider');

            if (startSlider) {
                noUiSlider.create(startSlider, {
                    start: [150, 750],
                    tooltips: true,
                    format: wNumb({
                        decimals: 3,
                        thousand: '.',
                        postfix: '$'
                    }),
                    connect: true,
                    range: {
                        'min': [0],
                        'max': [1000]
                    }
                });
            }

            /* Slick */

            /* Slick Carousel  */
            SQ.main.slickCarousel();
            setTimeout(function(){ 
                    $(".sq-slick").css("opacity", "1");
			}, 400);

            /* Slick Gallery */

            $('.slick-img').on('click', function(e) {
                e.preventDefault();
                SQ.main.slickGallery(this);

                var _this = $(this);
                var _gallery = $(this).attr("data-gallery");

                $('.slider-thumbs-' + _gallery).slick("slickGoTo", parseInt(_this.attr('slick-target'), 10));

             });

            $(document).on("mouseenter", ".slider-thumbs", function() {
                $(this).closest(".slick-gallery").addClass("hover-sq");
            }).on("mouseleave", ".slider-thumbs", function(){
                $(this).closest(".slick-gallery").removeClass("hover-sq");
            });

        },
        onLoad: function () {

            /*Photo Cover resize */
            imageResize();
        },
        onResize: function () {
            var body = $('body');

            imageResize();

            SQ.main.stickyElementInit();
            SQ.main.stickyElementResponsive();
            SQ.main.stickyElementScroll();

        },
        onClassicResize: function() {

        },
        onScroll: function () {
            /* Header Scroll Function */
            this.stickyElementScroll();
        },

        responsiveClasses: function () {
	        if ( SQ.responsiveClassesAdded === true ) {
		        return;
	        }
	        var jRes = jRespond([
                {
                    label: 'smallest',
                    enter: 0,
                    exit: 479
                }, {
                    label: 'handheld',
                    enter: 480,
                    exit: 767
                }, {
                    label: 'tablet',
                    enter: 768,
                    exit: 991
                }, {
                    label: 'laptop',
                    enter: 992,
                    exit: 1199
                }, {
                    label: 'desktop',
                    enter: 1200,
                    exit: 10000
                }
            ]);
            jRes.addFunc([
                {
                    breakpoint: 'desktop',
                    enter: function () {
                        $body.addClass('device-lg');
                    },
                    exit: function () {
                        $body.removeClass('device-lg');
                    }
                }, {
                    breakpoint: 'laptop',
                    enter: function () {
                        $body.addClass('device-md');
                    },
                    exit: function () {
                        $body.removeClass('device-md');
                    }
                }, {
                    breakpoint: 'tablet',
                    enter: function () {
                        $body.addClass('device-sm');
                    },
                    exit: function () {
                        $body.removeClass('device-sm');
                    }
                }, {
                    breakpoint: 'handheld',
                    enter: function () {
                        $body.addClass('device-xs');
                    },
                    exit: function () {
                        $body.removeClass('device-xs');
                    }
                }, {
                    breakpoint: 'smallest',
                    enter: function () {
                        $body.addClass('device-xxs');
                    },
                    exit: function () {
                        $body.removeClass('device-xxs');
                    }
                }
            ]);
        },

        documentOnClick: function(e) {
        },

        modalUItrigger: function(self) {

            var triggerFor = $(self).attr("data-trigger-for");

            if($(self).hasClass("slick-img")) {
               triggerFor = $(self).attr("data-gallery");
            }

            var modalOpen = $("[data-for=" + triggerFor + "]");

            $(modalOpen).modal({
                    //detachable: false,
                    selector: {
                        close: '.close-modal'
                    },
                    transition: "fade",
                    duration: 200,
                    onShow: function () {

                        if ($(this).hasClass("full") && !$(this).hasClass("slick-gallery")) {
                            $(this).parent(".dimmer").addClass("full");
                        }
                    }
                }).modal("show");

            return false;
        },

        stickyElementInit: function () {

            SQ.main.stickyElement.each(function( index ){

                this.prevScroll = SQ.main.prevScroll;
                $(this).css('height','auto');
                SQ.main.stickyElementHeight[index] = $(this).height();

            });

            $body.trigger("sticky-init-done");
        },

        stickyElementResponsive: function() {

            SQ.main.stickyElement.each(function( index ){

                if($(this).hasClass("sticky-mobile") && ($("body").hasClass("device-xs") || $("body").hasClass("device-xxs"))) {
                    SQ.main.stickyElementResponsive[index] = true;
                }
                if($(this).hasClass("sticky-tablet") && $("body").hasClass("device-sm")) {
                    SQ.main.stickyElementResponsive[index] = true;
                }
                if($(this).hasClass("sticky-desktop") && $("body").hasClass("device-md")) {
                    SQ.main.stickyElementResponsive[index] = true;
                }
                if($(this).hasClass("sticky-large-desktop") && $("body").hasClass("device-lg")) {
                    SQ.main.stickyElementResponsive[index] = true;
                }
                if($(this).hasClass("sticky-all")) {
                    SQ.main.stickyElementResponsive[index] = true;
                }

            });

        },

        stickyElementScroll: function () {

            var scrollTop = $window.scrollTop();

            SQ.main.stickyElement.each(function( index ){

                var topStickyElement = $(this).offset().top;
                var elementHeight = $(this).height();

                if(scrollTop > this.prevScroll) {

                    if(scrollTop > topStickyElement) {

                        $(this).addClass("is-sticky");

                        if(SQ.main.stickyElementResponsive[index] === true) {
                           $(this).css("height", SQ.main.stickyElementHeight[index]);
                        }

                    } else if($(this).hasClass("under-ths") && $(this).hasClass("ths-is-sticky") && !$(this).hasClass("ths-is-slide-up") && scrollTop > topStickyElement - $(".ths").children(".header-content").height()) {

                        $(this).addClass("is-sticky");

                        if(SQ.main.stickyElementResponsive[index] === true) {
                           $(this).css("height", SQ.main.stickyElementHeight[index]);
                        }

                    } else if($(this).hasClass("under-ths") && $(this).hasClass("ths-is-sticky") && $(this).hasClass("ths-is-slide-up") && scrollTop > $(this).offset().top + SQ.main.middleHeaderSectionSlideUpOffset) {

                        $(this).addClass("is-sticky");

                        if(SQ.main.stickyElementResponsive[index] === true) {
                           $(this).css("height", SQ.main.stickyElementHeight[index]);
                        }

                    }

                    if(scrollTop > topStickyElement + elementHeight && $(this).hasClass("after-element")) {
                        $(this).addClass("is-after");
                    }


                } else if(scrollTop < this.prevScroll && scrollTop >= 0)  {

                   if(scrollTop < topStickyElement && !$(this).hasClass("under-ths")) {

                       $(this).removeClass("is-sticky");

                   } else if($(this).hasClass("under-ths") && $(this).hasClass("ths-is-sticky") && !$(this).hasClass("ths-is-slide-up") && scrollTop < topStickyElement - $(".ths").children(".header-content").height()) {

                       $(this).removeClass("is-sticky");

                   } else if ($(this).hasClass("under-ths") && $(this).hasClass("ths-is-sticky") && $(this).hasClass("ths-is-slide-up") && scrollTop < $(this).offset().top + SQ.main.middleHeaderSectionSlideUpOffset) {

                       $(this).removeClass("is-sticky");

                   }

                    if(scrollTop < topStickyElement + elementHeight && $(this).hasClass("after-element")) {
                        $(this).removeClass("is-after");
                    }

                }

                this.prevScroll = scrollTop;

            });
        },

        slickCarousel: function() {

            $(".sq-slick").each(function() {

                var $this = $(this);
                var $responsive = [];
                var breakpoints = ['small-mobile', 'mobile', 'tablet', 'desktop'];
                var breakpointsValues = {
                    'small-mobile' : '320',
                    'mobile' : '768',
                    'tablet' : '992',
                    'desktop': '1200'
                };

                $.each(breakpoints, function(index, value) {

                    var $settings = {};

                    if ( $this.attr('data-'+ value +'-infinite') ) {
                        $settings.infinite = $this.data(value +'-infinite');
                    }
                    if ( $this.attr('data-'+ value +'-show-slides') ) {
                        $settings.slidesToShow = $this.data(value +'-show-slides');
                    }
                    if ( $this.attr('data-'+ value +'-scroll-slides') ) {
                        $settings.slidesToScroll = $this.data(value +'-scroll-slides');
                    }
                    if ( $this.attr('data-'+ value +'-dots') ) {
                        $settings.dots = $this.data(value +'-dots');
                    }
                    if ( $this.attr('data-'+ value +'-arrows') ) {
                        $settings.arrows = $this.data(value +'-arrows');
                    }
                    if ( $this.attr('data-'+ value +'-fade') ) {
                        $settings.fade = $this.data(value +'-fade');
                    }
                    if ( $this.attr('data-'+ value +'-center-mode') ) {
                        $settings.centerMode = $this.data(value +'-center-mode');
                    }
                    if ( $this.attr('data-'+ value +'-center-padding') ) {
                        $settings.centerPadding = $this.data(value +'-center-padding');
                    }
                    if ( $this.attr('data-'+ value +'-variable-width') ) {
                        $settings.variableWidth = $this.data(value +'-variable-width');
                    }
                    if ( $this.attr('data-'+ value +'-speed') ) {
                        $settings.speed = $this.data(value +'-speed');
                    }
                    if ( $this.attr('data-'+ value +'-ease') ) {
                        $settings.ease = $this.data(value +'-ease');
                    }


                    if (! jQuery.isEmptyObject( $settings )) {
                        var data = {
                            breakpoint: breakpointsValues[value],
                            settings: $settings
                        };

                        $responsive.push(data);
                    }

                });

                var $infinite = true,
                    $slidesToShow = 1,
                    $slidesToScroll = 1,
                    $dots = false,
                    $arrows = true,
                    $fade = false,
                    $speed = 300,
                    $ease = "ease",
                    $centerMode = false,
                    $centerPadding = "0px",
                    $variableWidth = false;

                if ( $(this).attr('data-infinite') ) {
                    $infinite = $(this).data('infinite');
                }
                if ( $(this).attr('data-show-slides') ) {
                    $slidesToShow = $(this).data('show-slides');
                }
                if ( $(this).attr('data-scroll-slides') ) {
                    $slidesToScroll = $(this).data('scroll-slides');
                }
                if ( $(this).attr('data-dots') ) {
                    $dots = $(this).data('dots');
                }
                if ( $(this).attr('data-arrows') ) {
                    $arrows = $(this).data('arrows');
                }
                if ( $(this).attr('data-fade') ) {
                    $fade = $(this).data('fade');
                }
                if ( $(this).attr('data-speed') ) {
                    $speed = $(this).data('speed');
                }
                if ( $(this).attr('data-ease') ) {
                    $ease = $(this).data('ease');
                }
                if ( $(this).attr('data-center-mode') ) {
                    $centerMode = $(this).data('center-mode');
                }
                if ( $(this).attr('data-center-padding') ) {
                    $centerPadding = $(this).data('center-padding');
                }
                if ( $(this).attr('data-variable-width') ) {
                    $variableWidth = $(this).data('variable-width');
                }

               $(this).slick({
                   infinite: $infinite,
                   slidesToShow: $slidesToShow,
                   slidesToScroll: $slidesToScroll,
                   dots: $dots,
                   arrows: $arrows,
                   fade: $fade,
                   responsive: $responsive,
                   speed: $speed,
                   cssEase: $ease,
                   centerMode: $centerMode,
                   centerPadding: $centerPadding,
                   variableWidth: $variableWidth
               });
                
                
            });
        },

        slickGallery: function(self) {
            var counter = 0;

            var gallery = $(self).attr("data-gallery");
            var total = $('[data-gallery="' + gallery + '"]').length;

            var preview = '';
            var thumbs = '';

            if(SQ.main.generatedSlickGallery.indexOf(gallery) === -1) {

                $('.slick-img[data-gallery="' + gallery + '"]').each(function() {
                  $(this).attr('slick-target', counter);
                  counter++;

                  preview += '<div>' +
                    '<p class="caption-gallery"><span>' + counter + '/' + total + '</span> - ' + $(this).attr("data-caption") + '</p><div><img src="' + $(this).attr('src') + '"></div>' +
                    '</div>';

                  thumbs += '<div>' +
                    '<img src="' + $(this).attr('src') + '">' +
                    '</div>';
                });

                $("body").append('<div class="slick-gallery ui modal full" data-for="' + gallery + '">' +
                   '<div class="ui container">' +
                   '<div class="row">' +
                   '<div class="ui column">'+
                   '<i class="icon icon-close close-modal"></i>' +
                   '<div class="slider-preview slider-preview-' + gallery + '">' + preview + '</div>' +
                   '<div class="slider-thumbs slider-thumbs-' + gallery + '">' + thumbs + '</div>' +
                    '</div></div></div></div>');
            }

            /* open modal */
            SQ.main.modalUItrigger(self);

            if(SQ.main.generatedSlickGallery.indexOf(gallery) === -1) {

                $('.slider-preview-' + gallery).slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: true,
                  fade: true,
                  infinite:true,
                  asNavFor: '.slider-thumbs-' + gallery,
                  responsive: [
                      {
                      breakpoint: 992,
                      settings: {
                        arrows: false
                      }
                    }
                  ]
                });

                $('.slider-thumbs-' + gallery).slick({
                  slidesToShow: 7,
                  slidesToScroll: 1,
                  asNavFor: '.slider-preview-' + gallery,
                  dots: false,
                  arrows: false,
                  //centerMode: true,
                  focusOnSelect: true,
                  variableWidth: true,
                  infinite:true,
                });

                SQ.main.generatedSlickGallery.push(gallery);
            }

        }
    };

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper');

    $(document).ready(SQ.main.init);
    $window.on('load', SQ.main.onLoad);
    $window.on('debouncedresize', SQ.main.onResize);

    $window.on( 'resize', SQ.main.onClassicResize );

    $(window).on('scroll', function () {
        SQ.main.onScroll();
    });

})(jQuery);
