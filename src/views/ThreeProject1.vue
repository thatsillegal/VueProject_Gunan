<template>
  <div>
      <div class="threeproject" id="canvas"></div>

      <v-card
      class="padless fixedcard"
      >
        <v-row
          padless
          align="center"
          justify="center"
        >
          <v-btn-toggle
            padless
            v-model="toggle_exclusive"
            rounded
          >
            <v-btn @click="refreshline">
              Line模型
            </v-btn>
            <v-btn @click="refreshBuilding">
              古南街模型
            </v-btn>
          </v-btn-toggle>
        </v-row>
    </v-card>

      <v-card
      class="mx-auto popupcard"
      max-width="250"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title>
        {{houseName}}号房
      </v-card-title>

      <v-card-subtitle>
        层数：{{floor}} 层
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="orange lighten-2"
          text
        >
          Explore
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
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>


  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import buildingjson from '@/assets/buildings.json';
import pointsjson from '@/assets/points.json'
import {Building} from'@/js/Building.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
// import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader'
// import Stats from "three/examples/jsm/libs/stats.module.js";

export default {
  data(){
    return {
      publicPath: process.env.BASE_URL,

      //json
      buildingsInfo:buildingjson,
      pointsInfo:pointsjson,

      //template
      toggle_exclusive: undefined,
      show: false,
      floor:0,
      houseName:'No building selected',

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
      mountain:null,
      
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
      let that = this 

      //拾取canvas
      const canvas = document.querySelector('#canvas');

      //初始化 Secne 场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x999999);

      //camera
      this.camera = new THREE.PerspectiveCamera(45,1,1,5000);//?ratio?
      this.camera.position.set(0,0,1000);//?
      this.scene.add(this.camera)


      //初始化 Light 光源
      let ambientlight = new THREE.AmbientLight(0x404040);
      this.scene.add(ambientlight)

      const sunlight_a=300
      let sunlight = new THREE.DirectionalLight(0x909090);
      this.scene.add(sunlight)

      sunlight.position.set(sunlight_a,-sunlight_a,1.5*sunlight_a)
      sunlight.castShadow = true

      const shadow_side = 500;
      const shadow_pixel = 1024
      sunlight.shadow.mapSize.width = shadow_pixel; // default
      sunlight.shadow.mapSize.height = shadow_pixel; // 决定了阴影质量
      sunlight.shadow.camera.top = shadow_side;
      sunlight.shadow.camera.bottom = -shadow_side;
      sunlight.shadow.camera.left = shadow_side;
      sunlight.shadow.camera.right = -shadow_side;
      sunlight.shadow.camera.near = 100; // default
      sunlight.shadow.camera.far = 1000; // default

      //lightHelper
      // const helper = new THREE.CameraHelper( sunlight.shadow.camera );
      // this.scene.add( helper );

      //Helper
      let AxesHelper = new THREE.AxesHelper(250)
      this.scene.add(AxesHelper)

      //renderer
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))//?没用

      this.renderer.shadowMap.enabled = true //光这个也没用，要指定哪些可以castshadow 哪些可以receiveshadow
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.shadowMap.autoupdate= false //注意一下 设置了这个之后 每次render不会用了


      canvas.appendChild(this.renderer.domElement)
      this.renderer.setPixelRatio(window.devicePixelRatio);//? 和setsize区别在哪里？
      // this.renderer.setSize(window.innerWidth, window.innerHeight);

      //初始化 controls 鼠标互动控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // console.log(this.scene)


      //创建raytrace
        /**监听鼠标事件**/
      // this.raycaster = new THREE.Raycaster();
      // this.mouse = new THREE.Vector2();
      // function onMousemove(event){
      //   event.preventDefault();
      //   let mousepos = getMousePos(canvas,event);
      //   that.mouse.setX(mousepos.x*2-1);
      //   that.mouse.setY(-mousepos.y*2+1); //这个地方没有转换正负号把我坑惨了
      //   // console.log(that.mouse.x+","+that.mouse.y)

      //   that.raycaster.setFromCamera(that.mouse,that.camera)
      //   let intersects = that.raycaster.intersectObjects( that.scene.children, true );
      //   if(intersects.length > 0 ){
      //     if(that.INTERSECTED != intersects[0].object){
      //       //有的话就设置为发光
      //       if(that.INTERSECTED){
      //         that.INTERSECTED.material.color.set( that.INTERSECTED.currentHex ); //设回之前的颜色
      //       }
      //       //不管有没有
      //       that.INTERSECTED = intersects[0].object
      //       that.INTERSECTED.currentHex = that.INTERSECTED.material.color.getHex() //给this.INTERSECTED设置一个属性 ，并且把当前颜色的hex值付给他，这个功能非常好用，可以直接保存要临时保存的值
      //       that.INTERSECTED.material.color.set( 0xff0000 );
      //     } 
      //   }else{
      //     if(that.INTERSECTED) that.INTERSECTED.material.color.set( that.INTERSECTED.currentHex ); //这个颜色应该是之前的颜色
      //     that.INTERSECTED = null;
      //   }
      // }
      // function getMousePos(canvas,e){
      //   let rect = canvas.getBoundingClientRect()
      //   return{
      //     x:(e.clientX-rect.left)/rect.width,
      //     y:(e.clientY-rect.top)/rect.height
      //   }
      // }
      // canvas.addEventListener('mousemove',onMousemove,false)

      //创建click弹出事件
      canvas.addEventListener('click',popInfo);
      function popInfo(){
          if(that.INTERSECTED){
              if(that.INTERSECTED.floor){
                  that.floor = that.INTERSECTED.floor
                  that.houseName = that.INTERSECTED.key
              }else{
                  that.floor = 'No floor info detected.'
              }
            
          }else{
              // console.log('No house selected.')
          }
      }

      //测试模型
      // let spotLight = new THREE.SpotLight( 0xffffff );
      // spotLight.position.set( 100, 1000, 100 );
      // spotLight.castShadow = true;
      // this.scene.add(spotLight)

      // let cubegeo = new THREE.BoxGeometry(50,50,50)
      // let cube = new THREE.Mesh(cubegeo,new THREE.MeshLambertMaterial({color:0xff0000}))
      // cube.translateZ(20)
      // cube.castShadow = true
      // this.scene.add(cube)

      //添加obj 山
      
      // let loader = new ColladaLoader();
      let loader = new OBJLoader();
      loader.load('/static/rhino.obj',
      function(object){
        that.mountain = object.translateX(-700).translateY(-450).rotateX(Math.PI/2) //顺序很重要，不要先rotate
        that.scene.add(that.mountain)
        console.log(that.scene)
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( error );
      })
      // console.log(this.mountain)
      // console.log(this.scene)

      //添加古南街模型
      this.scene.remove(this.line) //这个函数非常重要，不然他不知道没有删除之前的对象
      this.scene.remove(this.group)
      this.scene.remove(this.plane)

      let geometry = new THREE.PlaneGeometry(1000,1000,20,20)
      this.plane = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:0xffffff}))
      this.plane.receiveShadow = true
      this.scene.add(this.plane)

      let data =this.buildingsInfo
      let len = data.length

      this.group = new THREE.Group();

      for(let i=0;i<len;i++){
        let dots = data[i].dots;
        let floor = data[i].floor;
        if(floor == 0) floor =1;

        let building = new Building(dots,floor,i)
        building.mesh.castShadow = true
        this.group.add(building.mesh)
        this.group.add(building.line)
      }
      this.group.translateX(-650)
      this.group.translateY(-400)
      // this.group.castShadow = true //group添加cast shadow没有用，要在group的子对象中添加这个属性
      this.scene.add(this.group)

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