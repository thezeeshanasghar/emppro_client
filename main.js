
const {app, BrowserWindow,Tray,Menu} = require('electron')
const path = require('path')
let shared=require("./Shared.js");
let response=shared.readSetting();
var fs = require('fs'); 
console.log(__dirname);
var IsEnable=true;
var KeyIsEnable=true;
var mouseIsEnable=true;
const url = require('url')
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  
  })
 
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('Setting.html')
}

app.whenReady().then(
  function()
  {
    let trayIcon = new Tray(path.join(__dirname,"images.png"))

    const trayMenuTemplate = [
    {label:"ScreenShot",submenu:[
      { label: 'Enable ScreenShot', type: 'radio', click: function () {
        response.SnapShotEnable=true;
       // fs.writeFile("./Storage/Setting.json",response);
      }
        },
     { label: 'Disable ScreenShot', type: 'radio', click: function () {
      response.SnapShotEnable=false;
     // fs.writeFile("./Storage/Setting.json",response);
     }
       }
    ]},
    {label:"Keyboard Logging",submenu:[
      { label: 'Enable logging', type: 'radio', click: function () {
       
        response.KeyboardEnable=true;
        //fs.writeFile("./Storage/Setting.json",response);
      }
        },
     { label: 'Disable logging', type: 'radio', click: function () {
      response.KeyboardEnable=false;
   //   fs.writeFile("./Storage/Setting.json",response);
     }
       }
    ]},
    ,
    {label:"Mouse Logging",submenu:[
      { label: 'Enable logging', type: 'radio', click: function () {
        response.MouseEnable=true;

       // fs.writeFile("./Storage/Setting.json",response);
      }
        },
     { label: 'Disable logging', type: 'radio', click: function () {
      response.MouseEnable=false;
    //  fs.writeFile("./Storage/Setting.json",response);
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
   let WebCam = require("./WebCam.js");
   WebCam(IsEnable);
 
let KeyboardLogger=require("./Keyboardlogging.js");
KeyboardLogger(KeyIsEnable);

