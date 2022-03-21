<template>
  <div v-if="!edit" class="card-template">
    <div class="card">
      <div class="card__container">
        <div class="card__check">
          <input
            id="color-1"
            :class="{ checked: done }"
            type="checkbox"
            name="color"
            value="color-1"
          />
          <label for="color-1">
            <span data-testid="done-task" @click="toDone(id)">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                alt="Checked Icon"
              />
            </span>
          </label>
        </div>
        <span
          class="card__name"
          data-testid="task-name"
          :class="{ 'text-done': done }"
          >{{ name }}</span
        >
      </div>
      <div class="card__actions">
        <div
          class="card__actions__comments"
          data-testid="comments-task"
          @click="open(id)"
        >
          <img src="@/assets/img/comment.png" alt="" />
        </div>
        <div
          class="card__actions__edit"
          data-testid="button-edit-task"
          @click="showEdit()"
        >
          <img src="@/assets/img/editing.png" alt="" />
        </div>
        <div
          data-testid="delete-task"
          class="card__actions__delete"
          @click="remove(id)"
        >
          <img src="@/assets/img/bin.png" alt="" />
        </div>
      </div>
    </div>
    <hr />
  </div>
  <div v-else class="edit">
    <textarea
      v-model="textEdit"
      class="edit-comments"
      cols="30"
      rows="10"
      data-testid="edit-input-task"
    ></textarea>
    <div class="actions-edit">
      <button
        class="button-3 edit-button"
        data-testid="edit-task"
        @click="setEdit()"
      >
        Edit
      </button>
      <button
        class="button-3 cancel"
        data-testid="button-hide-edit-task"
        @click="hideEdit()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardTask',
  props: {
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      edit: false,
      textEdit: '',
    }
  },
  methods: {
    toDone(id) {
      this.$store.commit('toDo/SET_DONE', id)
    },
    remove(id) {
      this.$store.commit('toDo/DELETE', id)
    },
    open(id) {
      this.$emit('open', { id })
    },
    showEdit() {
      this.edit = true
      this.textEdit = this.name
    },
    hideEdit() {
      this.edit = false
    },
    setEdit() {
      this.$store.commit('toDo/EDIT_TODOLIST', {
        id: this.id,
        name: this.textEdit,
      })
      this.hideEdit()
    },
  },
}
</script>
<style lang="scss" scoped>
.edit {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  .edit-comments {
    width: auto;
    height: 60px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px 10px 0;
    resize: none;
    outline: none;
  }
  .actions-edit {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
}
.text-done {
  text-decoration: line-through;
}
.card-template {
  display: flex;
  flex-direction: column;
  hr {
    width: 100%;
  }
  .card {
    width: 100%;
    display: flex;
    min-height: 40px;
    justify-content: space-between;
    .card__container {
      width: 80%;
      padding: 10px;
      display: flex;
      align-items: center;
      .card__check {
        input[type='checkbox'] {
          display: none;
          + label {
            color: #333;
            font-family: Arial, sans-serif;
            font-size: 14px;

            span {
              display: inline-block;
              width: 20px;
              height: 20px;
              margin: -1px 4px 0 0;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 50%;
              border: 2px solid #ffffff;
              background-repeat: no-repeat;
              background-position: center;
              text-align: center;
              line-height: 25px;

              img {
                opacity: 0;
                transition: all 0.3s ease;
              }
            }
          }

          &#color-1 + label span {
            background-color: #c8c8c8;
          }
          &.checked + label span {
            background-color: #2ecc71 !important;
          }
          &.checked + label span img {
            opacity: 1;
            width: 15px;
          }
        }
      }
      .card__name {
        width: 80%;
        font-size: 18px;
      }
    }
    .card__actions {
      display: flex;
      visibility: hidden;
      width: 20%;
      align-items: center;
      justify-content: space-around;
      .card__actions__comments,
      .card__actions__edit,
      .card__actions__delete {
        cursor: pointer;
        width: 30px;
        img {
          width: 100%;
        }
      }
    }
  }
  &:hover {
    .card {
      .card__actions {
        visibility: inherit;
      }
    }
  }
}
</style>
