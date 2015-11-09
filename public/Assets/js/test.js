// var container, stats;
// var camera, scene, raycaster, renderer;

// var controlsEnabled = false;
// var clock;

// var moveForward = false, moveBackward = false, moveLeft = false,moveRight = false,rotateRight=false,rotateLeft=false,rotateBackward=false,rotateForward=false;
// var moveVup = false,moveVdown = false,rotateVup = false,rotateVdown = false,movementX = 0,movementY = 0,movementZ = 0;

// var mouse = new THREE.Vector2(), INTERSECTED;
// var radius = 100, theta = 0;

// var transform;

// var numlights=0;
// var sceneObj=0;

// var visibleMaps=0;

// var motion = {
// 	airborne : false,
// 	position : new THREE.Vector3(), velocity : new THREE.Vector3(),
// 	rotation : new THREE.Vector2(), spinning : new THREE.Vector2()
// };


// //*********************Control Variables*******************//

// var opacity=1.0;
// var refractionRatio=1.0;
// var reflectivity=1.0;
// var figPosition=new THREE.Vector3(0.0,0.0,-2.0);
// var cubeSize=new THREE.Vector3(1.0,1.0,1.0);
// var sphereSize=new THREE.Vector3(0.5,5.0,5.0);
// var cylinderSize=new THREE.Vector4(0.5,0.5,1.0,5.0);
// var torusSize=new THREE.Vector4(0.5,0.3,8.0,6.0);
// var figColor=new THREE.Vector3(0.5,0.5,0.5);


// var selectedOpacity=0;


// //********************************************************//


// function init() {
// 	clock = new THREE.Clock();
// 	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
// 	//camera = new THREE.OrthographicCamera(  window.innerWidth / - 8,  window.innerWidth / 8, window.innerHeight / 8, window.innerHeight / - 8, 1, 10000 );
// 	camera.rotation.order = 'YXZ';

// 	scene = new THREE.Scene();
// 	//scene.add( new THREE.GridHelper( 500, 10 ) );

// 	controls = new THREE.FirstPersonControls(camera);
// 	controls.movementSpeed = 10;
// 	controls.lookSpeed = 0.075;
// 	controls.lookVertical = false;


// 	raycaster = new THREE.Raycaster();

// 	renderer = new THREE.WebGLRenderer(antialias= true);
// 	renderer.setClearColor( 0xf0f0f0 );
// 	renderer.setPixelRatio( window.devicePixelRatio );
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// 	renderer.sortObjects = false;
// 	document.body.appendChild(renderer.domElement);

// 	transform = new THREE.TransformControls( camera, renderer.domElement );
// 	transform.addEventListener( 'change', render );
// 	transform.setSpace="local";
// 	scene.add(transform);

// 	stats = new Stats();
// 	stats.domElement.style.position = 'absolute';
// 	stats.domElement.style.bottom = '0px';
// 	document.body.appendChild( stats.domElement );

// 	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 	document.addEventListener( 'dblclick', picking, false );


// 	//
// 	//newBox();
// 	window.addEventListener( 'resize', onWindowResize, false );
		
// 	var light = new THREE.PointLight( [lightCol.r,lightCol.g,lightCol.b], 0.9,100 );
// 	light.position.set( lightPos.x, lightPos.y, lightPos.z );
// 	light.name="puntual";
// 	scene.add( light );
// 	//animate();
// 	//console.log("testing");

// 	newRoom();
// 	/*ambient light
// 	var light = new THREE.AmbientLight( 0x1f1f1f ); // soft white light
// 	scene.add( light );

// 	//point
// 	var light = new THREE.PointLight( 0xffffff, 0.5,20 );
// 	light.position.set( 0, 0, -6 );
// 	light.name="puntual";
// 	scene.add( light );
	
	

// 	//direccionales
// 	//near
// 	var light7 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light7.position.set( 0, 100, 100 );
// 	scene.add( light7 );
// 	//far 
// 	var light2 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light2.position.set( 0, 100, -116 );
// 	scene.add( light2 );
// 	//left 
// 	var light3 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light3.position.set( -100, 0, -6 );
// 	scene.add( light3 );
// 	//right
// 	var light4 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light4.position.set( 100, 0, -6 );
// 	scene.add( light4 );
// 	//top
// 	var light5 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light5.position.set( 0, 100, -6 );
// 	scene.add( light5 );
// 	//bot
// 	var light6 = new THREE.DirectionalLight( 0xf0f0f0, 1 );
// 	light6.position.set( 0,-100, -6 );
// 	scene.add( light6 );

	

// 	for (var i=0;i<3;i++){
// 		for(var j=0;j<3;j++){
// 			for(var k=0;k<3;k++){
// 				console.log("(",i%3-1,j%3-1,k%3-1,")", ((i%3-1)*(i%3-1)) + ((j%3-1)*(j%3-1)) + ((k%3-1)*(k%3-1)) );
// 			}
			
// 		}
		
// 	}
// 	//newGrid(camera.position);*/
// }
// function newRoom(){
// 	//tester
// 	var temppos=new THREE.Vector3(parseFloat(0.0),parseFloat(0.0),parseFloat(-3));
// 	newTest(temppos,1.0,1.33,0.1,new THREE.Vector3(0.8  ,0.8 ,0.8));//*/


// 	/*var temppos=new THREE.Vector3(parseFloat(-1.0),parseFloat(1.0),parseFloat(-3));
// 	newTest(temppos,0.0,1.33,0.0,new THREE.Vector3(0.8  ,0.8 ,0.8));//*
// 	temppos=new THREE.Vector3(parseFloat(1.0),parseFloat(-1.0),parseFloat(-3));
// 	newTest(temppos,1.0,1.33,1.0,new THREE.Vector3(0.0  ,0.0 ,1.0));/*/

