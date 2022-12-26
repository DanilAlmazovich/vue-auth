<template>
  <div class="w-full flex justify-center items-center h-screen">
    <div class="w-1/2 px-4">
      <h1 class="font-bold text-4xl text-center mb-10">Register</h1>
      <form @submit.prevent="register">
        <div class="flex flex-col mb-6">
          <label class="font-medium text-base mb-1" for="email">Email</label>
          <input v-model="formData.email"
                 class="border border-solid border-gray-600 p-2"
                 type="email"
                 id="email"
                 placeholder="example@exam.com"
                 required>
          <p v-if="errors.email.length"
             class="text-xs text-red-500">{{ errors.email }}</p>
        </div>
        <div class="flex flex-col mb-8">
          <label class="font-medium text-base mb-1" for="password">Password</label>
          <input v-model="formData.password"
                 class="border border-solid border-gray-600 p-2"
                 type="password"
                 id="password"
                 placeholder="******"
                 required>
          <p v-if="errors.password.length"
             class="text-xs text-red-500">{{ errors.password }}</p>
        </div>
        <input class="p-2 w-full bg-teal-400 text-white"
               type="submit"
               value="Register">
      </form>
      <auth-nav/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
        returnSecureToken: true
      },
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async register() {
      const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FIREBASE_API_KEY}`
      const OPTIONS = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      }
      const response = await fetch(URL, OPTIONS)
      const data = await response.json()
      if(response.ok) {
        localStorage.setItem('user', data)
        this.$router.push({name: 'home'})

      }else {
        switch (data.error.message) {
          case 'INVALID_EMAIL':
            this.errors.email = 'Неверный email'
            break
          case 'EMAIL_EXISTS':
            this.errors.email = 'Такой email уже есть'
            break
          case 'WEAK_PASSWORD : Password should be at least 6 characters':
            this.errors.password = 'Пароль должен превышать 6 символов'
            break
          default:
            this.$notify({
              title: data.error.message,
              type: 'error'
            });
        }
      }
    }
  }
}
</script>