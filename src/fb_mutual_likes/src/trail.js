/*
Class Trail
Sets up nice tail animations for objects

Parameters:
object: the object to "follow"

falloff: distance until trail disppears

 */


function Trail(args){

	var self, start, end, obj, geo, material, mesh;


	// Constructor
	obj = args.object;

	self = this;
	start = {
		x: obj.position.x,
		y: obj.object.position.y,
		z: obj.object.position.z
	};

	material = new THREE.MeshNormalMaterial();
	material = new THREE.LineBasicMaterial();
	geo = new THREE.Geometry();
	var path_verts = [];
	this.update();

	mesh.geometry.dynamic = true;
	mesh.geometry.__dirtyVertices = true;
	mesh.geometry.__dirtyNormals = true;

	mesh = new THREE.Mesh(geo, material);
	args.scene.add(mesh);


	// Public

	this.update = function(){
		path_verts.push(
			new THREE.Vector3(obj.position.x, obj.position.z, obj.position.z)
		);
		// prune old verts
	};


}