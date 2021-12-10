import gql from 'graphql-tag'

// GraphQL mutation
class GraphqlMutation {
  constructor($apollo) {
    this.$apollo = $apollo
  }

  // メッセージ送信
  postMessage(fromUserId, message) {
    return this.$apollo.mutate({
      mutation: gql`
        mutation postMessage($fromUserId: Int!, $message: String) {
          insert_chats(
            objects: { from_user_id: $fromUserId, message: $message }
          ) {
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
      `,
      variables: {
        fromUserId,
        message
      }
    })
  }
}

export default GraphqlMutation
