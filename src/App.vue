<template>
  <Nav/>
  <router-view :games="games"></router-view>
</template>
<script>
import Nav from '@/components/Nav.vue'

  export default {
    name:'App',
    components:{
    Nav
    }, methods :{
       //Gets teams data from JSON server
    async fetchTeams() {
      console.log("im urnning ")
      const res = await fetch("http://localhost:3000/teams");

      const data = await res.json();
      return data;
    }
    }
  }

</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

</style>
