import GraphqlQuery from '~/graphql/query'
import GraphqlMutation from '~/graphql/mutation'
import GraphqlSubscription from '~/graphql/subscription'

export default function (context, inject) {
  const $apollo = context.app.apolloProvider.defaultClient
  const api = $apollo ? new API($apollo) : null
  inject('api', api)
}

class API {
  constructor($apollo) {
    this.query = new GraphqlQuery($apollo)
    this.mutate = new GraphqlMutation($apollo)
    this.subscribe = new GraphqlSubscription($apollo)
  }
}
