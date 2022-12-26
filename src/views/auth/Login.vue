<template>
  <div class="login-wrap" id="login">
    <div class="login">
      <h1 class="title">Login</h1>
      <div>
        <div class="input-wrap">
          <v-text-field
              v-model="formData.email"
              label="E-mail"
              required
              :error-messages="errors.email"
          ></v-text-field>
        </div>
        <div class="input-wrap">
          <v-text-field
              v-model="formData.password"
              label="Password"
              required
              :type="show1 ? 'text' : 'password'"
              :error-messages="errors.password"
          ></v-text-field>
        </div>
        <v-btn variant="flat"
               color="secondary"
               :loading="loading"
               @click="login"
               :disabled="formData.email.length <= 3 || formData.password.length < 6 || loading">
          Login
        </v-btn>
      </div>
      <auth-nav/>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      formData: {
        email: '',
        password: '',
        returnSecureToken: true
      },
      errors: {
        email: '',
        password: ''
      },
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errors = {email: '', password: ''}
      if(this.formData.email.length && this.formData.password.length) {

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`

        let options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        }

        const response = await fetch(url, options)
        const res = await response.json()
        if(response.ok) {
          localStorage.setItem('user', JSON.stringify(res))
          this.$router.push({name: 'home'})
        }else {
          switch (res.error.message) {
            case 'INVALID_EMAIL':
              this.errors.email = 'Неверный email'
              break
            case 'INVALID_PASSWORD':
              this.errors.password = 'Неверный пароль'
              break
            case 'EMAIL_NOT_FOUND':
              this.errors.email = 'Такого email нет'
              break
            default:
              this.$notify({
                title: res.error.message,
                type: 'error'
              });
          }
        }
      }
      this.loading = false
    }
  },

}
</script>

<style lang="scss">
#login {
  &.login-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .login {
      width: 50%;
      h1 {
        font-size: 36px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 25px;
      }

      .input-wrap {
        margin-bottom: 10px;
        .v-messages {
          color: #b00020;
          .v-messages__message {
            color: #b00020;
          }
        }

      }
    }
  }
}
</style>