import type { HttpRequest, HttpResponse } from '../shared/types';

export interface ElectronAPI {
    sendRequest: (request: HttpRequest) => Promise<HttpResponse>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}
