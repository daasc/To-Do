<template>
  <div>
    <nav-bar></nav-bar>
    <add-task></add-task>
    <list-task></list-task>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddTask from '~/components/AddTask.vue'
import ListTask from '~/components/ListTask.vue'
export default {
  name: 'IndexPage',
  components: { NavBar, AddTask, ListTask },
}
</script>
<style lang="scss">
body {
  margin: 0px;
}
</style>
