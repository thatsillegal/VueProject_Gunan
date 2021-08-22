<template>
  <v-app>
    <Navbar/>
    <v-main id="main-view">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default{
  name:'App',
  components:{Navbar},
  data:()=>({
    
  })
}
</script>

<style  scoped>

</style>