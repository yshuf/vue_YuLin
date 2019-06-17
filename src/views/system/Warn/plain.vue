<template>
  <div class="plain">
    <!-- 普通警告 -->
    <div class="content">温馨提示:当前温度过高，即将超过界限值</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.plain {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #b1eee6;
}
.content {
  z-index: 2;
}
</style>