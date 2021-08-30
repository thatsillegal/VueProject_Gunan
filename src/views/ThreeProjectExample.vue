<template>
  <div class="threeproject">
        <div id="three-div"></div>
        
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  data(){
    return {
      //THREE Space: Three.js 需要定义的基本要素(属性)
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      raycaster:null,

      // Geometries 合并所有建筑的集合, 提升渲染效率
      geos_buildings: [],

      // helper (Collider)
      collider_building:[],

      MAT_BUILDING: null,
      MAT_BASIC: null,

      // debug
      stats: null,

      //just for testing
      time:0,
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

      //初始化 Secne 场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x999999);


      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
      this.camera.position.set(0,0,10);


      //初始化 Light 光源
      let light0 = new THREE.AmbientLight(0xfafafa, 0.25);
      let light1 = new THREE.PointLight(0xfafafa, 0.6);
      light1.position.set(2000, 1500, 500);
      let light2 = new THREE.PointLight(0xfafafa, 0.4);
      light2.position.set(2000, 900, -500);
      this.scene.add(light0);
      this.scene.add(light1);
      this.scene.add(light2);

      //坐标网格
      let AxesHelper = new THREE.AxesHelper(20)
      this.scene.add(AxesHelper)

      this.renderer = new THREE.WebGLRenderer({antialias: true});
      canvas.appendChild(this.renderer.domElement)
      this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.setSize(window.innerWidth, window.innerHeight);

      //初始化 controls 鼠标互动控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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