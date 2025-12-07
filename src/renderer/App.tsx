import { useState } from 'react';
import { HttpMethod, HttpResponse } from 'src/shared/types';
import RequestForm from './request/RequestForm';
import ResponseView from './response/ResponseView';

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
        <div>
            <main className="p-4 flex flex-col gap-4">
                <section className="flex flex-col gap-2">
                    <h2 className="uppercase text-xs">Request</h2>
                    <RequestForm onSend={onClickSend} />
                </section>
                <section className="flex flex-col gap-2">
                    <h2 className="uppercase text-xs">Response</h2>
                    <ResponseView isLoading={isLoading} response={response} />
                </section>
            </main>
        </div>
    );
}
