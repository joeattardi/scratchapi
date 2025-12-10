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

export default function App() {
    const [response, setResponse] = useState<HttpResponse | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>('https://postman-echo.com/get');
    const [method, setMethod] = useState<HttpMethod>('GET');

    async function onClickSend() {
        setLoading(true);
        setResponse(null);
        const response = await window.electronAPI.sendRequest({
            method,
            headers: {},
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
                        <RequestSettings url={url} onUrlChange={setUrl} />
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
