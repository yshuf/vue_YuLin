<template>
  <div class="weather">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 标签页头部渲染 -->
      <el-tab-pane
        :label="items.label"
        :name="items.name"
        align="center"
        v-for="(items,index) in list"
        :key="index"
      >
        <div class="move animated fadeInLeftBig">
          <span class="setting">{{items.label}}设置</span>
          <!-- 图片 -->
          <img :src="getImgUrl(items.src)" alt="">
        </div>
        <setting></setting>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Setting from "@/views/Resource/setting";
export default {
  name: "set",
  components: {
    Setting
  },
  data() {
    return {
      activeName: "first",
      list: [
        { label: "空气温度", name: "first", src: "04.png" },
        { label: "空气湿度", name: "second", src: "10.png" },
        { label: "氧气浓度", name: "thrith", src: "氧气.jpg" },
        { label: "降雨量", name: "fourth", src: "降雨量.jpg" },
        { label: "土壤温度", name: "fifth", src: "土壤温度.jpg" },
        { label: "土壤湿度", name: "sixth", src: "土壤湿度.png"},
        { label: "风速", name: "seventh", src: "风速.jpg" },
        { label: "风向", name: "eightth", src: "风向.jpg" },
        { label: "大气压强", name: "ninth", src: "大气压.jpg" },
        { label: "光照强度", name: "tenth", src: "02.png" }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getImgUrl(src) {
      return require("@/assets/images/" + src);
    }
  }
};
</script>

<style scoped>
/* .weather {
  background: url(../../assets/images/82.jpg) no-repeat center center;
} */
.setting {
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
}
.move {
  position: relative;
}

/* 图片 动画 */
.move > img {
  position: absolute;
  right: 0;
  background: transparent;
  animation: imgMove 1s;
}

@keyframes imgMove {
  0% {
    top: 0px;
  }
  25% {
    top: 200px;
    right: 50px;
  }
  50% {
    top: 400px;
    right: 30px;
  }
  75% {
    top: 200px;
    right: 0px;
  }
  100% {
    top: 0px;
    right: 20px;
  }
}
</style>
