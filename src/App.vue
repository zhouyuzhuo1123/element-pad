<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        
      }
    },
    created(){
      if(!localStorage.username){
        this.$router.push('login')
      }
    }
  }
</script>
<style>
html,body{
  height:100%;
  margin:0;
}
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display:flex;
  flex-direction:column;
}
</style>
