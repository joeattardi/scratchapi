import { HttpResponse } from 'src/shared/types';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ResponseStatus from './ResponseStatus';
import prettyMilliseconds from 'pretty-ms';

interface ResponseViewProps {
    isLoading: boolean;
    response: HttpResponse | null;
}

export default function ResponseView({ isLoading, response }: ResponseViewProps) {
    if (isLoading) {
        return <LoadingState />;
    }

    if (response) {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <ResponseStatus status={response.status} />
                    <span className="text-sm text-zinc-500">•</span>
                    <div className="text-sm text-zinc-500">{prettyMilliseconds(response.duration)}</div>
                </div>
                {response.body.length > 0 && (
                    <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm overflow-auto">
                        <pre>{response.body}</pre>
                    </div>
                )}
            </div>
        );
    }

    return <EmptyState />;
}