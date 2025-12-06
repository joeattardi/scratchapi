import { contextBridge, ipcRenderer } from 'electron';
import type { HttpRequest } from '../shared/types';

contextBridge.exposeInMainWorld('electronAPI', {
  sendRequest: (request: HttpRequest) => ipcRenderer.invoke('sendRequest', request)
});
