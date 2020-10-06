<template>
  <div>
    <div v-if="hascard" class="ert-cards-group" :class="options.groupClass">
      <div class="col-6 col-lg-4" v-for="item in cards">
        <div class="card">
            <a class="card-img-outer" :href="domain+'/product/'+item.path">
                <img :src="domain+item.productPicture.urls" :alt="item.productTitle" class="card-img"></img>
            </a>
            <a class="card-title-link" :href="domain+'/product/'+item.path"><h4 class="card-title">{{ item.productTitle }}</h4></a>
            <p class="card-time">{{ item.productPrice }}</p>
            </div>
      </div>
    </div>
    <div v-else class="ert-cards-group empty" :class="{visible:init}"><h3>此分類沒有商品喔！</h3></div>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
      Vue.component('product-cards', {
        template: template,
        props: ['cards','domain', 'options'],
        data () {
          return {
            init: false
          };
        },
        computed:{
          hascard(){
            return this.cards.length
          }
        },
        updated(){
          this.init = true 
        },
        mounted(){
        	//console.log('product-cards.vue:',this)
          
        }
      });
    });
</script>