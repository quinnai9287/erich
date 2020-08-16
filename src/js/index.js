//index.js 2020-07-23
require(["Vue", "vue!myslick", "vue!productCategory" , "vue!eventCards" , "vue!productCards"], function(Vue){

	let vm = new Vue({
	  el: '#vueapp',
	  delimiters: ['${', '}'],
	  data: {
	  	domain:'',
	  	init:false,
	    homePage:[],
	    events:[],
	    taxonomy:[],
	    taxonomyActive:{},
	    products:[],
	    about:{
	    	aboutTitle:'',
	    	aboutSubtitle:'',
	    	abountContentMedia:''
	    },
	    slick:{
	    	kv:[],
			sliderOptions: {
				dots: true,
				arrows: true,
				mobileFirst: true,
				infinite: false,
				slidesToShow: 1,
				responsive: [
				{
				  breakpoint: 768,
				  settings: {            
				    arrows: true,
				    slidesToShow: 1
				  }
				}
				]
			}
	    },
	    eventCardsOptions:{
	    	groupClass:'filter-first-3'
	    },
	    productCardsOptions:{}
	  },
	  mounted(){
	  	//console.log(this)
	  	this.init = true

		$('#BtnSeeMore').on('click',function(){

			$("html, body").animate({ scrollTop: $(this).offset().top - 112 }, 1000);
			
		})
	  }
	});


	console.log('### init vue app! ###')

	function initapp(){


		let config = getConfig()
		vm.domain = config.domain

		//set up graphql object

		let homePage = {

				_gql: `query HomePage {
					  # 主視覺
					  homePage(first: 1) {
					    kV {
					      contentItems {
					        ... on CarouselBanner {
					          bannerContent
					          bannerTitle
					          bannerSubtitle
					          bannerMedia {
					            urls
					          }
					          contentLink {
					            contentItems {
					              ... on EventPost {
					                path
					              }
					              ... on EventPost2 {
					                path
					              }
					            }
					          }
					        }
					      }
					    }
					    aboutTitle
					    aboutSubtitle
					    abountContentMedia {
					      urls
					    }
					  }
					}`
		}

		let events = {

			_gql: `query {
				  # 活動列表
				  event{
				    list {
				      contentItems (first: 4){
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
				}`

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

		let products = {

			_gql:`query{
				  productItem(first: 6) {
				    productTitle
				    productPicture {
				      urls(first: 1)
				    }
				    productPrice
				  }
				}`

		}

		//get api data
		fetchingAPI(config.fetchOption,homePage).then( data => {

			//console.log("data=", data )

			vm.about.aboutTitle = data.homePage[0].aboutTitle
			vm.about.aboutSubtitle = data.homePage[0].aboutSubtitle
			vm.about.abountContentMedia = data.homePage[0].abountContentMedia.urls
			vm.slick.kv = data.homePage[0].kV.contentItems

		})

		fetchingAPI(config.fetchOption,events).then( data => {

			//console.log("data=", data )

			vm.events = data.event[0].list.contentItems

		})

		fetchingAPI(config.fetchOption,products).then( data => {

			//console.log("data=", data )

			vm.products = data.productItem

		})

		fetchingAPI(config.fetchOption,taxonomy).then( data => {

			//console.log("data=", data.taxonomy[0].taxonomy.contentItems )

			vm.taxonomy = data.taxonomy[0].taxonomy.contentItems
			
		})

	}

	
	initapp()


});


