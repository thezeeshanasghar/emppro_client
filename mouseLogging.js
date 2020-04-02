module.exports = function() {
    //var keycode = require('keycode');
    let shared=require("./Shared.js");
  var fs = require('fs'); 
  
  const ioHook = require('iohook');
  let response= shared.readSetting();
  var mouseresponse=[];
  setInterval(function(){
    response= shared.readSetting();
    
  var FileNamemouse="Images/"+"Mouse-"+shared.getRandomInt(9999999999)+".txt";
  if(mouseresponse.length>0)
    {
      fs.writeFileSync(FileNamemouse,JSON.stringify(mouseresponse)); 
   

  let object={'Type':"Mouse",'Data':JSON.stringify(mouseresponse)};
      shared.PostMouse(object);
  // Decode the String
  // var decodedString = Base64.decode(encodedString);
  // console.log(decodedString); 
    }
     mouseresponse=[];
  },response.mouse)
   
  
  ioHook.on("mouseclick",function(msg){
    if(response.MouseEnable==true)
    {
     
      mouseresponse.push(msg);
        
    }
  });
  
  ioHook.on("mousewheel",function(msg){
    if(response.MouseEnable==true)
    {
     
    mouseresponse.push(msg);
    }
  });
  
  ioHook.on("mousedrag",function(msg){
    if(response.MouseEnable==true)
    {
     
    mouseresponse.push(msg);
    }
  });
  ioHook.start();
  
  ioHook.start(true);
  }