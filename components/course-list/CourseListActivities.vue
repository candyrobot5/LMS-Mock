<template>
  <b-card no-body>
    <b-card-header class="p-1">
      <h6 class="px-3">アクティビティ</h6>
    </b-card-header>
    <b-card-body class="p-1">
      <b-list-group>
        <b-list-group-item
          v-for="(activity, idx) in activities"
          :key="idx"
          class="p-2 pb-3 border-0"
        >
          <!-- CourseListAcivityItem.vue -->
          <course-list-activity-item :activity="activity" />
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CourseListActivities',
  props: {
    activities: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';
</style>
