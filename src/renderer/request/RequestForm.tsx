import { Input } from '@/components/ui/input';
import { HttpMethod } from '../../shared/types';
import MethodSelect from './MethodSelect';
import { Button } from '@/components/ui/button';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface RequestFormProps {
    onSend: () => void;
    isLoading: boolean;
    url: string;
    onUrlChange: (url: string) => void;
    method: HttpMethod;
    onMethodChange: (method: HttpMethod) => void;
}

export default function RequestForm({ onSend, isLoading, url, onUrlChange, method, onMethodChange }: RequestFormProps) {
    const { t } = useTranslation();

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSend();
    }

    return (
        <form onSubmit={onSubmit} className="flex items-center">
            <MethodSelect value={method} onChange={onMethodChange} />
            <Input
                type="text"
                className="rounded-none bg-zinc-100 focus-visible:border focus-visible:ring-0"
                placeholder={t('request.enterUrl')}
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
            />
            <Button type="submit" disabled={!url || isLoading} className="rounded-tl-none rounded-bl-none">
                <PaperPlaneRightIcon />
                {t('request.send')}
            </Button>
        </form>
    );
}