// 	//var temppos=new THREE.Vector3(parseFloat(-1.0),parseFloat(1.0),parseFloat(-3));
// 	//newTest(temppos,0.0,1.33,0.5,new THREE.Vector3(0.8  ,0.8 ,0.8));//*
// 	//temppos=new THREE.Vector3(parseFloat(1.0),parseFloat(1.0),parseFloat(-3));
// 	//newTest(temppos,1.0,1.33,1.0,new THREE.Vector3(0.0  ,0.0 ,1.0));//*
// 	//temppos=new THREE.Vector3(parseFloat(0.0),parseFloat(-1.0),parseFloat(-3));
// 	//newTest(temppos,1.0,1.33,0.0,new THREE.Vector3(0.0  ,1.0 ,0.0));/*/

	

// 	/*for(var i=-4.0;i<5.0;i+=2){
// 		for(var j=4.0;j>-5.0;j-=2){
// 			var temppos=new THREE.Vector3(i,j,parseFloat(-4.9));
// 			newTest(temppos,1.0,1.33,0.0,new THREE.Vector3(0.8  ,0.8 ,0.8));
// 		}
// 	}*/


// 	//far wall
// 	var position=new THREE.Vector3(parseFloat(0),parseFloat(0),parseFloat(-5));
// 	var color=new THREE.Vector3(140/255,7/255,2/255);
// 	newFloor("x",-1,position,color,10,10,"far wall");


// 	//floor
// 	position=new THREE.Vector3(parseFloat(0),parseFloat(-5),parseFloat(0));
// 	color=new THREE.Vector3(7/255,140/255,2/255);
// 	newFloor("x",2,position,color,10,10,"floor");


// 	//ceiling
// 	position=new THREE.Vector3(parseFloat(0),parseFloat(5),parseFloat(0));
// 	color=new THREE.Vector3(144/255,140/255,2/255);
// 	newFloor("x",2,position,color,10,10,"ceiling");



// 	//near wall
// 	position=new THREE.Vector3(parseFloat(0),parseFloat(0),parseFloat(5));
// 	color=new THREE.Vector3(255/255,140/255,2/255);
// 	newFloor("x",1,position,color,10,10,"near wall");

// 	//left wall*/
// 	position=new THREE.Vector3(parseFloat(-5),parseFloat(0),parseFloat(0));
// 	color=new THREE.Vector3(1/255,7/255,140/255);
// 	newFloor("y",-2,position,color,10,10,"left wall");

// 	//right wall
// 	position=new THREE.Vector3(parseFloat(5),parseFloat(0),parseFloat(0));
// 	color=new THREE.Vector3(1/255,140/255,140/255);
// 	newFloor("y",-2,position,color,10,10,"right wall");
// }
// function onWindowResize() {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }
// function onDocumentMouseMove( event ) {
// 	event.preventDefault();
// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
// }
// function animate() {
// 	requestAnimationFrame( animate );
// 	render();
// 	stats.update();
// }
// function picking(){
// 	raycaster.setFromCamera( mouse, camera );
// 	if(controlsEnabled && scene.children[1].visible==true){
// 		var intersects = raycaster.intersectObjects( scene.children );
// 		//console.log(intersects);
// 		if ( intersects.length > 0 ) {
// 			//console.log(raycaster);
// 			//console.log(intersects);

// 			if ( INTERSECTED != intersects[ 0 ].object ) {

// 				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

// 				INTERSECTED = intersects[ 0 ].object;
// 				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
// 				INTERSECTED.material.emissive.setRGB( 0,0,Math.random() );
				
// 				transform.attach( INTERSECTED );
// 				selectedOpacity=INTERSECTED.material.opacity;
// 				INTERSECTED.material.opacity=0.2;

// 			}

// 		} else {

// 			if ( INTERSECTED ){
// 				INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
// 				INTERSECTED.material.opacity=selectedOpacity;
// 			}
// 			INTERSECTED = null;
// 			transform.detach( transform.object );
// 		}
// 	}else if(scene.children[1].visible==false){
// 		var intersects = raycaster.intersectObjects( scene.children , true );
		
// 		if ( intersects.length > 0 ) {
// 			var i=0;
// 			for(i=0;i<intersects.length;i++){
// 				if(intersects[i].object.name=="phot"){
// 					break;
// 				}
// 			}
// 			for (var t=1;t<scene.children[sceneObj].children.length;t++){
// 				scene.children[sceneObj].children[t].material.emissive.setRGB( 0.0,0.0,0.0 );
// 			}
// 			if ( i<intersects.length && INTERSECTED != intersects[ i ].object && intersects[i].object.name=="phot" ) {
// 				console.log("center",intersects[i].object.position);
// 				var neighbors=kdtree.nearest([intersects[i].object.position.x,intersects[i].object.position.y,intersects[i].object.position.z], maxPhots, maxDistance);
// 				if(neighbors.length>0) console.log("buscando",neighbors,maxDistance);
// 				for (var j=0;j<neighbors.length;j++){
					
// 					if(neighbors[j][1]<=maxDistance){
// 						var dist=/*distanceFunction(intersects[i].object.position,neighbors[j][0].position);/*/
// 						Math.sqrt(	Math.pow(neighbors[j][0].position.x-intersects[i].object.position.x,2.0 ) + 
// 							   		Math.pow(neighbors[j][0].position.y-intersects[i].object.position.y,2.0 ) + 
// 							   		Math.pow(neighbors[j][0].position.z-intersects[i].object.position.z,2.0 ) );
// 						var dist2=
// 						Math.sqrt(	Math.pow(intersects[i].object.position.x-neighbors[j][0].position.x,2.0 ) + 
// 							   		Math.pow(intersects[i].object.position.y-neighbors[j][0].position.y,2.0 ) + 
// 							   		Math.pow(intersects[i].object.position.z-neighbors[j][0].position.z,2.0 ) );
// 						console.log("neighbors",neighbors[j][0].position,dist,dist2); 
// 						for (var t=1;t<scene.children[sceneObj].children.length;t++){

