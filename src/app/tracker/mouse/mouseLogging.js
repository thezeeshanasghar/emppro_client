module.exports = function() {
    //var keycode = require('keycode');
    let shared=require("../../shared/Shared.js");
  
 var fs = require('fs'); 
 let os = require('os');
  
  const ioHook = require('../../../../node_modules/iohook');
  let response= shared.readSetting();
  var mouseCount=0;
  setInterval(function(){
    response= shared.readSetting();
    if(mouseCount>0)
    {
      console.log("Its Happened");
    let object={'Type':"Mouse",'Out':JSON.stringify(mouseCount)};
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
          fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint+'/Mouse.txt',JSON.stringify(object));
     }
   
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