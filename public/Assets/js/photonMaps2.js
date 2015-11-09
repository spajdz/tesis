//chance.js revisar para los random
//http://www.3dkingdoms.com/weekly/weekly.php?a=2

var NumPhotons=100;
var MaxPhotonDepth=10;
var MaxPhotons=NumPhotons*(MaxPhotonDepth+1);
var stored_phots=0;

var photRay=[];
var photMap= new photonMap();
var photonPower=new THREE.Vector3(1.0,1.0,1.0);



var VP_width=64;//90
var VP_height=64;//90
var NumRays=VP_height*VP_width;

var maxDistance=0.05;	//search
var maxPhots=Math.min(MaxPhotons*0.01,100); 		//search

var img_width=512;
var img_height=512;



var eyeRays;

var nearPhots;



//************variables experimentales*******************//

var lightPos=new THREE.Vector3(0.0,2.49,-2.5);
var lightCol=new THREE.Vector3(0.8,0.8,0.8);
var lminDims = new THREE.Vector3(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);
var lmaxDims = new THREE.Vector3(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);

var lpower= new THREE.Vector3(1.0,1.0,1.0);

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


var chance1 = new Chance(10000007);
//for(var i=0;i<100;i++)
//console.log(chance1.random());


var permlines=16;

var bufferIndex=0;
var pointBuffer=[];
var pBuffer=[];
var nBuffer=[];
var qBuffer=[];
var mqBuffer=[];

//*************fvariables experimentales*****************//

