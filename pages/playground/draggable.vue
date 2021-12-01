<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <a href="#" @click.prevent="goHome">return Home</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>vue.draggable テスト</h4>
      </div>
    </div>
    <draggable
      class="row"
    >
      <div
        v-for="(item, idx) in list"
        :key="idx"
        class="col-3 mb-2"
      >
        <b-card>
          <template #header>{{item.header}}</template>
          <b-card-text>
            {{item.text}}
          </b-card-text>
        </b-card>
      </div>
    </draggable>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Text</th>
            </tr>
          </thead>
          <draggable tag="tbody">
            <tr
              v-for="(item, idx) in data"
              :key="idx"
            >
              <td>{{item.id}}</td>
              <td>{{item.text}}</td>
            </tr>
          </draggable>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'PlaygloundList',
  components: {
    draggable
  },
  data () {
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
        { header: 'head-10', text: 'body-10' },
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
        { id: 10, text: 'data-10' },
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        path: '/',
      })
    }
  }
}
</script>
