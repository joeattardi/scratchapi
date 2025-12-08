import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { HttpMethod } from '../../shared/types';
import MethodSelect from './MethodSelect';
import { Button } from '@/components/ui/button';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';

interface RequestFormProps {
    onSend: (request: { method: HttpMethod; url: string }) => void;
}

export default function RequestForm({ onSend }: RequestFormProps) {
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
                className="rounded-none"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" disabled={!url} className="rounded-tl-none rounded-bl-none">
                <PaperPlaneRightIcon />
                Send
            </Button>
        </form>
    );
}
