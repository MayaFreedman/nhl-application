<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
    crossorigin="anonymous"
  />
  <header id="main-header" class="p-4">
    <div class="container">
      <h1 id="header-title">Add Data</h1>
    </div>
  </header>
  <div class="container">
      <AddTeam/>
      <AddGame/>
  </div>

</template>

<script>
import AddTeam from '@/components/AddTeam.vue'
import AddGame from '@/components/AddGame.vue'
  export default {
  components: {
    AddTeam,
    AddGame
  }
  }

</script>