// 							//console.log("prehola");
// 							if(	neighbors[j][0].position.x==scene.children[sceneObj].children[t].position.x &&
// 								neighbors[j][0].position.y==scene.children[sceneObj].children[t].position.y &&
// 								neighbors[j][0].position.z==scene.children[sceneObj].children[t].position.z){
// 								//console.log("hola");
// 								scene.children[sceneObj].children[t].material.emissive.setRGB( 1.0,0.0,0.0 );
// 							}
// 						}
// 					}
// 				}

// 				intersects[ i ].object.material.emissive.setRGB( 0.5,0.5,0.0 );
// 				//console.log(INTERSECTED.name);
				
// 				//INTERSECTED.name="seleccionado";
// 				//transform.attach( INTERSECTED );
// 			}

// 		} else {

// 			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
// 			//INTERSECTED.name="pony";
// 			INTERSECTED = null;
// 			transform.detach( transform.object );
// 		}
// 	}
// }
// function render() {
// 	if ( controlsEnabled ) {
// 		var delta = clock.getDelta();
// 		var moveDistance = 20 * delta; // 200 pixels per second
// 		var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
// 		controls.update(delta);


// 		if ( moveForward ) controls.getObject().translateZ( -moveDistance );
// 		if ( moveBackward ) controls.getObject().translateZ( moveDistance );

// 		if ( moveLeft ) controls.getObject().translateX( -moveDistance );
// 		if ( moveRight ) controls.getObject().translateX( moveDistance );

// 		if ( moveVup ) 	controls.getObject().translateY( -moveDistance );
// 		if ( moveVdown ) controls.getObject().translateY( moveDistance );
// 	}

// 	camera.updateMatrixWorld();
// 	renderer.render( scene, camera );
// }

// function newPhots(position){
// 	//geometry = new THREE.PlaneGeometry( 0.1, 0.1, 1, 1 );
// 	geometry = new THREE.BoxGeometry( 0.02, 0.02, 0.02 );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );

// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = position.x;
// 	mesh.position.y = position.y;
// 	mesh.position.z = position.z;
	
// 	mesh.name="phot";
// 	material.color.setRGB( 1.0  ,1.0 ,1.0);
// 	//console.log(material.color);
// 	//scene.add( mesh );
// 	return mesh;
// }
// function debugSphere(position,color){
// 	//console.log("hola");
// 	geometry = new THREE.SphereGeometry( 0.1, 3, 5 );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB(color.x,color.y,color.z);
// 	material.transparent=true;
// 	material.opacity=opacity;
// 	material.refractionRatio=refractionRatio;
// 	material.reflectivity=reflectivity;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = position.x;// Math.floor( Math.random() * 20 )-10;
// 	mesh.position.y = position.y;//Math.floor( Math.random() * 20 ) ;
// 	mesh.position.z = position.z;//-12;//Math.floor( Math.random() * 20 ) -10;
// 	mesh.name="debug sphere";
// 	mesh.material.emissive.setRGB( 1.0,0.0,0.0 );
// 	scene.add( mesh );
// 	//objects.push( mesh );
// 	//animate();
// }

// function newTest(position,opac,refratio,reflec,color){
// 	//geometry = new THREE.TorusGeometry( 1, 0.5, 16, 100 );
// 	geometry = new THREE.SphereGeometry( 1.0, 30, 30 );
// 	//geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
// 	geometry.computeBoundingSphere();


// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.side=THREE.DoubleSided;
// 	material.color.setRGB(color.x,color.y,color.z );
// 	material.transparent=true;
// 	material.opacity=opac;
// 	material.refractionRatio=refratio;
// 	material.reflectivity=reflec;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = position.x;// Math.floor( Math.random() * 20 )-10;
// 	mesh.position.y = position.y;//Math.floor( Math.random() * 20 ) ;
// 	mesh.position.z = position.z;//-12;//Math.floor( Math.random() * 20 ) -10;
// 	mesh.name="test"+reflec;


// 	scene.add( mesh );

// 	geometry.computeBoundingBox();
// 	var hex  = 0xff0000;
// 	var bbox = new THREE.BoundingBoxHelper( mesh, hex );
// 	bbox.update();
// 	//scene.add( bbox );
// 	//console.log(scene.children[scene.children.length-1].material.side)

// 	/*console.log(scene.children[scene.children.length-1]);
// 	var tester=scene.children.length-1;
// 	for (var i=0;i<scene.children[tester].geometry.faces.length;i++){
// 		var x,y,z;
// 		x=scene.children[tester].geometry.faces[i].a;
// 		y=scene.children[tester].geometry.faces[i].b;
// 		z=scene.children[tester].geometry.faces[i].c;
		
// 		var pa=scene.children[tester].geometry.vertices[x];
// 		var pb=scene.children[tester].geometry.vertices[y];
// 		var pc=scene.children[tester].geometry.vertices[z];

// 		var cx=(pa.x+pb.x+pc.x)/3.0;
// 		var cy=(pa.y+pb.y+pc.y)/3.0;
// 		var cz=(pa.z+pb.z+pc.z)/3.0;

// 		var origin=new THREE.Vector3(cx,cy,cz);

// 		var punto= new THREE.Vector3(0.0,0.0,0.0);
// 		punto.x=origin.x+0.5*scene.children[tester].geometry.faces[i].normal.x;
// 		punto.y=origin.y+0.5*scene.children[tester].geometry.faces[i].normal.y;
// 		punto.z=origin.z+0.5*scene.children[tester].geometry.faces[i].normal.z;
// 		drawline(origin,punto);
// 		//console.log(punto);
// 		console.log("face:",i,origin,punto);
// 		//newSphere(punto);
// 	}*/
// 	//objects.push( mesh );
// 	//animate();
// }

