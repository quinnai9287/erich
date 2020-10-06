//productIndex.js 2020-07-23
require(["Vue","Axios", "vue!productCategory" , "vue!productCards"], function(Vue){

	let vm = new Vue({

	  el: '#vueapp',
	  delimiters: ['${', '}'],
	  data(){
	  	return{
	  		domain:'',
	  		init:false,
	  		title:'',
	  		prev:undefined,
	  		next:undefined,
	  		products:[],
	  		taxonomy:[],
	  		taxonomyActive:[],
	  		productCardsOptions:{}
	  	}
	  },
	  computed:{
	  	domain(){
	  		let erich_t = 'https://erich-t.blockcode.com.tw'
	  		let domain = window.location.hostname;
	  		return domain != erich_t ? erich_t : domain
	  	},
	  	hasprev(){
	  		return this.prev != undefined ? true : false
	  	},
	  	hasnext(){
	  		return this.next != undefined ? true : false
	  	}
	  },
	  mounted(){
	  	//console.log(this)
	  	this.init = true
	  }
	});


	console.log('### init vue app! ###')

	function initapp(){

		let config = getConfig()
		vm.domain = config.domain

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
		fetchingAPI(config.fetchOption,taxonomy).then( data => {

			//console.log("data=", data.taxonomy[0].taxonomy.contentItems )


			let key = window.location.href.split('/product-index/?')[1]
			key = decodeURI(key, "utf-8");

			let tags = data.taxonomy[0].taxonomy.contentItems

			let current = tags.find( tag => tag.displayText == key )

			let n = tags.findIndex( tag => tag.displayText == key )
			////console.log('n=',n)

			if( n == tags.length ){
				vm.next = undefined
				vm.prev = tags[n-1]
			}else if( n == 0){
				vm.prev = undefined
				vm.next = tags[n+1]
			}else{
				vm.next = tags[n+1]
				vm.prev = tags[n-1]
			}

			vm.taxonomy = data.taxonomy[0].taxonomy.contentItems
			vm.taxonomyActive = current
			vm.title = key

			getproducts(current)
			
		})


		function getproducts(current){

			if(current!=undefined){


				let variable = current.contentItemId


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

					_variable: { "parameters": `{\"TermContentItemId\": \"${variable}\" }` }

				}


				fetchingAPI(config.fetchOption,products).then( data => {

					console.log("data=", data )

					vm.products = data.getProductItemsByCategoryID

				})


			}


		}
		




	}

	initapp()


});


