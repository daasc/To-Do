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
      width: 80%;
      gap: 5px;
      .add-task {
        width: 100%;
        height: 60px;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px 10px 0;
        resize: none;
        outline: none;
      }
      .add {
        background-color: #1899d6;
        border: 1px solid rgba(22, 154, 230, 0.15);

        &:hover {
          background-color: #1cb0f6;
        }
        &:focus {
          box-shadow: rgba(49, 130, 197, 0.4) 0 0 0 3px;
          outline: none;
        }
      }
      .clear {
        background-color: #ae1010;
        border: 1px solid rgba(226, 59, 33, 0.15);
        &:hover {
          background-color: #e51d1d;
        }
        &:focus {
          box-shadow: rgba(163, 18, 18, 0.4) 0 0 0 3px;
          outline: none;
        }
      }
      .button-3 {
        appearance: none;
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial,
          sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
        &:focus:not(:focus-visible):not(.focus-visible) {
          box-shadow: none;
          outline: none;
        }
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
        width: 100%;
      }
    }
  }
}
</style>
