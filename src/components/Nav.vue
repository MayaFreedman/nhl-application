<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3" id="nav">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav">
           <!-- <router-link to="/"><img src="@../images/LeagueLogo.png" alt="" class="img-fluid"/></router-link>-->
          <li class="nav-item active">
            <router-link class="nav-link" to="/add">Add</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Standings</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/games" class="nav-link">Games</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>


</template>
<style>

#nav {
  padding: 30px;
}

#nav a {
  color: grey;
}

#nav a.router-link-exact-active {
  color: white;
}
/*
.nav-item{
  margin-top:12px;
}*/
</style>
