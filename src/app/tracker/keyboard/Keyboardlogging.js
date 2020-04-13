
module.exports = function() {
  let shared=require("../../shared/Shared.js");

const ioHook = require('../../../../node_modules/iohook');
let response= shared.readSetting();

let main_key=0;
setInterval(function(){
  response= shared.readSetting();
if(main_key!=0)
  {
let object={'Type':"Keyboard",'Out':main_key};
   shared.PostData(object);
  }
 main_key="";
},response.Keyboard)
  
ioHook.on('keydown', function(e)
{

 if(response.KeyboardEnable==true)
 {
  
      main_key++;
 }
});

ioHook.start();

ioHook.start(true);
}