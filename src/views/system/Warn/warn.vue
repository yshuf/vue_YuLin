<template>
  <div class="warn">
    <!-- 危险警告 -->
    <!-- <div id="curvedarrow">温馨提示：{{msg}}</div> -->
    警告提示
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "当前温度过高，即将超多界限值"
    };
  }
};
</script>

<style scoped>
.warn {
  margin-top: 10px;
  background-color: #f5b1b1;
}
#curvedarrow {
  position: relative;
  width: 0;
  height: 0;
  border-top: 19px solid transparent;
  border-right: 9 solid red;
  transform: rotate(10deg);
}
#curvedarrow::after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 3px solid red;
  border-radius: 20px 0 0 0;
  top: -12px;
  left: 9px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
}
#curvedarrow::before {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 3px solid red;
  border-radius: 20px 0 0 0;
  top: 102px;
  left: 9px;
  width: 12px;
  height: 12px;
  transform: rotate(180deg);
}
</style>