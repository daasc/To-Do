<template>
  <div v-if="!edits" class="list-comments">
    <div class="comments">
      <div class="text">
        <div class="date">{{ date }}</div>
        <div class="text-comments" data-testid="text-comments">{{ text }}</div>
      </div>
      <div class="actions">
        <span data-testid="edit-comments" @click="showEdit()">
          <img src="@/assets/img/editing.png" alt="" />
        </span>
        <span data-testid="delete-comments" @click="remove()">
          <img src="@/assets/img/bin.png" alt="" />
        </span>
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
      data-testid="edit-input-comments"
    ></textarea>
    <div class="actions-edit">
      <button
        class="button-3 edit-button"
        data-testid="button-edit-comments"
        @click="setEdit()"
      >
        Edit
      </button>
      <button
        class="button-3 cancel"
        data-testid="cancel-edit"
        @click="cancel()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardComments',
  props: {
    text: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      edits: false,
      textEdit: '',
    }
  },
  methods: {
    remove() {
      this.$emit('removeComments', { id: this.id })
    },
    setEdit() {
      this.$emit('editComments', { id: this.id, text: this.textEdit })
      this.edits = false
    },
    showEdit() {
      this.textEdit = this.text
      this.edits = true
    },
    cancel() {
      this.edits = false
      this.textEdit = ''
    },
  },
}
</script>
<style lang="scss" scoped>
.list-comments {
  .comments {
    display: flex;
    width: 100%;
    align-items: center;
    .text {
      width: 90%;
      .date {
        color: #b1b3b4;
      }
      .text-comments {
        padding: 0px 5px;
      }
    }
    .actions {
      width: 10%;
      display: flex;
      justify-content: space-around;
      img {
        cursor: pointer;
        width: 20px;
      }
    }
  }
  hr {
    border-top: 1px solid #d7dbdd;
  }
}
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
</style>