// function newBox(){
// 	geometry = new THREE.BoxGeometry(figSize.x, figSize.y, figSize.z );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB( figColor.x  ,figColor.y ,figColor.z );
// 	material.transparent=true;
// 	material.opacity=opacity;
// 	material.refractionRatio=refractionRatio;
// 	material.reflectivity=reflectivity;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = figPosition.x;
// 	mesh.position.y = figPosition.y;
// 	mesh.position.z = figPosition.z;
// 	mesh.name="cube";
// 	//console.log(material.color);
// 	scene.add( mesh );
// }
// function newSphere(){
// 	geometry = new THREE.SphereGeometry( sphereSize.x, sphereSize.y, sphereSize.z );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB( figColor.x,figColor.y,figColor.z );
// 	material.transparent=true;
// 	material.opacity=opacity;
// 	material.refractionRatio=refractionRatio;
// 	material.reflectivity=reflectivity;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = figPosition.x;
// 	mesh.position.y = figPosition.y;
// 	mesh.position.z = figPosition.z;
// 	mesh.name="sphere";
// 	//mesh.material.emissive.setRGB( 1.0,0.0,0.0 );
// 	scene.add( mesh );
// 	//objects.push( mesh );
// 	//animate();
// }
// function newCylinder(){
// 	geometry = new THREE.CylinderGeometry( cylinderSize.x, cylinderSize.y, cylinderSize.z, cylinderSize.w );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB( figColor.x  ,figColor.y ,figColor.z );
// 	material.transparent=true;
// 	material.opacity=opacity;
// 	material.refractionRatio=refractionRatio;
// 	material.reflectivity=reflectivity;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = figPosition.x;
// 	mesh.position.y = figPosition.y;
// 	mesh.position.z = figPosition.z;
// 	mesh.name="cylinder";
// 	scene.add( mesh );
// 	//objects.push( mesh );
// 	//animate();
// }
// function newTorus(){
// 	geometry = new THREE.TorusGeometry( torusSize.x, torusSize.y, torusSize.z, torusSize.w );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB( figColor.x  ,figColor.y ,figColor.z );
// 	material.transparent=true;
// 	material.opacity=opacity;
// 	material.refractionRatio=refractionRatio;
// 	material.reflectivity=reflectivity;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.position.x = figPosition.x;
// 	mesh.position.y = figPosition.y;
// 	mesh.position.z = figPosition.z;
// 	mesh.name="torus";
// 	scene.add( mesh );
// 	//objects.push( mesh );
// 	//animate();
// }
// function newFloor(eje,orientacion,position,color,W,H,name){
		
// 	geometry = new THREE.PlaneGeometry( W, H, 1, 1 );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	material.color.setRGB( color.x,color.y,color.z );
// 	material.reflectivity=0.0;
// 	var mesh = new THREE.Mesh( geometry, material );
// 	mesh.material.side = THREE.DoubleSide;
// 	if(eje=="x"){
// 		mesh.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / orientacion ) );
// 	}else{
// 		mesh.applyMatrix( new THREE.Matrix4().makeRotationY( - Math.PI / orientacion ) );
// 	}
// 	//material.needsUpdate= true;
// 	//material.matrixWorldNeedsUpdate=true;
// 	//mesh.rotation.x = de2ra(90);
// 	mesh.position.x=position.x;
// 	mesh.position.y =position.y;
// 	mesh.position.z =position.z;
// 	mesh.name=name;
// 	/*for (var i=0;i<mesh.geometry.faces.length;i++){
// 		mesh.geometry.faces[i].normal=normal;
// 	}*/
// 	//console.log(mesh);

// 	scene.add( mesh );

// 	//objects.push( mesh );
// 	//animate();
// }
// function newGrid(position){
// 	// objects
// 	var numobjx=30;
// 	var numobjy=30;
// 	for (var i=0;i<numobjx;i++){
// 		for (var j=0;j<numobjy;j++){
// 			geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 			material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 			var mesh = new THREE.Mesh( geometry, material );
// 			mesh.position.x = j- (numobjx/2);//position.x;
// 			mesh.position.y = i- (numobjy/2);//Math.floor( Math.random() * 20 ) * 20 + 10;
// 			mesh.position.z = -12;//Math.floor( Math.random() * 20 - 10 ) * 20;
// 			mesh.name="tester";
// 			if(i%2==0){
// 				if(j%2==0){
// 					material.color.setRGB( 255,0,0);
// 				}else{
// 					material.color.setRGB( 0,255,0);
// 				}
// 			}else{
// 				if(j%2!=0){
// 					material.color.setRGB( 255,0,0);
// 				}else{
// 					material.color.setRGB( 0,255,0);
// 				}
// 			}
// 			scene.add( mesh );
// 		}
// 	}	
// }

// function newLight(lightPos,lminDims,lmaxDims){
// 	//console.log(lmaxDims.x,lminDims.x);
// 	geometry = new THREE.BoxGeometry( lmaxDims.x-lminDims.x , (lmaxDims.y-lminDims.y), lmaxDims.z-lminDims.z );
// 	material = new THREE.MeshPhongMaterial( { specular: 0xaaaaaa, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors } );
// 	var mesh = new THREE.Mesh( geometry, material );
	
// 	mesh.position.x=lightPos.x;mesh.position.y=lightPos.y/*+0.019*/;mesh.position.z=lightPos.z;

// 	mesh.name="lSource";
// 	material.color.setRGB(0.9,0.9 ,0.9);
// 	//console.log(material.color);
// 	//console.log(mesh);
// 	scene.add( mesh );
// }

// function drawline(origin,destiny){
// 	var material = new THREE.LineBasicMaterial({
// 		color: 0xaaaa00
// 	});

// 	var geometry = new THREE.Geometry();
// 	geometry.vertices.push(origin,destiny);

// 	var line = new THREE.Line( geometry, material );
// 	line.name="line";
// 	scene.add( line );
// }

// /*function Photon_Map(){
// 	if(scene.children[1].visible){
// 		for(var i=1;i<sceneObj;i++){
// 			scene.children[i].visible=false;
// 			renderer.setClearColor( 0x000000 );
// 		}
// 		//console.log(photMap);
// 		/*var hola=photMap.nextphoton;
// 		console.log(hola);

		
// 	}else{
// 		for(var i=1;i<sceneObj;i++){
// 			scene.children[i].visible=true;
// 			renderer.setClearColor( 0xf0f0f0 );
// 		}

