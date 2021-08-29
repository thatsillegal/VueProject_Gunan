<template>
  <div>
      <div class="threeproject" id="canvas"></div>

    

      <v-card
      class="mx-auto popupcard"
      max-width="250"
    >
      <v-img
        src="/model/bui04/bui04.jpg"
        height="200px"
      ></v-img>

      <v-card-title>
        {{houseName}}
      </v-card-title>

      <v-card-subtitle>
        层数：{{floor}} 层
      </v-card-subtitle>

      <v-card-actions>
        <v-btn to="/threeprojects/example"
          color="orange lighten-2"
          text
        >
          详情简介
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            项目地点：江苏省宜兴市丁蜀镇
设计时间：2018 年 3 月
竣工时间：2019 年 3 月
建筑总面积：235 ㎡
占地面积：110 ㎡
设计团队：唐芃，吴浩东 , 俞海洋 , 杨波

          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>


  </div>
</template>

<script>
import * as THREE from 'three';
// import { OBJLoader } from "three-obj-mtl-loader";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import buildingjson from '@/assets/buildings.json';
import pointsjson from '@/assets/points.json'
// import {Building} from'@/js/Building.js'
// import Stats from "three/examples/jsm/libs/stats.module.js";

export default {
  data(){
    return {
      //json
      buildingsInfo:buildingjson,
      pointsInfo:pointsjson,

      //template
      toggle_exclusive: undefined,
      show: false,
      floor:2,
      houseName:'曼生廊和T字房',

      lineMaterial:new THREE.LineBasicMaterial({color:0x0000ff}),  
      
      //THREE
      renderer: null, //这个必须放这里，不然canvas尺寸计算会出问题
    }
  },

  //这些东西在static中创建最好了，也可以在mounted中创建，就是不要在data中创建，否则会有很多getter和setter
  static(){
    return{
      //object
      line:null,
      group:null,
      plane:null,
      
      //ratcaster
      mouse:null,
      raycaster:null,
      INTERSECTED:null,

      //THREE
      scene: null,
      camera: null,
      
      controls: null,
    }
  },

  mounted() {
    this.init();

    let that = this;
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      const width  = document.querySelector("#canvas").clientWidth;
      const height = window.innerHeight -document.querySelector("#app-bar").clientHeight;
      that.renderer.setSize(width, height, false);
      const canvas = that.renderer.domElement;
      that.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      that.camera.updateProjectionMatrix();
    }
    onWindowResize();
  },

  methods:{
    refreshBuilding(){
     
    },

    refreshline(){
      this.scene.remove(this.line) //这个函数非常重要，不然他不知道没有删除之前的对象
      this.scene.remove(this.group)
      this.scene.remove(this.plane)
      let points=[]

      let list = this.pointsInfo.values
      let n = list.length/3;
      for(let i=0;i<n;i++){
          let x= list[i*3]
          let y= list[i*3+1]
          let z= list[i*3+2]
          points.push(new THREE.Vector3(x,y,z))
      }
      points.push(points[0])
      let geometry = new THREE.BufferGeometry().setFromPoints(points);
      this.line = new THREE.Line(geometry,this.lineMaterial);
      this.scene.add(this.line)
    },
    init(){
      //创建一个that给回调函数用
      //let that = this 

      //拾取canvas
      const canvas = document.querySelector('#canvas');

      //初始化 Secne 场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x999999);

      //camera
      this.camera = new THREE.PerspectiveCamera(45,1,1,10000);//?ratio?
      this.camera.position.set(-1000,500,-1000);//?
      this.scene.add(this.camera)


      //初始化 Light 光源
      // let ambientlight = new THREE.AmbientLight(0x404040);
      // let sunlight = new THREE.DirectionalLight(0x909090);
      // sunlight.position.set(0,1,1)
      // sunlight.castShadow = true
      // this.scene.add(ambientlight)
      // this.scene.add(sunlight)

      //Helper
      let AxesHelper = new THREE.AxesHelper(1000)
      this.scene.add(AxesHelper)

      //renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))//?没用
      this.renderer.shadowMap.enabled = true //光这个也没用，要指定哪些可以castshadow 哪些可以receiveshadow
      canvas.appendChild(this.renderer.domElement)
      this.renderer.setPixelRatio(window.devicePixelRatio);//? 和setsize区别在哪里？
      // this.renderer.setSize(window.innerWidth, window.innerHeight);


      /**
       * 光源设置
       */
      //点光源
      var point = new THREE.PointLight(0xffffff);
                      //  red   green  blue 
      point.position.set(-500, 2000, -500); //点光源位置
      this.scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);

      //添加古南街模型
      this.scene.remove(this.line) //这个函数非常重要，不然他不知道没有删除之前的对象
      this.scene.remove(this.group)
      this.scene.remove(this.plane)

      
      //初始化 controls 鼠标互动控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // console.log(this.scene)

      let geometry = new THREE.PlaneGeometry(50000,50000,-100,1)
      this.plane = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:0xffffff}))
      this.plane.receiveShadow = true
      this.scene.add(this.plane)

      
      
      //加载环境模型
      let cloader = new ColladaLoader();
      let scope = this;
      // let skySphere;

      // function createSkySphere(file) {
      //  const geometry = new THREE.SphereGeometry(500, 60, 40);
      //  // Invert the geometry on the x-axis so that all of the faces point inward
      //  geometry.scale(-10, 10, 10);

      //  const texture = new THREE.TextureLoader().load(file);
      //  texture.encoding = THREE.sRGBEncoding;
      //  const material = new THREE.MeshBasicMaterial({ map: texture });
      //  skySphere = new THREE.Mesh(geometry, material);
      //  skySphere.translateX(-200).translateY(200).rotateX(Math.PI/2) 
      //  scope.scene.add(skySphere);
      // }
      // createSkySphere("/backgray2.jpg");

      //加载单栋建筑模型
      var mesh;
      cloader.load("/model/bui04/bui04.dae", function(result){
        mesh = result.scene.children[0].clone();
        mesh.rotateX(-Math.PI/2).rotateZ(-Math.PI/2);
        scope.scene.add(mesh);
      })
      
    

      //animate
      this.animate();
    },

    animate(){
        this.controls.update();
        requestAnimationFrame(this.animate); //这是一个回调函数，在下次画图时调用
        this.renderer.render(this.scene, this.camera);
    },
  }
}
</script>

<style scoped>
.fixedcard{
  position:absolute;
  top:30px;
  right:30px
}
.popupcard{
  position:absolute;
  right:10px;
  top:100px
}
</style>