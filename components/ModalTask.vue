<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal-header">
          <slot name="header">Comments</slot>
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            data-testid="close-modal"
            @click="close"
          >
            x
          </button>
        </header>

        <section id="modalDescription" class="modal-body">
          <slot name="body">
            <card-comments
              v-for="(item, index) in comments"
              :id="item.id"
              :key="index"
              :text="item.text"
              :date="item.date"
              @removeComments="remove"
              @editComments="editComment"
            >
            </card-comments>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <textarea
              v-model="text"
              class="add-comments"
              name=""
              cols="30"
              rows="5"
              data-testid="input-comments"
            ></textarea>
            <button
              class="button-3 add"
              data-testid="add-comments"
              @click="addComments()"
            >
              comment
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import CardComments from './CardComments.vue'
export default {
  name: 'ModalTask',
  components: { CardComments },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    comments() {
      const task = { ...this.$store.getters['toDo/getId'](this.id) }
      return task.comments
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addComments() {
      this.$store.commit('toDo/COMMENTS', { id: this.id, comments: this.text })
      this.text = ''
    },
    remove({ id }) {
      this.$store.commit('toDo/DELETE_COMMENTS', { id: this.id, date: id })
    },
    editComment({ id, text }) {
      this.$store.commit('toDo/EDIT_COMMENTS', { date: id, id: this.id, text })
    },
  },
}
</script>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    background: #ffffff;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 650px;
    border-radius: 10px;
    max-height: 960px;
    min-height: 400px;

    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }

    .modal-header {
      position: relative;
      justify-content: space-between;

      .btn-close {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        font-size: 30px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        color: #282525;
        background: transparent;
      }
    }

    .modal-footer {
      flex-direction: column;
      gap: 10px;
      .add-comments {
        width: auto;
        height: 60px;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px 10px 0;
        resize: none;
        outline: none;
      }
      .button-3 {
        width: 20%;
        align-self: flex-end;
      }
    }
    .modal-body {
      position: relative;
      padding: 20px 10px;
      height: 250px;
      display: flex;
      overflow: auto;
      flex-direction: column;
      gap: 10px;
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
