import jQuery from 'jquery'

export default function (context, inject) {
  const jquery = jQuery
  inject('jquery', jquery)
}
