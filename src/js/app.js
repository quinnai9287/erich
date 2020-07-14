//app.js

function initNavbar(){

    const navCollpaseShow = new Event('nav.collapse.show'),
          navCollpaseHide = new Event('nav.collapse.hide');

    const navbar = $('.ert-navbar')
    let  navbarToggle, navbarCollpase, navbarClose;
	let  threshhold = navbar.outerHeight()

	let defaultScrollTop = $(window).scrollTop()

    function setupItems(){

        navbarToggle = document.getElementById('ert-navbar-toggle');
        navbarCollpase = document.getElementById('ert-navbar-collapse');
        navbarClose = document.getElementsByClassName('ert-navbar-collpase-close')[0];

    }

    function setupEvents(){

        navbarCollpase.addEventListener('nav.collapse.show', function (e) { 
            //console.log(e,'collpase show',this)
            this.classList.add('active')


        }, false);

        navbarCollpase.addEventListener('nav.collapse.hide', function (e) { 
            //console.log(e,'collpase hide',this)
            this.classList.remove('active')

        }, false);

    }

    function handleNavbarToggle(element,toggle){

        let collapsed = element.classList.contains("active")

        if(!collapsed){

        	toggle.classList.add('active')
            element.dispatchEvent(navCollpaseShow);

        }else{

        	toggle.classList.remove('active')
            element.dispatchEvent(navCollpaseHide);
        }

    }

	function handleNavLock(y){

		console.log('scrilling',y,threshhold)

		if( y > threshhold ){

			navbar.addClass('navbar-solid')

		}else{

			navbar.removeClass('navbar-solid')

		}

	}


    function handleNavSolid(){

    	let elem = document.getElementsByClassName('index-navbar-hollow')

    	if( elem.length > 0){

    		handleNavLock(defaultScrollTop)

	        $(window).scroll(function(){

				let y = $(window).scrollTop();		
				handleNavLock(y)

	        })

    	}else{

    		navbar.addClass('navbar-solid')
    	}

    }

    function addEventListener(){

        navbarToggle.onclick = function(){ handleNavbarToggle(navbarCollpase,this) }
		
    }

    function init(){

        setupItems()
        setupEvents()
        handleNavSolid()
        addEventListener()

    }

    init()
}


document.onreadystatechange = function () {

	//const mask = $('.bv-loading-mask')

	let state = document.readyState;

  	if (document.readyState == "interactive") {

  		setTimeout(function(){
  			//mask.fadeOut('slow')]\
  			initNavbar()

  		},500)

  	}

  	if (document.readyState == "complete") {

  		

  	}
}
