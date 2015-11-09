var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];
var bullets = [];


var cubes;
var mouse = new THREE.Vector2(), INTERSECTED;
var mouseVector = new THREE.Vector3(0,0,-0.5);;
var projector;

var raycaster;
var pickingray;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var clock;
//var raycaster;

init();
animate();

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var rotateRight=false;
var rotateLeft=false;
var rotateBackward=false;
var rotateForward=false;
var moveVup = false;
var moveVdown = false;
var rotateVup = false;
var rotateVdown = false;
var movementX = 0;
var movementY = 0;
var movementZ = 0;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

function init() {
	clock = new THREE.Clock();
	//projector = new THREE.Projector();
	

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
	//camera.position.set( 0, 0, 0 );

	scene = new THREE.Scene();

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );

	/*controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );*/
	controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 100;
	controls.lookSpeed = 0.075;
	controls.lookVertical = false;

	cubes=new THREE.Object3D();
	cubes.name="cubeobjs";
	scene.add(cubes);

	renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true });
	renderer.setClearColor( 0xf0f0f0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight - 20.01);
	document.body.appendChild( renderer.domElement );

	
	var color= new THREE.Vector3(255,0,0);
	var position=new THREE.Vector3(0,0,10);
	newBox(color,position);
	//newSphere();
	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function ctrls() {

	if ( controlsEnabled ) {

		
		var delta = clock.getDelta();
		var moveDistance = 20 * delta; // 200 pixels per second
		var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
		controls.update(delta);


		if ( moveForward ) controls.getObject().translateZ( -moveDistance );
		if ( moveBackward ) controls.getObject().translateZ( moveDistance );

		if ( moveLeft ) controls.getObject().translateX( -moveDistance );
		if ( moveRight ) controls.getObject().translateX( moveDistance );

		if ( moveVup ) 	controls.getObject().translateY( -moveDistance );
		if ( moveVdown ) controls.getObject().translateY( moveDistance );


		//camera.rotation.set( 0, 0, 0 );

		/*var pitchObject = new THREE.Object3D();
		

		var yawObject = new THREE.Object3D();
		yawObject.position.y = 10;
		yawObject.add( pitchObject );

		var verticalObject = new THREE.Object3D();
		verticalObject.position.z= 10;
		verticalObject.add(yawObject);

		var PI_2 = Math.PI / 2;

		var rotation_matrix = new THREE.Matrix4().identity();
		if ( rotateForward ) movementY -= 10;
		if ( rotateBackward ) movementY += 10;

		if ( rotateLeft ) movementX -= 10;
		if ( rotateRight ) movementX += 10;

		if ( rotateVup ) movementZ -= 10;
		if ( rotateVdown ) movementZ += 10;


		yawObject.rotation.y -= movementX * 0.0002;
		pitchObject.rotation.x -= movementY * 0.0002;
		verticalObject.rotation.z -= movementZ * 0.0002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );




		/*controls.rotation.x=pitchObject.rotation.x;
		controls.rotation.y=yawObject.rotation.y;
		
		var relativeCameraOffset = new THREE.Vector3(0,0,10);

		var cameraOffset = relativeCameraOffset.applyMatrix4( controls.getObject().matrixWorld );
		

		camera.position.x= cameraOffset.x;
		camera.position.y= cameraOffset.y;
		camera.position.z= cameraOffset.z;

		camera.rotation.x=controls.getObject().rotation.x;
		camera.rotation.y=controls.getObject().rotation.y;

		var vector = new THREE.Vector3( 0, 0, -1 );
		vector.applyQuaternion( camera.quaternion );*/
		//camera.lookAt(controls.getObject().position);

	}

	//render1();

}


function animate() {

    requestAnimationFrame( animate );
	var delta = clock.getDelta();
	//console.log(bullets.length);
	if(bullets.length>0){
		for(var i=0;i<bullets.length;i++){
			bullets[i].translateX(delta * 10 * bullets[i].ray.direction.x);
			bullets[i].translateZ(delta * 10 * bullets[i].ray.direction.z);
			if(i==bullets.length-1){
				if(bullets[i].position.x>100 || bullets[i].position.y>100){
					scene.remove(bullets[i]);
					bullets.splice(i,1);
				}
			}
		}
	}
	render1();		
	ctrls();
}



