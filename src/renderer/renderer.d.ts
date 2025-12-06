import type { HttpRequest } from '../shared/types';

export interface ElectronAPI {
    sendRequest: (request: HttpRequest) => Promise<any>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
