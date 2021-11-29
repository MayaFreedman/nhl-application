<template>
  <Nav/>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"/>
          </transition>
  </router-view>
</template>
<script>
import Nav from '@/components/Nav.vue'

  export default {
    name:'App',
    components:{
    Nav
    }
  }

</script>

<style>
/* Transitions */
.fade-enter-from,
.fade-leave-to {
opacity:0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
