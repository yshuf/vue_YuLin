<template>
    <div>
        <el-button type="primary" v-on:click="get()">空气温度</el-button>
        <Circle v-if='flag'></Circle>
    </div>
</template>

<script>
import Circle from './circle'
export default {
    data()
    {
        return
        {
            flag:'true'
        }
    },
    methods:
    {
        get(){
            this.flag = !fla;
        }
    },
    components:
    {
        Circle,
    }
}
</script>

<style scoped>
    
</style>
