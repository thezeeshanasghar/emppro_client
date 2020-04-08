module.exports = function() {
  let shared=require("../../shared/Shared.js");
var NodeWebcam = require( "../../../../node_modules/node-webcam" );
 
let response= shared.readSetting();
var opts = {
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
    delay: 10,
    saveShots: true,
    output: "png",
    device: false,
    callbackReturn: "base64",
    verbose: false
};
var Webcam = NodeWebcam.create( opts );
 
setInterval(function(){
  response= shared.readSetting();
  if(response.SnapShotEnable==true)
  {
  Webcam.capture( "test_picture", function( err, data ) {

  let object
  
    object={'Type':"WebCam",'Data':data};
    shared.PostData(object);

} );
  }else{
    console.log(response.SnapShotEnable);
  }
  
},response.SnapShot)

};
