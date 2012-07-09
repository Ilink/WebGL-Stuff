ml.render_cubes = function(data){
	var display = new Display();
	var i = 0;
	var planets = [];
	var parent_planet, planet, root_planet;
	$.each(data, function(k, v){
		if(i === 0){
			planet = new Planet({
				size: v.shared_by.length * 15,
				pos: {
					x: i * 100 - 1000,
					y: i * 100 - 1000
				}
			});
			root_planet = planet;
		} else if(i % 2){
			planet = new Planet({
				size: v.shared_by.length * 15,
				parent: root_planet,
				color:'blue'
			});
			parent_planet = planet;
		} else {
			planet = new Planet({
				size: v.shared_by.length * 15,
				parent: parent_planet
			});
		}
		planets.push(planet);
		display.add(planet);
		i++;
	});



	console.log(planets);
	display.animate();
};

function Display(){
	var camera, scene, renderer, renderables, theta;
	theta = {};
	theta.x = 0;
	theta.y = 0;
	theta.z = 0;
	var self = this;

	scene = new THREE.Scene();
	renderables = [];

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 2000;
	camera.rotation.z = 1.5;

	// Setup controls for the camera
	var controls = new THREE.TrackballControls( camera );

	controls.movementSpeed = 0;
	controls.rollSpeed = 0.5;
	controls.autoForward = false;
	controls.dragToLook = true;

	scene.add( camera );

	// Lights
	var ambientLight = new THREE.AmbientLight(0x555555);
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(ambientLight);
	scene.add(directionalLight);


	/* Test stuff */

//	var ribbon = new Ribbon({
//		scene: scene
//	});


	/* end test */

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	$("#webgl_container").append( renderer.domElement );

	function render(dt){
		var index = 0;

		theta.x += Math.PI / 100;
		theta.y += Math.PI / 100;
		theta.z += Math.PI / 100;

		controls.update(1);

		$.each(renderables, function(i, renderable){
			renderable.update(theta, dt);
			index++;
		});

		renderer.render( scene, camera );
	}

	function make_cube(size, x_pos){
		var geometry, mesh, material;
		geometry = new THREE.CubeGeometry( size, size, size );
		material = new THREE.MeshBasicMaterial( {
			color: 0xff0000,
			wireframe: true,
			vertexColors: THREE.color(0xff0023)
		} );

		mesh = new THREE.Mesh( geometry, material );

		mesh.position.origin_x = x_pos;
		mesh.position.radius = x_pos * Math.random();

		return mesh;
	}

	this.add = function(renderable){
		scene.add(renderable.get_mesh());
		renderables.push(renderable);
	};

	var dt, time, new_time;
	this.animate = function(){
		// note: three.js includes requestAnimationFrame shim

		new_time = new Date();
		dt = new_time - time;
		time = new_time;
		requestAnimationFrame(self.animate);
		render(dt);
	}
}
