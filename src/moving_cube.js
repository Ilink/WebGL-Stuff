function Moving_cube(){
	var geometry = new THREE.CubeGeometry(500,500,500);

	this.mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

	var theta = {
		x: 0,
		y: 0,
		z: 0
	};

	this.update = function(dt){
		var dt_scale = dt/500;

		theta.x += dt_scale;
		theta.y += dt_scale;
		theta.z += dt_scale;

//		console.log(theta.x);

//		console.log(dt);
		this.mesh.position.x = 500 * Math.cos(theta.x);
		this.mesh.position.y = 500 * Math.sin(theta.y);

//		this.mesh.position.x = (offset.x + radius * Math.cos(theta.x * velocity));
//		this.mesh.position.y = (offset.y + radius * Math.sin(theta.y * velocity));
	};
}