function newBox(color,position){
	// objects
	var numobjx=30;
	var numobjy=30;
	for (var i=0;i<numobjx;i++){
		for (var j=0;j<numobjy;j++){
			geometry = new THREE.BoxGeometry( 1, 1, 1 );
		

			/*for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

				var face = geometry.faces[ i ];
				face.vertexColors[ 0 ] = new THREE.Color().setRGB(color.x,color.y,color.z);
				face.vertexColors[ 1 ] = new THREE.Color().setRGB(color.x,color.y,color.z);
				face.vertexColors[ 2 ] = new new THREE.Color().setRGB(color.x,color.y,color.z);}*/
			//mesh.material.color.setRGB( color.x,color.y,color.z );

			material = new THREE.MeshPhongMaterial( { specular: 0xff0000, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

			var mesh = new THREE.Mesh( geometry, material );
			mesh.material.color.setRGB( color.x,color.y,color.z );
			//console.log(position);
			mesh.position.x = j- (numobjx/2);//position.x;
			mesh.position.y = i- (numobjy/2);//Math.floor( Math.random() * 20 ) * 20 + 10;
			mesh.position.z = -12;//Math.floor( Math.random() * 20 - 10 ) * 20;
			mesh.name="tester";

			scene.add( mesh );

			//material.color.setHSL( 1,1,1);
			if(i%2==0){
				if(j%2==0){
					material.color.setRGB( 255,0,0);
				}else{
					material.color.setRGB( 0,255,0);
				}
			}else{
				if(j%2!=0){
					material.color.setRGB( 255,0,0);
				}else{
					material.color.setRGB( 0,255,0);
				}
			}
			//material.color.setRGB( 1,1,1);

			objects.push( mesh );
			cubes.add(mesh);
		}
	}	
	animate();
}

function newSphere(){
	// objects

	geometry = new THREE.SphereGeometry( 0.5, 8, 6 );

	
	material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
	mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
	mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
	scene.add( mesh );

	material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

	objects.push( mesh );

	animate();
}

function render1() {

	//requestAnimationFrame( render );
	//camera.updateMatrixWorld();
	renderer.render(scene, camera);

}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
var canv;
$('canvas').attr('id', 'lienzo');

/*$("#lienzo").click(function(e) {
	//console.log(e);
	//console.log($("canvas").get(0));
	//renderer.setClearColor( 0xffffff );
	var canvas = document.getElementById('lienzo').getContext('2d');
	console.log(canvas);
    /*var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    console.log(x,y);
    console.log(canv);
    var c = this.getContext("2d");
    var p = c.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);
	//renderer.setClearColor( 0x0000ff );

});*/

var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new THREE.SphereGeometry(0.01, 4, 2);

function createBullet() {
	//if (obj === undefined) {
		var obj = camera;
	//}
	/*var sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
	sphere.position.set(obj.position.x, obj.position.y * 0.8, obj.position.z);


	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	vector.unproject(obj);
	sphere.ray = new THREE.Ray(
			obj.position,
			vector.sub(obj.position).normalize()
	);
	console.log(vector);*/
	
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( mouse, obj );

	var intersects = raycaster.intersectObjects( scene.children );
	console.log(intersects);
	if(intersects.length>0){

		var intersection = intersects[0];
		var obj = intersection.object;

		obj.material.emissive.setRGB( 0, 0, 255 );

		if ( INTERSECTED != intersects[ 0 ].object ) {

			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0x0000ff );

		}
	}else {

		if ( intersects ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		INTERSECTED = null;

	}
	
	
	/*sphere.name="bullet";
	sphere.owner = obj;
	*/
	//bullets.push(sphere);
	//scene.add(sphere);
	
	//return sphere;
}
function picking(event){

	event.preventDefault();
	
	/*var pos = findPos(this);
	var x = event.pageX - pos.x;
    var y = event.pageY - pos.y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;

    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    alert(hex);


	/*var composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );
	
	var effectDotScreen = new THREE.DotScreenPass( new THREE.Vector2(0,0), parameters.dotscreenAngle, parameters.dotscreenScale ); 
	effectDotScreen.renderToScreen = true; 
	composer.addPass(effectDotScreen); 
	shaderActive = "dotscreen";*/
	

	
	var vector = new THREE.Vector3(0,0,0);

	mouseVector.x = 2 * (event.clientX / window.innerWidth) - 1;
	mouseVector.y = 1 - 2 * ( event.clientY / window.innerHeight );

	//mouseVector.z=-0.5;
	//console.log(mouseVector);
	vector = mouseVector.clone().unproject( camera );
	//console.log(vector);
	var direction = new THREE.Vector3( 0, 0, -0.5 ).transformDirection( camera.matrixWorld );
	//console.log(direction);
	raycaster.set( camera, direction );

	/*vector.set( ( event.clientX /renderer.domElement.width ) * 2 - 1, - ( event.clientY / renderer.domElement.height ) * 2 + 1, 0.5 ); // z = 0.5 important!

    vector.unproject( camera );

    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );*/
    //raycaster.setFromCamera( vector, camera );
	

	/*var raycaster = projector.pickingRay( mouseVector.clone(), camera ),
	intersects = raycaster.intersectObjects( cubes.children );*/

	var intersects = raycaster.intersectObjects( cubes.children );
	cubes.children.forEach(function( cube ) {
		cube.material.color.setRGB(0,0,0 );
	});
	if(intersects.length>0){

		var intersection = intersects[0];
		var obj = intersection.object;

		obj.material.color.setRGB( 1.0  / intersects.length, 0, 0 );
	}

	var temp=new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z-2);

	console.log(camera.position);
	console.log(controls.getObject());
	console.log(temp);

	geometry = new THREE.SphereGeometry( 0.5, 8, 8 );
	material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
	var mesh = new THREE.Mesh( geometry, material );	
	mesh.position.x=temp.x;
	mesh.position.y=temp.y;
	mesh.position.z=temp.z;
	console.log(mesh);
	scene.add( mesh );
	material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	objects.push( mesh );

	animate();
	//camera.updateMatrixWorld();
	//renderer.setClearColor( 0x0000ff );

 	

}

	
document.addEventListener( 'mouseup', createBullet, false );


$(".createCube").click(function(e){ 
   e.preventDefault(); 
   newBox();
   console.log(scene);
})
$(".createSphere").click(function(e){ 
   e.preventDefault(); 
   newSphere();
   console.log(scene);
})

$("#blocker").click(function(e){ 
   console.log()
   	$("#blocker").removeClass("visible");
   	$("#blocker").addClass("fade");
   	controlsEnabled = true;
	controls.enabled = true;
})

