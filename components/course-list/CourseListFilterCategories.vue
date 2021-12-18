<template>
  <b-card no-body>
    <b-card-header class="p-1">
      <h6 class="px-3">カテゴリーで探す</h6>
    </b-card-header>
    <b-card-body class="p-1">
      <b-list-group>
        <b-list-group-item
          v-for="(category, cIdx) in categories"
          :key="cIdx"
          class="p-2 border-0"
        >
          <!-- CourseListFilterCategoryGroup.vue -->
          <course-list-filter-category-group
            :category="category"
            :identify="cIdx"
          />
        </b-list-group-item>
      </b-list-group>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CourseListFilterCategories',
  props: {
    categories: {
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
