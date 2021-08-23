<template>
  <div class="myprojects">
    <h1 class="subheading grey--text">THREE 项目展示</h1>
      <v-container class="my-15 mx-5">
        <v-layout row>
          <v-flex xs12 md4>
            <v-card class="pa-3 ma-3" outlined>
              <v-list-item class="three-line">
                <v-list-item-content>
                  <div class="caption grey--text mb-4">
                    项目名称
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    古南街
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    根据CAD生成场景
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar tile size='80' color='grey'>               
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn outlined text to="/threeprojects/gunanjie">
                  ENTER
                </v-btn>
              </v-card-actions>       
            </v-card>
          </v-flex>

          <v-flex xs12 md4>
            <v-card class="pa-3 ma-3" outlined>
              <v-list-item class="three-line">
                <v-list-item-content>
                  <div class="caption grey--text mb-4">
                    项目名称
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    标准样板
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    没有介绍
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar tile size='80' color='grey'>               
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn outlined text to="/threeprojects/example">
                  ENTER
                </v-btn>
              </v-card-actions>       
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <labaaafooter/>
  </div>
</template>
<script>
import labaaafooter from '@/components/labaaafooter.vue'

export default {
  name:'MyProjects',
  components:{labaaafooter}
}
</script>