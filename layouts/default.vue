<template>
  <div>
    <!-- Header -->
    <header>
      <div
        v-if="$route.matched[0].path !== ''"
        class="container-fluid bg-light app-header"
      >
        <!-- return page link -->
        <div class="row my-default-header-content">
          <div class="col-12">
            <a href="#" @click.prevent="goAbovePage">
              <b-icon icon="arrow-return-left" />
              Return
            </a>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <main>
      <Nuxt class="my-default-main-content" />
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
    goAbovePage() {
      const abovePath = this.$route.matched[0].path.replace(/\/[^/]+$/, '')
      const path = abovePath === '' ? '/' : abovePath
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-default-header-content {
  padding: 8px;
}
.my-default-main-content {
  padding: 8px;
}
</style>
