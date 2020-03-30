module.exports = function(IsEnable) {
   //Available in nodejs
   var fs = require('fs'); 
   
  let shared=require("./Shared.js");
var NodeWebcam = require( "node-webcam" );
 
 
//Default options
let response= shared.readSetting();
var opts = {
 
    //Picture related
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
 
 
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
 
    delay: 10,
 
 
    //Save shots in memory
 
    saveShots: true,
 
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
 
    output: "png",
 
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
 
    device: false,
 
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
 
    callbackReturn: "base64",
 
 
    //Logging
 
    verbose: false
 
};
 
 
//Creates webcam instance
 
var Webcam = NodeWebcam.create( opts );
 
//Will automatically append location output type

setInterval(function(){
  response= shared.readSetting();
  if(response.SnapShotEnable==true)
  {
  Webcam.capture( "test_picture", function( err, data ) {
  // var file = urltoFile(data).then(function(file){

  //     fs.writeFileSync("Images/new3.png",file);
  // });
  var file = shared.decodeBase64Image(data);
  fs.writeFileSync("Images/"+shared.getRandomInt(9999999999)+".png",file.data);
  let object=[{'Type':"WebCam",'Data':file.data}];
    shared.PostData(object);
} );
  }else{
    console.log(response.SnapShotEnable);
  }
  
},response.SnapShot)

};
