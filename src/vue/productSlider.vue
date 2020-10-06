    <template>
      <div>
          <div class="slide" v-for="slide in slides">
            <div class="card">
                <a class="card-img-outer" :href="domain+slide.path">
                    <img :src="domain+slide.productPicture.urls" :alt="slide.productTitle" class="card-img"></img>
                </a>
                <a class="card-title-link" :href="domain+slide.path"><h4 class="card-title">{{ slide.productTitle }}</h4></a>
                <p class="card-time">{{ slide.productPrice }}</p>
            </div>
          </div>
      </div>
    </template>
    
    <script>
      define(["Vue"], function(Vue) {
          Vue.component('products-slider', {
            template: template,
            props: ['slides','domain'],
            data () {
              return {
                 sliderOptions: {
                  dots: true,
                  arrows: false,
                  mobileFirst: true,
                  infinite: false,
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  responsive: [
                      {
                         breakpoint: 992,
                         settings: {
                            slidesToShow: 3
                         }
                      }
                  ]
                }
              };
            },
            methods: {
              initSlider() {
                $(this.$el).slick( this.sliderOptions );
              },
              destroySlider() {
                $(this.$el).slick('unslick');
              }
            },
            mounted () {
              this.initSlider();
              //console.log('pd-slider:',this)
            },
            watch: {
              slides() {
                this.destroySlider();
                Vue.nextTick( () => {
                  this.initSlider();  
                });      
              }
            }
          });
        });
    </script>