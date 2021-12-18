<template>
  <div>
    <b-card no-body img-src="https://placekitten.com/380/200" img-top>
      <b-card-body class="p-2">
        <b-row>
          <b-col cols="8">{{ course.name }}</b-col>
          <b-col cols="4" class="small text-muted text-right">
            <b-badge
              class="px-3 py-1 text-white"
              variant="none"
              :class="{
                'bg-green-500': course.categoryId.startsWith('1-'),
                'bg-indigo-600': course.categoryId.startsWith('2-'),
                'bg-pink-600': course.categoryId.startsWith('3-'),
                'bg-purple-600': course.categoryId.startsWith('4-')
              }"
            >
              {{ course.categoryId }}
            </b-badge>
          </b-col>
        </b-row>
        <!-- instructor -->
        <b-row>
          <b-col class="small text-muted"
            >講師: {{ instructorName(course.instructorId) }}</b-col
          >
        </b-row>
        <!-- price -->
        <b-row>
          <b-col class="small"> ￥{{ course.price.toLocaleString() }} </b-col>
        </b-row>
        <!-- learning progress -->
        <b-row>
          <b-col class="small text-muted">
            {{ course.learningProgress }} %
          </b-col>
        </b-row>
        <!-- rating -->
        <b-row>
          <b-col cols="8">
            <b-form-rating
              disabled
              :value="course.rating"
              class="p-1 border-0 my-item-rating"
            />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
// import { shape, number } from 'vue-types'

export default {
  name: 'CourseListItem',
  props: {
    /*
    course: shape({
      id: number().isRequired,
      name: String,
      categoryId: String,
      learningProgress: number().isRequired,
      instructorId: number().isRequired,
      rating: number().isRequired,
      price: number().isRequired,
    }),
    */
    course: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    const defs = Object.freeze({
      instructors: [
        { id: 1, name: '山田　一郎' },
        { id: 2, name: '佐藤　次郎' },
        { id: 3, name: '町田　三郎' },
        { id: 4, name: '豊海　四郎' }
      ]
    })
    return {
      defs
    }
  },
  methods: {
    instructorName(id) {
      return this.defs.instructors.find((ins) => ins.id === id)?.name ?? ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-item-rating {
  &.b-rating.disabled {
    background-color: #fff;
    color: #f80;
  }
}
</style>
