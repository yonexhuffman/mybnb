/**
 * Header logic
 *
 * SCRIPTS
 * requestAnimationFrame
 * Debouncedresize
 *
 * HEADER LOGIC
 *
 * @author Seventhqueen
 */


// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());

/* Debouncedresize */

(function ($) {

	var $event = $.event,
		$special,
		resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function () {
			$(this).on("resize", $special.handler);
		},
		teardown: function () {
			$(this).off("resize", $special.handler);
		},
		handler: function (event, execAsap) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function () {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply(context, args);
				};

			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}

			resizeTimeout = setTimeout(dispatch, $special.threshold);
		},
		threshold: 400
	};

})(jQuery);

var SQ = SQ || {};
(function ($) {

	// USE STRICT
	"use strict";
	
	SQ.responsiveClassesAdded = false;

	SQ.hb = {
		prevScroll: 0,
		resizeCheck: false,
		resizeCheck2: false,
		headerSection : $(".header-section"),
		topHeaderSectionResizeOffset: 100,
		middleHeaderSectionResizeOffset: 100,
		bottomHeaderSectionResizeOffset: 100,
		topHeaderSectionSlideUpOffset: 100,
		middleHeaderSectionSlideUpOffset: 100,
		bottomHeaderSectionSlideUpOffset: 100,
		headerSectionTransparentOffset: 400,
		headerScrollActive: false,
		stickyElement: $(".sticky-element"),

		init: function () {
			SQ.hb.responsiveClasses();
			SQ.hb.responsiveBurger();
			SQ.hb.headerSectionInit();

			$body.on("header-init-done", SQ.hb.headerSectionScroll);

			$body.on('flexmenu-before-resize', function() {
				$('.flexMenu').removeClass('flex-overflow');
			});

			$body.on('flexmenu-after-resize', function() {
				$('.flexMenu').addClass('flex-overflow');
			});


			/* Register events */
			
			/* on document click */
			$(document).on("click touchstart", this.documentOnClick);

			
			/* Sidemenu trigger function */
			$(".sidemenu-trigger").on('click', function() {

				if($body.hasClass("burger-sidemenu-styles")) {
					SQ.hb.sideMenuTrigger(this);
                    return false;
				}
                
				return false;
			});

			/* Sample Hamburger */
			$('.sample-hamburger').on('click', function(){
				$(this).toggleClass("active");
				return false;
			});


			/* anchor-sq */
			$(".anchor-sq").on('click', function(){
				event.preventDefault();

				$('html, body').animate({
					scrollTop: $( $.attr(this, 'href') ).offset().top - 70
				}, 800);
			});
			
			/* Modal Trigger */
			$(".modal-trigger").on('click', function() {
				if($body.hasClass("burger-modal-styles")) {
					SQ.hb.modalTrigger(this);
				}
				return false;
			});
			
			/* Floating placeholder Search */
			$(".header-section .fltp.search-sq input[type='text']").focus(function(){
				$(this).closest(".header-section").addClass("floating-search-is-valid");
			});
			$(".header-section .fltp.search-sq input[type='text']").focusout(function(){
				var inputValue = $(this).val();

				if(!inputValue) {
					$(this).closest(".header-section").removeClass("floating-search-is-valid");
				}
			});
			
			/* Dropdown function */
			$('.has-submenu').dropdown({
				on: 'click',
				//allowCategorySelection: true,
				//transition: 'fade up',
				//transition: 'fade',
				//transition: 'fade down',
				//transition: 'none',
				selector: {
					menu: '.submenu',
					item: '.item'
				},
				onShow: function(){
					$(this).children("a").addClass("active");
                    
                    if($(this).hasClass("overlay-dropdown")) {
                        if($(".overlay-sq").length) {
                            
                            setTimeout(function(){ $(".overlay-sq").addClass("active"); }, 10);
                            
                        } else {
                            $("body").append("<div class='overlay-sq'></div>");
                            setTimeout(function(){ $(".overlay-sq").addClass("active"); }, 10);
                        }
                    }
				},
				onHide: function(){
					$(this).children("a").removeClass("active");
                    if($(".overlay-sq").length) {
                        $(".overlay-sq").removeClass("active");
                    }

                    $(this).children('.submenu').transition('hide');
                    $(this).removeClass('visible').removeClass('active');

				}

			});
			
			/* Hide dropdown when header section is slide up*/
			$('.header-section').on('is-slide-up', function(){
				
				$(this).find('.has-submenu').each(function(){
					var _this = $(this);
					if(!$(this).parents(".burger-sidemenu-styles").length){
						_this.dropdown('hide');
					}
				});
				
			});

			/* Anchor Function on Scroll */
			$(".anchor-menu").scrollspy({
				offset: -60,
				animate:true
			});

			$('.anchor-menu').on('click', function(event) {

				if($(this).closest(".header-section").hasClass("is-sticky") && ($body.hasClass("device-xs") || $body.hasClass("device-xxs")) ) {

					if(!$(this).hasClass("open")) {
						$(this).addClass("open");
					} else {
						$(this).removeClass("open");
					}
				}

			});

		},

		onLoad: function () {
			SQ.hb.trimLongMenu(); // Need to be onLoad
			
		},

		onResize: function () {
			SQ.hb.trimLongMenu();
			SQ.hb.responsiveBurger();

		},

		onClassicResize: function() {

		},

		onScroll: function () {
			this.headerSectionScroll();
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

		sideMenuTrigger: function(self) {

			var triggerFor = $(self).attr("data-trigger-for");
			var dataBurger = $("[data-burger=" + triggerFor + "]");
			var thisTrigger = $(".sidemenu-trigger[data-trigger-for=" + triggerFor + "]");

			if(thisTrigger.hasClass("active")) {

				thisTrigger.removeClass("active dimmed");
				dataBurger.removeClass('sidemenu-is-visible');
				$body.removeClass("sidemenu-is-open sidemenu-left sidemenu-right");

				SQ.hb.pauseSlideUp(self);

				setTimeout(function(){
					$(".header-item").removeClass("dimmed");
				}, 500);


			} else {

				/* If another burger is opened */
				if( $body.hasClass("sidemenu-is-open")) {

					/* Close other burgers */
					$(".sidemenu-trigger").removeClass("active dimmed");
					$(".modal-trigger").removeClass("active dimmed");

					$("[data-burger]").removeClass("sidemenu-is-visible modal-is-visible");
					$(".header-section").removeClass("has-modal");

					$body.removeClass("sidemenu-is-open modal-is-open sidemenu-left sidemenu-right search-visible");

					$(".header-item").removeClass("dimmed");

					setTimeout(function(){

						/* Activate this burger */

						thisTrigger.addClass("active");

						if(dataBurger.hasClass("dimmed")) {
							thisTrigger.addClass("dimmed");
							dataBurger.closest(".header-item").addClass("dimmed");
						}

						if(dataBurger.hasClass("burger-sidemenu-styles")) {

							dataBurger.addClass("sidemenu-is-visible");

							if(dataBurger.hasClass("sidemenu-open-left")) {

								$body.addClass("sidemenu-is-open sidemenu-left");

							} else if (dataBurger.hasClass("sidemenu-open-right")){

								$body.addClass("sidemenu-is-open sidemenu-right");

							}
						}

					}, 500);


				} else {

					/* Close the other burgers (modal) */
					$(".modal-trigger").removeClass("active dimmed");
					$("[data-burger]").removeClass("modal-is-visible");
					$(".header-section").removeClass("has-modal");
					$body.removeClass("modal-is-open search-visible");


					/* Activate this burger */

					thisTrigger.addClass("active");

					if(dataBurger.hasClass("dimmed")) {
						thisTrigger.addClass("dimmed");
						dataBurger.closest(".header-item").addClass("dimmed");
					}

					dataBurger.addClass("sidemenu-is-visible");

					if(dataBurger.hasClass("sidemenu-open-left")) {

						$body.addClass("sidemenu-is-open sidemenu-left");

					} else if (dataBurger.hasClass("sidemenu-open-right")){

						$body.addClass("sidemenu-is-open sidemenu-right");

					}

				}

				SQ.hb.pauseSlideUp(self);
			}

			return false;
		},

		/* checked */
		modalTrigger: function(self) {

			var thisTriggerFor = $(self).attr("data-trigger-for");
			var dataBurger = $("[data-burger=" + thisTriggerFor + "]");
			var thisTrigger = $(".modal-trigger[data-trigger-for=" + thisTriggerFor + "]");


			if(thisTrigger.hasClass("active")) {

				thisTrigger.removeClass("active");

				$("[data-burger]").removeClass("modal-is-visible");
				$(".header-section").removeClass("has-modal");
				$body.removeClass("modal-is-open search-visible");

				$(window).scrollTop(SQ.hb.windowPosition);

			} else {

				SQ.hb.windowPosition = $(window).scrollTop();

				/* Close opened burgers*/

				$(".sidemenu-trigger").removeClass("active dimmed");
				$(".modal-trigger").removeClass("active");

				$("[data-burger]").removeClass("sidemenu-is-visible modal-is-visible");
				$(".header-section").removeClass("has-modal");
				$body.removeClass("sidemenu-is-open sidemenu-left sidemenu-right");


				/* Activate this burger */

				thisTrigger.addClass("active");

				dataBurger.addClass("modal-is-visible");
				
				$body.addClass("modal-is-open");
				dataBurger.closest(".header-section").addClass("has-modal");

				if(dataBurger.hasClass("search-visible")) {
					$body.addClass("search-visible");
				}

			}

			return false;
		},

		pauseSlideUp: function(self) {

			SQ.hb.headerSection.each(function(){

				if($body.hasClass("sidemenu-is-open") || $body.hasClass("modal-is-open")){

					if($(this).hasClass("header-slide-up")) {

						$(this).removeClass("header-slide-up").addClass("stop-header-slide-up");
					}

					if($(this).hasClass("ths-is-slide-up")) {
						$(this).removeClass("ths-is-slide-up").addClass("stop-ths-is-slide-up");
						$(".sticky-element").removeClass("ths-is-slide-up").addClass("stop-ths-is-slide-up");
					}

					if($(this).hasClass("mhs-is-slide-up")) {
						$(this).removeClass("mhs-is-slide-up").addClass("stop-mhs-is-slide-up");

						$(".sticky-element").removeClass("mhs-is-slide-up").addClass("stop-mhs-is-slide-up");
					}

					$(this).addClass("reverse");

				} else if(!$body.hasClass("sidemenu-is-open") && !$body.hasClass("modal-is-open")) {

					if($(this).hasClass("stop-header-slide-up")) {
						$(this).removeClass("stop-header-slide-up").addClass("header-slide-up");
					}

					if($(this).hasClass("stop-ths-is-slide-up")) {
						$(this).removeClass("stop-ths-is-slide-up").addClass("ths-is-slide-up");

						$(".sticky-element").removeClass("stop-ths-is-slide-up").addClass("ths-is-slide-up");
					}

					if($(this).hasClass("stop-mhs-is-slide-up")) {
						$(this).removeClass("stop-mhs-is-slide-up").addClass("mhs-is-slide-up");

						$(".sticky-element").removeClass("stop-mhs-is-slide-up").addClass("mhs-is-slide-up");
					}

					$(this).removeClass("reverse");
				}
				

			});
			
		},

		headerSectionInit: function () {

			SQ.hb.headerSection.each(function( index ) {

				this.prevScroll = SQ.hb.prevScroll;

				switch (index) {
					case 0:
						$(this).addClass("ths");

						/* top and middle are joined */
						if( SQ.hb.headerSection.eq(index + 1).length && SQ.hb.headerSection.eq(index + 1).offset().top - $(this).height() === $(this).offset().top) {

							//console.log("header 1 + 2 are joined");
							SQ.hb.resizeCheck = true;
						}

						if($(this).hasClass("header-sticky") && $(this).offset().top <= 0) {

							/* if top is sticky by default */
							$(this).addClass("is-sticky");
							SQ.hb.headerSection.eq(index + 1).addClass("ths-is-sticky");
							SQ.hb.headerSection.eq(index + 2).addClass("ths-is-sticky");

							SQ.hb.stickyElement.addClass("ths-is-sticky");

						}
						break;

					case 1:
						$(this).addClass("mhs");


						/* top is joined with middle */
						if( SQ.hb.headerSection.eq(index + 1).length && SQ.hb.headerSection.eq(index + 1).offset().top - $(this).height() === $(this).offset().top) {

							//console.log("header 2 + 3 are joined");
							SQ.hb.resizeCheck2 = true;
						}


						if($(this).hasClass("header-sticky") && $(this).hasClass("ths-is-sticky") && $(this).offset().top === SQ.hb.headerSection.eq(index - 1).height()) {
							$(this).addClass("is-sticky");
							SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-sticky");
							SQ.hb.stickyElement.addClass("mhs-is-sticky");
						}

						break;
					case 2:
						$(this).addClass("bhs");

						if($(this).hasClass("header-sticky") && $(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") && $(this).offset().top === SQ.hb.headerSection.eq(index - 1).height() + SQ.hb.headerSection.eq(index - 2).height()) {
							$(this).addClass("is-sticky");
							SQ.hb.stickyElement.addClass("bhs-is-sticky");
						}

						break;
					default:
						//console.log("Header section doesn't exist");
				}

			});

			$body.trigger("header-init-done");

		},

		/* checked */
		headerSectionScroll: function () {

			var scrollTop = $window.scrollTop();

			$('#scrolltop').html(scrollTop);

			SQ.hb.headerSection.each(function( index ) {

				/* Sticky scroll down */
				if(scrollTop > this.prevScroll && $(this).hasClass("header-sticky")) {

					SQ.hb.headerSection.eq(index).removeClass("reverse");
					SQ.hb.headerSection.eq(index + 1).removeClass("reverse");
					SQ.hb.headerSection.eq(index + 2).removeClass("reverse");

					SQ.hb.stickyElement.removeClass("reverse");

					switch (index) {
						case 0: /* top header section */

							/* Sticky */

							if(!$(this).hasClass("is-sticky") && scrollTop > $(this).offset().top) {

								$(this).addClass("is-sticky");
								SQ.hb.headerSection.eq(index + 1).addClass("ths-is-sticky");
								SQ.hb.headerSection.eq(index + 2).addClass("ths-is-sticky");

								SQ.hb.stickyElement.addClass("ths-is-sticky");

								//middle & bottom are joined at init
								if(SQ.hb.resizeCheck && SQ.hb.headerSection.eq(index + 1).hasClass("header-sticky")) {

									SQ.hb.headerSection.eq(index + 1).addClass("is-sticky");
									SQ.hb.headerSection.eq(index + 2).addClass("mhs-is-sticky");

									SQ.hb.stickyElement.addClass("mhs-is-sticky");

									//middle & bottom are joined at init
									if(SQ.hb.resizeCheck2 && SQ.hb.headerSection.eq(index + 2).hasClass("header-sticky")) {
										SQ.hb.headerSection.eq(index + 2).addClass("is-sticky");
										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}

								}

							}

							/* Resize */

							if($(this).hasClass("header-resize") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-resized") && scrollTop > $(this).offset().top + SQ.hb.topHeaderSectionResizeOffset) {

								//console.log("+ top - addClass .is-resize -classic");
								$(this).addClass("is-resized");
								SQ.hb.headerSection.eq(index + 1).addClass("ths-is-resized");
								SQ.hb.headerSection.eq(index + 2).addClass("ths-is-resized");

								SQ.hb.stickyElement.addClass("ths-is-resized");

							}


							/* Slide Up */

							if($(this).hasClass("header-slide-up") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-slide-up") && scrollTop > $(this).offset().top + SQ.hb.topHeaderSectionSlideUpOffset) {

								//console.log("+ top - addClass .is-slide-up");

								$(this).addClass("is-slide-up");
								SQ.hb.headerSection.eq(index + 1).addClass("ths-is-slide-up");
								SQ.hb.headerSection.eq(index + 2).addClass("ths-is-slide-up");

								SQ.hb.stickyElement.addClass("ths-is-slide-up");

								$(this).trigger("is-slide-up");
							}

							break;

						case 1: /* middle header section */

							/* Sticky */

							if(!$(this).hasClass("is-sticky")) {

								if($(this).hasClass("ths-is-sticky") && !$(this).hasClass("ths-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height()) {

									$(this).addClass("is-sticky");
									SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-sticky");

									SQ.hb.stickyElement.addClass("mhs-is-sticky");

									//middle & bottom are joined at init
									if(SQ.hb.resizeCheck2) {
										SQ.hb.headerSection.eq(index + 1).addClass("is-sticky");
										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}

								} else if ($(this).hasClass("ths-is-sticky") && $(this).hasClass("ths-is-slide-up") && scrollTop > $(this).offset().top) {

									$(this).addClass("is-sticky");
									SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-sticky");

									SQ.hb.stickyElement.addClass("mhs-is-sticky");

									//middle & bottom are joined at init
									if(SQ.hb.resizeCheck2) {
										SQ.hb.headerSection.eq(index + 1).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}


								} else if(!$(this).hasClass("ths-is-sticky") && scrollTop > $(this).offset().top) {

									$(this).addClass("is-sticky");
									SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-sticky");

									SQ.hb.stickyElement.addClass("mhs-is-sticky");

									if(SQ.hb.resizeCheck2) {
										SQ.hb.headerSection.eq(index + 1).addClass("is-sticky");
										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}

								}
							}

							/* Resize */

							if($(this).hasClass("header-resize") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-resized")) {

								if($(this).hasClass("ths-is-sticky") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.middleHeaderSectionResizeOffset) {

									$(this).addClass("is-resized");
									SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-resized");



								} else if(!$(this).hasClass("ths-is-sticky") && scrollTop > $(this).offset().top + SQ.hb.middleHeaderSectionResizeOffset) {

									//console.log("+ middle - addClass .is-resize - classic");

									$(this).addClass("is-resized");
									SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-resized");
								}
							}

							/* Slide Up */

							if($(this).hasClass("header-slide-up") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-slide-up") && scrollTop > $(this).offset().top + SQ.hb.middleHeaderSectionSlideUpOffset) {

								//console.log("+ middle - addClass .is-slide-up");

								$(this).addClass("is-slide-up");
								SQ.hb.headerSection.eq(index + 1).addClass("mhs-is-slide-up");

								$(this).trigger("is-slide-up");
							}

							break;

						case 2: /* bottom header section */

							/* Sticky */

							if(!$(this).hasClass("is-sticky")) {

								if($(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky")) {

									if($(this).hasClass("ths-is-slide-up") && $(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top) {

										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									} else if(!$(this).hasClass("ths-is-slide-up") && $(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height()) {
										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									} else if ($(this).hasClass("ths-is-slide-up") && !$(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height()) {

										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									} else if(!$(this).hasClass("ths-is-slide-up") && !$(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() - SQ.hb.headerSection.eq(index - 2).children(".header-content").height()) {

										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									}

								} else if ($(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky")) {

									if($(this).hasClass("ths-is-slide-up") && scrollTop > $(this).offset().top) {

										//console.log("+ bottom - addClass .is-sticky");
										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									} else if (!$(this).hasClass("ths-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height()) {

										//console.log("+ bottom - addClass .is-sticky");
										$(this).addClass("is-sticky");

										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}

								} else if (!$(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky")) {

									if($(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top) {
										//console.log("+ bottom - addClass .is-sticky");
										$(this).addClass("is-sticky");
										SQ.hb.stickyElement.addClass("bhs-is-sticky");

									} else if(!$(this).hasClass("mhs-is-slide-up") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height()) {
										//console.log("+ bottom - addClass .is-sticky");
										$(this).addClass("is-sticky");
										SQ.hb.stickyElement.addClass("bhs-is-sticky");
									}


								} else if (!$(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop > $(this).offset().top) {

									//console.log("+ bottom - addClass .is-sticky - classic");
									$(this).addClass("is-sticky");
									SQ.hb.stickyElement.addClass("bhs-is-sticky");
								}
							}

							/* Resize */
							if($(this).hasClass("header-resize") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-resized")) {

								if($(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height() - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

									// top și middle are sticky
									//console.log("+ bottom - addClass .is-resize - top & middle are sticky");
									$(this).addClass("is-resized");


								} else if ($(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

									// top este sticky
									//console.log("+ bottom - addClass .is-resize - top is sticky");
									$(this).addClass("is-resized");


								} else if (!$(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") && scrollTop > $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

									// middle is sticky
									//console.log("+ bottom - addClass .is-resize - middle is sticky");
									$(this).addClass("is-resized");

								} else if(!$(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop > $(this).offset().top + SQ.hb.bottomHeaderSectionResizeOffset) {

									// cazul classic
									//console.log("+ bottom - addClass .is-resize - clasic");
									$(this).addClass("is-resized");

								}
							}

							/* Slide Up */

							if($(this).hasClass("header-slide-up") && $(this).hasClass("is-sticky") && !$(this).hasClass("is-slide-up") && scrollTop > $(this).offset().top + SQ.hb.bottomHeaderSectionSlideUpOffset) {

								//console.log("+ bottom - addClass .is-slide-up");

								$(this).addClass("is-slide-up");

								$(this).trigger("is-slide-up");
							}

							break;

						default:
					}

					/* Header Transparent */
					if($(this).hasClass("header-transparent") && $(this).hasClass("is-transparent") && scrollTop > SQ.hb.headerSectionTransparentOffset) {
						$(this).removeClass("is-transparent");
					}
				}

				/* Sticky scroll reverse */

				else if(scrollTop < this.prevScroll && scrollTop >= 0 && $(this).hasClass("header-sticky")) {

					SQ.hb.headerSection.eq(index).addClass("reverse");
					SQ.hb.headerSection.eq(index + 1).addClass("reverse");
					SQ.hb.headerSection.eq(index + 2).addClass("reverse");

					SQ.hb.stickyElement.addClass("reverse");

					switch (index) {
						case 0: /* top header section */


							/* Resize */
							if($(this).hasClass("header-resize") && $(this).hasClass("is-resized")) {

								// top & middle are joined
								if(SQ.hb.resizeCheck) {

									// offset smaller than 4 * height
									if(SQ.hb.topHeaderSectionResizeOffset <= $(this).height()*4) {

										if(scrollTop < $(this).offset().top + (4 * $(this).height())) {

											// offset reverse will be 2 * height
											//console.log("- top - removeClass .is-resized - offsetul smaller than 4 * height");

											$(this).removeClass("is-resized");
											SQ.hb.headerSection.eq(index + 1).removeClass("ths-is-resized");
											SQ.hb.headerSection.eq(index + 2).removeClass("ths-is-resized");

											SQ.hb.stickyElement.removeClass("ths-is-resized");

										}
									} else if(scrollTop < $(this).offset().top + SQ.hb.topHeaderSectionResizeOffset) {

										//console.log("- top - removeClass .is-resized - offset greater than 4 * height. top & middle are joined");
										$(this).removeClass("is-resized");
										SQ.hb.headerSection.eq(index + 1).removeClass("ths-is-resized");
										SQ.hb.headerSection.eq(index + 2).removeClass("ths-is-resized");

										SQ.hb.stickyElement.removeClass("ths-is-resized");
									}


								} else {

									if(scrollTop < $(this).offset().top + SQ.hb.topHeaderSectionResizeOffset) {

										//console.log("- top - removeClass .is-resized - classic - top & middle are not joined");

										$(this).removeClass("is-resized");
										SQ.hb.headerSection.eq(index + 1).removeClass("ths-is-resized");
										SQ.hb.headerSection.eq(index + 2).removeClass("ths-is-resized");

										SQ.hb.stickyElement.removeClass("ths-is-resized");
									}
								}

							}

							/* Slide Up */

							if($(this).hasClass("header-slide-up")) {

								if($(this).hasClass("is-slide-up") || scrollTop < SQ.hb.topHeaderSectionSlideUpOffset) {

									//console.log("- top - removeClass .is-slide-up");

									$(this).removeClass("is-slide-up");
									SQ.hb.headerSection.eq(index + 1).removeClass("ths-is-slide-up");
									SQ.hb.headerSection.eq(index + 2).removeClass("ths-is-slide-up");

									SQ.hb.stickyElement.removeClass("ths-is-slide-up");
								}

							}

							/* Sticky */

							if($(this).hasClass("is-sticky") && scrollTop < $(this).offset().top) {

								//console.log("- top - removeClass .is-sticky");
								$(this).removeClass("is-sticky");
								SQ.hb.headerSection.eq(index + 1).removeClass("ths-is-sticky");
								SQ.hb.headerSection.eq(index + 2).removeClass("ths-is-sticky");

								SQ.hb.stickyElement.removeClass("ths-is-sticky");

								if(SQ.hb.resizeCheck) {
									//top & middle are joined at init, is-sticky will be deleted

									//console.log("- middle - removeClass .is-sticky - remove din case 0");
									SQ.hb.headerSection.eq(index + 1).removeClass("is-sticky");
									SQ.hb.headerSection.eq(index + 2).removeClass("mhs-is-sticky");

									SQ.hb.stickyElement.removeClass("mhs-is-sticky");
								}

								if(SQ.hb.resizeCheck2) {
									//console.log("- bottom - removeClass .is-sticky - remove from case 0");
									SQ.hb.headerSection.eq(index + 2).removeClass("is-sticky");

									SQ.hb.stickyElement.removeClass("bhs-is-sticky");

								}
							}

							break;

						case 1: /* middle header section */


							/* Resize */
							if($(this).hasClass("header-resize") && $(this).hasClass("is-resized")) {

								// middle & bottom are joined at init
								if(SQ.hb.resizeCheck2 /*&& !$(this).hasClass("ths-is-sticky")*/) {

									// offset smaller than 4 * height
									if(SQ.hb.middleHeaderSectionResizeOffset <= $(this).height()*4) {

										if(scrollTop < $(this).offset().top + (4 * $(this).height())) {

											// offsetul on reverse will be 4 * height
											//console.log("- middle - removeClass .is-resized - offset smaller than 4 * height");

											$(this).removeClass("is-resized");
											SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-resized");

										}
									} else if(scrollTop < $(this).offset().top + SQ.hb.middleHeaderSectionResizeOffset) {

										//console.log("- middle - removeClass .is-resized - offset greater than 4 * height - middle & bottom are joined at init");

										$(this).removeClass("is-resized");
										SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-resized");
									}


								} else {
									// middle și bottom nu sunt lipite la init

									if($(this).hasClass("ths-is-sticky") &&  scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.middleHeaderSectionResizeOffset) {

										//console.log("- middle - removeClass .is-resized - top is sticky");

										$(this).removeClass("is-resized");
										SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-resized");

									} else if(scrollTop < $(this).offset().top + SQ.hb.middleHeaderSectionResizeOffset) {

										//console.log("- middle - removeClass .is-resized - classic");

										$(this).removeClass("is-resized");
										SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-resized");
									}
								}
							}

							/* Slide Up */

							if($(this).hasClass("header-slide-up")) {

								if($(this).hasClass("is-slide-up") || scrollTop < SQ.hb.middleHeaderSectionSlideUpOffset) {
									//console.log("- middle - removeClass .is-slide-up");

									$(this).removeClass("is-slide-up");
									SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-slide-up");
								}
							}


							/* Sticky */
							if($(this).hasClass("is-sticky")) {

								if($(this).hasClass("ths-is-sticky") && scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height()) {


									if (!SQ.hb.resizeCheck) {


										//console.log("- middle - removeClass .is-sticky - top is sticky");

										$(this).removeClass("is-sticky");
										SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-sticky");
										SQ.hb.stickyElement.removeClass("mhs-is-sticky");
									}


								} else if(!$(this).hasClass("ths-is-sticky") && scrollTop < $(this).offset().top) {

									//console.log("- middle - removeClass .is-sticky - top is not sticky");
									$(this).removeClass("is-sticky");
									SQ.hb.headerSection.eq(index + 1).removeClass("mhs-is-sticky");
									SQ.hb.stickyElement.removeClass("mhs-is-sticky");

								}
							}


							break;

						case 2: /* bottom header section */

							/* Resize */

							if($(this).hasClass("header-resize") && $(this).hasClass("is-resized")) {

								// middle & bottom are joined init
								if(SQ.hb.resizeCheck2) {

									// offsetul smaller than 4 * height
									if(SQ.hb.bottomHeaderSectionResizeOffset <= $(this).height()*4) {

										if(scrollTop < $(this).offset().top + (4 * $(this).height())) {

											// offset reverse will be 4 * height
											//console.log("- bottom - removeClass .is-resized - offset is less than 4 * height");

											$(this).removeClass("is-resized");

										}
									} else if(scrollTop < $(this).offset().top + SQ.hb.bottomHeaderSectionResizeOffset) {

										//console.log("- bottom - removeClass .is-resized - offset is greater than 4 * height - middle & bottom are joined at init");

										$(this).removeClass("is-resized");
									}
								} else {

									if($(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") &&  scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height() - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

										//console.log("- bottom - removeClass .is-resized - top & middle are sticky");
										$(this).removeClass("is-resized");


									} else if($(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") &&  scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

										//console.log("- bottom - removeClass .is-resized - top is sticky");
										$(this).removeClass("is-resized");

									} else if(!$(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") &&  scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() + SQ.hb.bottomHeaderSectionResizeOffset) {

										//console.log("- bottom - removeClass .is-resized - middle is sticky");
										$(this).removeClass("is-resized");

									} else if(!$(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop < $(this).offset().top + SQ.hb.bottomHeaderSectionResizeOffset) {

										//console.log("- bottom - removeClass .is-resized - classic");
										$(this).removeClass("is-resized");
									}

								}

							}


							/* Slide Up */

							if($(this).hasClass("header-slide-up")) {

								if($(this).hasClass("is-slide-up") || scrollTop < SQ.hb.bottomHeaderSectionSlideUpOffset) {
									//console.log("- bottom - removeClass .is-slide-up");

									$(this).removeClass("is-slide-up");
								}
							}

							/* Sticky */

							if($(this).hasClass("is-sticky")) {

								if($(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") && scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height() - SQ.hb.headerSection.eq(index - 2).children(".header-content").height()) {


									if (!SQ.hb.resizeCheck2) {
										//console.log("- bottom - removeClass .is-sticky - top & middle str sticky");
										$(this).removeClass("is-sticky");
										SQ.hb.stickyElement.removeClass("bhs-is-sticky");
									}


								} else if ($(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 2).children(".header-content").height()) {

									//console.log("- bottom - removeClass .is-sticky - top is sticky");
									$(this).removeClass("is-sticky");
									SQ.hb.stickyElement.removeClass("bhs-is-sticky");

								} else if (!$(this).hasClass("ths-is-sticky") && $(this).hasClass("mhs-is-sticky") && scrollTop < $(this).offset().top - SQ.hb.headerSection.eq(index - 1).children(".header-content").height()) {

									//console.log("- bottom - removeClass .is-sticky - middle is sticky");
									$(this).removeClass("is-sticky");
									SQ.hb.stickyElement.removeClass("bhs-is-sticky");


								} else if (!$(this).hasClass("ths-is-sticky") && !$(this).hasClass("mhs-is-sticky") && scrollTop < $(this).offset().top) {

									//console.log("- bottom - removeClass .is-sticky - top & middle not sticky");
									$(this).removeClass("is-sticky");
									SQ.hb.stickyElement.removeClass("bhs-is-sticky");
								}

							}


							break;

						default:
					}

					/* Header Transparent */
					if($(this).hasClass("header-transparent") && !$(this).hasClass("is-transparent") && scrollTop < SQ.hb.headerSectionTransparentOffset) {
						$(this).addClass("is-transparent");
					}
				}

				this.prevScroll = scrollTop;
			});


			/* Burger menu default sticky */
			$(".menu-default").each(function( index ) {

				var headerMenuDefaultClasses = $(this).attr("class");

				if(scrollTop > this.menuPrevScroll && headerMenuDefaultClasses.indexOf("burger sticky")) {

					if(!$(this).hasClass("is-sticky") && scrollTop > $(this).offset().top) {
						$(this).addClass("is-sticky");
					}


				} else if (scrollTop < this.menuPrevScroll && scrollTop >= 0 && headerMenuDefaultClasses.indexOf("burger sticky")) {

					if($(this).hasClass("is-sticky") && scrollTop < $(this).offset().top) {
						$(this).removeClass("is-sticky");
					}
				}

				this.menuPrevScroll = scrollTop;
			});


		},

		checkFlexResolution: function(el) {
			var flex = $(el).parent('.flexMenu');
			if ( flex.length ) {
				if ( ($('body').hasClass('device-xs') ||  $('body').hasClass('device-xxs')) && flex.hasClass('burger-mobile-sidemenu') ) {
					return true;
				} else if ( $('body').hasClass('device-sm') && flex.hasClass('burger-tablet-sidemenu') ) {
					return true;
				}
			}
			return false;
		},

		trimLongMenu: function () {
			$('.flexMenu > ul').flexMenu({
				cutoff: 0,
				threshold: 2,
				popupAbsolute: false,
				showOnHover: false,
				linkText: "<a class='item hamburger hamburger-elastic'><span class='hamburger-box'><span class='hamburger-inner'></span></span></a>",
				linkTextAll: "<a class='item hamburger hamburger-elastic'><span class='hamburger-box'><span class='hamburger-inner'></span></span></a>"
			});

			$('header').addClass('flexMenuActive');
			$('.flexMenu').addClass("flex-overflow");
		},

		responsiveBurger: function() {

			$body.removeClass("burger-default-styles");
			$body.removeClass("burger-sidemenu-styles");
			$body.removeClass("burger-modal-styles");

			$('[class*="burger-"]').each(function(){

				$(this).removeClass("burger-default-styles");
				$(this).removeClass("burger-sidemenu-styles");
				$(this).removeClass("burger-modal-styles");


				/*** Sidemenu ***/

				/* All */

				if($(this).hasClass("burger-default")) {
					$(this).addClass("burger-default-styles");
					$body.addClass("burger-default-styles");

					if($(this).hasClass("burger-sticky")) {
						$(this).addClass("burger-sticky-styles");
						$body.addClass("burger-sticky-styles");
					}

				}

				if($(this).hasClass("burger-sidemenu")) {
					$(this).addClass("burger-sidemenu-styles");
					$body.addClass("burger-sidemenu-styles");
				}

				if($(this).hasClass("burger-modal")) {
					$(this).addClass("burger-modal-styles");
					$body.addClass("burger-modal-styles");
				}


				/* Mobile */

				if($(this).hasClass("burger-mobile-default")) {
					if($body.hasClass("device-xxs") || $body.hasClass("device-xs")) {
						$(this).addClass("burger-default-styles");
						$body.addClass("burger-default-styles");

						if($(this).hasClass("burger-mobile-sticky")) {
							$(this).addClass("burger-sticky-styles");
							$body.addClass("burger-sticky-styles");
						}

					}
				}

				if($(this).hasClass("burger-mobile-sidemenu")) {
					if($body.hasClass("device-xxs") || $body.hasClass("device-xs")) {
						$(this).addClass("burger-sidemenu-styles");
						$body.addClass("burger-sidemenu-styles");
					}
				} 

				if($(this).hasClass("burger-mobile-modal")) {
					if($body.hasClass("device-xxs") || $body.hasClass("device-xs")) {
						$(this).addClass("burger-modal-styles");
						$body.addClass("burger-modal-styles");
					}
				}

				/* Tablet */

				if($(this).hasClass("burger-tablet-default") && $body.hasClass("device-sm")) {
					$(this).addClass("burger-default-styles");
					$body.addClass("burger-default-styles");

					if($(this).hasClass("burger-tablet-sticky")) {
						$(this).addClass("burger-sticky-styles");
						$body.addClass("burger-sticky-styles");
					}
				}

				if($(this).hasClass("burger-tablet-sidemenu") && $body.hasClass("device-sm")) {
					$(this).addClass("burger-sidemenu-styles");
					$body.addClass("burger-sidemenu-styles");

				}

				if($(this).hasClass("burger-tablet-modal") && $body.hasClass("device-sm")) {
					$(this).addClass("burger-modal-styles");
					$body.addClass("burger-modal-styles");
				}

				/* Desktop */

				if($(this).hasClass("burger-desktop-default") && $body.hasClass("device-md")) {
					$(this).addClass("burger-default-styles");
					$body.addClass("burger-default-styles");

					if($(this).hasClass("burger-desktop-sticky")) {
						$(this).addClass("burger-sticky-styles");
						$body.addClass("burger-sticky-styles");
					}

				}

				if($(this).hasClass("burger-desktop-sidemenu") && $body.hasClass("device-md")) {
					$(this).addClass("burger-sidemenu-styles");
					$body.addClass("burger-sidemenu-styles");

				}

				if($(this).hasClass("burger-desktop-modal") && $body.hasClass("device-md")) {
					$(this).addClass("burger-modal-styles");
					$body.addClass("burger-modal-styles");

				}

				/* Large Desktop */

				if($(this).hasClass("burger-large-desktop-default") && $body.hasClass("device-lg")) {
					$(this).addClass("burger-default-styles");
					$body.addClass("burger-default-styles");

					if($(this).hasClass("burger-large-desktop-sticky")) {
						$(this).addClass("burger-sticky-styles");
						$body.addClass("burger-sticky-styles");
					}
				}

				if($(this).hasClass("burger-large-desktop-sidemenu") && $body.hasClass("device-lg")) {
					$(this).addClass("burger-sidemenu-styles");
					$body.addClass("burger-sidemenu-styles");

				}

				if($(this).hasClass("burger-large-desktop-modal") && $body.hasClass("device-lg")) {
					$(this).addClass("burger-modal-styles");
					$body.addClass("burger-modal-styles");
				}

			});

		}
	};

	var $window = $(window),
		$body = $('body');

	$(document).ready(SQ.hb.init);

	$window.on('load', SQ.hb.onLoad);

	$window.on('debouncedresize', SQ.hb.onResize);

	$window.on( 'resize', SQ.hb.onClassicResize );

	$(window).on('scroll', function () {
		SQ.hb.onScroll();
	});

})(jQuery);
