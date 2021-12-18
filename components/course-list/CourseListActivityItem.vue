<template>
  <div class="my-activity">
    <b-card no-body img-src="https://placedog.net/320/200" img-top />
    <div class="my-activity-cover">
      <b-row no-gutters>
        <b-col cols="4">
          <b-avatar variant="secondary" class="border-4 border-white" />
        </b-col>
        <b-col>
          <div class="small font-weight-bold">○○さんが受講しました。</div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseListActivityItem',
  props: {
    activity: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-activity {
  /* .my-activity-cover */
  &-cover {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.75);
  }
}
</style>
