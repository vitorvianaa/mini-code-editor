const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')
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
    

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    win.loadFile('./src/views/index.html')
}


// about window
function createAbout(){
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    let about
    if(main){
        about = new BrowserWindow({
            width: 512,
            height: 364,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true 
        })
    }

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


// menu
const template = [
    {
        label: 'File',
        submenu: [
            {label: 'New', accelerator: 'CmdOrCtrl+N'},
            {label: 'Open', accelerator: 'CmdOrCtrl+O'},
            {label: 'Save',accelerator: 'CmdOrCtrl+S'},
            {label: 'Save as', accelerator: 'CmdOrCtrl+Shift+S'},
            {type: 'separator'},
            {label: 'Out', click: () => app.quit(), accelerator: 'Alt+F4'}
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {label: 'Undo', role: 'undo'},
            {label: 'Remake', role: 'redo'},
            {type: 'separator'},
            {label: 'Cut', role: 'cut'},
            {label: 'Copy', role: 'copy'},
            {label: 'Paste', role: 'paste'}
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {label: 'Zoom', role: 'zoomIn'},
            {label: 'Zoom Out', role: 'zoomOut'},
            {label: 'Restore Default', role: 'resetZoom'}
        ]
    },
    {
        label: 'Color',
        submenu: [
            {label: 'Yellow', click: () => win.webContents.send('set-color', "var(--yellow)")},
            {label: 'Blue', click: () => win.webContents.send('set-color', "var(--blue)")},
            {label: 'Orange', click: () => win.webContents.send('set-color', "var(--orange)")},
            {label: 'Pink', click: () => win.webContents.send('set-color', "var(--pink)")},
            {label: 'Purple', click: () => win.webContents.send('set-color', "var(--purple)")},
            {label: 'Green', click: () => win.webContents.send('set-color', "var(--green)")},
            {type: 'separator'},
            {label: 'Restore Default Color', click: () => win.webContents.send('set-color', "var(--lightGray)")}
        ]
    },
    {
        label: 'Help',
        submenu: [
            {label: 'Repository', click: () => shell.openExternal('https://github.com/vitorvianaa/mini-code-editor.git')},            
            {label: 'About', click: () => createAbout()}
        ]
    }
]