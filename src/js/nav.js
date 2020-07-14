function initNavbar(){

    const navCollpaseShow = new Event('nav.collapse.show'),
          navCollpaseHide = new Event('nav.collapse.hide');

    let  navbarToggle, navbarCollpase, navbarClose;

    function setupItems(){

        navbarToggle = document.getElementsByClassName('navbar-toggle')[0];
        navbarCollpase = document.getElementById('NavbarSupportContent');
        navbarClose = document.getElementsByClassName('navbar-collpase-close')[0];

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

    function handleNavbarToggle(element){

        let collapsed = element.classList.contains("active")

        if(!collapsed){

            element.dispatchEvent(navCollpaseShow);

        }else{

            element.dispatchEvent(navCollpaseHide);
        }

    }

    function addEventListener(){

        navbarToggle.onclick = function(){ handleNavbarToggle(navbarCollpase) }
        navbarClose.onclick = function(){ handleNavbarToggle(navbarCollpase) }

    }

    function init(){

        setupItems()
        setupEvents()
        addEventListener()

    }

    init()
}

initNavbar()