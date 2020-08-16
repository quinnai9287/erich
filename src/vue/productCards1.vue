<template>
  <div>
    <div class="ert-cards-group">
      <div class="col-6 col-lg-4" v-for="item in cards">
        <div class="card">
            <a class="card-title-link"><h4 class="card-title">{{ this.gql }}</h4></a>
            <a class="card-title-link" :href="domain+'/product/'+item.path"><h4 class="card-title">{{ item.productTitle }}</h4></a>
            <p class="card-summary">{{ item.productPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  define(["Vue",'Axios'], function(Vue,Axios) {
      Vue.component('product-cards1', {
        template: template,
        props: [ 'gql', 'fetch', 'options','domain' ],
        data () {
          return {
            init: true
          };
        },
        computed:{
          cards:function(){
          }
        },
        updated(){
          this.fetching(this.fetch,this.gql)
        },
        methods:{
          async getdata(){
            try {
              const res = await Axios.post(
                'https://erich-t.blockcode.com.tw/api/graphql', {
                query: `query{
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
                      }`
              })
              console.log('data', data)
            } catch (e) {
              console.log('err', e)
            }
          }
        },
        mounted(){
          this.getdata()
          console.log('product-cards1.vue:',this)
      });
    });
</script>