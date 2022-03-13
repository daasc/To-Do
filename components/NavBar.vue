<template>
  <nav class="navbar">
    <span data-testid="title" class="title">Todoist</span>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: center;
  height: 50px;
  background-color: #282525;
  width: 100%;
  .title {
    color: white;
    font-weight: bolder;
    align-self: center;
    font-size: 22px;
  }
}
</style>
