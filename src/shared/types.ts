export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface HttpRequest {
    method: HttpMethod;
    url: string;
}

export interface HttpResponse {
    body: string;
    status: number;
}
