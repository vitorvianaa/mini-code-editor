const { contextBridge, ipcRenderer } = require('electron')


// Exposing api for render process
contextBridge.exposeInMainWorld('api', {
    setColor: (color) => ipcRenderer.on('set-color', color)
})