function photon(){
	this.position=new THREE.Vector3();
	this.direction=new THREE.Vector3();
	this.power=new THREE.Vector3();
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
function InitPhotonRays(){
	//photMap=null;
	MaxPhotons=NumPhotons*(MaxPhotonDepth+1);
 	photMap= new photonMap();

	var x,y,z;
	var offset=new THREE.Vector3();
	for(var j=0; j<MaxPhotons; j++) {
		photRay[j] = new Ray;  
	}
	for (var i=0;i<NumPhotons;i++){
		offset.x=2.0*chance1.random()-1.0;
		offset.z=2.0*chance1.random()-1.0;
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

		do{
			x=(chance1.random()*2)-1.0;
			y=-1.0*chance1.random();
			z=(chance1.random()*2)-1.0;
		}while(x*x+y*y+z*z>1 || y==0);
		//if( z>1)
		//console.log("direccion del rayo",x,y,z);
		photRay[i].D.x=x;
		photRay[i].D.y=y;
		photRay[i].D.z=z;

		//****store photon****
		photmapStore(lpower,photRay[i].P,photRay[i].D);
		//******fstore photon*****

		//console.log("antes",photMap.pm[photMap.nextphoton-1].position);
		
		//******trace photon*****
		tracePhoton(photRay[i],photonPower,0);
		//******ftrace photon****
	}
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
		var measureStart = new Date().getTime();
		kdtree = new THREE.TypedArrayUtils.Kdtree( ExperPos, distanceFunction, 3, photMap.pm );
		console.log("Completed Kd-Tree", (new Date().getTime() - measureStart)*0.001,"seconds");
	//****fkdtree*********//
}

function drawpath(origin,direction,t){
	for (var i=0;i<t;i++){
		var punto= new THREE.Vector3(0.0,0.0,0.0);
		punto.x=origin.x+i*direction.x;
		punto.y=origin.y+i*direction.y;
		punto.z=origin.z+i*direction.z;
		//drawline(origin,punto);
		//console.log(punto);
		newSphere(punto);
	}
}
function RayIntersect(ray,depth){
	
	var RCaster = new THREE.Raycaster(ray.P,ray.D);

	var intersects = RCaster.intersectObjects( scene.children );
	

	if ( intersects.length > 0 ) {
		//console.log(intersects[0].object.name)
		/*for(var i=0;i<intersects.length;i++){*/

		/*if(depth==10 && intersects[0].object.name=="lSource"){
			//drawline(ray.P,intersects[0].point);

		}
		/*}
		if(depth==9 && intersects[0].object.name=="test"){
			//newSphere(intersects[0].point);
			//console.log(intersects[0]);
		}else{*/
		/*if(depth==90 && intersects[0].object.name=="lSource"){
			//console.log(intersects[0].object.name)
			var temp=new Ray();
			temp.P=ray.P;
			temp.D=ray.D;
			//temp.D=intersects[0].point;
			raylines[rlindex]=temp;
			rlindex++;
		}*/
		//}
		return intersects;
	}else{
		/*if(depth==9)
			console.log("failed");*/

		return null;
	}
}
function diffuseReflection(N){
	var x,y,z;
	var dir;
	do{
		do{
			x=chance1.random();
			y=chance1.random();
			z=chance1.random();
		}while(x*x+y*y+z*z>1);
		x=2*(x-0.5);
	    y=2*(y-0.5);
   		z=2*(z-0.5);
   		dir=new THREE.Vector3(x,y,z);
	}while( ((dir.x*N.x) + (dir.y*N.y) + (dir.z*N.z)) >=0);
	//console.log(dir,N);
	//console.log(((dir.x*N.x) + (dir.y*N.y) + (dir.z*N.z)));
	return dir;
}
function photmapStore(power,pos,dir){
	if(photMap.nextphoton>MaxPhotons){
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
	//console.log(photMap.nextphoton);
	//newSphere(photMap.pm[photMap.nextphoton].position);
	photMap.nextphoton++;
}
function prePoint(ray,intersectP){
	var nOrig=new THREE.Vector3(0.0,0.0,0.0);
	nOrig.x=intersectP.x+0.01*((-1)*ray.D.x);
	nOrig.y=intersectP.y+0.01*((-1)*ray.D.y);
	nOrig.z=intersectP.z+0.01*((-1)*ray.D.z);
	return nOrig;
}
function tracePhoton(ray,power,depth){
	var reflect_power=new THREE.Vector3(), kd=new THREE.Vector3();
	var kd_avg, kd_rand;

	if(depth<MaxPhotonDepth){
		//console.log(ray);
		var intersect=RayIntersect(ray,depth);

		if(intersect!=null){
			//console.log(intersect[0]);

			//console.log(intersect[0]);

			kd=intersect[0].object.material.color;
			kd_avg=(kd.r+kd.g+kd.b)/3.0;
			kd_rand=chance1.random();
			//console.log("kd_rand<kd_avg",kd_rand,kd_avg);

			if(1){//kd_rand<kd_avg){

				//debugindex++;

				var aux=prePoint(ray,intersect[0].point);
				
				ray.P=intersect[0].point;
				ray.D=diffuseReflection(intersect[0].face.normal);
				//console.log(power);
				photmapStore(power,ray.P,ray.D);
				//console.log("despues",photMap.pm);
				ray.P=aux;
				//var temp=kd.r*(1.0/kd_avg);
				//console.log("power",power,"kd",kd,kd_avg);
				reflect_power=new THREE.Vector3(power.x,power.y,power.z);
				//console.log("Rpower",reflect_power);
				tracePhoton(ray,reflect_power,depth+1);
			}else{
				//console.log("absorbido por rand");
			}
			
		}
	}else{
		//rayo es absorbido
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
	//phase 1
	console.log("Photon Map Building");
	var measureStart = new Date().getTime();
	InitPhotonRays();
	console.log('Completed in:', (new Date().getTime() - measureStart)*0.001,"seconds");
	//console.log(tempmin);
	//console.log("pm ready");
	newLight(lightPos,lminDims,lmaxDims);
	sceneObj=scene.children.length;


	animate();// call this when goemetry is updated
	//phase 2
	console.log("Ray Tracing Building");
	var measureStart = new Date().getTime();
	InitCamRays();
	console.log('Completed in:', (new Date().getTime() - measureStart)*0.001,"seconds");
	//console.log("camrays ready");
	//console.log(scene);
	//scene.children[8]	
	
	/*for(var i=0;i<rlindex;i++){
		//drawline(raylines[i].P,raylines[i].D);
		drawpath(raylines[i].P,raylines[i].D,10)
		//newSphere(raylines[i].P);
		//newSphere(raylines[i].D);
		//console.log(i);
	}*/

	/*var norm=new THREE.Vector3(0.0,0.0,-1.0);

	var incident=new THREE.Vector3(0.0,0.0,1.0);

	console.log(incident.reflect(norm));*/


	for (var i=0;i<bufferIndex;i++){
		//console.log(Math.round((pBuffer[i].angleTo(nBuffer[i])*180.0)/Math.PI),180.0-((pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI) );
		/*if( (pBuffer[i].angleTo(nBuffer[i])*180.0)/Math.PI == 
			Math.round(Math.round((pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI)/2.0 ) 
			){*/
			//drawlines(pointBuffer[i],pBuffer[i],"p");
			//drawlines(pointBuffer[i],nBuffer[i],"n");
			drawlines(pointBuffer[i],qBuffer[i],"q");
			/*drawlines(pointBuffer[i],mqBuffer[i],"-q");
			console.log("p:",pBuffer[i]);
			console.log("n:",nBuffer[i]);
			console.log("q:",qBuffer[i])
			console.log("ang p-n:",Math.round((pBuffer[i].angleTo (nBuffer[i])*180.0)/Math.PI),"ang q-n:",(qBuffer[i].angleTo (nBuffer[i])*180.0)/Math.PI,"ang p-q:",(pBuffer[i].angleTo (qBuffer[i])*180.0)/Math.PI);
		}*/
	}


	//rendMaps();
}

function InitCamRays(){
	imgi=0
	NumRays=VP_height*VP_width;
	rtImg=new Uint8Array( NumRays * 4 );
	photImg=new Uint8Array( NumRays * 4 );
	eyeRays=[];
	var pix_size=[];
	pix_size[0]=2.0/(VP_height-1);
	pix_size[1]=2.0/(VP_width-1);
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
	for(var i=0;i<VP_height;i++){
		for(var j=0;j<VP_width;j++){
			//console.log(imgi,i,j)

			eyeRays[i*VP_height+j]= new Ray;
			eyeRays[i*VP_height+j].P= new THREE.Vector3( (j*pix_size[0])-1.0,
														2.0- (i*pix_size[1])-1.0,
														  0.0);
			//eyeRays[i*VP_height+j].P= new THREE.Vector3(0.0,0.0,6.0);
			//if(i==0 || i==VP_width-1)
			
				//newSphere(eyeRays[i*VP_height+j].P);
			
			//eyeRays[i*VP_height+j].D= new THREE.Vector3(0.0,0.0,-1.0);
			
			eyeRays[i*VP_height+j].D.x=-1.0*(1.0-(j*pix_size[0]));//pix_size[0]*(i-VP_height/2)*2.0;
			eyeRays[i*VP_height+j].D.y=1.0-(i*pix_size[1]);//(pix_size[1]*(j-VP_width/2)*2.0) * -1.0;
			eyeRays[i*VP_height+j].D.z=(-1.0);			//if(i==0  ){
			//if(i==0||i==VP_height-1||j==0||j==VP_width-1)
				//drawpath(eyeRays[i*VP_height+j].P,eyeRays[i*VP_height+j].D,15);
				//console.log(i , j , eyeRays[i*VP_height+j].D);
		
			
			traceRay(eyeRays[i*VP_height+j],imgi);
			imgi++;
		}
	}
	var RTmap = new THREE.DataTexture(rtImg, VP_width, VP_height, THREE.RGBFormat );
	RTmap.needsUpdate = true;

	var PTmap = new THREE.DataTexture(photImg, VP_width, VP_height, THREE.RGBFormat );
	PTmap.needsUpdate = true;
}




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
	return L;
}

function calcDiffuseDirect(objdiff,L,direction){
	var color=new THREE.Vector3(0.0,0.0,0.0);
	color.x=objdiff.r;//Math.abs(objdiff.r*(lightCol.x*direction.x));
	color.y=objdiff.g;//Math.abs(objdiff.g*(lightCol.y*direction.y));
	color.z=objdiff.b;//Math.abs(objdiff.b*(lightCol.z*direction.z));
	//console.log(color);
	return color;
}


function calcDiffuseIndirect(intersectP,direction,nPhotons,maxDist){
	//intersect[0].point,intersect[0].face.normal,0.5,20
	var irrad=new THREE.Vector3(0.0,0.0,0.0);

	var neighbors=kdtree.nearest([intersectP.x, intersectP.y, intersectP.z], nPhotons, maxDist);
	var dist=0;
	var ndist=0;
	irrad=new THREE.Vector3(1.0,1.0,1.0);
	
	//console.log(neighbors);
	if(neighbors.length>0){
		//console.log(neighbors);
		//irrad=new THREE.Vector3(.0,0.0,0.0);
		for (var i=0;i<neighbors.length;i++){
			
			if( ( (neighbors[i][0].direction.x*direction.x) + (neighbors[i][0].direction.y*direction.y) + (neighbors[i][0].direction.z*direction.z)) < 0.0){
				if(neighbors[i][1]<=maxDist){
					irrad.x+=neighbors[i][0].power.x;
					irrad.y+=neighbors[i][0].power.y;
					irrad.z+=neighbors[i][0].power.z;
				}
			}
		}
		//console.log(irrad);
		//var avgDist=dist/ndist;
		var density= 1.0;//(1.0/Math.PI)/maxDist;///maxDist;///(maxDist);//(1.0/Math.PI)/(avgDist*avgDist);
		irrad.x=Math.max(irrad.x*density,1.0);
		irrad.y=Math.max(irrad.y*density,1.0);;
		irrad.z=Math.max(irrad.z*density,1.0);;	
		//console.log(density,irrad);
	}
	return irrad;
}


function calcSpecular(ray,L,normal){
	var tempRay=new Ray();
	tempRay.P=ray.P;
	tempRay.D=new THREE.Vector3((-1)*ray.D.x,(-1)*ray.D.y,(-1)*ray.D.z);

	//var reflection= new THREE.Vector3(ray.D.x,ray.D.y,ray.D.z) ;
	//console.log(ray.D);
	var norm= new THREE.Vector3(normal.x,normal.y,(-1)*normal.z);
	
	//tempRay.D=new THREE.Vector3(0.86,0.5,0);
	//L.D=new THREE.Vector3(-0.6,0.8,0);
	//reflection.reflect(norm);
	//console.log(ray.D.z);
	//console.log("inor",ray.D,norm,outgoing,reflection);
	//tempRay.D=reflection;
	/*var intersect=RayIntersect(tempRay,150);
	if(intersect!=null){
		//console.log(intersect[0].object.name);
		newSphere(intersect[0].point);
		if(intersect[0].object.name=="lSource"){
			console.log("osome");
		}
	}*/
	var res1= new THREE.Vector3(norm.x*tempRay.D.x,norm.y*tempRay.D.y,norm.z*tempRay.D.z);
	var norm2= new THREE.Vector3(norm.x*2,norm.y*2,norm.z*2);
	var res2= new THREE.Vector3(norm2.x*res1.x,norm2.y*res1.y,norm2.z*res1.z);

	var res3= new THREE.Vector3(tempRay.D.x-res2.x,tempRay.D.y-res2.y,tempRay.D.z-res2.z);
	var res4= new THREE.Vector3(L.D.x*res3.x,L.D.y*res3.y,L.D.z*res3.z)

	var res5= Math.pow(res4.x+res4.y+res4.z,3.0);

	return Math.abs(res5);
	
	/*console.log("E",tempRay.D);
	console.log("L",L.D);
	console.log("N",norm);
	console.log("res1",res1);
	console.log("norm2",norm2);
	console.log("res2",res2);
	console.log("res3",res3);
	console.log("res4",res4);
	console.log(res5);*/

	//res1.copy(tempRay.D);
	//console.log(res1,tempRay.D,norm);
	//res1.dot(norm);
	//console.log(res1,tempRay.D);
	
	//var spec= Math.pow( L.D * ( tempRay.D-2*(norm)*(norm*tempRay.D) ) , 3 );



	/*pointBuffer[bufferIndex]=L.P;
	pBuffer[bufferIndex]=new THREE.Vector3((-1)*ray.D.x,(-1)*ray.D.y,(-1)*ray.D.z);
	nBuffer[bufferIndex]=norm;
	qBuffer[bufferIndex]=reflection;
	//mqBuffer[bufferIndex]=outgoing;

	bufferIndex++;*/
}
function traceRay(ray,indi){
	var i=0;
	var L=new Ray;
	var C,Cdd,Cdi;
	C=Cdd=Cdi=new THREE.Vector3(0.0,0.0,0.0);

	var intersect=RayIntersect(ray,9);

	if(intersect!=null){

		
		//newSphere(intersect[0].point);
		//drawline(ray.P,intersect[0].point)
		//newSphere(intersect[0].point);
		//console.log(intersect[0].point)
		if(  intersect[0].object.name!="lSource"){
			
			//console.log("rayos iniciales contra escena");
			//var aux=prePoint(ray,intersect[0].point);

			L.P=intersect[0].point;

			L=calcLightRay(ray,L);
			//drawline(ray.P,L.P);

			var intersect2=RayIntersect(L,90);

			Cdd=calcDiffuseDirect(intersect[0].object.material.color,L,intersect[0].face.normal);
			
			

			//console.log(rtImg);
			//console.log(indi,rtImg[indi*4],rtImg[indi*4+1],rtImg[indi*4+2]);
			if(intersect2!=null){
							
				if(intersect2[0].object.name=="lSource"){
					//console.log("rayos contra la luz");
					//console.log("luz");
					//console.log(intersect2[0]);
					var amb=new THREE.Vector3(Cdd.x,Cdd.y,Cdd.z);
					


					Cdi=calcDiffuseIndirect(intersect[0].point,intersect[0].face.normal,maxPhots,maxDistance);
					
					var dif=new THREE.Vector3(Cdi.x,Cdi.y,Cdi.z);

					//console.log(ray.D);
					//console.log(intersect[0])
					if(intersect[0].object.name=="test"){
					}

					

					photImg[indi*4]+=Math.floor(Cdi.x*255.0);//R;
					photImg[indi*4+1]+=Math.floor(Cdi.y*255.0);//G;
					photImg[indi*4+2]+=Math.floor(Cdi.z*255.0);//B;
					photImg[indi*4+3]=Math.floor(255.0);//A;
					


					var spec=calcSpecular(ray,L,intersect[0].face.normal);

					var fcolor= new THREE.Vector3()
					var col= new THREE.Vector3(amb.x+dif.x,amb.y+dif.y,amb.z+dif.z);
					console.log(col);
					var minsub=0;
					/*if((col.x>1.0) && (1.0-col.x>minsub)){
						minsub=Math.max(1.0-col.x,0.0);
					}
					if((col.y>1.0) && (1.0-col.y>minsub)){
						minsub=Math.max(1.0-col.y,0.0);
					}
					if((col.z>1.0) && (1.0-col.z>minsub)){
						minsub=Math.max(1.0-col.z,0.0);
					}

					col.x=col.x-minsub;
					col.y=col.y-minsub;
					col.z=col.z-minsub;

					rtImg[indi*4]=(col.x)*255.0;//R;
					rtImg[indi*4+1]=(col.y)*255.0;//G;
					rtImg[indi*4+2]=(col.z)*255.0;//B;
					rtImg[indi*4+3]=Math.floor(255.0);//A;
					/*rtImg[indi*4]= Math.min(Math.floor(Cdi.x*255.0),255.0);//R;
					rtImg[indi*4+1]= Math.min(Math.floor(Cdi.y*255.0),255.0);//G;
					rtImg[indi*4+2]= Math.min(Math.floor(Cdi.z*255.0),255.0);//B;
					rtImg[indi*4+3]=Math.floor(255.0);//A;*/

					
				}else{}//no le llega a la fuente de luz
			}
		}

		
		
	}else{
		
		//rayo es absorbido
		return;
	}

}

