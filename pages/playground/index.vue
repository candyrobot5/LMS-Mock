<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <a href="#" @click.prevent="goHome">return Home</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h4>Playground</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a href="#" @click.prevent="goDraggablePage"><h5>go Vue.Draggable Test</h5></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaygroundIndex',
  methods: {
    goHome () {
      this.$router.push({
        path: '/',
      })
    },
    goDraggablePage () {
      this.$router.push({
        path: '/playground/draggable',
      })
    }
  }
}
</script>
