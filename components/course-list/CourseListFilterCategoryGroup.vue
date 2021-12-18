<template>
  <b-card no-body class="border-0">
    <b-card-header
      :aria-expanded="isCollapsed ? 'true' : 'false'"
      :aria-controls="collapseId"
      class="p-0 bg-white border-0"
      role="button"
      @click="onToggleCollapse"
    >
      <b-icon
        icon="chevron-right"
        variant="secondary"
        class="my-group-icon"
        :class="isCollapsed ? 'spin' : ''"
      />
      <span>{{ category.name }}</span>
    </b-card-header>
    <!-- category options -->
    <b-collapse :id="collapseId" v-model="isCollapsed">
      <b-list-group v-if="category.options && category.options.length > 0">
        <b-list-group-item
          v-for="(option, coIdx) in category.options"
          :key="coIdx"
          class="p-2 border-0"
        >
          <a
            href="#"
            @click.prevent.stop="
              onChangeFilter({
                name: 'categoryId',
                value: option.id
              })
            "
          >
            {{ option.name }}
          </a>
        </b-list-group-item>
      </b-list-group>
    </b-collapse>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CourseListFilterCategoryGroup',
  props: {
    identify: {
      type: Number,
      required: true,
      default: -1
    },
    category: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      isCollapsed: false,
      collapseId: `categoryOptionsCollapse-${this.identify}`
    }
  },
  methods: {
    // $store
    ...mapActions('pages/playground/course-list', {
      onChangeFilter: 'setFilter'
    }),
    onToggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-group-icon {
  transition: transform 350ms;
  transform: rotate(0deg);
  &.spin {
    transition: transform 350ms;
    transform: rotate(90deg);
  }
}
</style>
