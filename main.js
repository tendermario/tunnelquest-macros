const { app, BrowserWindow } = require('electron')
const path = require('node:path')

try {
  const electronReload = require('electron-reload')
  electronReload(__dirname)
} catch {}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    // This chunk is just to show what you can run outside of the html file. Change this!
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
