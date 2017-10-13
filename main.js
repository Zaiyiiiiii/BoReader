
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 768, frame: false, transparent: false });


  //添加VueDevtools
  // const extension = './src/vue-devtools'
  // BrowserWindow.addDevToolsExtension(extension)


  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});