<template>
  <div class="my-default">
    <!-- Header -->
    <header class="app-header bg-light">
      <b-container fluid class="bg-light">
        <b-row>
          <b-col cols="12">
            <h3>LMS-Mock</h3>
          </b-col>
        </b-row>
      </b-container>
    </header>
    <!-- Sidebar -->
    <Sidebar ref="sidebar" @update:state="onUpdateSidebarState" />
    <!-- Main Content -->
    <main class="app-main my-default-main" :class="styleMainContent">
      <div class="my-default-main-wrapper">
        <Nuxt class="app-main-content my-default-main-content" />
      </div>
    </main>
  </div>
</template>

<script>
import { SidebarState } from '~/components/Sidebar.vue'

export default {
  name: 'LayoutsDefault',
  data() {
    return {
      sidebarState: SidebarState.OPENED
    }
  },
  computed: {
    isHome() {
      return this.$route.matched[0].path === ''
    },
    // main-content style
    styleMainContent() {
      let cls = null
      switch (this.sidebarState) {
        case SidebarState.CLOSED:
          cls = 'my-default-main--fulled'
          break
        case SidebarState.COLLAPSED:
          cls = 'my-default-main--expanded'
          break
        default: // SidebarState.OPENED
      }
      return cls
    }
  },
  methods: {
    // サイドバーの開閉イベント
    onUpdateSidebarState(event) {
      this.sidebarState = event
    },
    // ヘッダーメニュークリック
    onClickHeaderMenu() {
      // サイドバーの開閉
      this.$refs.sidebar.state =
        this.$refs.sidebar.state === SidebarState.OPENED
          ? SidebarState.CLOSED
          : SidebarState.OPENED
      this.sidebarState = this.$refs.sidebar.state
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

.my-default {
  /* .my-default-main */
  &-main {
    position: fixed;
    width: calc(100vw - #{$sidebar-opened-width});
    height: calc(100vh - #{$app-header-height});
    top: $app-header-height;
    left: $sidebar-opened-width;
    transition: left 0.3s ease, width 0.3s ease;
    /* .my-default-main-wrapper */
    &-wrapper {
      height: calc(100vh - #{$app-header-height});
      overflow-y: auto;
      overflow-x: auto;
      background-color: #f0f0f0;
    }
    /* .my-default-main-content */
    &-content {
      height: calc(100vh - #{$app-header-height});
      /* .my-default-main-content__header */
      &__header {
        /* 位置固定 */
        position: fixed;
        top: 64px;
        z-index: 1020;
        width: calc(100% - #{$sidebar-opened-width});
      }
      /* .my-default-main-content__body */
      &__body {
        height: calc(
          100vh - #{$app-header-height} - #{$app-main-content-header-height}
        );
        padding-top: $app-main-content-header-height;
        /* .my-default-main-content__body--no-header */
        &--no-header {
          height: calc(100vh - #{$app-header-height});
        }
      }
    }
    /* .my-default-main--expanded */
    &--expanded {
      width: calc(100% - #{$sidebar-collapsed-width});
      left: $sidebar-collapsed-width;
    }
    /* .my-default-main--fulled */
    &--fulled {
      width: 100%;
      left: $sidebar-closed-width;
    }
  }
}
</style>
