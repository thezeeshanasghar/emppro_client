module.exports = function() {
    //var keycode = require('keycode');
    let shared=require("../../shared/Shared.js");
  var fs = require('fs'); 
  
  const ioHook = require('../../../../node_modules/iohook');
  let response= shared.readSetting();
  var mouseCount=0;
  setInterval(function(){
    response= shared.readSetting();
    if(mouseCount>0)
    {
      console.log("Its Happened");
    let object={'Type':"Mouse",'Out':JSON.stringify(mouseCount)};
      shared.PostKeyboard(object);
    }
    mouseCount=0;
  },response.mouse)
   
  
  ioHook.on("mouseclick",function(msg){
 
    if(response.MouseEnable==true)
    {
     
      mouseCount++;
        
    }
  });
  ioHook.start();
  
  ioHook.start(true);
  }