<template>
  <div class="container-fluid">
    <!-- Title -->
    <div class="row">
      <div class="col-12">
        <h4>vue.draggable sample</h4>
      </div>
    </div>
    <!-- Card -->
    <div class="row">
      <div class="col-12">
        <h5>Card D＆D</h5>
      </div>
    </div>
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
        <div v-for="(item, idx) in list" :key="idx" class="col-3 mb-2">
          <b-card>
            <template #header>{{ item.header }}</template>
            <b-card-text>
              {{ item.text }}
            </b-card-text>
          </b-card>
        </div>
      </transition-group>
    </draggable>
    <!-- Table -->
    <div class="row">
      <div class="col-12">
        <h5>Table row D＆D</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
            <tr v-for="(item, idx) in data" :key="idx">
              <td>{{ item.id }}</td>
              <td>{{ item.text }}</td>
            </tr>
          </draggable>
        </transition-group>
      </div>
    </div>
  </div>
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

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
