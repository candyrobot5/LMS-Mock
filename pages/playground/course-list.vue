<template>
  <b-container fluid>
    <!-- Title -->
    <b-row class="app-main-content-header">
      <b-col cols="12">
        <h4>コース一覧画面</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row align-v="stretch" class="app-main-content-body">
      <b-col cols="12" align-self="stretch">
        <b-row>
          <!-- categories -->
          <b-col class="my-course-category">
            <!-- CourseLisetFilterCategories.vue -->
            <course-list-filter-categories :categories="categories" />
          </b-col>
          <!-- courses -->
          <b-col cols="8">
            <!-- recommend list -->
            <!-- CourseListRecommends.vue -->
            <course-list-recommends :recommends="recommends" />
            <!-- course list -->
            <b-row class="pb-3">
              <b-col>
                <!-- course list sort & filter -->
                <b-row class="pb-3">
                  <b-col>
                    <b-row align-h="between">
                      <b-col cols="9">
                        <b-row>
                          <!-- sort -->
                          <b-col cols="4">
                            <div><h6 class="small">並べ替え</h6></div>
                            <b-form-select
                              v-model="sort"
                              size="sm"
                              :options="defs.sortOptions"
                            >
                              <template #first>
                                <b-form-select-option :value="null">
                                  並び替え
                                </b-form-select-option>
                              </template>
                            </b-form-select>
                          </b-col>
                          <!-- filter -->
                          <b-col>
                            <div><h6 class="small">フィルター</h6></div>
                            <div class="form-inline">
                              <!-- filter category -->
                              <b-form-select
                                :value="filters.categoryId"
                                size="sm"
                                class="mr-2"
                                :options="filterCategoryOptions"
                                @input="
                                  onChangeFilter({
                                    name: 'categoryId',
                                    value: $event
                                  })
                                "
                              >
                                <template #first>
                                  <b-form-select-option :value="null">
                                    カテゴリー
                                  </b-form-select-option>
                                </template>
                              </b-form-select>
                              <!-- filter learningProgress -->
                              <b-form-select
                                :value="filters.learningProgress"
                                size="sm"
                                class="mr-2"
                                :options="defs.filterLearningProgressOptions"
                                @input="
                                  onChangeFilter({
                                    name: 'learningProgress',
                                    value: $event
                                  })
                                "
                              >
                                <template #first>
                                  <b-form-select-option :value="null">
                                    習熟度
                                  </b-form-select-option>
                                </template>
                              </b-form-select>
                              <!-- filter instructor -->
                              <b-form-select
                                :value="filters.instructorId"
                                size="sm"
                                class="mr-2"
                                :options="defs.filterInstructorOptions"
                                @input="
                                  onChangeFilter({
                                    name: 'instructorId',
                                    value: $event
                                  })
                                "
                              >
                                <template #first>
                                  <b-form-select-option :value="null">
                                    講師
                                  </b-form-select-option>
                                </template>
                              </b-form-select>
                              <!-- filter reset -->
                              <b-button
                                size="sm"
                                variant="light"
                                @click="onResetFilter"
                                >リセット</b-button
                              >
                            </div>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col cols="3">
                        <b-row align-v="end" class="h-100">
                          <b-col>
                            <b-input-group size="sm">
                              <b-form-input placeholder="コースを検索する" />
                              <b-input-group-append is-text>
                                <b-icon icon="search" />
                              </b-input-group-append>
                            </b-input-group>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
                <!-- course list items -->
                <b-row class="pb-3">
                  <b-col>
                    <b-row>
                      <b-col><h3>コース</h3></b-col>
                    </b-row>
                    <b-row>
                      <b-col
                        v-for="(course, idx) in filteredCourse"
                        :key="idx"
                        cols="4"
                        class="pb-2"
                      >
                        <!-- CourseListItem.vue -->
                        <course-list-item :course="course" />
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <!-- activities -->
          <b-col class="my-course-activity">
            <!-- CourseList -->
            <course-list-activities :activities="activities" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

class CourseCategory {
  constructor(id, name, options) {
    this.id = id
    this.name = name
    this.options = options
  }
}

class CourseItem {
  constructor(
    id,
    name,
    categoryId,
    instructorId,
    learningProgress,
    rating,
    price
  ) {
    this.id = id
    this.name = name
    this.categoryId = categoryId
    this.instructorId = instructorId
    this.learningProgress = learningProgress
    this.rating = rating
    this.price = price
  }
}

class CourseRecommend {
  constructor(id, name, rating) {
    this.id = id
    this.name = name
    this.rating = rating
  }
}

class CourseActivity {
  constructor(id, name, rating) {
    this.id = id
    this.name = name
    this.rating = rating
  }
}

class CourseSortOptions {
  static RELEVANCE = 'relevance' // 関連度順
  static MOST_REVIEWED = 'most-reviewed' // レビューの多い順
  static HIGHEST_RATED = 'highest-rated' // 最高評価
  static NEWEST = 'newest' // 最新
  static PRICE_LOW_TO_HIGHT = 'price-low-to-high' // 最安値
  static PRICE_HIGHT_TO_LOW = 'price-high-to-low' // 最高値
}

