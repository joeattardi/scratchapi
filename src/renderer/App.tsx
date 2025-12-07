import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function App() {
    const [url, setUrl] = useState<string>('https://httpbin.org/get');
    const [responseBody, setResponseBody] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    async function onClickSend() {
        setLoading(true);
        const response = await window.electronAPI.sendRequest({
            url
        });

        setResponseBody(JSON.stringify(response, null, 2));
        setLoading(false);
    }

    return (
        <div>
            <main className="p-4 flex flex-col gap-4">
                <section>
                    <h2 className="uppercase text-xs">Request</h2>
                    <div className="flex items-center gap-2">
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
                <section>
                    <h2 className="uppercase text-xs">Response</h2>
                    <code>
                        <pre>{responseBody}</pre>
                    </code>
                </section>
            </main>
        </div>
    );
}
