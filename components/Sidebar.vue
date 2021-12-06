<template>
  <aside class="my-sidebar">
    <sidebar-menu
      :menu="menu"
      :collapsed="isCollapsed"
      :width="width"
      :width-collapsed="widthCollapsed"
      :hide-toggle="true"
      class="my-sidebar__content"
      :class="{ 'my-sidebar__content--hidden': isHidden }"
      @toggle-collapse="onToggleCollapse"
    />
  </aside>
</template>

<script>
/**
 * used `vue-sidebar-menu`
 */
import style from '~/assets/style/custom-var.scss'

export class SidebarState {
  static OPENED = 0
  static COLLAPSED = 1
  static CLOSED = 9
}

export default {
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
          title: 'ホーム'
          // icon: { element: 'img', attributes: { src: '/icons/icons_home.svg' } }
        },
        {
          title: 'Playground',
          child: [
            { href: '/playground/draggable', title: 'List Draggable' },
            { href: '/playground/chat', title: 'Chat' }
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
  methods: {
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
      & .vsm--icon {
        display: none !important;
      }
      & .vsm--item {
        display: none !important;
      }
      & .vsm--toggle-btn {
        display: none !important;
      }
    }
  }
  // サイドバー
  & .v-sidebar-menu {
    margin-top: $app-header-height;
    // サイドバーリスト
    .vsm--list {
      padding: 0 !important;
    }
    // 子アイテムのリンク
    .vsm--link {
      font-size: 0.8rem;
      &.vsm--link_active {
        box-shadow: none;
      }
      // 選択済みリンク
      &.vsm--link_exact-active {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        // 選択済みリンクのタイトル
        & .vsm--title {
          color: #fff;
        }
      }
      // 子アイテム2階層目
      &.vsm--link_level-2 {
        padding-left: 5rem;
        &:not(.vsm--link_active) {
          background-color: #4c565f;
          color: #c0c0c0;
        }
      }
    }
    // 子アイテムを含む親アイテム右側の矢印
    .vsm--arrow {
      display: none;
    }
    // iconのサイズ
    .vsm--icon {
      padding: 5px;
    }
  }
}
</style>
