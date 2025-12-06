import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { useState } from 'react';

export default function App() {
    const [url, setUrl] = useState<string>('');

    async function onClickSend() {
        const response = await window.electronAPI.sendRequest({
            url
        });

        console.log(response);
    }

    return (
        <main className="p-4 flex flex-col gap-4">
            <section>
                <h2 className="text-lg font-bold">Request</h2>
                <div className="flex items-center gap-2">
                    <Input
                        type="text" 
                        placeholder="Enter URL" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button onClick={onClickSend}>Send</Button>
                </div>
            </section>
            <section>
                <h2 className="text-lg font-bold">Response</h2>
            </section>
        </main>
    );
}
