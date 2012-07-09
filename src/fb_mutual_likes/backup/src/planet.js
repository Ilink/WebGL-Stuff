/*
class Planet
Every planet needs a center of rotation and a radius. Additionally, they need a velocity.
Each planet also has a parent and a set of children. These determine the center of rotation and the minimum radius.
For instance, earth orbits around the sun and the moon orbits around the earth. The Sun would be the Earth's parent. The Moon would be the earth's child.
Essentially this creates a tree structure.

I didn't really plan on removing children, so there is no accounting for that whatsoever. Just keeps things simpler.

 */

function Planet(args){
	var geometry, material, parent, self, children, radius_padding, radius, velocity, origin_x, origin_y, origin_z, offset;
	offset = {};
	children = [];
	self = this;

	function update_radius(planet){
		radius = planet.children_radius.x + self.size + radius_padding;
	}

	// Public
	this.add_child = function(child){
		children.push(child);
		self.children_radius.x += child.size*3;
		self.children_radius.y += child.size*3;
		self.children_radius.z += child.size*3;
	};

	this.set_parent = function(new_parent){
		parent = new_parent;
		parent.add_child(self);
		update_radius(parent);
	};

	this.update = function(theta, dt){

		if(typeof parent !== 'undefined') {
			offset.x = parent.mesh.position.x;
			offset.y = parent.mesh.position.y;
			offset.z = parent.mesh.position.z;
		}

//		self.mesh.rotation.x += 0.01;
//		self.mesh.rotation.y += 0.02;

		self.mesh.position.x = (offset.x + radius * Math.cos(theta.x * velocity));
		self.mesh.position.y = (offset.y + radius * Math.sin(theta.y * velocity));

	};

	this.get_mesh = function(){
		return self.mesh;
	};

	this.children_radius = {
		x: 0,
		y: 0,
		z: 0
	};

	// Constructor
//	radius_padding = Math.random() * 200;
	radius_padding = Math.random() * 200;
	self.size = args.size;
	velocity = (Math.random() / (this.size /5 )) * 10;

	// these are intiailized to zero to prevent errors when there is no parent
	offset.x = 0;
	offset.y = 0;
	offset.z = 0;
	radius = 0;

	geometry = new THREE.CubeGeometry( args.size, args.size, args.size ); // type of geometry could be set from the arguments
	if(args.color === 'blue'){
		material = new THREE.MeshBasicMaterial( { color: 0x69C5FF, wireframe: true } ); // this could be from the arguments
	} else {
		material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } ); // this could be from the arguments
	}

	// create the sphere's material
//	material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	this.mesh = new THREE.Mesh( geometry, material );

	if(typeof args.parent === 'undefined'){
		this.mesh.position.x = args.pos.x;
	} else {
		this.set_parent(args.parent);
	}

	if(typeof args.children !== 'undefined'){
		$.each(args.children, function(i, child){
			self.add_child(child);
		});
	}

}