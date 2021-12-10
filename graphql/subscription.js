import gql from 'graphql-tag'

// GraphQL subscription
class GraphqlSubscription {
  constructor($apollo) {
    this.$apollo = $apollo
  }

  /**
   * チャット監視
   * @returns observer: apollo.observer
   */
  monitorMessages() {
    return this.$apollo.subscribe({
      query: gql`
        subscription monitorMessages {
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
    })
  }
}

export default GraphqlSubscription
