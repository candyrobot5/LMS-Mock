<template>
  <div>
    <!-- Header -->
    <header>
      <div v-if="!isHome" class="container-fluid bg-light app-header">
        <!-- go Home link -->
        <div class="row my-header-content">
          <div class="col-12">
            <a href="#" @click.prevent="goHome">
              <b-icon icon="arrow-return-left" />
              Home
            </a>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <main>
      <Nuxt class="my-main-content" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutsDefault',
  computed: {
    isHome() {
      return this.$route.matched[0].path === ''
    }
  },
  methods: {
    goHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-header-content {
  padding: 4px;
}
.my-main-content {
  padding: 4px;
}
</style>
