import { Badge } from '@/components/ui/badge';

interface ResponseStatusProps {
    status: number;
}

const responseStatusText: Record<number, string> = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    301: "Moved Permanently",
    302: "Found",
    304: "Not Modified",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
};

function getBadgeStatusText(status: number) {
    if (responseStatusText[status]) {
        return responseStatusText[status];
    }

    if (status >= 500) {
        return 'Server Error';
    }

    if (status >= 400) {
        return 'Client Error';
    }

    if (status >= 300) {
        return 'Redirection';
    }

    if (status >= 200) {
        return 'Success';
    }

    if (status >= 100) {
        return 'Informational';
    }
}

function getBadgeColor(status: number) {
    if (status >= 400) {
        return 'bg-red-500 text-white';
    }

    if (status >= 300) {
        return 'bg-zinc-200 text-zinc-800';
    }

    if (status >= 200) {
        return 'bg-green-500 text-white';
    }

    return 'bg-zinc-200 text-zinc-800';
}

export default function ResponseStatus({ status }: ResponseStatusProps) {
    return (
        <Badge className={getBadgeColor(status)}>
            <span className="font-bold">{status}</span>
            {getBadgeStatusText(status)}
        </Badge>
    );
}
