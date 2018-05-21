<template>
  <div style="display: flex; justify-content: center">
    <form @submit.prevent="login">
        <div :class="{ 'alert': flash, 'alert-success': flash.type === 'success', 'alert-danger': flash.type === 'error' }" v-show="flash.message">{{flash.message}}</div>
        <div style="font-size: 2em;">Login</div>
        <input style="margin-top: 16px; width: 100%;" type="text" placeholder="Username" v-model="username" >
        <input style="margin-top: 16px; width: 100%;" type="password" placeholder="Password" v-model="password">
        <div style="margin-top: 40px; display: flex; align-items: center;">
          <input type="submit" value="Login">
          <i class="fa fa-spinner" aria-hidden="true" style="font-size: 20px; padding: 0 10px;" v-show="loading"></i>
          <router-link to="/register" style="margin-left: 24px;">Register</router-link>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      flash: {},
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$http.post('/users/login', {
        username: this.username,
        password: this.password
      })
        .then(res => {
          let redirectUrl = this.$route.query.redirect
          if (redirectUrl) {
            this.$router.push(redirectUrl)
          } else {
            this.$router.push('/notes')
          }
        })
        .catch(err => console.error(err))
        .then(() => {this.loading = false})
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
form {
  background-color: #eee;
  padding: 32px;
  margin: 16px;
  border-radius: 4px;
  max-width: 480px;
  flex: 480px 1 1;
}
</style>
