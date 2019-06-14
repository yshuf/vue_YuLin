<template>
    <div class="warn">
        <img src="../../assets/tips.jpg" alt="">
        <div class="content">温馨提示:当前温度过高，即将超过界限值</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
  .warn {
      position: relative;
  }
  .warn img {
      width: 100%;
      height: 100%;
  }
  .content {
      position: absolute;
      left: 78px;
      top: 200px;
      z-index: 2;
  }
</style>