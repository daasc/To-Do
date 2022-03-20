<template>
  <div class="list">
    <hr />
    <div class="filter">
      <div
        data-testid="all-task"
        :class="{ 'active-filter': all }"
        @click="allTask()"
      >
        All
        <hr :class="{ active: all }" />
      </div>
      <div
        data-testid="active-task"
        :class="{ 'active-filter': active }"
        @click="activeTask()"
      >
        Active
        <hr :class="{ active: active }" />
      </div>
      <div
        data-testid="completed-task"
        :class="{ 'active-filter': completed }"
        @click="completedTask()"
      >
        Completed
        <hr :class="{ active: completed }" />
      </div>
    </div>
    <div data-testid="qtd-task" class="list__card">
      <span class="list__card__qtd">{{ task.length }} items</span>
      <card-task
        v-for="(item, index) in task"
        :id="item.id"
        :key="index"
        :name="item.name"
        :done="item.done"
        @open="toOpen"
      ></card-task>
    </div>
    <modal-task v-show="show" :id="choose" @close="close()"></modal-task>
  </div>
</template>
<script>
import CardTask from './CardTask.vue'
import ModalTask from './ModalTask.vue'
export default {
  name: 'ListTask',
  components: { CardTask, ModalTask },
  data() {
    return {
      all: true,
      active: false,
      completed: false,
      show: false,
      choose: '',
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
    toOpen({ id }) {
      this.show = true
      this.choose = id
    },
    close() {
      this.show = false
      this.choose = ''
    },
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
.active {
  background-color: white;
}

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

      div {
        width: 33.33%;
        padding: 5px;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #282525;
        color: white;
        hr {
          margin: 0px;
          height: 3px;
          border: none;
        }
      }
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
        margin-top: 5px;
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
