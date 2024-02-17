const { ipcRenderer } = require('electron')

// This is our electron-only client-side JS code.

// We can only pre-load from filesystem from within Electron
const INPUT_LIST = 'input-list'
const INPUT_FILES = 'inputFiles'

// loadFiles - This will attempt to load the saved files used from last time.
const loadFiles = () => {
  const inputFiles = JSON.parse(localStorage.getItem(INPUT_FILES))
  if (!inputFiles) {
    return
  }
  inputFiles.forEach(async filepath => {
    const fileOutput = await ipcRenderer.invoke('readFile', filepath)
    addToInput(INPUT_LIST, fileOutput)
  })
}

const addToInput = (selector, text) => {
  const element = document.getElementById(selector)
  if (element) element.value += text
}

window.addEventListener('DOMContentLoaded', () => {
  loadFiles()
})
