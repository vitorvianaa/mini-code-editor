const { app, BrowserWindow, nativeTheme } = require('electron/main')
const path = require('node:path')


// index window
let win // win must be a global variable
function createWindow(){
    nativeTheme.themeSource = 'dark'
    win = new BrowserWindow({
        width: 1024,
        height: 728,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./src/views/index.html')
}


// about window
function createAbout(){
    nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 512,
        height: 364,
        autoHideMenuBar: true,
        resizable: false,
        minimizable: false,
        webPreferences: path.join(__dirname, 'preload.js')

    })

    about.loadFile('./src/views/about.html')
}




app.whenReady().then(() =>{
    createWindow()
    //createAbout()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})