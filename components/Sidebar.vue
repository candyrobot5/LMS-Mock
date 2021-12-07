<template>
  <aside class="my-sidebar">
    <sidebar-menu
      :menu="menu"
      :collapsed="isCollapsed"
      :width="width"
      :width-collapsed="widthCollapsed"
      :hide-toggle="true"
      :disable-hover="true"
      class="my-sidebar__content"
      :class="{ 'my-sidebar__content--hidden': isHidden }"
      @toggle-collapse="onToggleCollapse"
    />
  </aside>
</template>

<script>
/**
 * used `vue-sidebar-menu` plugin
 */
import { SidebarMenu } from 'vue-sidebar-menu'
import style from '~/assets/style/custom-var.scss'

export class SidebarState {
  static OPENED = 0
  static COLLAPSED = 1
  static CLOSED = 9
}

export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      $_privateState: SidebarState.OPENED,
      isCollapsed: false,
      isHidden: false,
      width: style.sidebarOpenedWidth || '250px',
      widthCollapsed: style.sidebarCollapsedWidth || '50px',
      menu: [
        {
          header: false,
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Home',
          icon: {
            element: 'b-icon',
            attributes: {
              icon: 'house-door-fill'
            }
          }
        },
        {
          title: 'モックアップ一覧',
          icon: {
            element: 'b-icon',
            attributes: {
              icon: 'puzzle-fill'
            }
          },
          child: [
            { href: '/playground/chat', title: '2. チャット' },
            { href: '/playground/course-manage', title: '3. コース管理' },
            { href: '/playground/draggable', title: '4. リストのドラッグ' },
            { href: '/playground/graph', title: '5. 集中度測定' }
          ]
        }
      ]
    }
  },
  computed: {
    state: {
      get() {
        return this.$data.$_privateState
      },
      set(newValue) {
        this.$data.$_privateState = newValue
        switch (newValue) {
          case SidebarState.CLOSED:
            this.isCollapsed = true
            this.isHidden = true
            break
          case SidebarState.COLLAPSED:
            this.isCollapsed = true
            this.isHidden = false
            break
          default:
            // case SidebarState.OPENED
            this.isCollapsed = false
            this.isHidden = false
        }
        this.$emit('update:state', newValue)
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
    this.resizeWindow()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWindow)
  },
  methods: {
    resizeWindow() {
      if (window.innerWidth < 768) {
        this.state = SidebarState.COLLAPSED
      } else {
        this.state = SidebarState.OPENED
      }
    },
    onToggleCollapse(collapsed) {
      this.state = collapsed ? SidebarState.COLLAPSED : SidebarState.OPENED
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/custom-var.scss';

.my-sidebar {
  &__content {
    // サイドバー非表示
    &--hidden {
      max-width: $sidebar-closed-width !important;
      &::v-deep .vsm--icon {
        display: none !important;
      }
      &::v-deep .vsm--item {
        display: none !important;
      }
      &::v-deep .vsm--toggle-btn {
        display: none !important;
      }
    }
  }
  // サイドバー
  &::v-deep .v-sidebar-menu {
    // 子アイテムのリンク
    & .vsm--link {
      &.vsm--link_active {
        box-shadow: none;
      }
      // 選択済みリンク
      &.vsm--link_exact-active {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        // 選択済みリンクのタイトル
        & .vsm--title {
          color: #4c565f;
        }
      }
    }
    // 子アイテム1階層目
    & .vsm--link_level-1 {
      padding-left: 1rem;
      color: #4c565f;
    }
    // 子アイテム2階層目
    & .vsm--link_level-2 {
      padding-left: 2.5rem;
      &:not(.vsm--link_active) {
        color: #4c565f;
      }
    }
    // 子アイテムを含む親アイテム右側の矢印
    & .vsm--arrow {
      display: none;
    }
    // icon
    & .vsm--icon {
      padding: 0;
    }
  }
}
</style>
