//chance.js revisar para los random
//http://www.3dkingdoms.com/weekly/weekly.php?a=2

var NumPhotons=100;//10000; //1000
var MaxPhotonDepth=1; //15
var MaxPhotons=NumPhotons*(MaxPhotonDepth+1);

var photRay=[];
var photMap= new photonMap();
var photonPower=new THREE.Vector3(1.0,1.0,1.0);



var VP_width=512;
var VP_height=512;
var NumRays=VP_height*VP_width;

var maxDistance=0.18; //0.5	//search
var maxPhots=Math.min(MaxPhotons*0.01,100); 		//search

var img_width=512;
var img_height=512;



var eyeRays;

var nearPhots;



//************variables experimentales*******************//

var lightPos=new THREE.Vector3(0.0,0.0,-1.0); //4.9
var lightDir=new THREE.Vector3(0.0,-1.0,0.0);
var lightCol=new THREE.Vector3(0,0,0);
var lminDims = new THREE.Vector3(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);
var lmaxDims = new THREE.Vector3(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);

var lpower= 38000;// 40000;

var minDims = new THREE.Vector3(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);

var maxDims = new THREE.Vector3(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);

var auxPM2,auxPM1;

var debugindex=0;

var raylines=[];
var rlindex=0;


var lostPhots=0;
var lostrebound=0;

var ExperPos=[];

var imgi=0;
var imgj=0;
var rtImg;//Raytracing render buffer
var photImg;//Photon mapping render buffer

//var mySeed;

var seeds=[956476897,956480521,956487197,956496829,961748927];

/*var mySeed = $.ajax({
    type: "GET",
    url: "https://www.random.org/integers/",
    data: {num: "1", col: "1", min: "1", max: "1000000000", base: "10", format: "plain", rnd: "new"},
    async: false
}).responseText;*/
//console.log(Math.round(Math.random()*5.0));
var mySeed=seeds[Math.round(Math.random()*5.0)];
console.log("Rand seed:",mySeed);

var chance1 = new Chance(mySeed);

var permlines=16;

var bufferIndex=0;
var pointBuffer=[];
var pBuffer=[];
var nBuffer=[];
var qBuffer=[];
var mqBuffer=[];

var iniIndex=1.0;
var newIndex=1.33333;

//*******debug ******//
var maxDif=0;

var rtcont=0,pmcont=0,fwcont=0,nwcont=0,lwcont=0,rwcont=0,floorcont=0,ceilcont=0;
var testphots=[];var next=0;

var difnum=0,specnum=0,absnum=0,refractCont=0;



//******fdebug******//

//*************fvariables experimentales*****************//




//************testing variables*************************//
var string="";


//*****************************************************//
function photon(){
	this.position=new THREE.Vector3();
	this.direction=new THREE.Vector3();
	this.power=0;
	this.plane=0;
	this.theta="a";
	this.phi="a";
}
/*function nearestPhoton(){
	this.dist2=0.0;
	this.nIndex=[];
	this.center=new THREE.Vector3(0.0,0.0,0.0);
	this.nPhotons=0;
	this.gotHeap=0;
	this.found=0;
	this.nxtNindex=0;}*/

function photonMap(){
	this.pm=[];
	this.nextphoton=0;
	for(var i=0; i<MaxPhotons; i++) {
	    this.pm[i] = new photon;
	    //console.log(this.pm[i].power);
	}
}

function Ray(){
	this.P=new THREE.Vector3();
	this.D=new THREE.Vector3();
}

/*function testPM(){
	photmapStore(lpower,new THREE.Vector3(-1.0,4.0,6.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(-6.0,3.0,1.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(-2.0,5.0,2.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(5.0,1.0,0.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(1.0,-3.0,4.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(-3.0,1.0,2.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(2.0,4.0,-5.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(3.0,2.0,-1.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(-2.0,5.0,-3.0),new THREE.Vector3(0.0,0.0,0.0));
	photmapStore(lpower,new THREE.Vector3(1.0,2.0,-5.0),new THREE.Vector3(0.0,0.0,0.0));
	for(var i=0;i<10;i++){
		console.log(photMap.pm[i].position);
	}
} */
function direction(N){
	
	var dir = new THREE.Vector3();
	var rand= chance1.random();
	var theta=rand*2.0*Math.PI; //0-2pi
	var v= chance1.random(); //0-1
	var phi=Math.acos( (2.0*v)-1.0 ); //0-pi
	var radius=1.0;
	dir.x=radius*Math.cos(theta)*Math.sin(phi);
	dir.y=radius*Math.sin(theta)*Math.sin(phi);
	dir.z=radius*Math.cos(phi);
	if(((dir.angleTo(N))*180.0/Math.PI)>90.0){
		dir.negate();
	}

	return dir;
}

