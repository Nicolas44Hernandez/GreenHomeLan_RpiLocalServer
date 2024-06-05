<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
  <Header></Header>
</template>

<script>
export default {
  name: 'App',
  
  data() {
    return {
        logged: false
    };
  },
  mounted() {
    // in startup
    //TODO: check if sleeping ?
    // If box sleeping show sleeping page
    this.$router.push({name: "home"})
  },
  components: {
    Header
  }
}

</script>