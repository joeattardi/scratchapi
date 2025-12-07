import { HttpResponse } from 'src/shared/types';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ResponseStatus from './ResponseStatus';

interface ResponseViewProps {
    isLoading: boolean;
    response: HttpResponse | null;
}

export default function ResponseView({ isLoading, response }: ResponseViewProps) {
    if (isLoading) {
        return <LoadingState />;
    }

    if (response?.body.length) {
        return (
            <div className="flex flex-col gap-2">
                <ResponseStatus status={response.status} />
                <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm overflow-auto">
                    <pre>{response.body}</pre>
                </div>
            </div>
        );
    }

    return <EmptyState />;
}