export default {
  name: 'PlaygroundCourseList',
  data() {
    // defines (固定値)
    const defs = Object.freeze({
      filterLearningProgressOptions: [
        { value: 0, text: '未修' },
        { value: 50, text: '学習中' },
        { value: 100, text: '完了済み' }
      ],
      filterInstructorOptions: [
        { value: 1, text: '山田　一郎' },
        { value: 2, text: '佐藤　次郎' },
        { value: 3, text: '町田　三郎' },
        { value: 4, text: '豊海　四郎' }
      ],
      sortOptions: [
        // { value: CourseSortOptions.RELEVANCE, text: '関連度順' },
        // { value: CourseSortOptions.MOST_REVIEWED, text: 'レビューの多い順' },
        { value: CourseSortOptions.HIGHEST_RATED, text: '最高評価' },
        // { value: CourseSortOptions.NEWEST, text: '最新' },
        { value: CourseSortOptions.PRICE_LOW_TO_HIGHT, text: '最安値' },
        { value: CourseSortOptions.PRICE_HIGHT_TO_LOW, text: '最高値' }
      ]
    })
    // サイドバーのカテゴリーを作成
    const categories = Array.from({ length: 7 }).map((_, cIdx) => {
      const num = cIdx + 1
      const options = Array.from({ length: 4 }).map((_, coIdx) => {
        const optNum = coIdx + 1
        return { id: `${num}-${optNum}`, name: `カテゴリー${num} - ${optNum}` }
      })
      return new CourseCategory(num, `カテゴリー${num}`, options)
    })
    // コースのデータを作成
    const courses = Array.from({ length: 16 }).map((_, idx) => {
      const num = idx + 1
      const categoryId = `${(idx % 4) + 1}-1`
      const instructorId = (idx % 2) + 1
      const learningProgresses = [0, 50, 100]
      const learningProgress =
        learningProgresses[idx % learningProgresses.length]
      const ratings = [1.0, 2.5, 3.0, 3.5, 4.0, 5.0]
      const rating = ratings[idx % ratings.length]
      const prices = [1000, 1500, 2000, 2500]
      const price = prices[idx % prices.length]
      return new CourseItem(
        num,
        `コース ${num}`,
        categoryId,
        instructorId,
        learningProgress,
        rating,
        price
      )
    })
    // おすすめのデータを作成
    const recommends = Array.from({ length: 10 }).map((_, idx) => {
      const num = idx + 1
      return new CourseRecommend(num, `おすすめコース ${num}`, 2.5)
    })
    /// アクティビティのデータを作成
    const activities = Array.from({ length: 3 }).map((_, idx) => {
      const num = idx + 1
      return new CourseActivity(num, `アクティビティ ${num}`, 3.5)
    })
    // data return
    return {
      defs,
      categories,
      courses,
      recommends,
      activities,
      sort: null
    }
  },
  computed: {
    filteredCourse() {
      // フィルタリング
      const filteredCourse = this.courses.filter((course) => {
        const checks = []
        // カテゴリーでフィルタリングする
        if (
          this.filters.categoryId !== null &&
          course.categoryId !== this.filters.categoryId
        ) {
          checks.push(false)
        }
        // 習熟度でフィルタリングする
        if (
          this.filters.learningProgress !== null &&
          course.learningProgress !== this.filters.learningProgress
        ) {
          checks.push(false)
        }
        // 講師でフィルタリングする
        if (
          this.filters.instructorId !== null &&
          course.instructorId !== this.filters.instructorId
        ) {
          checks.push(false)
        }
        return checks.length === 0 || checks.every((chk) => chk)
      })
      // ソート
      filteredCourse.sort((a, b) => {
        let compare = 1
        switch (this.sort) {
          // 最高評価 でソート
          case CourseSortOptions.HIGHEST_RATED: {
            compare = b.rating - a.rating
            break
          }
          // 最安値 でソート
          case CourseSortOptions.PRICE_LOW_TO_HIGHT: {
            compare = a.price - b.price
            break
          }
          // 最高値 でソート
          case CourseSortOptions.PRICE_HIGHT_TO_LOW: {
            compare = b.price - a.price
            break
          }
          default: {
            compare = a.id - b.id
          }
        }
        return compare
      })
      return filteredCourse
    },
    filterCategoryOptions() {
      return this.categories.map((category) => {
        const options = category.options.map((categoryOption) => {
          return { value: categoryOption.id, text: categoryOption.name }
        })
        return { label: category.name, options }
      })
    },
    // $store
    ...mapState('pages/playground/course-list', ['filters'])
  },
  methods: {
    // $store
    ...mapActions('pages/playground/course-list', {
      onResetFilter: 'resetFilters',
      onChangeFilter: 'setFilter'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-course {
  /* .my-course-category */
  &-category {
    width: 160px;
  }
  /* .my-course-activity */
  &-activity {
    width: 160px;
  }
}
</style>
