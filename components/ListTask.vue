<template>
  <div class="list">
    <hr />
    <div data-testid="qtd-task" class="list__card">
      <span class="list__card__qtd">{{ task.length }} items</span>
      <card-task
        v-for="(item, index) in task"
        :id="item.id"
        :key="index"
        :name="item.name"
        :done="item.done"
      ></card-task>
    </div>
  </div>
</template>
<script>
import CardTask from './CardTask.vue'
export default {
  name: 'ListTask',
  components: { CardTask },
  computed: {
    task() {
      return this.$store.state.toDo.toDoList
    },
  },
}
</script>
<style lang="scss" scoped>
@media (min-width: 0px) {
  .list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    hr {
      width: 40%;
    }
    .list__card {
      display: flex;
      flex-direction: column;
      align-self: center;
      width: 80%;
      gap: 15px;

      .list__card__qtd {
        align-self: flex-end;
        margin-bottom: 5px;
      }
    }
  }
}
@media (min-width: 1200px) {
  .list {
    .list__card {
      width: 40%;
    }
  }
}
</style>