function InitPhotonRays(){
	//photMap=null;
	difnum=absnum=specnum=0;
	MaxPhotons=NumPhotons*(MaxPhotonDepth+1);
 	photMap= new photonMap();

	var x,y,z;
	var offset=new THREE.Vector3();
	for(var j=0; j<MaxPhotons; j++) {
		photRay[j] = new Ray;  
	}
	for (var i=0;i<NumPhotons;i++){
		offset.x=0.2*chance1.random()-0.1;
		offset.z=0.2*chance1.random()-0.1;
		offset.y=0.0;
		//console.log("offset",offset);
		photRay[i].P.x=offset.x+lightPos.x;
		photRay[i].P.y=offset.y+lightPos.y;
		photRay[i].P.z=offset.z+lightPos.z;
		
		if(lminDims.x>photRay[i].P.x){
			lminDims.x=photRay[i].P.x;
		}if(lminDims.y>photRay[i].P.y){
			lminDims.y=photRay[i].P.y;
		}if(lminDims.z>photRay[i].P.z){
			lminDims.z=photRay[i].P.z;
		}
		if(lmaxDims.x<photRay[i].P.x){
			lmaxDims.x=photRay[i].P.x;
		}if(lmaxDims.y<photRay[i].P.y){
			lmaxDims.y=photRay[i].P.y;
		}if(lmaxDims.z<photRay[i].P.z){
			lmaxDims.z=photRay[i].P.z;
		}

		photRay[i].D=direction(lightDir);
		//console.log(photRay[i].D)

		//****store photon****
		//console.log(lpower);
		photmapStore(lpower,photRay[i].P,photRay[i].D);
		//******fstore photon*****

		
		//******trace photon*****
		tracePhoton(photRay[i],lpower,0);
		//******ftrace photon****
	}
	for(var ind=0;ind<photMap.nextphoton;ind++){
		//console.log("wtf",photMap.pm[ind].power);
		photMap.pm[ind].power= photMap.pm[ind].power/photMap.nextphoton;
		//console.log(photMap.pm[ind].power);
	}
	//console.log("total phots:",photMap.nextphoton,"dif phots:",difnum,"spec phots:",specnum,"refract phots:",refractCont,"absorbed phots:",absnum,"maxPhots:",maxPhots,"powerxphot:",photMap.pm[0].power);
	//console.log("photTrace fwcont:",fwcont,"nwcont:",nwcont,"rwcont:",rwcont,"lwcont:",lwcont,"floorcont:",floorcont,"ceilcont:",ceilcont);
	/*for(var i=0;i<rlindex;i++){
		drawline(raylines[i].P,raylines[i].D);
	}*/

	//console.log("lostrebound/lostPhots:",lostrebound,lostPhots);
	//testPM();
	//*****kdtree**********//
		var distanceFunction = function(a, b){
			return Math.sqrt( Math.pow(b[0] - a[0], 2) +  Math.pow(b[1] - a[1], 2) +  Math.pow(b[2] - a[2], 2) );
		};
		//console.log(photMap);
		//var elem=[];
		ExperPos=new Float32Array( (photMap.nextphoton) * 3 );

		for(var t=0;t<photMap.nextphoton;t++){
			
			ExperPos[ t * 3 + 0 ]=photMap.pm[t].position.x;
			ExperPos[ t * 3 + 1 ]=photMap.pm[t].position.y;
			ExperPos[ t * 3 + 2 ]=photMap.pm[t].position.z;
			//console.log(photMap.pm[t].position,elem[t].position,ExperPos);
		}
		//elem=photMap.pm;
				//console.log(elem);

		//console.log("original",verifier(ExperPos,photMap.pm));
		console.log("Kd-Tree Building");
		string+="\nKd-Tree Building";
		var measureStart = new Date().getTime();
		kdtree = new THREE.TypedArrayUtils.Kdtree( ExperPos, distanceFunction, 3, photMap.pm );
		var mins, secs;
		mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
		secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
		console.log("Completed Kd-Tree", mins,'mins :',secs,'secs');
		string+="\nCompleted Kd-Tree "+ mins+'mins :'+secs+'secs';

	//****fkdtree*********//
}

function drawpath(origin,direction,t,color){
	/*for (var i=0;i<t;i++){*/
		var punto= new THREE.Vector3(0.0,0.0,0.0);
		punto.x=origin.x+t*direction.x;
		punto.y=origin.y+t*direction.y;
		punto.z=origin.z+t*direction.z;
		//drawline(origin,punto);
		//console.log(punto);
		debugSphere(punto,color);
	//}
}
function RayIntersect(ray,depth){
	if(depth==5700){
		//console.log(ray.P,"->",ray.D);
	}
	var RCaster = new THREE.Raycaster(ray.P,ray.D);
	//console.log("1",RCaster);

	var intersects = RCaster.intersectObjects( scene.children );
	

	if ( intersects.length > 0 ) {
		
		if ( (depth==1000||depth==2000) && intersects[0].object.name=="test" ){
			//console.log("raytrace test");
			rtcont++;
		}

		if(depth<=MaxPhotonDepth){
			//newSphere(intersects[0].point);
			if( intersects[0].object.name=="test"){
				//console.log("photTrace test",photMap.nextphoton-1);
				pmcont++;
			}
			if(intersects[0].object.name=="floor"){
				//console.log( intersects[0] );

				floorcont++;
			}
			if(intersects[0].object.name=="ceiling"){
				//console.log("photTrace test");
				ceilcont++;
			}
			if(intersects[0].object.name=="right wall"){
				//console.log("photTrace test");
				rwcont++;
			}
			if(intersects[0].object.name=="left wall"){
				//console.log("photTrace test");
				lwcont++;
			}
			if(intersects[0].object.name=="near wall"){
				//console.log("photTrace test");
				nwcont++;
			}
			if(intersects[0].object.name=="far wall"){
				//console.log("photTrace test");
				fwcont++;
			}
		}
		return intersects;
	}else{

		return null;
	}
}
/*function diffuseReflection(N){
	do{
		var dir = new THREE.Vector3();
		var rand= chance1.random();
		var theta=rand*2.0*Math.PI; //0-2pi
		var v= chance1.random(); //0-1
		var phi=Math.acos( (2.0*v)-1.0 ); //0-pi
		var radius=1.0;

		dir.x=radius*Math.cos(theta)*Math.sin(phi);
		dir.y=radius*Math.sin(theta)*Math.sin(phi);
		dir.z=radius*Math.cos(phi);
		//console.log("angle",((dir.angleTo(N))*180.0/Math.PI));
	}while( ((dir.angleTo(N))*180.0/Math.PI)>45.0);

	//console.log("angle",dir.angleTo(N));
	//console.log("phi",phi,v);
	return dir;
}*/

