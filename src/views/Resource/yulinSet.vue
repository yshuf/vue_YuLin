<template>
  <div class="weather">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 标签页头部渲染 -->
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        align="center"
        v-for="(item,index) in list"
        :key="index"
      >
        <!-- 图片 -->
        <div class="move animated fadeInLeftBig">
          <span class="setting">{{item.label}}设置</span>
          <img :src="getImgUrl(item.src)" alt>
        </div>

        <!-- 最大最小值修改 -->
        <div class="max">
          <span>
            max:
            <input type="text" v-model="changeValue.value">
          </span>
          <!-- 修改值 -->
          <el-button type="danger" @click="change">修改</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      activeName: "first",
      changeValue: {
        name: "",
        value: ""
      },
      list: [
        { label: "空气温度", name: "max_atm_tem", src: "04.png" },
        { label: "空气湿度", name: "max_atm_hum", src: "10.png" },
        // { label: "氧气浓度", name: "max_atm_o2", src: "氧气.jpg" },
        { label: "二氧化碳浓度", name: "max_atm_co2", src: "降雨量.jpg" },
        {label: "烟雾浓度",name:'max_atm_smoke', src: "降雨量.jpg"},
        {
          label: "土壤温度",
          name: "max_soil_tem",
          src: "土壤温度.jpg"
        },
        {
          label: "土壤湿度",
          name: "max_soil_hum",
          src: "土壤湿度.png"
        },
        { label: "土壤盐分", name: "max_soil_nity", src: "风速.jpg" },
        { label: "土壤电导率", name: "max_soil_conduct", src: "风向.jpg" },
        { label: "水温", name: "max_water_tem", src: "大气压.jpg" },
        { label: "浑浊度", name: "max_water_tur", src: "02.png" }
      ]
    };
  },
  methods: {
    // 获取默认最大值
    handleClick(tab) {
      this.$axios
        .get(
          "forest/standard?name=" +
            tab.$options.propsData.name
        )
        .then(res => {
          this.changeValue.value = res.data;
          this.changeValue.name = tab.$options.propsData.name;
        });
    },

    // 图片
    getImgUrl(src) {
      return require("@/assets/images/" + src);
    },

    // 修改最大值
    change() {
      this.$axios
        .put(
          "forest/standard",
          this.changeValue
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "danger"
          });
        });
    }
  }
};
</script>

<style scoped>
.setting {
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
}
.move {
  position: relative;
}
.max {
  margin: 50px auto;
  padding-top: 66px;
  /* border: 2px solid #ccc; */
  box-shadow: 5px 5px 14px #f3d7d7;
  box-sizing: border-box;
  width: 600px;
  height: 200px;
}
.max > span {
  margin-left: 40px;
}
/* 最大值 */
.max > span > input {
  height: 25px;
  /* border-radius: 2px; */
  border: 1px solid #ccc;
}
.el-button {
  margin-left: 50px;
}
/* 图片 动画  */
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
