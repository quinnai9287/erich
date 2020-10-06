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
	  		taxonomy:[],
	  		gallery:[
	  			{ imgsrc:'/ERICHWeb/img/product/product_01.jpg' },
	  			{ imgsrc:'/ERICHWeb/img/product/product_02.jpg' },
	  			{ imgsrc:'/ERICHWeb/img/product/product_03.jpg' },
	  			{ imgsrc:'/ERICHWeb/img/product/product_04.jpg' }
	  		]
	  	}
	  },
	  mounted(){
	  	console.log(this)
	  	this.init = true
	  }
	});

	function initapp(){


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

			_variable: { "parameters": "{\"TermContentItemId\": \"4dg4mksctmmhf1g5hfsx6x99nm\"}" }

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

			console.log("data=", data )

			vm.products = data.getProductItemsByCategoryID

		})

		fetchingAPI(config.fetchOption,taxonomy).then( data => {

			console.log("data=", data.taxonomy[0].taxonomy.contentItems )

			vm.taxonomy = data.taxonomy[0].taxonomy.contentItems
			
		})

	}

	initapp()

});


