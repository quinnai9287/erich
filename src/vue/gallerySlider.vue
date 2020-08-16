    <template>
      <div>
          <div class="slide" v-for="slide in slides">
            <a data-fancybox="gallery" :href="slide.imgsrc"><img :src="slide.imgsrc" alt=""></a>
          </div>
      </div>
    </template>
    
    <script>
      define(["Vue"], function(Vue) {
          Vue.component('gallery-slider', {
            template: template,
            props: ['slides','domain'],
            data () {
              return {
                 sliderOptions: {
                  dots: true,
                  arrows: false,
                  mobileFirst: true,
                  infinite: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  responsive: [
                      {
                         breakpoint: 992,
                         settings: "unslick"
                      }
                  ]
                }
              };
            },
            created() {
              window.addEventListener("resize", this.slickResize);
            },
            destroyed() {
              window.removeEventListener("resize", this.slickResize);
            },
            methods: {
              initSlider() {
                $(this.$el).slick( this.sliderOptions );
              },
              destroySlider() {
                $(this.$el).slick('unslick');
              },
              slickResize(e) {
                if( $(window).width() < 992){
                    this.destroySlider()
                  Vue.nextTick( () => {
                    this.initSlider();  
                  });  
                }
              }
            },
            mounted () {
              this.initSlider();
              //console.log('gallery-slider:',this)
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