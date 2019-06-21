<template>
  <!-- <transition name='rotate-fall'> -->
  <div id="app">
    <transition name="bounce">
       <router-view/>
    </transition>
  </div>
  <!-- </transition> -->
</template>


<script>
export default {
  name: "App"
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app .app-router-view {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
  padding: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transition: scale(1);
  }
}

</style>
