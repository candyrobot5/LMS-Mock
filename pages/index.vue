<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3>LMS-Mock</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">TOP</div>
    </div>
    <div class="row">
      <div class="col-12">
        <a href="#" @click.prevent="goPlayground">
          <span>Playground</span>
          <b-icon icon="chevron-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goPlayground() {
      this.$router.push({
        path: '/playground'
      })
    }
  }
}
</script>