// 	}
// }*/

// function Maps(){

// 	if(visibleMaps==0){
		
// 		rendMaps();
// 		visibleMaps=1;
// 	}else{
		
// 		var elem=document.getElementById('Rdisplayer');
// 		//console.log(elem);
// 		elem.parentNode.removeChild(elem);

// 		elem=document.getElementById('Pdisplayer');
// 		elem.parentNode.removeChild(elem);

// 		elem=document.getElementById('download');
// 		elem.parentNode.removeChild(elem);

// 		$("canvas").show();
// 		visibleMaps=0;
// 	}	
// }

// function Phots3d (){
// 	if(scene.children[1].visible){
// 		var group=new THREE.Object3D();
// 		//ambient
// 		var light = new THREE.AmbientLight( 0xa0a0a0 ); // soft white light
// 		group.add( light );
// 		next=0;
// 		for(var j=0;j<photMap.nextphoton;j++){
// 			group.add(newPhots(photMap.pm[j].position));
// 			if(testphots[next]==j){
// 				group.children[group.children.length-1].material.emissive.setRGB( 1.0,0.0,0.0 );	
// 				next++;
// 			}
// 		}
// 		for(var i=1;i<sceneObj;i++){
// 			scene.children[i].visible=false;
// 			renderer.setClearColor( 0x000000 );
// 		}
// 		group.name="photgroup";
// 		scene.add(group);
// 		animate();

// 	}else{
// 		//console.log(scene);
// 		var selectedObject = scene.getObjectByName("photgroup");
//     	scene.remove( selectedObject );
// 		//console.log(scene);
// 		for(var i=1;i<sceneObj;i++){
// 			scene.children[i].visible=true;
// 			renderer.setClearColor( 0xf0f0f0 );
// 		}
// 	}
// 	//Photon_Map();
// }

// /*function TestPhots3d(){
// 	var group=new THREE.Object3D();
// 	//ambient
// 	//var light = new THREE.AmbientLight( 0xa0a0a0 ); // soft white light
// 	//group.add( light );
// 	next=0;
// 	console.log(testphots);
// 	for(var j=0;j<photMap.nextphoton;j++){
// 		if(testphots[next]==j){
// 			group.add(newPhots(photMap.pm[j].position));
// 			group.children[group.children.length-1].material.emissive.setRGB( 1.0,0.0,0.0 );	
// 			next++;
// 		}
// 	}
// 	//group.visible=false;
// 	console.log("listo");
// 	scene.add(group);
// 	animate();
// 	//Photon_Map();
// }*/

// window.addEventListener( 'keydown', function ( event ) {	
//     //console.log(event.which);
//     if(transform.object!=undefined){
//    	    switch ( event.keyCode ) {
// 			case 84: // T
// 		        transform.setMode( "translate" );
// 		        break;
// 	      	case 82: // R
// 		        transform.setMode( "rotate" );
// 		        break;
// 	      	case 83: // S
// 		        transform.setMode( "scale" );
// 		        break;
// 			case 68:

// 				break;
// 			case 107: // +,=,num+
// 				transform.setSize( transform.size + 0.1 );
// 				break;
// 			case 189:
// 			case 10: // -,_,num-
// 				transform.setSize( Math.max(transform.size - 0.1, 0.1 ) );
// 				break;
// 			case 27:
// 				if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
// 				INTERSECTED.material.opacity=selectedOpacity;
// 				INTERSECTED = null;
// 				transform.detach( transform.object );
// 				break;

// 	    }
// 	}else{
// 		switch ( event.keyCode ) {
		      
// 			case 65:
// 				//console.log(camera.rotation);
// 				camera.rotation.y-=0.03;
// 				//console.log(camera.rotation);
// 				break;
// 			case 68:
// 				camera.rotation.y+=0.03;
// 				//console.log(camera.rotation);
// 				break;


// 	    }
// 	}
// });



// $("#blocker").click(function(e){ 
//    //console.log()
//    //$("#text").innerHTML = "Loading...";
//    	$("#blocker").removeClass("visible");

//    	$("#blocker").addClass("fade");
// 	init();

// 	animate();
//    	controlsEnabled = true;
// 	controls.enabled = true;
// 	guiInit();

// 	InitPM();
	
// 	//console.log("animating");
// 	animate();



// 	//countthis();
// })


// function hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }

// //******GUI controls*******//
// var AddFigs= function() {
// 	this.Maps = function(){ Maps()};
// 	this.Phots_3D= function (){
// 		if(photMap.nextphoton<1000){
// 			Phots3d();
// 		}else{
// 			console.log("Too many photons");
// 		}
// 	};
// 	this.PM_RM_Recalculate=function(){
// 		delete photMap.pm;
// 		delete photMap.nextphoton;
// 		photMap= new photonMap();
// 		console.log("Photon Map Building");
// 		var measureStart = new Date().getTime();
// 		InitPhotonRays();
// 		var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 		var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 		console.log('Completed in:', mins,'mins :',secs,'secs');
// 		console.log("Ray Tracing Building");
// 		measureStart = new Date().getTime();
// 		InitCamRays(1);
// 		mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 		secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 		console.log('Completed in:', mins,'mins :',secs,'secs');

// 	}

// 	this.Delete_Selected=function(){
// 		if(INTERSECTED!=null){
// 			scene.remove( INTERSECTED );
// 			transform.detach( transform.object );
// 		}
// 	};
// };

// var Cube=function(){
// 	this.SideA=cubeSize.x;
// 	this.SideB=cubeSize.y;
// 	this.SideC=cubeSize.z;
// 	this.PositionX=figPosition.x;
// 	this.PositionY=figPosition.y;
// 	this.PositionZ=figPosition.z;
// 	this.Color=[figColor.x,figColor.y,figColor.z];
// 	this.opacity=opacity;
// 	this.refractionRatio=refractionRatio;
// 	this.reflectivity=reflectivity;

