<template>
  <div class="flex w-full py-10">
    <router-link class="uppercase w-1/2 text-center py-2 border border-solid border-amber-200"
                 :class="{'bg-amber-200': $route.name === 'login'}"
                 to="/auth/login">login</router-link>
    <router-link class="uppercase w-1/2 text-center py-2 border border-solid border-amber-200"
                 :class="{'bg-amber-200': $route.name === 'register'}"
                 to="/auth/register">register</router-link>
  </div>
</template>

<script>
export default {
  name: "AuthNav"
}
</script>

<style scoped>

</style>