/*
 class Ribbon

 args.following is a mesh object

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

	var following = args.following;

    var geometry = new THREE.PlaneGeometry(1000,0,50,1);

    // set the geometry to dynamic
    // so that it allow updates
    geometry.dynamic = true;

    function set_to_update(geometry){
        geometry.verticesNeedUpdate = true;
        geometry.elementsNeedUpdate = true;
        geometry.morphTargetsNeedUpdate = true;
        geometry.uvsNeedUpdate = true;
        geometry.normalsNeedUpdate = true;
        geometry.colorsNeedUpdate = true;
        geometry.tangentsNeedUpdate = true;
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

//    var geometry = new THREE.Geometry();
//    var splinePoints = spline.getPoints(numPoints);
//    var splinePoints2 = spline2.getPoints(numPoints);
//
//    for(var i = 0; i < splinePoints.length; i++){
//        geometry.vertices.push(splinePoints[i]);
//        geometry.vertices.push(splinePoints2[i]);
//    }
//    build_faces(geometry);


    console.log('geo:', geometry);
    geometry.computeFaceNormals();
    var plane = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
	console.log('plane mesh(ribbon):', plane);

    args.scene.add(plane);

    // extend from the last two verts
    this.update = function(){
        set_to_update(geometry);

//		var new_position = following.

        var vert_length = geometry.vertices.length;
        var last_vert_a = geometry.vertices[vert_length-1];
        var last_vert_b = geometry.vertices[vert_length-2];

//        last_vert_a.x += 100;
//        last_vert_b.x += 100;

        last_vert_a.z += 100;
        last_vert_b.z += 100;

//
//        $.each(geometry.vertices, function(i, vert){
//            set_to_update(geometry);
//            vert.x += 1;
//            vert.z += 1;
//
////            vert.z = Math.random() * 2000;
//        });
    };

}