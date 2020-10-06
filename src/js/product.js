//product.js 2020-07-23
require(["Vue", "vue!productCategory" , "vue!productSlider", "vue!gallerySlider" ], function(Vue){

	let vm = new Vue({
	  el: '#vueapp',
	  delimiters: ['${', '}'],
	  data(){
	  	return{
	  		domain:'',
	  		init:false,
	  		products:[],
	  		productSliderOption:{
	  			random:true,
	  			limit:6
	  		},
	  		taxonomy:[]
	  	}
	  },
	  mounted(){
	  	//console.log(this)
	  	this.init = true
	  }
	});

	console.log('### init vue app! ###')

	function initGallerySlider(slider){

		let	sliderOptions = {
              dots: true,
              arrows: false,
              mobileFirst: true,
              infinite: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              responsive: [
                  {
                     breakpoint: 992,
                     settings: "unslick"
                  }
              ]
          	}

	    slider.not('.slick-initialized').slick(sliderOptions)
		
	}

	function initapp(){


		//get config
		let config = getConfig()

		vm.domain = config.domain

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
				        path
				    }

			}`,

			_variable: { "parameters": "{\"TermContentItemId\": \"4a9ct74mjqwvj1xbmccr9x824m\"}" }

		}

		let taxonomy = {


				_gql: `query ProductCategory {
				  taxonomy(where: {alias: {alias: "product-category"}}) {
				    displayText
				    alias {
				      alias
				    }
				    taxonomy {
				      contentItems {
				        ... on Category {
				          displayText
				          path
				          englishTitle
				          icon {
				            urls
				          }
				        }
				      }
				    }
				  }
				}`,


		}



		//get api data
		fetchingAPI(config.fetchOption,products).then( data => {

			//console.log("data=", data )

			let _data;
			let random = vm.productSliderOption.random,
				limit = vm.productSliderOption.limit;

			_data = random ? shuffle(data.getProductItemsByCategoryID) : data.getProductItemsByCategoryID
			_data = limit && limit > 0 ? _data.filter( (i,idx) => idx < limit ) : _data

			vm.products = _data

		})

		fetchingAPI(config.fetchOption,taxonomy).then( data => {

			//console.log("data=", data.taxonomy[0].taxonomy.contentItems )

			vm.taxonomy = data.taxonomy[0].taxonomy.contentItems
			
		})

		const slider = $('.ert-gallery-silder')
		initGallerySlider(slider)
		$(window).resize(function(){
			if( $(window).width() < 992){
				initGallerySlider(slider)
			}
		})

	}

	initapp()

});


