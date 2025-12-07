import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { HttpMethod } from '../../shared/types';
import MethodSelect from './MethodSelect';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@phosphor-icons/react';

export default function RequestForm({ onSend }) {
    const [method, setMethod] = useState<HttpMethod>('GET');
    const [url, setUrl] = useState<string>('https://httpbin.org/get');

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSend({
            method,
            url
        });
    }

    return (
        <form onSubmit={onSubmit} className="flex items-center gap-2">
            <MethodSelect value={method} onChange={setMethod} />
            <Input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" disabled={!url}>
                <PlayIcon />
                Send
            </Button>
        </form>
    );
}