// 	this.Create= function() { newBox()};
// }
// var Sphere=function(){
// 	this.Radius=sphereSize.x;
// 	this.HorizontalSegments=sphereSize.y;
// 	this.VerticalSegments=sphereSize.z;
// 	this.Color=[figColor.x,figColor.y,figColor.z];
// 	this.PositionX=figPosition.x;
// 	this.PositionY=figPosition.y;
// 	this.PositionZ=figPosition.z;
// 	this.opacity=opacity;
// 	this.refractionRatio=refractionRatio;
// 	this.reflectivity=reflectivity;
// 	this.Create= function() { newSphere()};
// }
// var Cylinder=function(){
// 	this.TopRadius=cylinderSize.x;
// 	this.BottomRadius=cylinderSize.y;
// 	this.Height=cylinderSize.z;
// 	this.RadiusSegments=cylinderSize.w;
// 	this.Color=[figColor.x,figColor.y,figColor.z];
// 	this.PositionX=figPosition.x;
// 	this.PositionY=figPosition.y;
// 	this.PositionZ=figPosition.z;

// 	this.opacity=opacity;
// 	this.refractionRatio=refractionRatio;
// 	this.reflectivity=reflectivity;
// 	this.Create= function() { newCylinder()};
// }
// var Torus=function(){
// 	this.RadialRadius=torusSize.x;
// 	this.TubeRadius=torusSize.y;
// 	this.RadialSegments=torusSize.z;
// 	this.TubeSegments=torusSize.w;
// 	this.Color=[figColor.x,figColor.y,figColor.z];
// 	this.PositionX=figPosition.x;
// 	this.PositionY=figPosition.y;
// 	this.PositionZ=figPosition.z;

// 	this.opacity=opacity;
// 	this.refractionRatio=refractionRatio;
// 	this.reflectivity=reflectivity;
// 	this.Create= function() { newTorus()};
// }

// var Light= function() {
// 	this.Intensity= 0.1;
// 	this.Range= 0.1;

// 	//this.Color = [ 1, 1, 1 ];
// };

// var Directional= function() {
// 	this.Intensidad= 0.1;
// 	this.Alcance= 0.1;
// 	this.TargetX=0;
// 	this.TargetY=0;
// 	this.TargetZ=0;
// 	this.PosicionX=0;
// 	this.PosicionY=0;
// 	this.PosicionZ=0;
// 	this.Color=[ 1, 1, 1 ];
// };

// var Photon_Maps=function(){
// 	this.Phots_Num=NumPhotons;
// 	this.Bounce_Num=MaxPhotonDepth;
// 	this.LightPower=lpower;
// 	this.PositionX=lightPos.x;
// 	this.PositionY=lightPos.y;
// 	this.PositionZ=lightPos.z;
// 	this.DirectionX=lightDir.x;
// 	console.log(lightDir.y);
// 	this.DirectionY=lightDir.y;
// 	this.DirectionZ=lightDir.z;
// 	this.Recalculate= function (){ 
// 		delete photMap.pm;
// 		delete photMap.nextphoton;
// 		photMap= new photonMap();
// 		console.log("Photon Map Building");
// 		var measureStart = new Date().getTime();
// 		InitPhotonRays();
// 		var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 		var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 		console.log('Completed in:', mins,'mins :',secs,'secs');
// 	}
// };

// var Ray_Tracer=function(){
// 	this.Ray_Num_WxH=VP_width;
// 	this.SearchMaxNeighbors=maxPhots;
// 	this.SearchDistance=maxDistance;

// 	this.Recalculate= function (){
// 		console.log("Ray Tracing Building");
// 		var measureStart = new Date().getTime();
// 		InitCamRays(1);
// 		var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 		var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 		console.log('Completed in:', mins,'mins :',secs,'secs');
// 	}
// };
// var gui = new dat.GUI();
// function guiInit() {

	
// 	var maps= new AddFigs();
// 		gui.add(maps,"Maps");

// 	var rAll= new AddFigs();
// 		gui.add(rAll,"PM_RM_Recalculate");
	
// 	var phots3d= new AddFigs();
// 		gui.add(phots3d,"Phots_3D");

// 	/*var testphots3d= new AddFigs();
// 		gui.add(testphots3d,"TestPhots");*/


// 	var PM = new Photon_Maps();	
// 	var pmfolder= gui.addFolder("Photon_Maps");
// 		pmfolder.add(PM,"Phots_Num",100,10000).onChange(function(newValue) {
// 	   		NumPhotons=Math.floor(newValue);
// 	   		newValue=NumPhotons;
// 		});
// 		pmfolder.add(PM,"Bounce_Num",1,15).step(1.0).onChange(function(newValue) {
// 	   		MaxPhotonDepth=Math.floor(newValue);
// 		});
// 		pmfolder.add(PM,"LightPower",1,50000).onChange(function(newValue) {
// 	   		lpower=Math.floor(newValue);
// 		});

		
// 		var posicion=pmfolder.addFolder('LightPosition');
// 			posicion.add(PM,'PositionX',-10, 10).onChange(function(newValue) {
// 		   		for(var i=0;i<scene.children.length;i++){
// 					if(scene.children[i].name=="puntual"){
// 		   				lightPos.x=scene.children[i].position.x=newValue;
// 		   				break;
// 		   			}
// 		   		}
// 			});
// 			posicion.add(PM,'PositionY',-10, 10).onChange(function(newValue) {
// 		   		for(var i=0;i<scene.children.length;i++){
// 					if(scene.children[i].name=="puntual"){
// 		   				lightPos.y=scene.children[i].position.y=newValue;
// 		   				break;
// 		   			}
// 		   		}
// 			});
// 			posicion.add(PM,'PositionZ',-20, 20).onChange(function(newValue) {
// 		   		for(var i=0;i<scene.children.length;i++){
// 					if(scene.children[i].name=="puntual"){
// 		   				lightPos.z=scene.children[i].position.z=newValue;
// 		   				break;
// 		   			}
// 		   		}
// 			});
// 		var ldir=pmfolder.addFolder('LightDirection');
// 			ldir.add(PM,'DirectionX',-1.0, 1.0).step(0.01).onChange(function(newValue) {
// 		   		lightDir.x=newValue;
// 		   		//console.log(lightDir,newValue)
// 			});
// 			ldir.add(PM,'DirectionY',-1.0, 1.0).step(0.01).onChange(function(newValue) {
// 		   		lightDir.y=newValue;
// 			});
// 			ldir.add(PM,'DirectionZ',-1.0, 1.0).step(0.01).onChange(function(newValue) {
// 		   		lightDir.z=newValue;
// 			});
// 		pmfolder.add(PM,"Recalculate");


