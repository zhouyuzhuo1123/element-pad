<template>
  <div class="hello">
    <app-head :items="item"></app-head>
    <app-body></app-body>
  </div>
</template>

<script>
  import AppHead from '@/components/app/head.vue'
  import AppBody from '@/components/app/navMenu.vue'

  export default {
    name: 'app',
    data(){
      return{
        item:[{title:'东风'},{title:'南风'},{title:'西风'},{title:'北风'}]
      }
    },
    components:{
      AppHead,
      AppBody
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display:flex;
  flex-direction:column;
}
</style>
