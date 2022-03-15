<template>
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
      <div class="card__actions__comments">
        <img src="@/assets/img/comment.png" alt="" />
      </div>
      <div class="card__actions__edit">
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
  methods: {
    toDone(id) {
      this.$store.commit('toDo/SET_DONE', id)
    },
    remove(id) {
      this.$store.commit('toDo/DELETE', id)
    },
  },
}
</script>
<style lang="scss" scoped>
.text-done {
  text-decoration: line-through;
}
.card {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  background-color: beige;
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
      font-weight: bold;
    }
  }
  .card__actions {
    display: flex;
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
</style>
