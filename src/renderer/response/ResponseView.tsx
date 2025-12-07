import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

export default function ResponseView({ isLoading, responseBody }) {
    if (isLoading) {
        return <LoadingState />;
    }

    if (responseBody.length) {
        return (
            <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm"><pre>{responseBody}</pre></div>
        );
    }

    return <EmptyState />;
}