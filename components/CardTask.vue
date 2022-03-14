<template>
  <div class="card">
    <span class="card__name">name task</span>
    <div class="card__actions">
      <div class="card__actions__comments">
        <img src="@/assets/img/comment.png" alt="" />
      </div>
      <div class="card__actions__edit">
        <img src="@/assets/img/editing.png" alt="" />
      </div>
      <div class="card__actions__delete">
        <img src="@/assets/img/bin.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardTask',
}
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  display: flex;
  background-color: beige;
  min-height: 40px;
  justify-content: space-between;
  .card__name {
    font-size: 18px;
    font-weight: bold;
    width: 80%;
  }
  .card__actions {
    display: flex;
    width: 20%;
    align-items: center;
    gap: 10px;
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
