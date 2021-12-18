<template>
  <b-container fluid>
    <b-row class="pb-3">
      <b-col>
        <b-row>
          <b-col><h6>○○さんへのおすすめ</h6></b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- slider -->
            <b-carousel id="myRecommendsSlide" controls :interval="0">
              <b-carousel-slide
                v-for="(slides, sIdx) in recommendsSlides"
                :key="sIdx"
                img-blank
              >
                <template #img>
                  <b-row class="px-5">
                    <b-col
                      v-for="(recommend, rIdx) in slides"
                      :key="rIdx"
                      cols="3"
                    >
                      <!-- CourseListRecommendItem.vue -->
                      <course-list-recommend-item :recommend="recommend" />
                    </b-col>
                  </b-row>
                </template>
              </b-carousel-slide>
            </b-carousel>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'CourseListRecommends',
  props: {
    recommends: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    const defs = Object.freeze({
      recommendsSlideItemsMax: 4
    })
    return {
      defs
    }
  },
  computed: {
    recommendsSlides() {
      const length = Math.ceil(
        this.recommends.length / this.defs.recommendsSlideItemsMax
      )
      const slides = Array.from({ length }, (_, idx) => {
        const recommends = [...this.recommends]
        const slideItem = recommends.splice(
          idx * this.defs.recommendsSlideItemsMax,
          this.defs.recommendsSlideItemsMax
        )
        return slideItem
      })
      return slides
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

#myRecommendsSlide {
  &::v-deep .carousel-control-prev,
  &::v-deep .carousel-control-next {
    width: 40px;
    opacity: 0;
    &:focus,
    &:hover {
      opacity: 1;
    }
    & .carousel-control-prev-icon {
      width: 40px;
      height: 40px;
      background-image: none;
      &::before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        font-size: 32px;
        content: '\f137';
        color: #404040;
      }
    }
    & .carousel-control-next-icon {
      width: 40px;
      height: 40px;
      background-image: none;
      &::before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        font-size: 32px;
        content: '\f138';
        color: #404040;
      }
    }
  }
}
</style>
