<template>
    <div class="warn">
        <img src="../../assets/tip.png" alt="">
        <div class="content">温馨提示:当前温度过高，即将超过界限值</div>
    </div>
</template>


<script>
import Plain from '@/views/system/Warn/plain'
import SystemWarn from '@/views/system/Warn/system'
import Warn from '@/views/system/Warn/warn'
export default {
  data(){
      return {

      }
  },
  components: {
      Plain,
      SystemWarn,
      Warn
  }
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