function specularReflection(N,ray){
	//var dir= 2(N*incoming)N-incoming;

	var dir=new THREE.Vector3(ray.D.x,ray.D.y,ray.D.z);
	dir.reflect(N);
	
	return dir;
}
function photmapStore(power,pos,dir){

	if(photMap.nextphoton>=MaxPhotons){
		return;
	}

	photMap.pm[photMap.nextphoton].power=power;
	photMap.pm[photMap.nextphoton].position=pos;
	photMap.pm[photMap.nextphoton].direction=dir;
	//console.log(power);
	//console.log(photMap.pm[photMap.nextphoton].power);
	minDims.x= pos.x<minDims.x?pos.x:minDims.x;
	minDims.y= pos.y<minDims.y?pos.y:minDims.y;
	minDims.z= pos.z<minDims.z?pos.z:minDims.z;

	maxDims.x= pos.x>maxDims.x?pos.x:maxDims.x;
	maxDims.y= pos.y>maxDims.y?pos.y:maxDims.y;
	maxDims.z= pos.z>maxDims.z?pos.z:maxDims.z;

	var temptheta= Math.floor(Math.acos(dir.z)*(256.0/Math.PI));
	if(temptheta>255){
		photMap.pm[photMap.nextphoton].theta=255;
	}else{
		photMap.pm[photMap.nextphoton].theta=temptheta;
	}

	var tempphi= Math.floor(Math.atan2(dir.y,dir.x)*(256.0/(2.0*Math.PI)));
	if(tempphi>255){
		photMap.pm[photMap.nextphoton].phi=255;
	}else if(tempphi<0){
		photMap.pm[photMap.nextphoton].phi=tempphi+256;
	}else{
		photMap.pm[photMap.nextphoton].phi=tempphi;
	}

	photMap.nextphoton++;
}
function prePoint(ray,intersectP){
	var nOrig=new THREE.Vector3(0.0,0.0,0.0);
	nOrig.x=intersectP.x+0.01*((-1)*ray.D.x);
	nOrig.y=intersectP.y+0.01*((-1)*ray.D.y);
	nOrig.z=intersectP.z+0.01*((-1)*ray.D.z);
	return nOrig;
}
function pospoint(ray,intersectP){
	var nOrig=new THREE.Vector3(0.0,0.0,0.0);
	nOrig.x=intersectP.x+0.01*(ray.D.x);
	nOrig.y=intersectP.y+0.01*(ray.D.y);
	nOrig.z=intersectP.z+0.01*(ray.D.z);
	return nOrig;
}
function tracePhoton(ray,power,depth){
	var reflect_power=0.0;
	var kd=new THREE.Vector3();
	var kd_avg, ks_avg, kd_rand;

	if(depth<MaxPhotonDepth){
		var intersect=RayIntersect(ray,depth);

		if(intersect!=null){
			kd=intersect[0].object.material.color;
			kd_avg=(kd.r+kd.g+kd.b)/3.0;
			ks_avg=(lightCol.x+lightCol.y+lightCol.z)/3.0;
			kd_rand=chance1.random()*(kd_avg+ks_avg);

			if (intersect[0].object.material.opacity<1.0 && (depth+1)<MaxPhotonDepth){ //[0 1)
				photmapStore(power,ray.P,ray.D);
				var normal= intersect[0].face.normal;
				normal.applyQuaternion( intersect[0].object.quaternion);
				var ray2=new Ray;
				ray2=refraction(ray,normal,iniIndex,intersect[0].object.material.refractionRatio,intersect[0].point);
				if(ray2!=null&&(depth+2)<MaxPhotonDepth){
					photmapStore(power,ray2.P,ray2.D);
					var intersect2=RayIntersect(ray2,8000);
					if(intersect2!=null&&(depth+3)<MaxPhotonDepth){
						
						var normal2= intersect2[0].face.normal;
						normal2.applyQuaternion( intersect2[0].object.quaternion);
						var difR=direction(normal2);

						var L2=new Ray;
						L2.P=intersect2[0].point;
						L2.D=difR;
						photmapStore(power,L2.P,L2.D);
						reflect_power=power;
						tracePhoton(ray,reflect_power,depth+3);
						refractCont+=3;
					}else{
						reflect_power=power;
						tracePhoton(ray,reflect_power,depth+2);
						refractCont+=2;
					}
				}else{
					reflect_power=power;
					tracePhoton(ray,reflect_power,depth+1);
					refractCont++;
				}
			}else if(kd_rand>=0&&kd_rand<kd_avg){// [1 kd_avg+opacity) //diffuse ref
				//debugindex++;
				var aux=prePoint(ray,intersect[0].point);
				ray.P=intersect[0].point;
				var normal= intersect[0].face.normal;
				normal.applyQuaternion( intersect[0].object.quaternion);

				
				var difR=direction(normal);
				ray.D=difR;
				photmapStore(power,ray.P,ray.D);
				ray.P=aux;
				reflect_power=power;
				tracePhoton(ray,reflect_power,depth+1);
				difnum++;
			}else if (kd_rand>=kd_avg&&kd_rand<kd_avg+ks_avg){ // [kd_avg+opacity   kd_avg+ks_avg+opacity) //spec ref
				//debugindex++;
				var aux=prePoint(ray,intersect[0].point);
				ray.P=intersect[0].point;
				var normal= intersect[0].face.normal;
				normal.applyQuaternion( intersect[0].object.quaternion);

				var specR=specularReflection(normal,ray);
				ray.D=specR;
				photmapStore(power,ray.P,ray.D);
				ray.P=aux;
				reflect_power=power;
				tracePhoton(ray,reflect_power,depth+1);
				specnum++;
			}else{  //[kd_avg+ks_avg+opacity   .....)
				absnum++;
				//console.log("absorbido por rand");
			}
		}/*else{
			raylines[rlindex]=ray;
			rlindex++;
			absnum++;
		}*/
	}else{
		//rayo es absorbido
		//absnum++;
		return;
	}
}
function scale(tester) {
    $('body').append('<canvas id="Rdisplayer"></canvas>');
	$('body').append('<canvas id="Pdisplayer"></canvas>');
	var ctx = $("#Rdisplayer")[0].getContext("2d");
	var ctx1 =$("#Pdisplayer")[0].getContext("2d");

	var newCanvas = $("#tester")[0].getContext("2d");
	var imageData = newCanvas.getImageData(0, 0, VP_width, VP_height);

	ctx.scale(1.5, 1.5);
	ctx.drawImage(imageData, 0, 0);
}
function rendMaps(){
   // console.log(rtImg);
   	$('body').append('<canvas id="tester"></canvas>');
	$('body').append('<canvas id="tester1"></canvas>');
	var canvas = document.querySelector("#tester");
	var canvas1 = document.querySelector("#tester1");
	var ctx = canvas.getContext("2d");
	var ctx1 = canvas1.getContext("2d");
	var image = new Image;
	var image1 = new Image;

	canvas.width = VP_width;canvas1.width = VP_width;
    canvas.height = VP_height;canvas1.height = VP_height;

    ctx.drawImage(image, 0, 0);
    ctx1.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, VP_width, VP_height);
    var imageData1 = ctx1.getImageData(0, 0, VP_width, VP_height);

    var pixels = imageData.data;
    var pixels1 = imageData1.data;

    var i;
    for (i = 0; i < pixels.length; i++) {
        pixels[i] = rtImg[i];
        pixels1[i] = photImg[i];
    }
    //console.log(rtImg,pixels);
    
    imageData.data=pixels;
    imageData1.data=pixels1;


    ctx.putImageData(imageData,0,0);
    ctx1.putImageData(imageData1,0,0);


    var pixSizeX=(img_width/VP_width);
    var pixSizeY=(img_height/VP_height);
    /*if(pixSizeX<1 || pixSizeY<1){
    	pixSizeX=pixSizeY=;
    }*/	

    	$('body').append('<canvas id="Rdisplayer"></canvas>');
		$('body').append('<canvas id="Pdisplayer"></canvas>');
		$('body').append('<a id="download"></a>');

		var canvas3 = document.querySelector("#Rdisplayer");
		var canvas4 = document.querySelector("#Pdisplayer");
		var ctx3 = $("#Rdisplayer")[0].getContext("2d");
		var ctx4 =$("#Pdisplayer")[0].getContext("2d");
		canvas3.width=canvas4.width=img_width;
		canvas3.height=canvas4.height=img_height;
		//var newCanvas = $("#tester").attr("width", imageData.width).attr("height", imageData.height)[0];
		ctx3.scale(pixSizeX,pixSizeY);
		ctx3.drawImage(canvas,0,0);

		ctx4.scale(pixSizeX,pixSizeY);
		ctx4.drawImage(canvas1,0,0);

    


	//console.log(context);
	$("canvas").hide();
	//$("#tester").show();
	//$("#tester1").show();
	$("#Rdisplayer").show();
	$("#Pdisplayer").show();
}
function drawlines(origin,direction,clasf){
	var destination=new THREE.Vector3()

	var material;
	if(clasf=="p"){
		material = new THREE.LineBasicMaterial({color: 0x0000ff});
		destination.x=origin.x+3.0*direction.x;
		destination.y=origin.y+3.0*direction.y;
		destination.z=origin.z+3.0*direction.z;
	}else if(clasf=="n"){
		destination.x=origin.x+0.7*direction.x;
		destination.y=origin.y+0.7*direction.y;
		destination.z=origin.z+0.7*direction.z;
		material = new THREE.LineBasicMaterial({color: 0x00ff00});
	}else if(clasf=="q"){
		material = new THREE.LineBasicMaterial({color: 0xff0000});
		destination.x=origin.x+3.0*direction.x;
		destination.y=origin.y+3.0*direction.y;
		destination.z=origin.z+3.0*direction.z;
	}else if(clasf=="-q"){
		material = new THREE.LineBasicMaterial({color: 0xffff00});
		destination.x=origin.x+3.0*direction.x;
		destination.y=origin.y+3.0*direction.y;
		destination.z=origin.z+3.0*direction.z;
	}

	var geometry = new THREE.Geometry();
	geometry.vertices.push(origin,destination);

	var line = new THREE.Line( geometry, material );
	line.name="line";
	scene.add( line );
}
function InitPM(){

	tester();/*

	//phase 1
	console.log("Photon Map Building");
	var measureStart = new Date().getTime();
	InitPhotonRays();
	var mins, secs;
	mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
	secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
	console.log('Completed in:', mins,'mins :',secs,'secs');
	//console.log(tempmin);
	//console.log("pm ready");
	newLight(lightPos,lminDims,lmaxDims);
	sceneObj=scene.children.length;


	animate();// call this when goemetry is updated
	//phase 2
	console.log("Ray Tracing Building");
	var measureStart = new Date().getTime();
	InitCamRays(0);
	mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
	secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
	console.log('Completed in:', mins,'mins :',secs,'secs');

	//console.log("camrays ready");
	//console.log(scene);
	//scene.children[8]	
	
	/*for(var i=0;i<rlindex;i++){
		//drawline(raylines[i].P,raylines[i].D);
		drawpath(raylines[i].P,raylines[i].D,5)
		//newSphere(raylines[i].P);
		//newSphere(raylines[i].D);
		//console.log(i);
	}*/

	/*var norm=new THREE.Vector3(0.0,0.0,-1.0);

	var incident=new THREE.Vector3(0.0,0.0,1.0);

	console.log(incident.reflect(norm));*/


	/*for (var i=0;i<bufferIndex;i++){
		//console.log(Math.round((pBuffer[i].angleTo(nBuffer[i])*180.0)/Math.PI),180.0-((pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI) );
		/*if( (pBuffer[i].angleTo(nBuffer[i])*180.0)/Math.PI == 
			Math.round(Math.round((pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI)/2.0 ) 
			){
			//drawlines(pointBuffer[i],pBuffer[i],"p");
			//drawlines(pointBuffer[i],nBuffer[i],"n");
			drawlines(pointBuffer[i],qBuffer[i],"q");
			/*drawlines(pointBuffer[i],mqBuffer[i],"-q");
			console.log("p:",pBuffer[i]);
			console.log("n:",nBuffer[i]);
			console.log("q:",qBuffer[i])
			console.log("ang p-n:",Math.round((pBuffer[i].angleTo (nBuffer[i])*180.0)/Math.PI),"ang q-n:",(qBuffer[i].angleTo (nBuffer[i])*180.0)/Math.PI,"ang p-q:",(pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI);
		}
	}*/

	


	//rendMaps();
}