// 	var RM = new Ray_Tracer();	
// 	var rmfolder= gui.addFolder("Ray_Tracer");
// 		rmfolder.add(RM,"Ray_Num_WxH",{ 16:16, 32:32, 64:64, 128:128, 256:256, 512:512, 1024:1024}).onChange(function(newValue) {
// 	   		VP_width=VP_height=newValue;
// 	   		//console.log(VP_width);
// 		});
// 		rmfolder.add(RM,"SearchMaxNeighbors",10,100).step(1.0).onChange(function(newValue) {
// 	   		maxPhots=newValue;
// 		});
// 		rmfolder.add(RM,"SearchDistance",0.01,5.0).onChange(function(newValue) {
// 	   		maxDistance=newValue;
// 		});
// 		rmfolder.add(RM,"Recalculate");
// 		/*rmfolder.add(PM,"Bounce_Num",1,15).onChange(function(newValue) {
// 	   		MaxPhotonDepth=Math.floor(newValue);
// 		});*/
	
	
// 	var cube = new Cube();
// 	var sphere = new Sphere();
// 	var cylinder = new Cylinder();
// 	var torus = new Torus();
// 	var addFig = gui.addFolder('Add Figures');
		
// 		var cubefolder= addFig.addFolder("Cube");
// 			var cubesize=cubefolder.addFolder('Dimensions');
// 				cubesize.add(cube,'SideA',0.1, 3.0).onChange(function(newValue) {
// 			   		cubeSize.x=newValue;
// 				});
// 				cubesize.add(cube,'SideB',0.1, 3.0).onChange(function(newValue) {
// 			   		cubeSize.y=newValue;
// 				});
// 				cubesize.add(cube,'SideC',0.1, 3.0).onChange(function(newValue) {
// 			   		cubeSize.z=newValue;
// 				});
// 			var cubepos=cubefolder.addFolder('Position');
// 				cubepos.add(cube,'PositionX',-5, 5).onChange(function(newValue) {
// 			   		figPosition.x=newValue;
// 				});
// 				cubepos.add(cube,'PositionY',-5, 5).onChange(function(newValue) {
// 			   		figPosition.y=newValue;
// 				});
// 				cubepos.add(cube,'PositionZ',-5, 5).onChange(function(newValue) {
// 			   		figPosition.z=newValue;
// 				});

// 			var cubecolor=cubefolder.addFolder('Color');
// 				cubecolor.addColor(cube,'Color',0.0,255.0).onChange(function(newValue) {
// 				if(newValue[0]=='#'){
// 					figColor.x=hexToRgb(newValue).r/255;
// 					figColor.y=hexToRgb(newValue).g/255;
// 					figColor.z=hexToRgb(newValue).b/255;
// 				}else{
// 			   		figColor.x=newValue[0]/255;
// 			   		figColor.y=newValue[1]/255;
// 			   		figColor.z=newValue[2]/255;
// 			   	}			
// 			});

// 			cubefolder.add(cube,"opacity",0.0,1.0).onChange(function(newValue) {
// 			   		opacity=parseFloat((newValue).toFixed(1));
// 			});
// 			cubefolder.add(cube,"refractionRatio",0.0,3.0).onChange(function(newValue) {
// 			   		refractionRatio=parseFloat((newValue).toFixed(1));
// 			});
// 			cubefolder.add(cube,"reflectivity",0.0,1.0).onChange(function(newValue) {
// 			   		reflectivity=parseFloat((newValue).toFixed(1));
// 			});
// 			cubefolder.add(cube,"Create");

// 		var spherefolder= addFig.addFolder("Sphere");
// 			var spheresize=spherefolder.addFolder('Dimensions');
// 					spheresize.add(sphere,'Radius',0.1, 3.0).onChange(function(newValue) {
// 				   		sphereSize.x=newValue;
// 					});
// 					spheresize.add(sphere,'HorizontalSegments',3, 100).step(1).onChange(function(newValue) {
// 				   		sphereSize.y=Math.floor(newValue);
// 				   		//console.log(sphereSize.y,newValue);
// 					});
// 					spheresize.add(sphere,'VerticalSegments',3, 100).step(1).onChange(function(newValue) {
// 				   		sphereSize.z=Math.floor(newValue);
// 					});
// 				var spherepos=spherefolder.addFolder('Position');
// 					spherepos.add(sphere,'PositionX',-5, 5).onChange(function(newValue) {
// 				   		figPosition.x=newValue;
// 					});
// 					spherepos.add(sphere,'PositionY',-5, 5).onChange(function(newValue) {
// 				   		figPosition.y=newValue;
// 					});
// 					spherepos.add(sphere,'PositionZ',-5, 5).onChange(function(newValue) {
// 				   		figPosition.z=newValue;
// 					});

// 				var spherecolor=spherefolder.addFolder('Color');
// 					spherecolor.addColor(sphere,'Color',0.0,255.0).onChange(function(newValue) {
// 					if(newValue[0]=='#'){
// 						figColor.x=hexToRgb(newValue).r/255;
// 						figColor.y=hexToRgb(newValue).g/255;
// 						figColor.z=hexToRgb(newValue).b/255;
// 					}else{
// 				   		figColor.x=newValue[0]/255;
// 				   		figColor.y=newValue[1]/255;
// 				   		figColor.z=newValue[2]/255;
// 				   	}			
// 				});
			
