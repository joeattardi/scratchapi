import { useState } from 'react';
import { HttpMethod, HttpResponse } from 'src/shared/types';
import RequestForm from './request/RequestForm';
import ResponseView from './response/ResponseView';
import RequestSettings from './request/RequestSettings';

export default function App() {
    const [response, setResponse] = useState<HttpResponse | null>(null);
    const [isLoading, setLoading] = useState(false);

    async function onClickSend({ method, url }: { method: HttpMethod; url: string }) {
        setLoading(true);
        setResponse(null);
        const response = await window.electronAPI.sendRequest({
            method,
            url
        });

        setResponse(response);
        setLoading(false);
    }

    return (
        <div className="h-full flex flex-col">
            <main className="p-4 flex flex-col gap-4 overflow-hidden flex-1">
                <section className="flex flex-col gap-2">
                    <h2 className="uppercase text-xs text-zinc-500">Request</h2>
                    <RequestForm onSend={onClickSend} isLoading={isLoading} />
                    <RequestSettings />
                </section>
                <section className="flex flex-col gap-2 min-h-0 flex-1">
                    <h2 className="uppercase text-xs text-zinc-500">Response</h2>
                    <ResponseView response={response} isLoading={isLoading} />
                </section>
            </main>
        </div>
    );
}
