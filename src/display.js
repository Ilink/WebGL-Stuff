function Display(){
    var camera, scene, renderer, renderables;
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

    var ribbon = new Ribbon({
        scene: scene
    });

	var moving_cube = new Moving_cube();
	scene.add(moving_cube.mesh);


    /* end test */

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    $("#webgl_container").append( renderer.domElement );

    function render(dt){
        var index = 0;

        controls.update(1);
		moving_cube.update(dt);
		ribbon.update();

        renderer.render( scene, camera );
    }

    this.add = function(renderable){
        scene.add(renderable.get_mesh());
    };

    var dt, time, new_time;
	time = new Date();
	dt = 16; // good starting value
    this.animate = function(){
        // note: three.js includes requestAnimationFrame shim

        new_time = new Date();
        dt = new_time - time;
		if(dt > 33){
			dt = 33;
		}
        time = new_time;
        requestAnimationFrame(self.animate);
        render(dt);
    }
}
