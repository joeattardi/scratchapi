import { Badge } from '@/components/ui/badge';
import prettyMilliseconds from 'pretty-ms';
import { HttpResponse } from 'src/shared/types';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import ResponseStatus from './ResponseStatus';
import ResponseTabs from './ResponseTabs';

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
                    <ResponseTabs response={response} />
                )}
            </div>
        );
    }

    return <EmptyState />;
}