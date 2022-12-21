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
      <v-btn variant="flat" color="secondary" @click="login">
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
      password: ''
    }
  },
  methods: {
    async login() {
      if(this.email.length && this.password.length) {

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`
        console.log(url)

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
        console.log(data)

        const response = await fetch(url, options)
        const res = await response.json()
        console.log(res)
        // if(response.ok) {
        //   console.log(response.json())
        // }else {
        //   console.log(response.json())
        // }
      }

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