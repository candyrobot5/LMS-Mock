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
            <div v-for="(message, idx) in messages" :key="idx">
              <b-row
                :align-h="
                  defs.myUserId === message.fromUser.id ? 'end' : 'start'
                "
                align-v="center"
                class="p-2"
              >
                <!-- avatar: other -->
                <b-col
                  v-if="defs.myUserId !== message.fromUser.id"
                  cols="1"
                  class="text-center"
                >
                  <div class="my-chat__messages-avatar">
                    <b-avatar variant="secondary" />
                  </div>
                  <div class="text-muted small">
                    <small>{{ message.fromUser.name }}</small>
                  </div>
                </b-col>
                <!-- message -->
                <b-col
                  cols="7"
                  align-self="stretch"
                  :class="
                    defs.myUserId === message.fromUser.id
                      ? 'text-right'
                      : 'text-left'
                  "
                >
                  <div
                    class="my-chat__messages-message"
                    :class="
                      defs.myUserId === message.fromUser.id
                        ? 'my-chat__messages-message--myself'
                        : 'my-chat__messages-message--other'
                    "
                  >
                    <div
                      v-for="(message, mIdx) in message.message.split('\n')"
                      :key="mIdx"
                    >
                      {{ message.length > 0 ? message : '\u00A0' }}
                    </div>
                  </div>
                </b-col>
                <!-- avatar: myself -->
                <b-col
                  v-if="defs.myUserId === message.fromUser.id"
                  cols="1"
                  class="text-center"
                >
                  <div class="my-chat__messages-avatar">
                    <b-avatar variant="primary" />
                  </div>
                  <div class="text-muted small">
                    <small>{{ message.fromUser.name }}</small>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <!-- send message textarea -->
        <b-row>
          <b-col cols="12">
            <b-row class="bg-light my-message-box">
              <b-col cols="10" class="p-3">
                <!-- message box -->
                <b-row>
                  <b-col cols="12">
                    <b-textarea
                      v-model.trim="inputText"
                      rows="4"
                      class="h-100"
                    />
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="2" class="p-3">
                <!-- send button -->
                <b-button
                  block
                  variant="primary"
                  class="h-100"
                  :disabled="inputText === ''"
                  @click="onSendMessage"
                >
                  <span>Send</span>
                  <b-icon icon="envelope" />
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
import gql from 'graphql-tag'

// GraphQL query
class GraphqlQuery {
  // ユーザー一覧 取得
  static GET_USERS = gql`
    query getUsers($myUserId: Int!) {
      others: users(where: { id: { _neq: $myUserId } }) {
        id
        name
      }
      myself: users(where: { id: { _eq: $myUserId } }) {
        id
        name
      }
    }
  `
  // メッセージ一覧 取得
  static GET_MESSAGES = gql`
    query getMessages {
      messages: chats {
        id
        message
        from_user {
          id
          name
        }
      }
    }
  `
}

// GraphQL mutation
class GraphqlMutation {
  static POST_MESSAGE = gql`
    mutation postMessage($fromUserId: Int!, $message: String) {
      insert_chats(objects: { from_user_id: $fromUserId, message: $message }) {
        messages: returning {
          id
          message
          from_user {
            id
            name
          }
        }
      }
    }
  `
}

// GraphQL subscription
class GraphqlSubscription {
  static SUBSCRIBE_MESSAGES = gql`
    subscription subscribeMessage {
      messages: chats {
        id
        message
        from_user {
          id
          name
        }
      }
    }
  `
}

class Graphql {
  static query = GraphqlQuery
  static mutation = GraphqlMutation
  static subscription = GraphqlSubscription
}

class ChatUser {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

class ChatMessage {
  constructor(id, fromUser, message) {
    this.id = id
    this.fromUser = fromUser
    this.message = message
  }
}

export default {
  name: 'PlaygroundChat',
  data() {
    const defs = Object.freeze({
      myUserId: 2
    })
    return {
      defs,
      messages: [],
      inputText: '',
      observer: null, // メッセージ監視
      subscribeMessage: null
    }
  },
  apollo: {
    $subscribe: {
      subscribeMessage: {
        query: Graphql.subscription.SUBSCRIBE_MESSAGES,
        result(res) {
          console.debug('#DEBUG# $subscribe result() res=', res)
        }
      }
    }
  },
  created() {
    // ユーザー一覧取得
    /* TODO: 今のところ不要
    this.$apollo
      .query({
        query: Graphql.query.GET_USERS,
        variables: { myUserId: this.defs.myUserId }
      })
      .then((res) => {
        this.others = res.data.others
      })
    // メッセージ取得
    /* TODO: 今のところ不要
    this.$apollo
      .query({
        query: Graphql.query.GET_MESSAGES
      })
      .then((res) => {
        this.messages = res.data.messages.map((resMsg) => {
          const fromUser = new ChatUser(
            resMsg.from_user.id,
            resMsg.from_user.name
          )
          const message = new ChatMessage(
            resMsg.id,
            fromUser,
            resMsg.message
          )
          return message
        })
      })
    */
    // subscription
    this.observer = this.$apollo.subscribe({
      query: Graphql.subscription.SUBSCRIBE_MESSAGES
    })
    this.observer.subscribe({
      complete: (res) => {
        // eslint-disable-next-line no-console
        console.log('#DEBUG# subscribe complete() res=', res)
      },
      next: (res) => {
        // eslint-disable-next-line no-console
        console.log('#DEBUG# subscribe next() res=', res)
        const messages = res.data.messages.map((resMsg) => {
          const fromUser = new ChatUser(
            resMsg.from_user.id,
            resMsg.from_user.name
          )
          const message = new ChatMessage(resMsg.id, fromUser, resMsg.message)
          return message
        })
        this.messages = messages
        this.$nextTick(() => {
          // 下へスクロールする
          this.$refs.chatMessage.scrollTop = this.$refs.chatMessage.scrollHeight
        })
      },
      error: (error) => {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      // 下へスクロールする
      this.$refs.chatMessage.scrollTop = this.$refs.chatMessage.scrollHeight
    })
  },
  methods: {
    // メッセージを送信する
    onSendMessage() {
      const inputText = this.inputText.trim()
      this.$apollo
        .mutate({
          mutation: Graphql.mutation.POST_MESSAGE,
          variables: {
            fromUserId: this.defs.myUserId,
            message: inputText
          }
        })
        .then((res) => {
          console.debug('#DEBUG# onSendMessage() res=', res)
        })
      this.inputText = ''
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
    /* .my-chat__messages-avatar */
    &-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
    }
    &-message {
      display: inline-block;
      height: 100%;
      padding: 8px 16px;
      border-radius: 10px;
      /* .my-chat__messages-message--myself */
      &--myself {
        border: 1px #6c9557 solid;
        background-color: #98fb98;
        /* .my-chat__messages-message--myself::after */
        &::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border: solid transparent;
          border-top-width: 10px;
          border-bottom-width: 10px;
          border-left-width: 10px;
          border-right-width: 10px;
          margin-top: -10px;
          border-left-color: #6c9557;
          right: -6px;
          top: 50%;
          text-align: right;
        }
      }
      /* .my-chat__messages-message--other */
      &--other {
        border: 1px #999 solid;
        background-color: #fff;
        /* .my-chat__messages-message--other::after */
        &::after {
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          border: solid transparent;
          border-top-width: 10px;
          border-bottom-width: 10px;
          border-left-width: 10px;
          border-right-width: 10px;
          margin-top: -10px;
          border-right-color: #999;
          left: -6px;
          top: 50%;
          text-align: left;
        }
      }
    }
  }
}
</style>
