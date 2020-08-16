//app.js 2020-08-04
//app.js 2020-07-23

function initNavbar(){

    const navCollpaseShow = new Event('nav.collapse.show'),
          navCollpaseHide = new Event('nav.collapse.hide');

    const navbar = $('.ert-navbar')
    const body = document.getElementsByTagName("BODY")[0];
    let   $html = $('html')
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

            body.classList.add('lock-body')
            $html.css({'overflow-y':' scroll'})
        	toggle.classList.add('active')
            element.dispatchEvent(navCollpaseShow);

        }else{

            body.classList.remove('lock-body')
            $html.css({'overflow-y':' auto'})
        	toggle.classList.remove('active')
            element.dispatchEvent(navCollpaseHide);
        }

    }

	function handleNavLock(y){

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


function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter--) {
      // Pick a random index
      index = (Math.random() * counter) | 0;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
}


function fetchingAPI(option,object){

    console.log( option , object )

    return new Promise(( resolve , reject ) => {

                fetch( option._uri, {

                    method: option._method, 
                    body: JSON.stringify({ query: object._gql , variables: object._variable }),
                    headers: new Headers( option._headers )

                }).then(function(response) {

                    //處理 response
                    return response.json()

                }).then(function(j) {

                    let data = j.data

                    resolve(data);

                }).catch(function(err) {
                    
                    console.log(err)
                })

            }) 

}


requirejs.config({
    baseUrl:'/ERICHWeb/vue/',
    paths: {
        "Vue": "/ERICHWeb/libs/vue.min",
        "Axios": "/ERICHWeb/libs/axios.min",
        "vue": "/ERICHWeb/libs/require-vuejs.min"
    },
    shim: {
        "Vue": {"exports": "Vue"}
    }
});

