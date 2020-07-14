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

        $(window).scroll(function(){

            console.log('scroll')


        })


    }

    function init(){

        setupItems()
        setupEvents()
        addEventListener()

    }

    init()
}

initNavbar()








//navbarCollpase.dispatchEvent(navCollpaseShow);






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