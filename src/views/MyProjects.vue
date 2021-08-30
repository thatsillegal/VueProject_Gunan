<template>
  <div class="myprojects">
    <h1 class="ma-8 subheading grey--text">项目</h1>
      <v-container class="my-15 mx-5">
        <v-layout row>
          
          <v-flex xs12 md4 v-for="(item,i) in items" :key="i">
            <v-card class="pa-3 ma-3" outlined>
              <v-list-item class="three-line">
                <v-list-item-content>
                  <div class="caption grey--text mb-4">
                    项目名称
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{item.title}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{item.subtitle}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                 <v-list-item-avatar tile size='120'>  
                  <v-img
                     :src= item.pic
                  ></v-img>        
                </v-list-item-avatar>
              </v-list-item>
              <v-card-actions>
                <v-btn outlined text :to= item.link>
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
  components:{labaaafooter},

  data(){
    return{
      items:[
        {title:"古南街",subtitle:"村镇社区空间",pic:"/model/gunanjie/cover.jpg",link:"/threeprojects/gunanjie"},
        {title:"丁蜀镇A地块",subtitle:"丁蜀镇A地块",pic:"/model/placeA/cover.png",link:"/threeprojects/example"},
        {title:"公共设施布局优化",subtitle:"马鞍山当涂县",pic:"/model/jinze/cover.png",link:"/threeprojects/jinze"},
        {title:"练泥池茶室",subtitle:"对“水院”意象的援引",pic:"/model/bui01/bui01.jpg",link:"/threeprojects/building01"},
        {title:"水龙宫便民设施",subtitle:"弥补传统街道缺少的公共休闲区域",pic:"/model/bui02/bui02.jpg",link:"/threeprojects/building02"},
        {title:"张家老宅改造",subtitle:"建筑的联体 - 共生结构",pic:"/model/bui03/bui03.png",link:"/threeprojects/building03"},
        {title:"曼生廊和T字房",subtitle:"创造两处并不相连的建筑组团的连续空间",pic:"/model/bui04/bui04.jpg",link:"/threeprojects/building04"},
        {title:"蜀山展示馆",subtitle:"三栋建筑整合一体的层次丰富游览性空间",pic:"/model/bui05/bui05.jpg",link:"/threeprojects/building05"},
        {title:"得义楼茶馆",subtitle:"小面宽大进深  “修复”和“活化”",pic:"/model/bui06/bui06.jpg",link:"/threeprojects/building06"},
        {title:"凌霄亭",subtitle:"蠡河东岸公共景观视觉中心",pic:"/model/bui07/bui07.jpg",link:"/threeprojects/building07"},
        {title:"通蜀路茶室",subtitle:"穿越多个山墙的室内室外整合关系",pic:"/model/bui08/bui08.png",link:"/threeprojects/building08"},
      ]
    }
  }
}
</script>