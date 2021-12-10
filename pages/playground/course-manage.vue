<template>
  <b-container fluid>
    <!-- content header -->
    <b-row class="app-main-content-header">
      <b-col cols="12">
        <h4>コース管理</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row align-v="stretch" class="app-main-content-body">
      <b-col cols="12" align-self="stretch">
        <b-row class="my-course" align-v="stretch">
          <!-- course body sidebar -->
          <b-col md="auto" align-self="stretch" class="my-course-sidebar">
            <b-card class="h-100 bg-transparent" body-class="p-2">
              <b-card class="h-100" body-class="p-2">
                <b-list-group>
                  <!-- course search -->
                  <b-list-group-item class="border-0 p-0">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>
                          <b-icon icon="search" />
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input placeholder="コースを検索する" />
                    </b-input-group>
                  </b-list-group-item>
                </b-list-group>
                <!-- course list -->
                <b-list-group class="h-100 mt-3">
                  <b-list-group-item
                    v-for="(course, cIdx) in courses"
                    :key="cIdx"
                    href="#"
                    :active="selectedCourseId === course.id"
                    class="py-1"
                    @click.prevent.stop="onSelectCourse($event, course.id)"
                  >
                    {{ course.name }}
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </b-card>
          </b-col>
          <!-- course body main -->
          <b-col md="auto" align-self="stretch" class="my-course-main">
            <b-card class="h-100 bg-transparent" body-class="p-2">
              <b-row>
                <b-col cols="12">
                  <h4>{{ seletedCourseNameLabel }}</h4>
                </b-col>
              </b-row>
              <!-- course group -->
              <b-row>
                <b-col cols="4">
                  <b-form-group>
                    <label for="myCourseGroup">組織の選択</label>
                    <b-form-select
                      id="myCourseGroup"
                      v-model="selectedGroupId"
                      :options="groupsOptions"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- couse user select -->
              <b-row>
                <b-col cols="12">
                  <label>ユーザー一覧</label>
                </b-col>
              </b-row>
              <b-row align-v="start" align-h="center">
                <b-col>
                  <!-- unselected user list -->
                  <b-row align-v="start" class="my-course-users__left">
                    <b-col align-self="stretch">
                      <b-card class="h-100" body-class="p-2">
                        <!-- all checked button -->
                        <div class="mb-2 text-right">
                          <b-button
                            class="py-1"
                            @click="onAllCheckUnselectUsers"
                          >
                            <span class="small">全選択</span>
                          </b-button>
                        </div>
                        <!-- list -->
                        <b-list-group class="h-100">
                          <b-list-group-item
                            v-for="(user, uIdx) in unselectedUsersOptions"
                            :key="uIdx"
                            href="#"
                            @click.prevent.stop="
                              onCheckUnselectUser($event, user.groupId, user.id)
                            "
                          >
                            <div>
                              <b-form-group>
                                <b-form-checkbox v-model="user.isChecked">
                                  {{ user.name }}
                                </b-form-checkbox>
                              </b-form-group>
                            </div>
                          </b-list-group-item>
                        </b-list-group>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
                <!-- move button -->
                <b-col cols="2" class="text-center">
                  <b-row align-v="center" class="my-course-users__left">
                    <b-col>
                      <b-button
                        block
                        :disabled="!isCheckedUnselectedUsers"
                        @click="onAddSelectedUser"
                      >
                        <span>追加 &gt;&gt;</span>
                      </b-button>
                      <b-button
                        block
                        :disabled="!isCheckedSelectedUsers"
                        @click="onRemoveSelectedUser"
                      >
                        <span>&lt;&lt; 削除</span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <!-- selected user list -->
                  <b-row align-v="start" class="my-course-users__right">
                    <b-col align-self="stretch">
                      <b-card class="h-100" body-class="p-2">
                        <!-- all checked button -->
                        <div class="mb-2 text-right">
                          <b-button class="py-1" @click="onAllCheckSelectUsers">
                            <span class="small">全選択</span>
                          </b-button>
                        </div>
                        <!-- list -->
                        <b-list-group class="h-100">
                          <b-list-group-item
                            v-for="(user, uIdx) in selectedUsersOptions"
                            :key="uIdx"
                            href="#"
                            @click.prevent.stop="
                              onCheckSelectUser($event, user.groupId, user.id)
                            "
                          >
                            <div>
                              <b-form-group>
                                <b-form-checkbox v-model="user.isChecked">
                                  {{ user.name }}
                                </b-form-checkbox>
                              </b-form-group>
                            </div>
                          </b-list-group-item>
                        </b-list-group>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Course, {
  Group as CourseGroup,
  User as CourseUser
} from '~/models/course'

