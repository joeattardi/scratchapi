import { useState } from 'react';
import { HttpMethod, HttpResponse } from 'src/shared/types';
import RequestForm from './request/RequestForm';
import ResponseView from './response/ResponseView';
import RequestSettings from './request/RequestSettings';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

interface HeaderEntry {
    id: string;
    key: string;
    value: string;
}

export default function App() {
    const [response, setResponse] = useState<HttpResponse | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>('https://postman-echo.com/get');
    const [method, setMethod] = useState<HttpMethod>('GET');
    const [headers, setHeaders] = useState<HeaderEntry[]>([{ id: crypto.randomUUID(), key: '', value: '' }]);

    async function onClickSend() {
        setLoading(true);
        setResponse(null);
        // Build headers object, lowercasing header names and skipping empty keys
        const headersObj: Record<string, string> = {};
        headers.forEach(h => {
            if (h.key.trim()) {
                headersObj[h.key.trim().toLowerCase()] = h.value;
            }
        });

        const response = await window.electronAPI.sendRequest({
            method,
            headers: headersObj,
            url
        });

        setResponse(response);
        setLoading(false);
    }

    return (
        <div className="h-full min-h-0 flex flex-col overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20} className="h-full min-h-0">
                    <section className="h-full min-h-0 flex flex-col gap-2 p-4">
                        <RequestForm 
                            onSend={onClickSend} 
                            isLoading={isLoading}
                            url={url}
                            onUrlChange={setUrl}
                            method={method}
                            onMethodChange={setMethod}
                        />
                        <RequestSettings url={url} onUrlChange={setUrl} headers={headers} onHeadersChange={setHeaders} />
                    </section>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50} minSize={20} className="h-full min-h-0">
                    <section className="h-full min-h-0 flex flex-col gap-2 flex-1 p-4">
                        <div className="flex-1 min-h-0 flex flex-col">
                            <ResponseView response={response} isLoading={isLoading} />
                        </div>
                    </section>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