function InitCamRays(flag){
	imgi=0
	NumRays=VP_height*VP_width;
	rtImg=new Uint8Array( NumRays * 4 );
	photImg=new Uint8Array( NumRays * 4 );
	eyeRays=[];
	var pix_size=[];
	var rtwsize=9.0;
	pix_size[0]=rtwsize/(VP_height-1);
	pix_size[1]=rtwsize/(VP_width-1);
	for(var ii=0;ii< (VP_width*VP_height)*4 ;ii++){
		if((ii+1)%4==0){

			rtImg[ii]= 255;
			photImg[ii]= 255;
		}else{
			rtImg[ii]= 0;
			photImg[ii]= 0;
		}
		
		//console.log(ii);
	}
	//console.log(rtImg);
	/*var minwidth=new THREE.Vector3(camera.getWorldDirection().x,camera.getWorldDirection().y,camera.getWorldDirection().z);
	var maxwidth=new THREE.Vector3(camera.getWorldDirection().x,camera.getWorldDirection().y,camera.getWorldDirection().z);
	var minheight=new THREE.Vector3(camera.getWorldDirection().x,camera.getWorldDirection().y,camera.getWorldDirection().z);
	var maxheight=new THREE.Vector3(camera.getWorldDirection().x,camera.getWorldDirection().y,camera.getWorldDirection().z);
	//*******width limits******
	var axis = new THREE.Vector3( 0, 1, 0 );
	var angle = Math.PI ;

	minwidth.applyAxisAngle( axis, angle/4 );
	maxwidth.applyAxisAngle( axis, -angle/4 );
	//******fwidth limits******

	//*******height limits******
	axis = new THREE.Vector3( 1, 0, 0 );

	minheight.applyAxisAngle( axis, angle/4 );
	maxheight.applyAxisAngle( axis, -angle/4 );
	//******fheight limits******

	/*console.log(minheight);
	console.log(maxheight);
	/*vector.applyAxisAngle( axis, angle );
	console.log(vector);*/
	//var StepSize= new THREE.Vector3( (maxwidth.x- minwidth.x) /VP_width,(maxheight.y- minheight.y)/VP_height,(maxwidth.z - minwidth.z)/VP_width);
	/*console.log("look at:",camera.getWorldDirection());
	console.log("minw:",minwidth);
	console.log("maxw:",maxwidth);
	console.log("minh:",minheight);
	console.log("maxh:",maxheight)
	console.log("stepSize:",StepSize);*/
	//var vAngleSize=(Math.PI/2)/VP_height;
	//var hAngleSize=(Math.PI/2)/VP_width;
	//console.log(pix_size[0],pix_size[1],rtwsize);
	for(var i=0;i<VP_height;i++){
		for(var j=0;j<VP_width;j++){
			//console.log(imgi,i,j)
			//console.log("look at",camera.getWorldDirection());
			eyeRays[i*VP_height+j]= new Ray;
			eyeRays[i*VP_height+j].P= new THREE.Vector3( (j*pix_size[0])-(rtwsize/2.0),
														(rtwsize- (i*pix_size[1])-(rtwsize/2.0)),
														  0.0);

			
			//console.log((j*pix_size[0])-(rtwsize/2.0),(rtwsize- (i*pix_size[1])-(rtwsize/2.0)));


			//eyeRays[i*VP_height+j].P.applyMatrix4(camera.matrixWorld);

			//newSphere(eyeRays[i*VP_height+j].P);


			/*eyeRays[i*VP_height+j].D=new THREE.Vector3(
				minwidth.x+j*StepSize.x,
				minheight.y+i*StepSize.y,
				minwidth.z+j*StepSize.z);*/
			


			//****test close enough
			/*eyeRays[i*VP_height+j].D=new THREE.Vector3(camera.getWorldDirection().x,camera.getWorldDirection().y,camera.getWorldDirection().z);
			var angle=(Math.PI/4) - (hAngleSize*j);
			eyeRays[i*VP_height+j].D.applyAxisAngle( new THREE.Vector3(0,1,0), angle );

			angle=(Math.PI/4) - (vAngleSize*i);
			eyeRays[i*VP_height+j].D.applyAxisAngle( new THREE.Vector3(1,0,0), angle );
			//*****ftest close enough*/
			//console.log("vals",pix_size[0],pix_size[1],rtwsize);

			//console.log(j, (j*pix_size[0]-(rtwsize/2.0))/(rtwsize/2.0),(rtwsize- (i*pix_size[1])-(rtwsize/2.0)) );

			eyeRays[i*VP_height+j].D.x=(j*pix_size[0]-(rtwsize/2.0))/(rtwsize/2.0);
			eyeRays[i*VP_height+j].D.y=(rtwsize- (i*pix_size[1])-(rtwsize/2.0))/(rtwsize/2.0);
			

			//eyeRays[i*VP_height+j].D.z=-1.0+(i*(0.3/(VP_height/2)));

			//	var wtf=-1.0*Math.exp(- ( Math.pow((i*VP_height+j)-(VP_height*VP_width/2),2)/(2*Math.pow((VP_height*VP_width)/2.5,2)) ) );

			var wtf= -1.0*Math.exp( - (Math.pow(i-(VP_width/2),2)/(2*Math.pow(VP_width/2,2)) + Math.pow(j-(VP_height/2),2)/(2*Math.pow(VP_height/2,2)) ) );

			//eyeRays[i*VP_height+j].D.z=-0.9997795243083383;
			eyeRays[i*VP_height+j].D.z=wtf;

			
			//console.log(wtf);	
			//var color=new THREE.Vector3(chance1.random(),chance1.random(),chance1.random());
			//debugSphere(eyeRays[i*VP_height+j].P,color);
			//drawpath(eyeRays[i*VP_height+j].P,eyeRays[i*VP_height+j].D,4.9,color)
			

			
			traceRay(eyeRays[i*VP_height+j],imgi,i,j);
			imgi++;
		}
	}
	//RTworkers(eyeRays);
	//console.log("rayTrace test:",rtcont);
	//console.log("max irradiance:",maxDif);
	var RTmap = new THREE.DataTexture(rtImg, VP_width, VP_height, THREE.RGBFormat );
	RTmap.needsUpdate = true;

	var PTmap = new THREE.DataTexture(photImg, VP_width, VP_height, THREE.RGBFormat );
	PTmap.needsUpdate = true;
	
}
/*function RTworkers(object){
	var w = new Worker("Assets/js/RTworker.js");
	w.postMessage(object);
 	w.onmessage = function(e) {
      console.log(e.data.hola);
    };
    w.onerror = function(e) {
      alert('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
    };
}*/



