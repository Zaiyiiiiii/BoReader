const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on("window-all-closed", () => {
    app.quit()
})

app.on("open-file", event => {
    console.log("打开文件", event)
    mainWindow.webContents.send()
})

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: false,
        transparent: false
    })

    //添加VueDevtools
    // const extension = `${__dirname}/node_modules/vue-devtools/vender`
    // BrowserWindow.addDevToolsExtension(extension)
    mainWindow.webContents.openDevTools()

    mainWindow.loadURL(`file://${__dirname}/src/index.html`)

    mainWindow.on("closed", () => {
        mainWindow = null
    })
})
