<template>
  <div class="team">
    <h1 class="subheading grey--text">This is an team page</h1>

    <v-container my-5>
        <v-layout row>
          <v-flex xs12 md6>
            <v-btn outlined block class="primary">1</v-btn>
          </v-flex>
          <v-flex xs4 md2>
            <v-btn outlined block class="primary">2</v-btn>
          </v-flex>
           <v-flex xs4 md2>
            <v-btn outlined block class="primary">2</v-btn>
          </v-flex>
           <v-flex xs4 md2>
            <v-btn outlined block class="primary">2</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row justify-end>
          <v-flex xs4 md3>
            <v-btn outlined block class="anchor">1</v-btn>
          </v-flex>
          <v-flex xs4 md3>
            <v-btn outlined block class="anchor">2</v-btn>
          </v-flex>
        </v-layout>
    </v-container>
    <labaaafooter/>
  </div>
</template>

<script>
import labaaafooter from '@/components/labaaafooter.vue'

export default {
  name:'Team',
  components:{labaaafooter}
}
</script>