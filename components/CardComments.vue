<template>
  <div class="comments">
    <div class="text">
      <div class="date">{{ date }}</div>
      <div>{{ text }}</div>
    </div>
    <div class="actions">
      <span>
        <img src="@/assets/img/editing.png" alt="" />
      </span>
      <span>
        <img src="@/assets/img/bin.png" alt="" />
      </span>
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
  },
}
</script>
<style lang="scss" scoped>
.comments {
  display: flex;
  width: 100%;
  align-items: center;
  .text {
    width: 90%;
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
</style>
