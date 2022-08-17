import path from 'path';
import { BrowserWindow, app } from 'electron';

// hot reload on development mode
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.resolve(
      __dirname,
      process.platform === 'win32'
        ? '../node_modules/electron/dist/electron.exe'
        : '../node_modules/.bin/electron'
    ),
  });
}


// create BrowserWindow instance
app.whenReady().then(() => {
  new BrowserWindow().loadFile('dist/index.html')
});


// quit if all windows are closed
app.once('window-all-closed', () => app.quit());
