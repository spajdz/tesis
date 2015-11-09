/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 0;
	yawObject.add( pitchObject );

	var verticalObject = new THREE.Object3D();
	verticalObject.position.z= 0;
	verticalObject.add(yawObject);

	var PI_2 = Math.PI / 2;

	var camera = function ( event ) {

		/*if ( scope.enabled === false ) return;
		
		var movementX = 0;
		var movementY = 0;
		var movementZ = 0;
		if ( rotateForward ) movementY -= 10;
		if ( rotateBackward ) movementY += 10;

		if ( rotateLeft ) movementX -= 10;
		if ( rotateRight ) movementX += 10;

		if ( rotateVup ) movementZ -= 10;
		if ( rotateVdown ) movementZ += 10;


		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;
		verticalObject.rotation.z -= movementZ * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );*/


	};
	//console.log(camera);
	/*camera.rotation.y=yawObject.rotation.y;
	camera.rotation.x=pitchObject.rotation.x;*/

	//document.addEventListener( 'mousemove', onMouseMove, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			//console.log(verticalObject.z);
			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, verticalObject.z );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
				rotateForward=true;
				camera();
				break;
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
				rotateLeft=true;
				camera();
				break;
			case 65: // a
				moveLeft = true; 
				break;
			case 40: // down
				rotateBackward=true;
				camera();
				break;
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
				rotateRight=true;
				camera();
				break;
			case 68: // d
				moveRight = true;
				console.log(moveRight);
				break;

			case 81: // q
				moveVup = true;
				break;
			case 69: // e
				moveVdown = true;
				break;

			case 16: // shift
				rotateVup = true;
				break;
			case 17: // ctrl
				rotateVdown = true;
				break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
				rotateForward=false;
				break;	
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
				rotateLeft=false;
				break;
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
				rotateBackward=false;
				break;
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
				rotateRight=false;
				break;
			case 68: // d
				moveRight = false;
				break;
			
			case 81: // q
				moveVup = false;
				break;
			case 69: // e
				moveVdown = false;
				break;

			case 16: // shift
				rotateVup = false;
				break;
			case 17: // ctrl
				rotateVdown = false;
				break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

};
