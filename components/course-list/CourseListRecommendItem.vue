<template>
  <b-card img-src="https://placekitten.com/480/210" img-top no-body>
    <b-card-footer class="p-2">
      <b-row>
        <b-col>
          {{ recommend.name }}
        </b-col>
      </b-row>
      <!-- recommend rating -->
      <b-row>
        <b-col cols="10">
          <b-form-rating
            disabled
            size="sm"
            :value="recommend.rating"
            class="px-0 py-1 border-0 my-recommend-rating"
          />
        </b-col>
      </b-row>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'CourseListRecommendItem',
  props: {
    recommend: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-recommend-rating {
  &.b-rating.disabled {
    background-color: #fff;
    color: #f80;
  }
}
</style>
