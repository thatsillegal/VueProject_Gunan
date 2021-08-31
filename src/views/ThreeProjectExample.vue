<template>
  <div>
      <div class="threeproject" id="canvas"></div>

    <v-card class="mx-auto popupcard">
      <!-- <v-btn
          x-small
          @click="show = !show"
          style="position:absolute ; left:-30px"
        >
          <v-icon>{{ show ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn> -->

      <v-card
      width="250"
      >
      <v-card-title>
        #{{houseName}}
      </v-card-title>

      <p class="ma-0 pl-5">
        层数：{{floor}} 层
      </p>

      <p class="ma-0 pl-5 ">
        图层：{{layername}} 
      </p>

      <v-card-actions>
        <v-btn
          :disabled = islinkOn
          :to= houselink
          color="orange lighten-2"
          text
        >
          了解详情
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      
    </v-card>
    </v-card>

    <!-- <v-card id="control-panel" width="250">
      <v-card-title>控制台</v-card-title>
      <v-container fluid >
        <v-row class="pl-3 pb-3">
          <v-checkbox hide-details label="活力图" :input-value="hotmapOn" @click="isHotmapOn()"></v-checkbox>
          <v-checkbox hide-details label="UTCI" :input-value="UTCIOn" @click="isUTCIOn()"></v-checkbox>
        </v-row>
      </v-container> -->

    <!-- </v-card> -->

 <v-card
      id="layers-panel"
      width="250"
    >
    <v-card-title>
        图层
      </v-card-title>
    <v-expansion-panels>
      <v-expansion-panel v-for=" item in layers" :key='item.order' >
        <v-expansion-panel-header>
        {{item.layername}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container fluid>
          <v-row >
            <v-col>
              <v-checkbox hide-details label="高亮" :input-value="item.highlight" @click="isHighlightLayer(item.order)" ></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox hide-details label="开启" :input-value="item.on"  @click="isOpenLayer(item.order)"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
 </v-card>

 <v-card>

 </v-card>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import buildingjson from '@/assets/place2datav2.json';
import pointsjson from '@/assets/points.json'
import _hotimg from '@/assets/hot2.jpg'
import _UTCI from '@/assets/UTCI.jpg'
import {Building, PublicSpace, Line} from'@/js/Building.js'
// import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
// import {TextureLoader} from 'three/examples/jsm/loaders/TxtureLoader'
// import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader'
// import Stats from "three/examples/jsm/libs/stats.module.js";

export default {
  data(){
    return {

      //json
      buildingsInfo:buildingjson,
      pointsInfo:pointsjson,

      //img
      hotimg: _hotimg,
      UTCI: _UTCI,

      //template
      toggle_exclusive: undefined,
      show: false,
      floor:0,
      houseName:'No building selected',

      layername:null,
      houselink:"",
      islinkOn:true,

      defaultColor: new THREE.Color().set(0xffffff),
      lineMaterial:new THREE.LineBasicMaterial({color:0x0000ff}), 
      // hilightColor : [],
      
      //THREE
      renderer: null, //这个必须放这里，不然canvas尺寸计算会出问题

      //layers
      layers:[]
    }
  },

  //这些东西在static中创建最好了，也可以在mounted中创建，就是不要在data中创建，否则会有很多getter和setter
  static(){
    return{
      //object
      line:null,
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

      groups:null, //事实证明，在这里面初始化 比如写成 groups:[] 屁用没有，还得在后面初始化
      allbuildings: null,
    }
  },

  mounted() {
    this.init();
    let that = this;
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      const width  = document.querySelector("#canvas").clientWidth;
      const height = window.innerHeight - document.querySelector("#app-bar").clientHeight;

      //  console.log("innerheight :"+window.innerHeight)
      // console.log("canvas height:"+height)
      that.renderer.setSize(width, height, true);   //把这个改成true 就可以了！ 不要问我为什么

      // console.log(that.renderer.getSize())
      const canvas = that.renderer.domElement;

      that.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      that.camera.updateProjectionMatrix();
    }
    onWindowResize();
  },

  methods:{

    isHighlightLayer(order){
      this.layers[order].highlight = !this.layers[order].highlight
      if(this.layers[order].highlight){
        this.groups[order].traverse((obj)=>{
          //Executes the callback on "this"(which is a group , SO , NO!!!) object and all descendants.
          if(obj.type === "Mesh"){
            // obj.material.copy(this.hilightMaterial)
            obj.material.color.set(this.layers[order].color)
          }
          if(obj.type === "Line"){
            obj.material.color.set(this.layers[order].color)
          }
        })
      }else{
        this.groups[order].traverse((obj)=>{
          if(obj.type === "Mesh"){
            obj.material.color.set(this.defaultColor)
          }
           if(obj.type === "Line"){
            obj.material.color.set(this.defaultColor)
          }
        })
      }
      console.log(this.layers[order].layername+"是否高亮: "+this.layers[order].highlight)
    },

    isOpenLayer(order){
      this.layers[order].on = !this.layers[order].on
      if(!this.layers[order].on){
        this.groups[order].traverse((obj)=>{
          if(obj.type ==="Mesh" ){
            obj.material.visible = false
          }
          if(obj.type ==="Line"){
            obj.material.visible = false
          }
        })
      }else{
        this.groups[order].traverse((obj)=>{
          if(obj.type ==="Mesh"){
            obj.material.visible = true
          }
           if(obj.type ==="Line"){
            obj.material.visible = true
          }
        })
      }
      console.log(this.layers[order].layername+"是否开启: "+this.layers[order].on)
      console.log(this.groups[order])
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
      this.camera = new THREE.PerspectiveCamera(45,1,1,10000);//?ratio?
      this.camera.position.set(0,0,3000);//?
      this.scene.add(this.camera)


      //初始化 Light 光源
        //点光源

      let ambientlight = new THREE.AmbientLight(0x444444);
      this.scene.add(ambientlight)

      const sunlight_a=300
      let sunlight = new THREE.DirectionalLight(0xffffff);
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


      //场地
      let skySphere;

      function createSkySphere(file) {
       const geometry = new THREE.SphereGeometry(500, 60, 40);
       // Invert the geometry on the x-axis so that all of the faces point inward
       geometry.scale(-10, 10, 10);

       const texture = new THREE.TextureLoader().load(file);
       texture.encoding = THREE.sRGBEncoding;
       const material = new THREE.MeshBasicMaterial({ map: texture });
       skySphere = new THREE.Mesh(geometry, material);
       skySphere.translateX(-200).translateY(200).rotateX(Math.PI/2) 
       that.scene.add(skySphere);
      }
      createSkySphere("/backgray2.jpg");


     

      this.groups = [] //必须在这里初始化

      let _layernames = this.buildingsInfo[0]
      let len = _layernames.length
      for(let i=0;i<len;i++){
        let layertemp ={}
        layertemp.layername = _layernames[i]
        layertemp.on  = true
        layertemp.highlight = true
        layertemp.order = i
        layertemp.color = new THREE.Color().setHSL(i/len,0.2,0.5) //我是想减去0图层和text图层，所以-2

        // this.layernames.push(_layernames[i])
        // this.layeron.push(true)
        // this.highlighton.push(false)

        this.layers.push(layertemp)

        this.groups.push(new THREE.Group())
      }
      

      // console.log(this.layers)

      let data =this.buildingsInfo[1]

      for(let i=0;i<data.length;i++){


        let dots = data[i].dots;
        let floor = data[i].floor;
        let link = data[i].link;
        let housename = data[i].housename;

        let layername = data[i].layer;


        if(layername == "Polygon_publicspace"){

          let publicspace = new PublicSpace(dots,floor,link,layername,i)
          // publicspace.mesh.castShadow = true
          for(let j=0;j<this.layers.length;j++){
            if(this.layers[j].layername == layername){
              publicspace.mesh.material.color.set(this.layers[j].color)
              this.groups[j].add(publicspace.mesh)
              break;
            }
          }
          
        
        }else if( layername.length >=4 && layername.substring(0,4)=="Plot"){
          
           let building = new Building(dots,0.1,null,layername,"Plot",i)
            //  building.mesh.castShadow = true
              for(let j=0;j<this.layers.length;j++){
            if(this.layers[j].layername == layername){
              building.mesh.material.color.set(this.layers[j].color)
              this.groups[j].add(building.mesh)
              break;
            }

          }}else if( layername.length >=4 && layername.substring(0,4)=="Line"){
          
           let myline = new Line(dots,layername,i)
            //  building.mesh.castShadow = true
              for(let j=0;j<this.layers.length;j++){
            if(this.layers[j].layername == layername){
              myline.line.translateZ(0.5)
              myline.line.material.color.set(this.layers[j].color)
              this.groups[j].add(myline.line)
              break;
            }
          }

          }else{
            let building = new Building(dots,floor,link,layername,housename,i)
             building.mesh.castShadow = true
              for(let j=0;j<this.layers.length;j++){
            if(this.layers[j].layername == layername){
              building.mesh.material.color.set(this.layers[j].color)
              this.groups[j].add(building.mesh)
              break;
            }
          }
        }
      }


      for(let i=0;i<this.groups.length;i++){
        this.groups[i].translateX(-1000).translateY(-1000)
        this.scene.add(this.groups[i])
      }

       //创建raytrace
       //选中groups中的所有房子
        this.allbuildings = []
        for(let i =0;i<this.groups.length;i++){
          if(this.groups[i].children[0].layer.length>=4 && (this.groups[i].children[0].layer.substring(0,4) == "Plot" || this.groups[i].children[0].layer.substring(0,4) == "Line")){
            //
          }else{
            for(let  j = 0;j<this.groups[i].children.length;j++){
              this.allbuildings.push(this.groups[i].children[j])
            }
          }
        }
        // console.log(this.allbuildings)


        /**监听鼠标事件**/
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      function onMousemove(event){
        // console.log("rectheight:" + event.clientY)
        event.preventDefault();
        let mousepos = getMousePos(canvas,event);
        that.mouse.setX(mousepos.x*2-1);
        that.mouse.setY(-mousepos.y*2+1); //这个地方没有转换正负号把我坑惨了
        // console.log(that.mouse.x+","+that.mouse.y+","+mousepos.y)

        that.raycaster.setFromCamera(that.mouse,that.camera)

       

        let intersects = that.raycaster.intersectObjects( that.allbuildings, true );
        if(intersects.length > 0 ){
          if(that.INTERSECTED != intersects[0].object){
            //有的话就设置为发光
            if(that.INTERSECTED){
              that.INTERSECTED.material.color.set( that.INTERSECTED.currentHex ); //设回之前的颜色
            }
            //不管有没有
            that.INTERSECTED = intersects[0].object
            that.INTERSECTED.currentHex = that.INTERSECTED.material.color.getHex() //给this.INTERSECTED设置一个属性 ，并且把当前颜色的hex值付给他，这个功能非常好用，可以直接保存要临时保存的值
            that.INTERSECTED.material.color.set( 0xff0000 );
          } 
        }else{
          if(that.INTERSECTED) that.INTERSECTED.material.color.set( that.INTERSECTED.currentHex ); //这个颜色应该是之前的颜色
          that.INTERSECTED = null;
        }
      }
      function getMousePos(canvas,e){
        let rect = canvas.getBoundingClientRect()
        
        return{
          x:(e.clientX-rect.left)/rect.width,
          y:(e.clientY-rect.top)/rect.height
        }
      }
      canvas.addEventListener('mousemove',onMousemove,false)

      // 创建click弹出事件
      canvas.addEventListener('click',popInfo);
      function popInfo(){
          if(that.INTERSECTED){
                  that.floor = that.INTERSECTED.floor
                  that.layername = that.INTERSECTED.layer
                  that.houseName = that.INTERSECTED.housename
                  // console.log(that.INTERSECTED.housename)


                  // if(that.INTERSECTED.housename == "null"){
                  //   that.houseName = that.INTERSECTED.key
              
                  // }else{
                  //   that.houseName = that.INTERSECTED.housename 
                  // }

                  if(that.INTERSECTED.link == "null"){
                    that.houselink = ""
                    that.islinkOn = true
                  }else{
                  that.houselink = that.INTERSECTED.link
                  that.islinkOn = false
                  }
              
            
          }else{
              // console.log('No house selected.')
          }
      }
      

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
  top:10px
}

#control-panel{
  position:absolute;
  right:10px;
  top:190px
}

#layers-panel{
  position:absolute;
  right:10px;
  top:320px
}
</style>