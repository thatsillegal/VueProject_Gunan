<template>
  <div class="threeproject">
    <div id="three-div"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import conps from '../assets/jinze/constructionPT.json';
import edu from '../assets/jinze/edu_result.json';
import hos from '../assets/jinze/hospital_result.json';
import river from '../assets/jinze/river_clip.json';
import road from '../assets/jinze/road_clip.json';

export default {
  data(){
    return {
      //导入外来json（js）文件形式
      conps: conps,
      edu:edu,
      hos:hos,
      river:river,
      road:road,

      //THREE Space: Three.js 需要定义的基本要素(属性)
      renderer: null, //这个必须放这里，不然canvas尺寸计算会出问题
    }
    
  },
  static(){
      return{
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
      const width  = (document.querySelector("#three-div").clientWidth);
      const height2sub = document.querySelector("#app-bar").clientHeight
      const height = (window.innerHeight - height2sub);
      that.renderer.setSize(width, height, true);
      const canvas = that.renderer.domElement;
      that.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      that.camera.updateProjectionMatrix();
    }
    onWindowResize();
  },

  methods:{
    init(){
      const canvas = document.querySelector('#three-div');

      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.setSize(window.innerWidth, window.innerHeight);
      canvas.appendChild(this.renderer.domElement)
     
      //camera
      this.camera = new THREE.PerspectiveCamera(45, 1, 1, 500); //pers?
      this.camera.position.set(0,0,100);
      this.camera.lookAt(0,0,0)

      //初始化 Secne 场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);
     
      //坐标网格
      // let AxesHelper = new THREE.AxesHelper(20)
      // this.scene.add(AxesHelper)  

      //初始化 controls 鼠标互动控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      

      const z=10;
      const cx= 118.65;
      const cy=31.5;  //31.55
      const sc=160; //150


//******************* */
      const river_material = new THREE.LineBasicMaterial( { color: 0x00ff0f } );

      this.river.features.forEach(item => {
        const points = [];
        const ps = item.geometry.coordinates;
        ps.forEach(p => points.push(new THREE.Vector3(  sc*(p[0] -cx), sc*(p[1] - cy), z )))
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, river_material );
        this.scene.add( line );
      })


//******************* */
      const road_material = new THREE.LineBasicMaterial( { color: 0x888888 } );
      this.road.features.forEach(item => {
        const points = [];
        const ps = item.geometry.coordinates;
        ps.forEach(p => points.push(new THREE.Vector3(  sc*(p[0] -cx), sc*(p[1] - cy), z )))
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, road_material );
        this.scene.add( line );
      })


      //******************* */
      let cw=0.15
      let cubegeo = new THREE.BoxGeometry( cw, cw, cw);
      let cubemat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      this.conps.features.forEach(item => {
        const p= item.geometry
        let cube= new THREE.Mesh ( cubegeo, cubemat);
        cube.position.x = sc*(p.x -cx);
        cube.position.y = sc*(p.y - cy);
        cube.position.z = z ;
        this.scene.add( cube )
      })


//******************* */
      cw=0.5
      cubegeo = new THREE.BoxGeometry( cw, cw, cw);
      cubemat = new THREE.LineBasicMaterial( { color: 0xff8800 } );
      this.edu.features.forEach(item => {
        const p= item.geometry
        let cube= new THREE.Mesh ( cubegeo, cubemat);
        cube.position.x = sc*(p.x -cx);
        cube.position.y = sc*(p.y - cy);
        cube.position.z = z ;
        this.scene.add( cube )
      })


//******************* */
      cubemat = new THREE.LineBasicMaterial( { color: 0x00ffff } );
      this.hos.features.forEach(item => {
        const p= item.geometry.coordinates
        let cube= new THREE.Mesh ( cubegeo, cubemat);
        cube.position.x = sc*(p[0] -cx);
        cube.position.y = sc*(p[1] - cy);
        cube.position.z = z ;
        this.scene.add( cube )
      })


//******************* */

      this.update();
    },

    update:function (){
      this.controls.update();
      requestAnimationFrame(this.update);
      this.renderer.render(this.scene, this.camera);
    },

  }
}
</script>

<style scoped>

</style>