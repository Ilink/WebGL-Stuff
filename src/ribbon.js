/*
 class Ribbon

 points is an array of THREE.Vector3 values
 */

function Ribbon(args){

    function build_faces(geom){
        for(var i = 0; i < geometry.vertices.length; i++){
            if(i+1 < geometry.vertices.length && i+2 < geometry.vertices.length){
                // this accounts for the winding order - otherwise faces come out flipped
                if(i%2) {
                    geometry.faces.push(new THREE.Face3(i+2,i+1,i));
                } else {
                    geometry.faces.push(new THREE.Face3(i,i+1,i+2));
                }
            }
        }
    }


    // smooth my curve over this many points
    var numPoints = 100;

    var spline = new THREE.SplineCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(300, 500, 0),
        new THREE.Vector3(600, 900, 0)
    ]);

    var spline2 = new THREE.SplineCurve3([
        new THREE.Vector3(50, 50, 0),
        new THREE.Vector3(500, 500, 0),
        new THREE.Vector3(300, 400, 0)
    ]);

    var line_material = new THREE.LineBasicMaterial({
        color: 0xff00f0
    });

    var polymaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});

    var geometry = new THREE.Geometry();
    var splinePoints = spline.getPoints(numPoints);
    var splinePoints2 = spline2.getPoints(numPoints);

    for(var i = 0; i < splinePoints.length; i++){
        geometry.vertices.push(splinePoints[i]);
        geometry.vertices.push(splinePoints2[i]);
    }

    build_faces(geometry);

    console.log('geo:', geometry);
    geometry.computeFaceNormals();
    var line = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

    args.scene.add(line);


    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(0,0,0);
    var v2 = new THREE.Vector3(0,500,0);
    var v3 = new THREE.Vector3(0,500,500);

    var v4 = new THREE.Vector3(0,1000,800);
    var v5 = new THREE.Vector3(0,100,0);
    var v6 = new THREE.Vector3(0,1000,800);

    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.vertices.push(v4);
    geom.vertices.push(v5);
    geom.vertices.push(v6);
    console.log('this geo works:',geom);

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 4, 3, 2 ) );
    geom.computeFaceNormals();

    var object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
    args.scene.add(object);


    // set the geometry to dynamic
    // so that it allow updates
    geometry.dynamic = true;

    geometry.verticesNeedUpdate = true;
    geometry.elementsNeedUpdate = true;
    geometry.morphTargetsNeedUpdate = true;
    geometry.uvsNeedUpdate = true;
    geometry.normalsNeedUpdate = true;
    geometry.colorsNeedUpdate = true;
    geometry.tangentsNeedUpdate = true;

    // extend from the last two verts
    this.update = function(){

    };

}