
const {app, BrowserWindow,Tray,Menu} = require('electron')

const path = require('path');

  let SetEnvirment=require("./src/environments/environment.js");
SetEnvirment.SetProject_dir();





var mainWindow=null;

var fs = require('fs'); 

console.log(__dirname);
const url = require('url')
function createSettingWindow () {
   mainWindow = new BrowserWindow({
    width: 600,
    height: 675,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      
    }
  
  })
  //mainWindow.setMenuBarVisibility(false)
   mainWindow.loadFile('./src/app/Settings/Setting.html')
  // mainWindow.loadFile('./welcome.html')
}
function createWindow () {
   mainWindow = new BrowserWindow({
    width: 600,
    height: 675,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      
    }
  
  })
  //mainWindow.setMenuBarVisibility(false)
  //  mainWindow.loadFile('./src/app/Settings/Setting.html')
  mainWindow.loadFile('./welcome.html')
}


app.whenReady().then(
  
  function()
  {

    createWindow();
  }

 
  )

  
const ipc = require('electron').ipcMain;



  
  
  
  

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('ready', () => { 
  win = new BrowserWindow({ show: false }); 
});
ipc.on('StartApp', (event, args) => {
  event.returnValue = 'StartApp';
  let shared=require("./src/app/shared/Shared.js");
let response=shared.readSetting();
console.log(args);
 if(args!="disabled")
 {
    console.log("Tracker Starts")
 //Screenshot
let ScreenShot=require("./src/app/tracker/screenshot/ScreenShot.js");
ScreenShot(args);
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
  
            let Data=shared.GetData();
            if(Data.length!=0)
            {
             var path="Data-/"+shared.getRandomInt("999999999")+"/";
                var body=Data
                SetEnvirment
               shared.fnPostData(path,body);
                console.log("yes it happened")
            }else{
              console.log("No Record Found")
            }
            let res=[];
            fs.writeFileSync(SetEnvirment.StoragePath(),JSON.stringify(res));
    
  }   
  });
  
  },response.PostRequest)
 }else{

  console.log("Tracker Paused")
 }
  /*--------------------------------------------------*/
 

  });


  //ipc.on('StartTray', (event, args) => {
  //console.log("Start Tray")
   
  //})
  ipc.on('Setting', (event, args) => 
  {
    event.returnValue = 'Settings';
    mainWindow.loadFile('./src/app/Settings/Setting.html');
  })
  ipc.on('return', (event, args) => 
  {

    mainWindow.loadFile('./welcome.html');
  })

ipc.on('StartTray', (event, args) => {
 console.log("start Tray");
 event.returnValue = 'Tray Started';
    event.returnValue = 'Main said I received your Sync message';
    let shared=require("./src/app/shared/Shared.js");
    let response=shared.readSetting();
    let trayIcon = new Tray(path.join(__dirname,"./src/assets/images/logo.png"))

    const trayMenuTemplate = [
    {label:"SnapShot",submenu:[
      { label: 'Enable SnapShot', type: 'radio',checked:response.SnapShotEnable ==true?true:false  ,click: function () {
        response.SnapShotEnable=true;
  
      fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
      }
        },
     { label: 'Disable SnapShot', type: 'radio',checked:response.SnapShotEnable ==false?true:false ,click: function () {
      response.SnapShotEnable=false;
     fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
     }
       }
    ]},{label:"ScreenShot",submenu:[
      { label: 'Enable ScreenShot', type: 'radio',checked:response.ScreenShotEnable ==true?true:false  ,click: function () {
        response.ScreenShotEnable=true;
  
      fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
      }
        },
     { label: 'Disable ScreenShot', type: 'radio',checked:response.ScreenShotEnable ==false?true:false ,click: function () {
      response.ScreenShotEnable=false;
     fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
     }
       }
    ]},
    {label:"Keyboard Logging",submenu:[
      { label: 'Enable logging', type: 'radio',checked:response.KeyboardEnable ==true?true:false , click: function () {
       
        response.KeyboardEnable=true;
       fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
      }
        },
     { label: 'Disable logging', type: 'radio',checked:response.KeyboardEnable ==false?true:false , click: function () {
      response.KeyboardEnable=false;
    fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
     }
       }
    ]},
    ,
    {label:"Mouse Logging",submenu:[
      { label: 'Enable logging', type: 'radio',checked:response.MouseEnable ==true?true:false , click: function () {
        response.MouseEnable=true;
  
       fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response) );
      }
        },
     { label: 'Disable logging', type: 'radio',checked:response.MouseEnable ==false?true:false , click: function () {
      response.MouseEnable=false;
    fs.writeFileSync(SetEnvirment.SettingPath(),JSON.stringify(response));
     }
     }
    ]},
    {
      label: 'Setting',
      click: function () {
        createSettingWindow();
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

    mainWindow.hide();
})
