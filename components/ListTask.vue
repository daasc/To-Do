<template>
  <div class="list">
    <hr />
    <div class="filter">
      <div data-testid="all-task" @click="allTask()">All</div>
      <div data-testid="active-task" @click="activeTask()">Active</div>
      <div data-testid="completed-task" @click="completedTask()">Completed</div>
    </div>
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
  data() {
    return {
      all: true,
      active: false,
      completed: false,
    }
  },
  computed: {
    task() {
      if (this.all) {
        return this.$store.state.toDo.toDoList
      } else if (this.active) {
        return this.$store.getters['toDo/active']
      }
      return this.$store.getters['toDo/deeds']
    },
  },
  methods: {
    allTask() {
      this.all = true
      this.active = false
      this.completed = false
    },
    activeTask() {
      this.all = false
      this.active = true
      this.completed = false
    },
    completedTask() {
      this.all = false
      this.active = false
      this.completed = true
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
    .filter {
      display: flex;
      width: 40%;
      margin: 0 auto;
      justify-content: space-around;
    }
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
