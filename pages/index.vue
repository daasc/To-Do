<template>
  <div>
    <nav-bar></nav-bar>
    <add-task></add-task>
    <card-task></card-task>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddTask from '~/components/AddTask.vue'
import CardTask from '~/components/CardTask.vue'
export default {
  name: 'IndexPage',
  components: { NavBar, AddTask, CardTask },
}
</script>
<style lang="scss">
body {
  margin: 0px;
}
</style>
