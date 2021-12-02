<template>
  <div class="container-fluid">
    <!-- Title -->
    <div class="row">
      <div class="col-12">
        <h4>Playground</h4>
      </div>
    </div>
    <!-- -- -->
    <div class="row">
      <div class="col-12">
        <a href="#" @click.prevent="goDraggablePage">
          <span>Vue.Draggable Test</span>
          <b-icon icon="chevron-right" />
        </a>
      </div>
      <div class="col-12">
        <a href="#" @click.prevent="goChatPage">
          <span>Chat Test</span>
          <b-icon icon="chevron-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaygroundIndex',
  methods: {
    goDraggablePage() {
      this.$router.push({
        path: '/playground/draggable'
      })
    },
    goChatPage() {
      this.$router.push({
        path: '/playground/chat'
      })
    }
  }
}
</script>
