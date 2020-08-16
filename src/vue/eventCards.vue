<template>
	<div class="ert-cards-group" :class="options.groupClass">
		<div class="col-6 col-lg-4" v-for="card in cards">
			<div class="card">
				<a class="card-img-outer" :href="domain+card.path">
					<img :src="domain+card.eventKVSQ.urls" :alt="card.eventTitle" class="card-img"></img>
				</a>
				<div class="card-cate">{{ card.eventDateBegin!=undefined ? '行銷活動' : '烘培教室' }}</div>
				<a class="card-title-link" :href="domain+card.path"><h4 class="card-title">{{ card.eventTitle }}</h4></a>
				<div class="card-time" v-if="card.eventDateBegin != undefined">{{card.eventDateBegin | moment }} - {{card.eventDateEnd | moment }}</div>
				<div class="card-tags" v-if="card.eventTags != undefined || card.eventTags2 != undefined">
					<small class="tag" href="javascript:;" v-if="card.eventTags != undefined" v-for=" tags in card.eventTags.termContentItems">{{ tags.displayText }}</small>
					<small class="tag cyan" href="javascript:;" class="cyan" v-if="card.eventTags2 != undefined" v-for=" tags in card.eventTags2.termContentItems">{{ tags.displayText }}</small>
				</div>
	          	<p class="card-summary">{{ card.eventSummary }}</p>
	        	<a class="card-link" :href="domain+card.path">閱讀更多</a>
          	</div>
        </div>
	</div>
</template>

<script>
  define(["Vue"], function(Vue) {
      Vue.component('event-cards', {
        template: template,
        props: ['cards','domain','options'],
        data () {
          return {
             
 
          };
        },
        computed:{
          hascard(){
            return this.cards.length
          }
        },
        filters: {
    		  moment: function (date) {
    		    return moment(date).format('YYYY/MM/DD');
    		  }
    		},
        mounted(){
        	//console.log('ert-cards.vue:',this)
        }
      });
    });
</script>