<template>
  <div class="login-wrap">
    <div class="login">
      <v-text-field
          v-model="email"
          label="E-mail"
          required
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Password"
          required
          :type="show1 ? 'text' : 'password'"
      ></v-text-field>
      <v-btn variant="flat" color="secondary" :loading="loading" @click="login" :disabled="email.length <= 3 || password.length < 6 || loading">
        Login
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      email: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      if(this.email.length && this.password.length) {

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`

        const data = {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        }

        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        const res = await response.json()
        console.log(response)
        console.log(res)
        if(response.ok) {
          this.$router.push({name: 'home'})
        }else {
          this.$notify({
            title: res.error.message,
            type: 'error'
          });
          console.log('какая-то ошибка')
        }

      }
      this.loading = false

    }
  },

}
</script>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login {
    width: 50%;
  }
}
</style>