        THREE.PerspectiveCamera.prototype.setRotateX = function( deg ){
            if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
                this.rotation.x = deg * ( Math.PI / 180 );
            }
        };
        THREE.PerspectiveCamera.prototype.setRotateY = function( deg ){
            if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
                this.rotation.y = deg * ( Math.PI / 180 );
            }
        };
        THREE.PerspectiveCamera.prototype.setRotateZ = function( deg ){
            if ( typeof( deg ) == 'number' && parseInt( deg ) == deg ){
                this.rotation.z = deg * ( Math.PI / 180 );
            }
        };
        THREE.PerspectiveCamera.prototype.getRotateX = function(){
            return Math.round( this.rotation.x * ( 180 / Math.PI ) );
        };
        THREE.PerspectiveCamera.prototype.getRotateY = function(){
            return Math.round( this.rotation.y * ( 180 / Math.PI ) );
        };
        THREE.PerspectiveCamera.prototype.getRotateZ = function(){
            return Math.round( this.rotation.z * ( 180 / Math.PI ) );
        };
        
        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        
        function toBox( x, y, z )
        {
            document.getElementById('box').innerHTML = 'X: ' + x + '<br />Y: ' + y + '<br />Z: ' + z;
        }

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        //var renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        
        camera.position.z = 0;
        
        var geometry = new THREE.CubeGeometry(1,1,1);
        var material1 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var material3 = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
        var material4 = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
        var material5 = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
        var material6 = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: true});
        
        var cube1 = new THREE.Mesh(geometry, material1);
        var cube2 = new THREE.Mesh(geometry, material2);
        var cube3 = new THREE.Mesh(geometry, material3);
        var cube4 = new THREE.Mesh(geometry, material4);
        var cube5 = new THREE.Mesh(geometry, material5);
        var cube6 = new THREE.Mesh(geometry, material6);
        
        cube1.position.x = -1;
        cube2.position.x = 1;
        cube3.position.y = -1;
        cube4.position.y = 1;
        cube5.position.z = -1;
        cube6.position.z = 1;
        
        scene.add(cube1);
        scene.add(cube2);
        scene.add(cube3);
        scene.add(cube4);
        scene.add(cube5);
        scene.add(cube6);
        
        const KEYUP             = 38;        // up key
        const KEYDOWN             = 40;        // down key
        const KEYLEFT             = 37;        // left key
        const KEYRIGHT            = 39;        // right key
        const Z_ROT_INC            = 81;
        const Z_ROT_DEC            = 87;
        const VIEW_INCREMENT    = 1;        // amount to move in degrees

        toBox( camera.getRotateX(), camera.getRotateY(), camera.getRotateZ() );
        
        render();
                        
        document.addEventListener('keydown', function(e)
        {
            var key = e.keyCode;
            console.log(key);
            
            switch( key )
            {
                case KEYUP:
                
                    // x increments, z depends of current y
                    
                    if ( camera.getRotateX() < 90 )
                    {
                        camera.setRotateX( camera.getRotateX() + VIEW_INCREMENT );
                    }
                    break;
                    
                case KEYDOWN:
                    
                    if ( camera.getRotateX() > -90 )
                    {
                        camera.setRotateX( camera.getRotateX() - VIEW_INCREMENT );
                    }
                    break;
                    
                case KEYLEFT:
                
                    camera.setRotateY( camera.getRotateY() + VIEW_INCREMENT );
                    break;
                    
                case KEYRIGHT:
                
                    camera.setRotateY( camera.getRotateY() - VIEW_INCREMENT );
                    break;
                    
                case Z_ROT_INC:
                
                    camera.setRotateZ( camera.getRotateZ() + VIEW_INCREMENT );
                    break;
                    
                case Z_ROT_DEC:
                
                    camera.setRotateZ( camera.getRotateZ() - VIEW_INCREMENT );
                    break;
                    
            }
            
            toBox( camera.getRotateX(), camera.getRotateY(), camera.getRotateZ() );
            
        });