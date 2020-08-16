//event.js 2020-07-23
require(["Vue", "vue!productCategory" , "vue!productSlider", "vue!gallerySlider" ], function(Vue){

		var vm = new Vue({
		  el: '#vueapp',
		  delimiters: ['${', '}'],
		  data(){
		  	return{
		  		domain:'',
		  		init:false,
		  		products:[],
			    about:{
			    	aboutTitle:'',
			    	aboutSubtitle:'',
			    	abountContentMedia:''
			    }
		  	}
		  },
		  mounted(){
		  	console.log(this)
		  	this.init = true
		  }
		});

		console.log('### init vue app! ###')

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

			let products = {

					_gql: `query GHQProductItemsByCategoryID($parameters: String!) {
						    getProductItemsByCategoryID(parameters: $parameters) {
						        productTitle
						        productPicture {
						        urls(first: 1)
						        }
						        productPrice
						        productCategory {
						        termContentItems {
						            displayText
						        }
						        }
						    }

					}`,

					_variable: { "parameters": "{\"TermContentItemId\": \"4dg4mksctmmhf1g5hfsx6x99nm\"}" }

				}

			fetchingAPI(config.fetchOption,homePage).then( data => {

				console.log("data=", data )

				vm.about.aboutTitle = data.homePage[0].aboutTitle
				vm.about.aboutSubtitle = data.homePage[0].aboutSubtitle
				vm.about.abountContentMedia = data.homePage[0].abountContentMedia.urls

			})

			fetchingAPI(config.fetchOption,products).then( data => {

				console.log("data=", data.getProductItemsByCategoryID )

				vm.products = data.getProductItemsByCategoryID
				
			})

		}

		initapp()

});


