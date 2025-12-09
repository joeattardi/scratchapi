import { Badge } from '@/components/ui/badge';
import i18n from '@/i18n';

interface ResponseStatusProps {
    status: number;
}

function getBadgeStatusText(status: number) {
    if (i18n.exists(`http.status.${status}`)) {
        return i18n.t(`http.status.${status}`);
    }

    if (status >= 500) {
        return i18n.t('http.responseCategory.5xx');
    }

    if (status >= 400) {
        return i18n.t('http.responseCategory.4xx');
    }

    if (status >= 300) {
        return i18n.t('http.responseCategory.3xx');
    }

    if (status >= 200) {
        return i18n.t('http.responseCategory.2xx');
    }

    if (status >= 100) {
        return i18n.t('http.responseCategory.1xx');
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
