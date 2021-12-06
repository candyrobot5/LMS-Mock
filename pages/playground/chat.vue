<template>
  <b-container fluid>
    <!-- Title -->
    <b-row class="app-main-content-header">
      <b-col cols="12">
        <h4>チャット</h4>
      </b-col>
    </b-row>
    <!-- content body -->
    <b-row no-gutters class="app-main-content-body">
      <b-col cols="12">
        <!-- chat received list -->
        <b-row ref="chatMessage" class="bg-light my-chat__messages p-2">
          <b-col cols="12">
            <div v-for="(msg, idx) in data" :key="idx">
              <b-row
                :align-h="myUser.id === msg.user.id ? 'end' : 'start'"
                align-v="center"
                class="p-2"
              >
                <!-- avatar: other -->
                <b-col
                  v-if="myUser.id !== msg.user.id"
                  cols="1"
                  class="text-center"
                >
                  <b-avatar variant="secondary" />
                  <div class="text-muted small">
                    <small>{{ msg.user.name }}</small>
                  </div>
                </b-col>
                <!-- message -->
                <b-col
                  cols="7"
                  align-self="stretch"
                  :class="
                    myUser.id === msg.user.id ? 'text-right' : 'text-left'
                  "
                >
                  <div
                    class="p-3 bg-white border d-inline-block"
                    :class="
                      myUser.id === msg.user.id
                        ? 'my-chat__messages--myself'
                        : 'my-chat__messages--other'
                    "
                  >
                    <div
                      v-for="(message, mIdx) in msg.message.split('\n')"
                      :key="mIdx"
                    >
                      {{ message.length > 0 ? message : '\u00A0' }}
                    </div>
                  </div>
                </b-col>
                <!-- avatar: myself -->
                <b-col
                  v-if="myUser.id === msg.user.id"
                  cols="1"
                  class="text-center"
                >
                  <b-avatar variant="primary" />
                  <div class="text-muted small">
                    <small>{{ msg.user.name }}</small>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-row class="bg-light my-message-box">
              <b-col cols="10" class="p-3">
                <b-textarea v-model.trim="inputText" rows="4" class="h-100" />
              </b-col>
              <b-col cols="2" class="p-3">
                <b-button
                  block
                  variant="primary"
                  class="h-100"
                  :disabled="inputText === ''"
                  @click="onSendMessage"
                >
                  Send
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import gql from 'graphql-tag'
class ChatUser {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}
class ChatMessage {
  constructor(id, user, message) {
    this.id = id
    this.user = user
    this.message = message
  }
}

export default {
  name: 'PlaygroundChat',
  data() {
    const myUser = new ChatUser(2, '自分')
    const user01 = new ChatUser(1, 'ユーザー01')
    const user03 = new ChatUser(3, 'ユーザー03')
    return {
      myUser,
      data: [
        new ChatMessage(
          1,
          myUser,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          2,
          user01,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          3,
          user01,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          4,
          user03,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          5,
          user03,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          6,
          myUser,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          7,
          user03,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          8,
          user01,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          9,
          myUser,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        ),
        new ChatMessage(
          10,
          myUser,
          'あいうえおあいうえおあいうえおあいうえお\nかきくけこかきくけこかきくけこかきくけこ'
        )
      ],
      inputText: ''
    }
  },
  created() {
    // await this.$apollo.query()
  },
  mounted() {
    this.$nextTick(() => {
      // 下へスクロールする
      this.$refs.chatMessage.scrollTop = this.$refs.chatMessage.scrollHeight
    })
  },
  methods: {
    onSendMessage() {
      // TODO: メッセージを送信する
      const lastMessage = this.data.reduce((a, b) => (a.id > b.id ? a : b))
      const nextId = lastMessage.id + 1
      const inputText = this.inputText.trim()
      const msg = new ChatMessage(nextId, this.myUser, inputText)
      this.data.push(msg)
      this.inputText = ''
      this.$nextTick(() => {
        // 下へスクロールする
        this.$refs.chatMessage.scrollTop = this.$refs.chatMessage.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

$my-message-box-height: 150px;

.my-message-box {
  height: calc($my-message-box-height + ($app-main-content-padding * 2));
}
.my-chat {
  /* .my-chat__mesages */
  &__messages {
    height: calc(
      100vh - $my-message-box-height - $app-header-height -
        $app-main-content-header-height - ($app-main-content-padding * 2)
    );
    overflow: scroll;
    /* .my-chat__mesages--myself */
    &--myself {
      border-top-left-radius: 50rem;
      border-top-right-radius: 0 !important;
      border-bottom-left-radius: 50rem;
      border-bottom-right-radius: 50rem;
      text-align: right;
    }
    /* .my-chat__mesages--other */
    &--other {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 50rem;
      border-bottom-left-radius: 50rem;
      border-bottom-right-radius: 50rem;
      text-align: left;
    }
  }
}
</style>
