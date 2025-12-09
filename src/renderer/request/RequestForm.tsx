import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { HttpMethod } from '../../shared/types';
import MethodSelect from './MethodSelect';
import { Button } from '@/components/ui/button';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface RequestFormProps {
    onSend: (request: { method: HttpMethod; url: string }) => void;
    isLoading: boolean;
}

export default function RequestForm({ onSend, isLoading }: RequestFormProps) {
    const { t } = useTranslation();
    const [method, setMethod] = useState<HttpMethod>('GET');
    const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/users');

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSend({
            method,
            url
        });
    }

    return (
        <form onSubmit={onSubmit} className="flex items-center">
            <MethodSelect value={method} onChange={setMethod} />
            <Input
                type="text"
                className="rounded-none bg-zinc-100 focus-visible:border focus-visible:ring-0"
                placeholder={t('request.enterUrl')}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" disabled={!url || isLoading} className="rounded-tl-none rounded-bl-none">
                <PaperPlaneRightIcon />
                {t('request.send')}
            </Button>
        </form>
    );
}
