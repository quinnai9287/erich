//event.js 2020-07-23
require(["Vue"], function(Vue){

		var vm = new Vue({
		  el: '#vueapp',
		  delimiters: ['${', '}'],
		  data(){
		  	return{
		  		domain:'',
		  		init:false,
			    about:{
			    	aboutTitle:'',
			    	aboutSubtitle:'',
			    	abountContentMedia:''
			    }
		  	}
		  },
		  mounted(){
		  	//console.log(this)
		  	this.init = true
		  }
		});

		console.log('### init vue app! ###')

		function initProductSlider(slider){

			let sliderOptions =  {
	                dots: true,
	              	arrows: true,
	              	mobileFirst: true,
	              	infinite: false,
	              	slidesToShow: 2,
	              	slidesToScroll: 1,
	              	responsive: [
	                  {
	                     breakpoint: 992,
	                     settings: {
	                        slidesToShow: 3
	                     }
	                  }
	              ]
	            }

	        slider.not('.slick-initialized').slick(sliderOptions)
			
		}

		function initapp(){

			let config = getConfig()
			vm.domain = config.domain

			let homePage = {

					_gql: `query{
						# 主視覺
						homePage(first: 1) {
						    aboutTitle
						    aboutSubtitle
						    abountContentMedia {
						      urls
						    }
						}
					}`
			}

			fetchingAPI(config.fetchOption,homePage).then( data => {

				//console.log("data=", data )

				vm.about.aboutTitle = data.homePage[0].aboutTitle
				vm.about.aboutSubtitle = data.homePage[0].aboutSubtitle
				vm.about.abountContentMedia = data.homePage[0].abountContentMedia.urls

			})

			const slider = $('.ert-product-silder')
			initProductSlider(slider)

		}

		initapp()

});


