export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface HttpRequest {
    method: HttpMethod;
    headers: HeadersInit;
    url: string;
    body?: string;
}

export interface HttpResponse {
    body: string;
    status: number;
    duration: number;
    headers: Record<string, string>;
}
