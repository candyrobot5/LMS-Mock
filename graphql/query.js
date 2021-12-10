import gql from 'graphql-tag'

// GraphQL query
class GraphqlQuery {
  constructor($apollo) {
    this.$apollo = $apollo
  }

  // ユーザー一覧 取得
  getUsers(myUserId) {
    return this.$apollo.query({
      query: gql`
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
      `,
      variables: { myUserId }
    })
  }

  // メッセージ一覧 取得
  getMessages() {
    return this.$apollo.query({
      query: gql`
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
    })
  }
}

export default GraphqlQuery
