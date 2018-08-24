<template>
  <div>
     <div id="wrapper">
       <navigation :id="id" ></navigation>
        <div class="container">
         <nuxt />
            
        </div>
    </div>
    <footer class="text-center">
      @2018. Made With <i class="fa fa-heart" style="color: red;"></i> By <a href="http://www.apex-triangle.com" target="_blank"> Apex Triangle. </a>&copy;<a href="https://www.twitter.com/atobajaiyemax" target="_blank">Kingi_n</a>
    </footer>
  </div>
</template>

<script>
import navigation  from "@/components/nav";

export default {
  components: {
    navigation
  },
  data(){
    return {
      id: ''
    }
  },

}
</script>

<style>

</style>