export default {
  name: 'PlaygroundCourceManage',
  data() {
    return {
      courses: [
        new Course(1, 'コース1'),
        new Course(2, 'コース2'),
        new Course(3, 'コース3')
      ],
      selectedCourseId: 1,
      groups: [
        new CourseGroup(1, 'グループ1', [
          new CourseUser(1, 'ユーザー1'),
          new CourseUser(2, 'ユーザー2'),
          new CourseUser(3, 'ユーザー3'),
          new CourseUser(4, 'ユーザー4'),
          new CourseUser(5, 'ユーザー5')
        ]),
        new CourseGroup(2, 'グループ2', [
          new CourseUser(1, 'ユーザーA'),
          new CourseUser(2, 'ユーザーB'),
          new CourseUser(3, 'ユーザーC'),
          new CourseUser(4, 'ユーザーD'),
          new CourseUser(5, 'ユーザーE'),
          new CourseUser(6, 'ユーザーF'),
          new CourseUser(7, 'ユーザーG')
        ]),
        new CourseGroup(3, 'グループ3', [
          new CourseUser(1, 'ユーザーあ'),
          new CourseUser(2, 'ユーザーい'),
          new CourseUser(3, 'ユーザーう'),
          new CourseUser(4, 'ユーザーえ'),
          new CourseUser(5, 'ユーザーお'),
          new CourseUser(6, 'ユーザーか'),
          new CourseUser(7, 'ユーザーき'),
          new CourseUser(8, 'ユーザーく'),
          new CourseUser(9, 'ユーザーけ'),
          new CourseUser(10, 'ユーザーこ')
        ])
      ],
      selectedGroupId: 1,
      selectedUsers: []
    }
  },
  computed: {
    seletedCourseNameLabel() {
      return (
        this.courses.find((course) => course.id === this.selectedCourseId)
          ?.name ?? ''
      )
    },
    groupsOptions() {
      const groups = this.groups.map((group) => {
        const g = { value: group.id, text: group.name }
        return g
      })
      return groups
    },
    unselectedUsersOptions() {
      const users =
        this.groups.find((group) => group.id === this.selectedGroupId)?.users ??
        []
      const unselectedUsers = users.map((user) => {
        user.isChecked = false
        user.groupId = this.selectedGroupId
        return user
      })
      return unselectedUsers
    },
    isCheckedUnselectedUsers() {
      return (
        this.unselectedUsersOptions.length > 0 &&
        this.unselectedUsersOptions.some((user) => user.isChecked)
      )
    },
    selectedUsersOptions() {
      return this.selectedUsers
    },
    isCheckedSelectedUsers() {
      return (
        this.selectedUsersOptions.length > 0 &&
        this.selectedUsersOptions.some((user) => user.isChecked)
      )
    }
  },
  methods: {
    /**
     * コースの選択イベント
     */
    onSelectCourse(event, courseId) {
      this.selectedCourseId = courseId
    },
    /**
     * 左ペインのユーザー一覧のチェックボックスのチェックイベント
     *  チェックボックスのチェックを入れる/外す
     */
    onCheckUnselectUser(event, groupId, userId) {
      const user = this.groups
        .find((group) => group.id === groupId)
        ?.users.find((user) => user.id === userId)
      if (user) {
        user.isChecked = !user.isChecked
      }
    },
    /**
     * 左ペインのユーザー一覧の全てのユーザーにチェックを入れる
     */
    onAllCheckUnselectUsers(event) {
      this.unselectedUsersOptions.forEach((user) => {
        user.isChecked = true
      })
    },
    /**
     * 右ペインのユーザー一覧のチェックボックスのチェックイベント
     *  チェックボックスのチェックを入れる/外す
     */
    onCheckSelectUser(event, groupId, userId) {
      const user = this.selectedUsers.find(
        (user) => user.groupId === groupId && user.id === userId
      )
      if (user) {
        user.isChecked = !user.isChecked
      }
    },
    /**
     * 右ペインのユーザー一覧の全てのユーザーにチェックを入れる
     */
    onAllCheckSelectUsers(event) {
      this.selectedUsers.forEach((user) => {
        user.isChecked = true
      })
    },
    /**
     * 選択済みユーザー一覧に追加する
     */
    onAddSelectedUser(event) {
      // 右ペインに追加する
      const checkedUsers = this.unselectedUsersOptions
        .filter((user) => user.isChecked)
        .map((user) => {
          const u = { ...user }
          u.isChecked = false
          return u
        })
      const selectedUsers = this.selectedUsers.concat(checkedUsers)
      this.selectedUsers = selectedUsers
      // 左ペインのチェックが入っているユーザーを削除する
      const group = this.groups.find(
        (group) => group.id === this.selectedGroupId
      )
      if (group) {
        const uncheckedUsers = this.unselectedUsersOptions
          .filter((user) => !user.isChecked)
          .map((user) => {
            const u = { ...user }
            u.isChecked = false
            return u
          })
        group.users = uncheckedUsers
      }
    },
    /**
     * 選択済みユーザー一覧から削除する
     */
    onRemoveSelectedUser(event) {
      // 左ペインに元に戻す
      this.selectedUsers
        .filter((user) => user.isChecked)
        .map((user) => {
          const u = { ...user }
          u.isChecked = false
          return u
        })
        .forEach((user) => {
          const group = this.groups.find((group) => group.id === user.groupId)
          if (group) {
            const u = { ...user }
            delete u.groupId
            group.users.push(u)
            group.users.sort((aUser, bUser) => aUser.id - bUser.id)
          }
        })
      // 右ペインのチェックが入っているユーザーを削除する
      const uncheckedUsers = this.selectedUsers
        .filter((user) => !user.isChecked)
        .map((user) => {
          const u = { ...user }
          u.isChecked = false
          return u
        })
      this.selectedUsers = uncheckedUsers
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

$my-course-sidebar-width: 350px;

.my-course {
  height: 100%;
  /* .my-course-sidebar */
  &-sidebar {
    width: $my-course-sidebar-width;
  }
  /* .my-course-main */
  &-main {
    width: calc(100% - $my-course-sidebar-width);
  }
  /* .my-course-users */
  &-users {
    /* .my-course-users__left */
    &__left {
      min-height: 100vh;
    }
    /* .my-course-users__right */
    &__right {
      min-height: 100vh;
    }
  }
}
</style>
