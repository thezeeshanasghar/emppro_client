var fs = require('fs'); 
let os = require('os');

const SetProject_dir=()=>{
  
    if (!fs.existsSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage')){
      fs.mkdirSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage');
    }
    fs.exists(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Setting.json', function(exists) { 
      console.log(exists);
      if (!exists) { 
        let _default={
          "PostRequest":600000,
          "SnapShot":600000,
          "SnapShotEnable":true,
          "Keyboard":600000,
          "KeyboardEnable":true,
          "mouse":600000,
          "MouseEnable":true,
          "ScreenShot":600000,
          "ScreenShotEnable":true
        }
        fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Setting.json',JSON.stringify(_default));
      }
    });
      fs.exists(os.userInfo().homedir.split("\\").join('/')+'\Documents/Storage/Out.json', function(exists) { 
        console.log(exists)
        if (!exists) { 
          let _default=[];
          fs.writeFileSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Out.json',JSON.stringify(_default));
        }
      });
      // fs.exists(os.userInfo().homedir.split("\\").join('/')+'/Documents/Result', function(exists) { 
        // fs.mkdir();
         try {
          fs.statSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result');
        } catch(e) {
          fs.mkdirSync(os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Result');
        }
      // });
    console.log(os.userInfo().homedir);
}

const SettingPath=()=>{
  
 return   os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Setting.json'
    

}
const StoragePath=()=>{
  
    return   os.userInfo().homedir.split("\\").join('/')+'/Documents/Storage/Out.json'
       
   
   }


module.exports = {
    SetProject_dir,
    SettingPath,
    StoragePath
};