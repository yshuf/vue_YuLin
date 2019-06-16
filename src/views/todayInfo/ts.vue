<template>
    <div>
        <button v-on:click="get()">空气温度</button>
        <!-- <el-button type="primary" >空气温度</el-button> -->
        <Circle11 :flag1="flag"></Circle11>
        
    </div>
</template>

<script>
import Circle11 from './circle'
export default {
    data()
    {
        return{
            flag:'true'
        }
    },
    methods:
    {
        get(){
            this.flag = !this.flag;
        }
    },
    components:
    {
        Circle11,
    }
}
</script>

<style scoped>
    
</style>
