import { type IpcMainInvokeEvent } from 'electron';
import type { HttpRequest, HttpResponse } from '../shared/types';
import pkg from '../../package.json';

async function getResponseBody(response: Response) {
    const rawBody = await response.text();
    try {
        return JSON.stringify(JSON.parse(rawBody), null, 2);
    } catch (error) {
        return rawBody;
    }
}

export async function sendRequest(
    _event: IpcMainInvokeEvent,
    request: HttpRequest
): Promise<HttpResponse> {
    const startTime = Date.now();
    // Normalize incoming headers (HeadersInit can be various shapes). Build a simple map with lowercase keys.
    const normalizedHeaders: Record<string, string> = {};
    try {
        if (request.headers) {
            if (Array.isArray(request.headers)) {
                request.headers.forEach(([k, v]) => {
                    if (k) normalizedHeaders[String(k).toLowerCase()] = String(v);
                });
            } else if (request.headers instanceof Headers) {
                request.headers.forEach((v, k) => {
                    normalizedHeaders[k.toLowerCase()] = v;
                });
            } else {
                Object.entries(request.headers as Record<string, string>).forEach(([k, v]) => {
                    if (k) normalizedHeaders[k.toLowerCase()] = String(v);
                });
            }
        }
    } catch (err) {
        // fallback: ignore and continue
    }

    // Ensure a User-Agent header exists
    if (!normalizedHeaders['user-agent']) {
        normalizedHeaders['user-agent'] = `ScratchAPI/${pkg.version}`;
    }

    const response = await fetch(request.url, {
        method: request.method,
        headers: normalizedHeaders,
        body: request.body
    });

    const body = await getResponseBody(response);

    // Convert the response headers to a mapping of string to string
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
        headers[key] = value;
    });

    return {
        status: response.status,
        duration: Date.now() - startTime,
        headers,
        body
    };
}
