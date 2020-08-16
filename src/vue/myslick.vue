    <template>
      <div>
          <div class="slide" v-for="slide in slides">
            <div class="slide-img">
              <picture>
                  <img :src="domain + slide.bannerMedia.urls[0]"  :alt="slide.bannerTitle">
              </picture>
            </div>
              <a :href="domain + slide.contentLink.contentItems[0].path" class="ert-carousel-caption">
                <div class="title">{{ slide.bannerTitle }}</div>
                <div class="subtitle">{{ slide.bannerSubtitle }}</div>
                <div class="summary">{{ slide.bannerContent }}</div>
              </a>
        </div>
      </div>
    </template>
    
    <script>
      define(["Vue"], function(Vue) {
          Vue.component('slick-slider', {
            template: template,
            props: ['slides','domain'],
            data () {
              return {
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
              //console.log('slick comp')
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