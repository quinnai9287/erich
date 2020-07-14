let navbarToggle = document.getElementsByClassName('navbar-toggle');
let navbarCollpase = document.getElementById('NavbarSupportContent');



const toggle = navbarToggle[0];


//Ninjav.js
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($){
    'use strict';
    var Ninjav = window.Ninjav || {};

    Ninjav = (function() {
        var instanceUid = 0;

        function Ninjav(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('ninjav') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Ninjav;
    }());

    $.fn.ninjav = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].ninjav = new Ninjav(_[i], opt);
            else
                ret = _[i].ninjav[opt].apply(_[i].ninjav, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));




const navCollpaseShow = new Event('nav.collapse.show'),
	  navCollpaseHide = new Event('nav.collapse.hide');

navbarCollpase.addEventListener('nav.collapse.show', function (e) { 
	//console.log(e,'collpase show',this)
	this.classList.add('active')


}, false);

navbarCollpase.addEventListener('nav.collapse.hide', function (e) { 
	//console.log(e,'collpase hide',this)
	this.classList.remove('active')

}, false);

//navbarCollpase.dispatchEvent(navCollpaseShow);


function handleNavbarToggle(element){

	let collapsed = element.classList.contains("active")
	if(!collapsed){
		element.dispatchEvent(navCollpaseShow);
	}else{
		element.dispatchEvent(navCollpaseHide);
	}
	console.log(element, 'collapsed=', collapsed )

	// navbarToggle[0].classList.toggle("active");
	// navbarCollpase.classList.toggle("active");

}

console.log("toggle=",toggle)

toggle.onclick = function(){ handleNavbarToggle(navbarCollpase) }



//
// // Toggle class function
// function toggleClass(element, className){
//     if (!element || !className){
//         return;
//     }
    
//     var classString = element.className, nameIndex = classString.indexOf(className);
//     if (nameIndex == -1) {
//         classString += ' ' + className;
//     }
//     else {
//         classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
//     }
//     element.className = classString;
// }
// function handleToggle(){
// 	this.classList.toggle("active");
// 	let target = this.nextElementSibling
// 	toggleClass(target, 'active');
// }
// let toggle = document.getElementsByClassName('collapse');
// toggle[0].addEventListener( 'click', handleToggle )