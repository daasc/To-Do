<template>
  <div>
    <nav-bar></nav-bar>
    <add-task></add-task>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddTask from '~/components/AddTask.vue'
export default {
  name: 'IndexPage',
  components: { NavBar, AddTask },
}
</script>
<style lang="scss">
body {
  margin: 0px;
}
</style>