function calcLightRay(ray,L){
	
	L.P.x= L.P.x + 0.01*((-1)*ray.D.x);
	L.P.y= L.P.y + 0.01*((-1)*ray.D.y);
	L.P.z= L.P.z + 0.01*((-1)*ray.D.z);
	//newSphere(L.P);
	var t=Math.sqrt( Math.pow((L.P.x - lightPos.x),2) + Math.pow((L.P.y - lightPos.y),2) + Math.pow((L.P.z - lightPos.z),2) );
	//console.log();

	L.D.x= (lightPos.x-L.P.x)/t;
	L.D.y= (lightPos.y-L.P.y)/t;
	L.D.z= (lightPos.z-L.P.z)/t;

	//console.log(L.D);
	return L;
}
function calcDiffuseDirect(objdiff,L,direction){
	var color=new THREE.Vector3();
	if(objdiff.x==null){
		color.x=objdiff.r;
		color.y=objdiff.g;
		color.z=objdiff.b;
	}else{
		color.x=objdiff.x;
		color.y=objdiff.y;
		color.z=objdiff.z;
	}
	//console.log(color);
	var dir=new THREE.Vector3();
	dir.copy(direction);
	color.multiplyScalar( 0.2*dir.dot(L.D));
	color.x=Math.abs(color.x);
	color.y=Math.abs(color.y);
	color.z=Math.abs(color.z);
	//console.log(color);
	//console.log(color);
	return color;
}
function calcDiffuseIndirect(intersectP,direction,nPhotons,maxDist){
	//intersect[0].point,intersect[0].face.normal,0.5,20
	var irrad=new THREE.Vector3(0.0,0.0,0.0);

	var neighbors=kdtree.nearest([intersectP.x, intersectP.y, intersectP.z], nPhotons, maxDist);
	var dist=0;
	var ndist=0;
	//irrad=new THREE.Vector3(0.0,1.0,1.0);
	
	//console.log(neighbors);
	if(neighbors.length>0 ){
		//console.log(neighbors);
		//irrad=new THREE.Vector3(.0,0.0,0.0);
		for (var i=0;i<neighbors.length;i++){
			
			//if( ( (neighbors[i][0].direction.x*direction.x) + (neighbors[i][0].direction.y*direction.y) + (neighbors[i][0].direction.z*direction.z)) < 0.0){
					//console.log(neighbors[i][0].power);
					irrad.x+=neighbors[i][0].power;
					irrad.y+=neighbors[i][0].power;
					irrad.z+=neighbors[i][0].power;
				
			//}
		}
		//console.log(irrad);
		//var avgDist=dist/ndist;

		var density= 1.0/(Math.PI*maxDist*maxDist);///maxDist;///(maxDist);//(1.0/Math.PI)/(avgDist*avgDist);
		//console.log(density,irrad);
		irrad.x=(irrad.x*density);
		irrad.y=(irrad.y*density);
		irrad.z=(irrad.z*density);

		/*var maximum=Math.max(Math.max(irrad.x,irrad.y),irrad.z);
		irrad.addScalar(-maximum);*/
		//console.log(density,irrad);
		//		console.log(lightCol);
	}
	return irrad;
}
function calcSpecular(ray,L,normal){
	var tempRay=new Ray();
	tempRay.P=ray.P;
	tempRay.D=new THREE.Vector3();
	tempRay.D.copy(ray.D);
	tempRay.D.negate();

	var norm= new THREE.Vector3();
	norm.copy(normal);
	var res= new THREE.Vector3();
	res.copy(normal);
	res.multiplyVectors(res,tempRay.D);
	norm.multiplyScalar(2);
	res.multiplyVectors(res,norm);

	tempRay.D.sub(res);
	tempRay.D.multiplyVectors(tempRay.D,L.D);
	var result= Math.pow(tempRay.D.x+tempRay.D.y+tempRay.D.z,5.0);

	return Math.abs(result);

	/*pointBuffer[bufferIndex]=L.P;
	pBuffer[bufferIndex]=new THREE.Vector3((-1)*ray.D.x,(-1)*ray.D.y,(-1)*ray.D.z);
	nBuffer[bufferIndex]=norm;
	qBuffer[bufferIndex]=reflection;
	//mqBuffer[bufferIndex]=outgoing;

	bufferIndex++;*/
}
function calcRefractRayDir(ray,N,baseRefIndex,newRefIndex,intersectP){
	//console.log()
	var normal = new THREE.Vector3();
	normal.copy(N);
	var c1=normal.dot(ray.D);
	/*var V=new THREE.Vector3();
	V.copy(ray.D);
	V.sub(c1.multiplyScalar(2*vdotn)); //Rl*/
	var n=baseRefIndex/newRefIndex;
	var c2=Math.sqrt( 1.0- (Math.pow(n,2.0)* (1.0-Math.pow(c1,2.0))) );
	var scalar1=n*c1-c2;//Math.max(Math.min(n*vdotn-c2,1.0),-1.0);
	var copiaN= new THREE.Vector3();
	copiaN.copy(N);
	copiaN.multiplyScalar(scalar1); //scalar1 * N
	copiaN.negate();
	var copiarayD= new THREE.Vector3();
	copiarayD.copy(ray.D);
	copiarayD.sub(copiaN);
	copiarayD.normalize();
	
	
	
	return copiarayD;
}
function refraction(ray,N,baseRefIndex,newRefIndex,intersectP){
	//var N=new THREE.Vector3(0.0,1.0,0.0);
	var dir= new THREE.Vector3();
	dir=calcRefractRayDir(ray,N,baseRefIndex,newRefIndex,intersectP);
	//console.log(copiarayD);
	var ray2=new Ray;
	ray2.P=pospoint(ray,intersectP);
	ray2.D=dir;
	//newSphere(intersectP);

	var auxray=new Ray;
	var radius=2.01;
	
	auxray.P.x=ray2.P.x+radius*dir.x;
	auxray.P.y=ray2.P.y+radius*dir.y;
	auxray.P.z=ray2.P.z+radius*dir.z;

	//newSphere(auxray.P);
	auxray.D.copy(dir);
	auxray.D.negate();
	//console.log(auxray.D);

	var intersect=RayIntersect(auxray,6000);

	if(intersect!=null){
		//ray2.P=intersect[0].point;
		var normal= intersect[0].face.normal;
		normal.applyQuaternion( intersect[0].object.quaternion);
		normal.negate();

		ray2.D=dir;
		var dir2= new THREE.Vector3();
		dir2=calcRefractRayDir(ray2,normal,baseRefIndex,newRefIndex,intersect[0].point);

		ray2.P=intersect[0].point;
		ray2.D=dir2;
		
		return ray2;
	}	

	return null;
}
function calcReflection(intersect,dir,N,reflectPerc,L){
	var ray=new Ray;
	ray.P=intersect.point;
	ray.D=new THREE.Vector3();
	ray.D.copy(dir);
	ray.D.reflect(N);

	var perc1=1.0-reflectPerc;
	var color=new THREE.Vector3(0.0,0.0,0.0);

	color.x=intersect.object.material.color.r*perc1;
	color.y=intersect.object.material.color.g*perc1;
	color.z=intersect.object.material.color.b*perc1;
	//console.log(color,L,normal);
	//color=calcDiffuseDirect(color,L,N)

	var intersect2=RayIntersect(ray,1000);
	if(intersect2!=null){

		color.x=intersect2[0].object.material.color.r*reflectPerc;
		color.y=intersect2[0].object.material.color.g*reflectPerc;
		color.z=intersect2[0].object.material.color.b*reflectPerc;

		var L2=new Ray;
		L2.P=intersect2[0].point;
		L2=calcLightRay(ray,L2);
		//console.log(L2.P,L2.D);
		
		var normal= intersect2[0].face.normal;
		normal.applyQuaternion( intersect2[0].object.quaternion);
		//console.log(normal);
		color=calcDiffuseDirect(color,L2,normal);
		//reflecCdi=calcDiffuseIndirect(intersect2[0].point,intersect2[0].face.normal,maxPhots,maxDistance);

	}
	return color;
}
/*function interpolation(colorA,colorB,interpValue){
	var result=new THREE.Vector3();
	result.x=colorA.x*(1.0-interpValue)+colorB.x*interpValue;
	result.y=colorA.y*(1.0-interpValue)+colorB.y*interpValue;
	result.z=colorA.z*(1.0-interpValue)+colorB.z*interpValue;
	return result;
}
function mixColor(diffuse,reflect,refract,opac,reflec){
	var max=0.0;
	var result;
	if(opac<1.0){

		max=Math.max(diffuse.x,max);max=Math.max(diffuse.y,max);max=Math.max(diffuse.z,max);
		max=Math.max(reflect.x,max);max=Math.max(reflect.y,max);max=Math.max(reflect.z,max);
		max=Math.max(refract.x,max);max=Math.max(refract.y,max);max=Math.max(refract.z,max);
		
		//result=diffuse;
		result=interpolation(diffuse,refract,max);
		max/=2;
		//result=interpolation(result,refract,max);

		//result=refract;
	}else{

		max=Math.max(diffuse.x,max);max=Math.max(diffuse.y,max);max=Math.max(diffuse.z,max);
		max=Math.max(reflect.x,max);max=Math.max(reflect.y,max);max=Math.max(reflect.z,max);
		max/=2;
		result=interpolation(diffuse,reflect,max);
		//result=diffuse;
	}
	//result=diffuse;

	return result.multiplyScalar(255);
}*/
function traceRay(ray,indi,i,j){
	
	var intersect=RayIntersect(ray,1000);
	
	var refractionColor=reflectionColor=diffColor=specColor=fresnelColor=new THREE.Vector3(0.0,0.0,0.0);


	if(intersect!=null){
		//console.log(intersect)
		//var color=new THREE.Vector3(1.0,0.0,0.0);
		//debugSphere(intersect[0].point,color);
		var normal= intersect[0].face.normal;
		normal.applyQuaternion( intersect[0].object.quaternion);
		var L=new Ray;
		L.P=intersect[0].point;
		L=calcLightRay(ray,L);

		//*****diff calc***********//
		diffColor=calcDiffuseDirect(intersect[0].object.material.color,L,normal);


		//*****Cdi*********//
		var Cdi=calcDiffuseIndirect(intersect[0].point,normal,maxPhots,maxDistance);
		//console.log(diffColor,intersect[0].object.material.opacity);
		//*****refraction calc****//
			if (intersect[0].object.material.opacity<1.0){
				var ray2=new Ray;
				ray2=refraction(ray,normal,iniIndex,intersect[0].object.material.refractionRatio,intersect[0].point);
				if(ray2!=null){
					var intersect2=RayIntersect(ray2,5700);
					if(intersect2!=null){
						var L2=new Ray;
						L2.P=intersect2[0].point;
						L2=calcLightRay(ray2,L2);
						var normal2=new THREE.Vector3()
						normal2.copy(intersect2[0].face.normal);
						normal2.applyQuaternion( intersect2[0].object.quaternion);
						refractionColor=calcDiffuseDirect(intersect2[0].object.material.color,L2,normal2);
						//Cdi=calcDiffuseIndirect(intersect2[0].point,normal2,maxPhots,maxDistance);
						//console.log(refractionColor);
						//amb=new THREE.Vector3(refractionColor.x*128.0,refractionColor.y*128.0,refractionColor.z*128.0);
					}
				}
			}

		//*****specular***********//
			specSpot=calcSpecular(ray,L,normal);

		//*****relection calc****//
			if(intersect[0].object.material.reflectivity>0){
				reflectionColor=calcReflection(intersect[0],ray.D,normal,intersect[0].object.material.reflectivity,L);
			}

		if(intersect[0].object.material.opacity<1.0&&intersect[0].object.material.opacity>0.0){
			diffColor.multiplyScalar(intersect[0].object.material.opacity)	
		}else if(intersect[0].object.material.opacity==1.0){
			diffColor.multiplyScalar(1.0);
		}else if(intersect[0].object.material.opacity==0.0){
			diffColor.multiplyScalar(0.0);
		}
		var diffColor2=new THREE.Vector3();
		diffColor2.copy(diffColor);
		diffColor2.multiplyScalar(specSpot);
		/*if(diffColor2.x>1.0||diffColor2.y>1.0||diffColor2.z>1.0){
			var maximum=Math.max(Math.max(diffColor2.x,diffColor2.y),diffColor2.z);
			diffColor2.addScalar(-maximum);
		}*/
		if(diffColor2.x>1.0||diffColor2.y>1.0||diffColor2.z>1.0){
			diffColor2.normalize();
		}
		if(intersect[0].object.material.reflectivity<1.0){
			reflectionColor.multiplyScalar(intersect[0].object.material.reflectivity);
		}
		if(reflectionColor.x>1.0||reflectionColor.y>1.0||reflectionColor.z>1.0){
			reflectionColor.normalize();
		}
		

		var result = new THREE.Vector3(0.0,0.0,0.0);

		
		//**********************testing area*********************//
			/*
			var result=new THREE.Vector3();
			amb=ia.multiplyScalar(ka);
			diff=id.multiplyScalar(L.dot(N)*kd);
			spec=is.multiplyScalar(Math.pow(R.dot(V),shininess)*ks);
			*/

			var amb=new THREE.Vector3(0.1,0.1,0.1);
			result.add(amb.multiplyScalar(L.D.dot(normal)*0.1)); //amb
				
				//console.log("amb",result);
			//var diff=new THREE.Vector3(intersect[0].object.material.color.r,intersect[0].object.material.color.g,intersect[0].object.material.color.b);
			//result.add(diff.multiplyScalar(L.D.dot(normal)*0.6)); //diff
			result.add(diffColor);
			result.add(diffColor2); //diff
			result.add(refractionColor);
			result.add(reflectionColor);
			//console.log("dif",result);

			var R=new THREE.Vector3();
			R.copy(L.D);
			R.reflect(normal);
			var V= new THREE.Vector3();
			V.copy(ray.D);
			V.negate();
			
			result.add(lightCol.multiplyScalar(Math.pow(R.dot(V),120.0)*100000)); //spec
			//console.log("spec",result);
			result.x=Math.abs(result.x);
			result.y=Math.abs(result.y);
			result.z=Math.abs(result.z);

			//console.log(result);

			result.multiplyScalar(255);
		//********************************************************//
		rtImg[indi*4]+=Math.floor(result.x);//R;
		rtImg[indi*4+1]+=Math.floor(result.y);//G;
		rtImg[indi*4+2]+=Math.floor(result.z);//B;
		rtImg[indi*4+3]=Math.floor(255.0);//A;
	
		


		rtImg[indi*4]=Math.min(rtImg[indi*4]+Cdi.x,255.0);//R;
		rtImg[indi*4+1]=Math.min(rtImg[indi*4+1]+Cdi.y,255.0);//G;
		rtImg[indi*4+2]=Math.min(rtImg[indi*4+2]+Cdi.z,255.0);//B;
		rtImg[indi*4+3]=Math.floor(255.0);//A;


		photImg[indi*4]+=Math.floor(Cdi.x*255.0);//R;
		photImg[indi*4+1]+=Math.floor(Cdi.y*255.0);//G;
		photImg[indi*4+2]+=Math.floor(Cdi.z*255.0);;//B;
		photImg[indi*4+3]=Math.floor(255.0);//A;*/
		
	}else{
		
		//rayo es absorbido
		return;
	}
}
