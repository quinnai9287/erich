//eventIndex.js 2020-07-23
require(["Vue", "vue!productCategory" , "vue!eventCards" ], function(Vue){

	let vm = new Vue({
	  el: '#vueapp',
	  delimiters: ['${', '}'],
	  data(){
	  	return{
	  		domain:'',
	  		init:false,
	  		events:[],
	  		taxonomy:[],
		    eventCardsOptions:{
		    	groupClass:'ert-events-card'
		    }
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

		let events = {

			_gql: `query{
			   event {
			    list {
			      contentItems {
			        published
			        ... on EventPost {
			          eventKVSQ {
			            urls
			          }
			          eventTitle
			          eventDateBegin
			          eventDateEnd
			          eventSummary
			          path
			        }
			        ... on EventPost2 {
			          eventKVSQ {
			            urls
			          }
			          eventTitle
			          eventSummary
			          eventTags {
			            termContentItems(first: 3) {
			              displayText
			            }
			          }
			          eventTags2 {
			            termContentItems(first: 3) {
			              displayText
			            }
			          }
			          path
			        }
			      }
			    }
			  }
			}`,

		}

		let taxonomy = {

				_gql: `query{
				  # 商品分類按鈕
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
				        }
				        contentItemId
				      }
				    }
				  }
				}`,

		}
		//get api data
		fetchingAPI(config.fetchOption,events).then( data => {

			//console.log("data=", data )

			vm.events = data.event[0].list.contentItems

		})

		fetchingAPI(config.fetchOption,taxonomy).then( data => {

			//console.log("data=", data.taxonomy[0].taxonomy.contentItems )

			vm.taxonomy = data.taxonomy[0].taxonomy.contentItems
			
		})

	}

	initapp()

});


