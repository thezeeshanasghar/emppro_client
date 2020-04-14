module.exports = function() {
  let shared=require("../../shared/Shared.js");
var NodeWebcam = require( "../../../../node_modules/node-webcam" );
var fs = require('fs'); 
let os = require('os');
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

    let ts = Date.now();
    let date_ob = new Date(ts);
    var date=date_ob.getFullYear()+"-"+date_ob.getMonth()+"-"+date_ob.getDate();
    let Hours = date_ob.getHours();
    let mint = date_ob.getMinutes();
    try
    {
 
     try {
       fs.statSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date);
     } catch(e) {
       fs.mkdirSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date);
     }
     try {
       fs.statSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours);
     } catch(e) {
       fs.mkdirSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours);
     }
     try {
       fs.statSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint);
     } catch(e) {
       fs.mkdirSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint);
   
     }
    }catch(e)
    {
 
    }finally
    {
      if(fs.statSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint) )
   console.log("exist");
   var file = shared.decodeBase64Image(data);
        fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint+'/Webcam.png',file.data);
   }


} );
  }else{
    console.log(response.SnapShotEnable);
  }
  
},response.SnapShot)

};
