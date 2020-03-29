
const {app, BrowserWindow,Tray,Menu} = require('electron')
const path = require('path')

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
  mainWindow.loadFile('index.html')
  mainWindow.setMenuBarVisibility(false)
}

app.whenReady().then(
  function()
  {
    let trayIcon = new Tray(path.join(__dirname,"images.png"))

    const trayMenuTemplate = [
    {label:"ScreenShot",submenu:[
      { label: 'Enable ScreenShot', type: 'radio', click: function () {
        IsEnable=true;
      }
        },
     { label: 'Disable ScreenShot', type: 'radio', click: function () {
      IsEnable=false;
     }
       }
    ]},
    {label:"Keyboard Logging",submenu:[
      { label: 'Enable logging', type: 'radio', click: function () {
        KeyIsEnable=true;
      }
        },
     { label: 'Disable logging', type: 'radio', click: function () {
      KeyIsEnable=false;
     }
       }
    ]},
    ,
    {label:"Mouse Logging",submenu:[
      { label: 'Enable logging', type: 'radio', click: function () {
        mouseIsEnable=true;
      }
        },
     { label: 'Disable logging', type: 'radio', click: function () {
      mouseIsEnable=false;
     }
       }
    ]},
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
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

   let WebCam = require("./WebCam.js");
   WebCam(IsEnable);
 
let KeyboardLogger=require("./Keyboardlogging");
KeyboardLogger(KeyIsEnable);