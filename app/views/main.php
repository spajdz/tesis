
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" tyoe="text/css" href="Assets/css/style.css">
	</head>
	<body>
		<!--Picking Shaders >
			<script type="x-shader/x-vertex" id="vertexshader">
				//uniform float zoom;
				attribute float alpha;
				varying float vAlpha;
				void main() {
					vAlpha = 1.0 - alpha;
					vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
					gl_PointSize = 4.0 * ( 300.0 / length( mvPosition.xyz ) );
					gl_Position = projectionMatrix * mvPosition;
				}
			</script>

			<script type="x-shader/x-fragment" id="fragmentshader">
				uniform sampler2D tex1;
				varying float vAlpha;
				void main() {
					gl_FragColor = texture2D(tex1, gl_PointCoord);
					gl_FragColor.r = (1.0 - gl_FragColor.r) * vAlpha + gl_FragColor.r;
				}
			</script>
		<END Picking Shaders -->
		<script src="Assets/js/jquery.min.js"></script>
		<script src="Assets/js/build/three.js"></script>

		<script src="Assets/js/src/core/Clock.js"></script>
		<!--script src="Assets/js/utils/controls/PointerLockControls.js"></script-->
	  	
	  	<script src="Assets/js/utils/controls/FirstPersonControls.js"></script>
		<script src="Assets/js/utils/picking/Projector.js"></script>
		<script src="Assets/js/utils/stats.min.js"></script>
		<script src="Assets/js/utils/controls/TransformControls.js"></script>
		<script src="Assets/js/utils/TypedArrayUtils.js"></script>

		<script src="Assets/js/utils/threex.coloradjust.js"></script>

		<script src="Assets/js/postprocessing/EffectComposer.js"></script>
		<script src="Assets/js/postprocessing/MaskPass.js"></script>
		<script src="Assets/js/postprocessing/RenderPass.js"></script>
		<script src="Assets/js/postprocessing/ShaderPass.js"></script>
		<script src="Assets/js/postprocessing/CopyShader.js"></script>
		

		<script src="Assets/js/chance.js"></script>


	  	<script type="text/javascript" src="Assets/dat-gui/build/dat.gui.js"></script>
		

		<div id="blocker" class="visible">
			<div id="instructions">
				<span id="text" style="font-size:40px">Click to play</span>
				<br />
				(Instructions:....soon)
			</div>
		</div>
		<!--script src="Assets/js/main.js"></script-->
		<!--a href="#Rdisplayer">imagenes</a-->
		<script src="Assets/js/test.js"></script>
		<script src="Assets/js/photonMaps.js"></script>
		<script src="Assets/js/Tester.js"></script>
		<!--canvas id="Rdisplayer" class="visible"></canvas>
		<canvas id="Pdisplayer" class="visible"></canvas-->
	</body>
</html>
