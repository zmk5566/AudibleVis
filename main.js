const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 1000,
      frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
        nodeIntegration: true, // is default value after Electron v5
        contextIsolation: false, // protect against prototype pollution
        enableRemoteModule: true, // turn off remote
      }
    })
  
    win.loadFile('examples/index.html')
    win.setMenuBarVisibility(false)
  }


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })