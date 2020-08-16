//productIndex.js 2020-07-23
require(["Vue", "Axios", "vue!productCards1"], function(Vue){

	let vm = new Vue({

	  el: '#vueapp',
	  delimiters: ['${', '}'],
	  data(){
	  	return{
	  		domain:'https://erich-t.blockcode.com.tw',
	  		fetchOption:{},
	  		init:false,
	  		title:'',
	  		prev:undefined,
	  		next:undefined,
	  		products:{
	  			gql:{}
	  		},
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

			_variable: { "parameters": `{\"TermContentItemId\": \"4tjer4vfykjy9178hqa0qzgmx7\" }` }

		}


		vm.$data.products.gql = products
		vm.$data.fetchOption = config.fetchOption

	}

	initapp()


});


