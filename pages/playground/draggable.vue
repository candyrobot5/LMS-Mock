<template>
  <b-container fluid>
    <!-- Title -->
    <b-row no-gutters class="app-main-content-header">
      <b-col cols="12">
        <h4>リストのドラッグ</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row no-gutters class="app-main-content-body">
      <b-col cols="12">
        <!-- Card -->
        <b-row no-gutters>
          <b-col cols="12">
            <h6>Card D＆D</h6>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col cols="12">
            <b-card class="mx-3">
              <draggable
                v-bind="draggableSettings"
                @start="isDragging = true"
                @end="isDragging = false"
              >
                <transition-group
                  type="transition"
                  :name="!isDragging ? 'flip-list' : null"
                  class="row"
                >
                  <b-col
                    v-for="(item, lIdx) in list"
                    :key="lIdx"
                    cols="3"
                    class="mb-2"
                  >
                    <b-card>
                      <template #header>{{ item.header }}</template>
                      <b-card-text>
                        {{ item.text }}
                      </b-card-text>
                    </b-card>
                  </b-col>
                </transition-group>
              </draggable>
            </b-card>
          </b-col>
        </b-row>
        <!-- Table -->
        <b-row no-gutters class="mt-3">
          <b-col cols="12">
            <h6>Table row D＆D</h6>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col cols="12">
            <b-card class="mx-3">
              <transition-group
                type="transition"
                tag="table"
                class="table"
                :name="!isDragging ? 'flip-list' : null"
              >
                <thead key="thead">
                  <tr>
                    <th>ID</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <draggable
                  v-bind="draggableSettings"
                  key="draggable"
                  tag="tbody"
                  @start="isDragging = true"
                  @end="isDragging = false"
                >
                  <tr v-for="(item, dIdx) in data" :key="dIdx" class="bg-light">
                    <td>{{ item.id }}</td>
                    <td>{{ item.text }}</td>
                  </tr>
                </draggable>
              </transition-group>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'PlaygloundDraggable',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { header: 'head-01', text: 'body-01' },
        { header: 'head-02', text: 'body-02' },
        { header: 'head-03', text: 'body-03' },
        { header: 'head-04', text: 'body-04' },
        { header: 'head-05', text: 'body-05' },
        { header: 'head-06', text: 'body-06' },
        { header: 'head-07', text: 'body-07' },
        { header: 'head-08', text: 'body-08' },
        { header: 'head-09', text: 'body-09' },
        { header: 'head-10', text: 'body-10' }
      ],
      data: [
        { id: 1, text: 'data-01' },
        { id: 2, text: 'data-02' },
        { id: 3, text: 'data-03' },
        { id: 4, text: 'data-04' },
        { id: 5, text: 'data-05' },
        { id: 6, text: 'data-06' },
        { id: 7, text: 'data-07' },
        { id: 8, text: 'data-08' },
        { id: 9, text: 'data-09' },
        { id: 10, text: 'data-10' }
      ],
      isDragging: false
    }
  },
  computed: {
    draggableSettings() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
