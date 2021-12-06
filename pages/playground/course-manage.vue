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
            <b-card class="h-100 bg-transparent">
              <b-card class="h-100">
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
            <b-card class="h-100 bg-transparent">
              <b-row>
                <b-col cols="12">
                  <h4>{{ seletedCourseName }}</h4>
                </b-col>
              </b-row>
              <!-- course group -->
              <b-row>
                <b-col cols="4">
                  <b-form-group>
                    <label for="course-group">組織の選択</label>
                    <b-form-select
                      id="course-group"
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
              <b-row align-v="stretch" align-h="center">
                <!-- unselect user list -->
                <b-col align-self="stretch" class="d-flex flex-column">
                  <b-card class="h-100">
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
                <!-- move button -->
                <b-col cols="2" class="text-center">
                  <div>
                    <b-button block>
                      <span>追加 &gt;&gt;</span>
                    </b-button>
                    <b-button block>
                      <span>&lt;&lt; 削除</span>
                    </b-button>
                  </div>
                </b-col>
                <!-- selected user list -->
                <b-col>
                  <b-card class="h-100" />
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
/*
class SelectedCourseUser {
  constructor(groupId, userId, name) {
    this.groupId = groupId
    this.userId = userId
    this.name = name
  }
}
*/

class CourseUser {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.isChecked = false
  }
}

class CourseGroup {
  constructor(id, name, users) {
    this.id = id
    this.name = name
    this.users = users
  }
}

class CourseItem {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

export default {
  name: 'PlaygroundCourceManage',
  data() {
    return {
      courses: [
        new CourseItem(1, 'コース1'),
        new CourseItem(2, 'コース2'),
        new CourseItem(3, 'コース3')
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
          new CourseUser(5, 'ユーザーE')
        ]),
        new CourseGroup(3, 'グループ3', [
          new CourseUser(1, 'ユーザーあ'),
          new CourseUser(2, 'ユーザーい'),
          new CourseUser(3, 'ユーザーう'),
          new CourseUser(4, 'ユーザーえ'),
          new CourseUser(5, 'ユーザーお')
        ])
      ],
      selectedGroupId: 1,
      selectedUsers: []
    }
  },
  computed: {
    seletedCourseName() {
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
    }
  },
  methods: {
    onSelectCourse(event, courseId) {
      this.selectedCourseId = courseId
    },
    onCheckUnselectUser(event, groupId, userId) {
      const user = this.groups
        .find((group) => group.id === groupId)
        ?.users.find((user) => user.id === userId)
      if (user) {
        user.isChecked = !user.isChecked
      }
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
}
</style>
