<template>
    <div class="warn">
        <Plain></Plain>
        <SystemWarn></SystemWarn>
        <Warn></Warn>
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
 
</style>