    <template>
        <div>
    		  <div class="ert-btns-group">
    				<a v-for="i in btns " :href="domain+i.path" class="btn btn-outline-primary" :class="{ 'active disabled' : currentid == i.contentItemId ? true : false }">{{ i.displayText }}</a>
    			</div>
        </div>
    </template>
    
    <script>
      define(["Vue"], function(Vue) {
          Vue.component('product-category', {
            template: template,
            props: ['btns','domain','current'],
            computed:{
              currentid(){
                return this.$props.current != undefined ? this.$props.current.contentItemId : " "
              }
            },
            mounted(){
              //console.log('pc=',this,this.current)
            }
          });
        });
    </script>