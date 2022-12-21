<template>
  <div>
    <v-header></v-header>
    <main>
      <slot/>
    </main>
  </div>
  <v-footer></v-footer>
</template>

<script>
import VHeader from '../components/Header.vue'
import VFooter from '../components/Footer.vue'
export default {
  components: {
    'v-header': VHeader,
    'v-footer': VFooter
  }
}
</script>