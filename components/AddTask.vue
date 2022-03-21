<template>
  <div class="task">
    <div class="group-input">
      <textarea
        v-model="name"
        class="add-task"
        type="text"
        placeholder="add new task"
        cols="30"
        rows="10"
        data-testid="input"
      ></textarea>
      <div class="group-button">
        <button
          class="button-3 add"
          role="button"
          data-testid="add-task"
          @click="addTask()"
        >
          Add Task
        </button>
        <button
          data-testid="clear"
          class="button-3 clear"
          role="button"
          @click="clear()"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddTask',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    addTask() {
      this.$store.commit('toDo/SET_TODOLIST', { name: this.name })
      this.name = ''
    },
    clear() {
      this.name = ''
    },
  },
}
</script>
<style lang="scss" scoped>
@media (min-width: 0px) {
  .task {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    width: 100%;
    .group-input {
      display: flex;
      flex-direction: column;
      width: 90%;
      gap: 5px;
      .add-task {
        width: auto;
        height: 60px;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px 10px 0;
        resize: none;
        outline: none;
      }
    }
  }
}
@media (min-width: 1200px) {
  .task {
    width: 100%;
    .group-input {
      width: 40%;
      .add-task {
        width: auto;
      }
    }
  }
}
</style>
