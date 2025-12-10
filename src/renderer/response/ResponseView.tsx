import { HttpResponse } from 'src/shared/types';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ResponseStatus from './ResponseStatus';
import prettyMilliseconds from 'pretty-ms';
import { Badge } from '@/components/ui/badge';

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
            <div className="flex flex-col gap-2 min-h-0 flex-1">
                <div className="flex items-center gap-2">
                    <ResponseStatus status={response.status} />
                    <Badge variant="secondary">{prettyMilliseconds(response.duration)}</Badge>
                </div>
                {response.body.length > 0 && (
                    <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm min-h-0 flex-1 h-full flex flex-col">
                        <pre className="overflow-auto flex-1 min-h-0 whitespace-pre-wrap wrap-break-word">{response.body}</pre>
                    </div>
                )}
            </div>
        );
    }

    return <EmptyState />;
}