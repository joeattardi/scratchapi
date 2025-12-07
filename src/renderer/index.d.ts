import type { HttpRequest } from '../shared/types';

export interface ElectronAPI {
    sendRequest: (request: HttpRequest) => Promise<object>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
