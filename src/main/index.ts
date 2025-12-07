import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendRequest } from './sendRequest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.whenReady().then(() => {
    const win = new BrowserWindow({
        title: 'ScratchAPI',
        webPreferences: {
            preload: path.join(__dirname, './preload.mjs')
        }
    });

    // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
        win.maximize();
        win.webContents.openDevTools();
    } else {
        // Load your file
        win.loadFile('dist/index.html');
    }

    ipcMain.handle('sendRequest', sendRequest);
});
