import * as cookies from 'js-cookie'

export default {
  loggedIn: function () {
    let jwt = cookies.get('jwt')
    if (jwt) return true
    else return false
  }
}