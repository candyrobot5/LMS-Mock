<template>
  <div class="container-fluid">
    <!-- Title -->
    <div class="row app-content-header">
      <div class="col-12">
        <h4>chat sample</h4>
      </div>
    </div>
    <!-- chat received list -->
    <div class="row bg-light my-received-list">
      <div class="col-12">
        <div v-for="(msg, idx) in data" :key="idx">
          <b-row
            :align-h="myUserId === msg.user.id ? 'end' : 'start'"
            align-v="center"
          >
            <!-- avatar: other -->
            <b-col v-if="myUserId !== msg.user.id" cols="1" class="text-center">
              <b-avatar variant="secondary" />
              <div class="text-muted small">
                <small>{{ msg.user.name }}</small>
              </div>
            </b-col>
            <!-- message -->
            <b-col cols="7" align-self="stretch">
              <div
                class="p-3 bg-white border-light rounded-pill"
                :class="
                  myUserId === msg.user.id
                    ? 'my-chat-message__myself'
                    : 'my-chat-message__other'
                "
              >
                {{ msg.message }}
              </div>
            </b-col>
            <!-- avatar: myself -->
            <b-col v-if="myUserId === msg.user.id" cols="1" class="text-center">
              <b-avatar variant="primary" />
              <div class="text-muted small">
                <small>{{ msg.user.name }}</small>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <div class="row p-3 fixed-bottom bg-light my-message-box">
      <div class="col-10 p-3">
        <b-textarea v-model="inputText" rows="4" />
      </div>
      <div class="col-2 p-3">
        <b-button block variant="primary" class="h-100" @click="onSendMessage">
          Send
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      myUserId: 2,
      data: [
        new ChatMessage(1, myUser, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(2, user01, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(3, user01, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(4, user03, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(5, user03, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(6, myUser, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(7, user03, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(8, user01, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(9, myUser, 'あいうえおあいうえおあいうえおあいうえお'),
        new ChatMessage(10, myUser, 'あいうえおあいうえおあいうえおあいうえお')
      ],
      inputText: ''
    }
  },
  methods: {
    onSendMessage() {}
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/default.scss';

$my-message-box-height: 150px;

.my-received-list {
  height: calc(
    100vh - $my-message-box-height - $app-header-height -
      $app-content-header-height - 8px
  );
  overflow: scroll;
}
.my-message-box {
  height: $my-message-box-height;
}
.my-chat-message {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  &__myself {
    border-top-right-radius: 0 !important;
  }
  &__other {
    border-bottom-left-radius: 0 !important;
  }
}
</style>
