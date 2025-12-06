import { app, BrowserWindow, ipcMain, type IpcMainInvokeEvent } from 'electron'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { HttpRequest } from '../shared/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Request',
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs')
    }
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools();
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }

  ipcMain.handle('sendRequest', sendRequest);
});

async function sendRequest(_event: IpcMainInvokeEvent, request: HttpRequest) {
  const response = await fetch(request.url);
  const data = await response.json();
  return data;
}
