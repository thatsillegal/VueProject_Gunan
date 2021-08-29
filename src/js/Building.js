import * as THREE from 'three';

class Building{
    constructor(dots,floor,link,layername,_housename,key){

        if(floor == 0 ) floor = 1;

        let points =[]
        for( var j=0; j< dots.length;j++){
            var point = new THREE.Vector2(dots[j][0],dots[j][1])
            points.push(point);
        }
        let shape = new THREE.Shape(points);
        let extrudeSettings = { depth: 3*floor, bevelEnabled: false,  steps: 1 };
        let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        let mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial() )
        let edges = new THREE.EdgesGeometry(geometry) //EdgesGeo专门解决显示外轮廓的问题
        let line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({ //但要注意的是，这个地方要用LinesSegments对象
            color:0x0000ff
        }))

        this.mesh = mesh
        this.mesh.floor  =floor //just this ＥＡＳＹ！！！直接插入一个属性就好了！ ＦＵＣＫ！！！
        this.mesh.key=key
        this.mesh.layer = layername
        this.mesh.link = link
        this.mesh.housename = _housename
        if(_housename != "null"){
            console.log(_housename)
        }

        this.line = line
    }

    getFloor(){
        return this.floor
    }
}

class PublicSpace{
    constructor(dots,floor,link,layername,key){

        if(floor == 0 ) floor = 1;

        let points =[]
        for( var j=0; j< dots.length;j++){
            var point = new THREE.Vector2(dots[j][0],dots[j][1])
            points.push(point);
        }
        let shape = new THREE.Shape(points);
        let geometry = new THREE.ShapeGeometry(shape)
        geometry.translate(0,0,0.2)


        // let extrudeSettings = { depth: 3*floor, bevelEnabled: false,  steps: 1 };
        // let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        let mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() )

        let edges = new THREE.EdgesGeometry(geometry) //EdgesGeo专门解决显示外轮廓的问题
        let line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({ //但要注意的是，这个地方要用LinesSegments对象
            // color:0x0000ff
        }))

        this.mesh = mesh
        this.mesh.floor  =floor //just this ＥＡＳＹ！！！直接插入一个属性就好了！ ＦＵＣＫ！！！
        this.mesh.key=key
        this.mesh.layer = layername
        this.mesh.link = link

        this.line = line
    }

    getFloor(){
        return this.floor
    }
}

export {Building, PublicSpace}