
 var fs = require('fs'); 
 let os = require('os');
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
       fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint+'/Keyboard.txt',main_key);
  }

 

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