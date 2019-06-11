<template>
  <!-- <transition name='rotate-fall'> -->
      <div id="app">
        <router-view/>
      </div>
  <!-- </transition> -->
</template>


<script>

export default {
  name: 'App',
}
</script>

<style>
body,html {
  padding: 0;
  margin: 0;
}
#app .app-router-view {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
  padding: 0;
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  transform-style: preserve-3d;
  visibility: visible; */
}
</style>