// 			spherefolder.add(sphere,"opacity",0.0,1.0).onChange(function(newValue) {
// 			   		opacity=parseFloat((newValue).toFixed(1));

// 			});
// 			spherefolder.add(sphere,"refractionRatio",0.0,3.0).onChange(function(newValue) {
// 			   		refractionRatio=parseFloat((newValue).toFixed(1));
// 			});
// 			spherefolder.add(sphere,"reflectivity",0.0,1.0).onChange(function(newValue) {
// 			   		reflectivity=parseFloat((newValue).toFixed(1));
// 			});
			
// 			spherefolder.add(sphere,"Create");

// 		var cylinderfolder= addFig.addFolder("Cylinder");
// 			var cylindersize=cylinderfolder.addFolder('Dimensions');
// 				cylindersize.add(cylinder,'TopRadius',0.1, 3.0).onChange(function(newValue) {
// 			   		cylinderSize.x=newValue;
// 				});
// 				cylindersize.add(cylinder,'BottomRadius',0.1, 3.0).onChange(function(newValue) {
// 			   		cylinderSize.y=newValue;
// 				});
// 				cylindersize.add(cylinder,'Height',0.1, 3.0).onChange(function(newValue) {
// 			   		cylinderSize.z=newValue;
// 			   		//console.log(sphereSize.y,newValue);
// 				});
// 				cylindersize.add(cylinder,'RadiusSegments',3, 100).step(1).onChange(function(newValue) {
// 			   		cylinderSize.w=Math.floor(newValue);
// 				});
// 			var cylinderpos=cylinderfolder.addFolder('Position');
// 				cylinderpos.add(cylinder,'PositionX',-5, 5).onChange(function(newValue) {
// 			   		figPosition.x=newValue;
// 				});
// 				cylinderpos.add(cylinder,'PositionY',-5, 5).onChange(function(newValue) {
// 			   		figPosition.y=newValue;
// 				});
// 				cylinderpos.add(cylinder,'PositionZ',-5, 5).onChange(function(newValue) {
// 			   		figPosition.z=newValue;
// 				});

// 			var cylindercolor=cylinderfolder.addFolder('Color');
// 				cylindercolor.addColor(cylinder,'Color',0.0,255.0).onChange(function(newValue) {
// 				if(newValue[0]=='#'){
// 					figColor.x=hexToRgb(newValue).r/255;
// 					figColor.y=hexToRgb(newValue).g/255;
// 					figColor.z=hexToRgb(newValue).b/255;
// 				}else{
// 			   		figColor.x=newValue[0]/255;
// 			   		figColor.y=newValue[1]/255;
// 			   		figColor.z=newValue[2]/255;
// 			   	}			
// 			});
// 			cylinderfolder.add(cylinder,"opacity",0.0,1.0).onChange(function(newValue) {
// 			   		opacity=parseFloat((newValue).toFixed(1));
// 			});
// 			cylinderfolder.add(cylinder,"refractionRatio",0.0,3.0).onChange(function(newValue) {
// 			   		refractionRatio=parseFloat((newValue).toFixed(1));
// 			});
// 			cylinderfolder.add(cylinder,"reflectivity",0.0,1.0).onChange(function(newValue) {
// 			   		reflectivity=parseFloat((newValue).toFixed(1));
// 			});

// 			cylinderfolder.add(cylinder,"Create");

// 		var torusfolder= addFig.addFolder("Torus");
// 			var torussize=torusfolder.addFolder('Dimensions');
// 					torussize.add(torus,'RadialRadius',0.1, 3.0).onChange(function(newValue) {
// 				   		torusSize.x=newValue;
// 					});
// 					torussize.add(torus,'TubeRadius',0.1, 3.0).onChange(function(newValue) {
// 				   		torusSize.y=newValue;
// 					});
// 					torussize.add(torus,'RadialSegments',3, 100).step(1).onChange(function(newValue) {
// 				   		torusSize.z=newValue;
// 				   		//console.log(sphereSize.y,newValue);
// 					});
// 					torussize.add(torus,'TubeSegments',3, 100).step(1).onChange(function(newValue) {
// 				   		torusSize.w=Math.floor(newValue);
// 					});
// 				var toruspos=torusfolder.addFolder('Position');
// 					toruspos.add(torus,'PositionX',-5, 5).onChange(function(newValue) {
// 				   		figPosition.x=newValue;
// 					});
// 					toruspos.add(torus,'PositionY',-5, 5).onChange(function(newValue) {
// 				   		figPosition.y=newValue;
// 					});
// 					toruspos.add(torus,'PositionZ',-5, 5).onChange(function(newValue) {
// 				   		figPosition.z=newValue;
// 					});

// 				var toruscolor=torusfolder.addFolder('Color');
// 					toruscolor.addColor(torus,'Color',0.0,255.0).onChange(function(newValue) {
// 					if(newValue[0]=='#'){
// 						figColor.x=hexToRgb(newValue).r/255;
// 						figColor.y=hexToRgb(newValue).g/255;
// 						figColor.z=hexToRgb(newValue).b/255;
// 					}else{
// 				   		figColor.x=newValue[0]/255;
// 				   		figColor.y=newValue[1]/255;
// 				   		figColor.z=newValue[2]/255;
// 				   	}			
// 				});
// 				torusfolder.add(torus,"opacity",0.0,1.0).onChange(function(newValue) {
// 				   		opacity=parseFloat((newValue).toFixed(1));
// 				});
// 				torusfolder.add(torus,"refractionRatio",0.0,3.0).onChange(function(newValue) {
// 				   		refractionRatio=parseFloat((newValue).toFixed(1));
// 				});
// 				torusfolder.add(torus,"reflectivity",0.0,1.0).onChange(function(newValue) {
// 				   		reflectivity=parseFloat((newValue).toFixed(1));
// 				});
				
// 				torusfolder.add(torus,"Create");


// 		var del= new AddFigs();
// 		addFig.add(del,"Delete_Selected");



	
// };

// //************************//




