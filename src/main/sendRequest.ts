import { type IpcMainInvokeEvent } from 'electron';
import type { HttpRequest, HttpResponse } from '../shared/types';

async function getResponseBody(response: Response) {
    const rawBody = await response.text();
    try {
        return JSON.stringify(JSON.parse(rawBody), null, 2);
    } catch (error) {
        return rawBody;
    }
}

export async function sendRequest(_event: IpcMainInvokeEvent, request: HttpRequest): Promise<HttpResponse> {
    const response = await fetch(request.url, {
            method: request.method
    });

    const body = await getResponseBody(response);
    
    return {
        status: response.status,
        body
    };
}
