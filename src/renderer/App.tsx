import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import MethodSelect from './request/MethodSelect';
import { HttpMethod } from 'src/shared/types';
import ResponseView from './response/ResponseView';

export default function App() {
    const [method, setMethod] = useState<HttpMethod>('GET');
    const [url, setUrl] = useState<string>('https://httpbin.org/get');
    const [responseBody, setResponseBody] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    async function onClickSend() {
        setLoading(true);
        setResponseBody('');
        const response = await window.electronAPI.sendRequest({
            url
        });

        setResponseBody(JSON.stringify(response, null, 2));
        setLoading(false);
    }

    return (
        <div>
            <main className="p-4 flex flex-col gap-4">
                <section className="flex flex-col gap-2">
                    <h2 className="uppercase text-xs">Request</h2>
                    <div className="flex items-center gap-2">
                        <MethodSelect value={method} onChange={setMethod} />
                        <Input
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <Button onClick={onClickSend} disabled={isLoading}>
                            <PlayIcon />
                            Send
                        </Button>
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="uppercase text-xs">Response</h2>
                    <ResponseView isLoading={isLoading} responseBody={responseBody} />
                </section>
            </main>
        </div>
    );
}
