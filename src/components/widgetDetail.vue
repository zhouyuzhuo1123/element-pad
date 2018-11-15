<template>
  <render-html :renderData="layout"></render-html>
</template>

<script>
  import renderHtml from "./core/render/renderHtml.vue";
  import fetch from '../core/http'
  import test  from './test.vue'
  import tests from './tests.vue'
  export default {
    data() {
      return {
        layout: []
      };
    },
    async created(){
      const data = await fetch.get('/api/widgetlist?id='+this.$route.query.id);
      this.layout = data.content.data[0].data;
    },
    methods: {

    },
    components:{
      renderHtml
    }
  }
</script>

<style scoped>

</style>

