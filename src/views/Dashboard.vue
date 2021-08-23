<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">This is an dashboard page</h1>
    <v-container class="my-5">
      <v-card class="pa-3">
        <v-layout row>
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>Create a new website</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>Bran Peng</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>1st June 2022</div>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div>ongoing</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <labaaafooter/>
  </div>
</template>

<script>
import labaaafooter from '@/components/labaaafooter.vue'

export default {
  name:'Dashboard',
  components:{labaaafooter}
}
</script>