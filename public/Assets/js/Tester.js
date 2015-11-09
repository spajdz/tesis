// //*************cuantitativas**********//
// var photNumRange=[5000,10000];
// var bounceRange=[9,15];
// var lightPowerRange=[30000,50000];

// var rtResRange=[512,1024];
// var neighborRange=[60,100];
// var distanceRange=[0.6,1.0];//*/


// //************cualitativas***********//
// /*var photNumRange=[8000,9000,10000];
// var bounceRange=[9,12,15];
// var lightPowerRange=[30000];

// var rtResRange=[5121024];
// var neighborRange=[100];
// var distanceRange=[0.2];//*/



// function downloadCanvas(canvasId, filename) {
// 	var link=document.getElementById('download');
//     link.href = document.getElementById(canvasId).toDataURL();
//     link.download = filename;
//     link.click();
//     //console.log(link);
// }

// function generatePM(photNumIndex,bounceIndex,lightPowerIndex){
// 	NumPhotons=photNumRange[photNumIndex];
// 	MaxPhotonDepth=bounceRange[bounceIndex];
// 	lpower=lightPowerRange[lightPowerIndex];
// 	console.log("Photon Map Building");
// 	string+="\nPhoton Map Building";
// 	var measureStart = new Date().getTime();
// 	console.log("total phots:",NumPhotons,"Bounce:",MaxPhotonDepth,"lPower:",lpower);
// 	string+="\ntotal phots:"+NumPhotons+" Bounce:"+MaxPhotonDepth+" lPower:"+lpower;
// 	InitPhotonRays();
// 	var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 	var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 	console.log('Completed in:', mins,'mins :',secs,'secs');
// 	string+="\nCompleted in: "+ mins+'mins:'+secs+'secs';
// }

// function generateRT(rtResIndex,neighborIndex,distanceIndex){
// 	VP_height=VP_width=rtResRange[rtResIndex];
// 	maxPhots=neighborRange[neighborIndex];
// 	maxDistance=distanceRange[distanceIndex];
// 	console.log("Ray Tracing Building");
// 	string+="\nRay Tracing Building";
// 	var measureStart = new Date().getTime();
// 	console.log("Resolution:",VP_width,"distance:",maxDistance,"maxPhots",maxPhots);
// 	string+="\nResolution:",VP_width," distance:",maxDistance," maxPhots:",maxPhots;
// 	InitCamRays(1);
// 	var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 	var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 	console.log('Completed in:', mins,'mins :',secs,'secs');
// 	string+="\nCompleted in: "+ mins+'mins:'+secs+'secs';

// }
// var index=0;
// function tester(){
// 	var measureStart = new Date().getTime();
	
// 	for(var i=0;i<6;i++){
// 		/*for(var j=0;j<3;j++){
// 			if(i!=0&&j!=0){
// 				delete photMap.pm;
// 				delete photMap.nextphoton;
// 				photMap= new photonMap();
// 			}

// 			generatePM(i,j,index);
// 			generateRT(index,index,index);			

// 			Maps();
// 			var filename="#P:"+photNumRange[i]+
// 				"_BN:"+bounceRange[j]+
// 				"_lPow:"+lightPowerRange[0]+
// 				"_Res:"+rtResRange[0]+
// 				"_nbr:"+neighborRange[0]+
// 				"_dist:"+distanceRange[0]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();
// 			window.open("data:text/json;charset=utf-8," + escape(string));
// 			string="";
// 		}//*/
		
// 		if(i==0){
// 			generatePM(index+1,index,index);
// 			generateRT(index,index,index);
// 			Maps();
// 			var filename="#P:"+photNumRange[index+1]+
// 			"_BN:"+bounceRange[index]+
// 			"_lPow:"+lightPowerRange[index]+
// 			"_Res:"+rtResRange[index]+
// 			"_nbr:"+neighborRange[index]+
// 			"_dist:"+distanceRange[index]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}else if(i==1){
// 			delete photMap.pm;
// 			delete photMap.nextphoton;
// 			photMap= new photonMap();
// 			generatePM(index,index+1,index);
// 			generateRT(index,index,index);
// 			Maps();
// 			var filename="#P:"+photNumRange[index]+
// 			"_BN:"+bounceRange[index+1]+
// 			"_lPow:"+lightPowerRange[index]+
// 			"_Res:"+rtResRange[index]+
// 			"_nbr:"+neighborRange[index]+
// 			"_dist:"+distanceRange[index]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}else if(i==2){
// 			delete photMap.pm;
// 			delete photMap.nextphoton;
// 			photMap= new photonMap();
// 			generatePM(index,index,index+1);
// 			generateRT(index,index,index);
// 			Maps();
// 			var filename="#P:"+photNumRange[index]+
// 			"_BN:"+bounceRange[index]+
// 			"_lPow:"+lightPowerRange[index+1]+
// 			"_Res:"+rtResRange[index]+
// 			"_nbr:"+neighborRange[index]+
// 			"_dist:"+distanceRange[index]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}else if(i==3){
// 			delete photMap.pm;
// 			delete photMap.nextphoton;
// 			photMap= new photonMap();
// 			generatePM(index,index,index);
// 			generateRT(index+1,index,index);
// 			Maps();
// 			var filename="#P:"+photNumRange[index]+
// 			"_BN:"+bounceRange[index]+
// 			"_lPow:"+lightPowerRange[index]+
// 			"_Res:"+rtResRange[index+1]+
// 			"_nbr:"+neighborRange[index]+
// 			"_dist:"+distanceRange[index]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}else if(i==4){
// 			delete photMap.pm;
// 			delete photMap.nextphoton;
// 			photMap= new photonMap();
// 			generatePM(index,index,index);
// 			generateRT(index,index+1,index);
// 			Maps();
// 			var filename="#P:"+photNumRange[index]+
// 			"_BN:"+bounceRange[index]+
// 			"_lPow:"+lightPowerRange[index]+
// 			"_Res:"+rtResRange[index]+
// 			"_nbr:"+neighborRange[index+1]+
// 			"_dist:"+distanceRange[index]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}else if(i==5){
// 			delete photMap.pm;
// 			delete photMap.nextphoton;
// 			photMap= new photonMap();
// 			generatePM(index,index,index);
// 			generateRT(index,index,index+1);
// 			Maps();
// 			var filename="#P:"+photNumRange[index]+
// 			"_BN:"+bounceRange[index]+
// 			"_lPow:"+lightPowerRange[index]+
// 			"_Res:"+rtResRange[index]+
// 			"_nbr:"+neighborRange[index]+
// 			"_dist:"+distanceRange[index+1]+".png";
// 			downloadCanvas('Rdisplayer', filename);
// 			Maps();

// 		}
// 		window.open("data:text/json;charset=utf-8," + escape(string));
// 		string="";//*/
		
// 	}
// 	var mins=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)/60);
// 	var secs=Math.floor(Math.floor((new Date().getTime() - measureStart)*0.001)%60);
// 	console.log("All Tests Completed", mins,'mins :',secs,'secs');
// 	string="\nAll Tests Completed "+ mins+'mins:'+secs+'secs';

// 	window.open("data:text/json;charset=utf-8," + escape(string));
// }