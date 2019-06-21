<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        :label="items.label"
        :name="items.name"
        align="center"
        v-for="(items,index) in list"
        :key="index"
      >
        <div class="move animated fadeInLeftBig">
          <span class="setting">{{items.label}}设置</span>
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
        { label: "空气温度", name: "first", src: "04" },
        { label: "空气湿度", name: "second", src: "02" },
        { label: "氧气浓度", name: "thrith", src: "01" },
        { label: "降雨量", name: "fourth", src: "03" },
        { label: "土壤温度", name: "fifth", src: "06" },
        { label: "土壤湿度", name: "sixth", src: "09" },
        { label: "风速", name: "seventh", src: "07" },
        { label: "风向", name: "eightth", src: "08" },
        { label: "大气压强", name: "ninth", src: "05" },
        { label: "光照强度", name: "tenth", src: "10" }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getImgUrl(src) {
      return require("@/assets/images/" + src + ".png");
    }
  }
};
</script>

<style scoped>
/*  */
.setting {
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
}
.move {
  position: relative;
}
.move > img {
  position: absolute;
  right: 0;
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
  0% {
    top: 0px;
  }
}
</style>
