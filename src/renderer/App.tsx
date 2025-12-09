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
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                    <section className="flex flex-col gap-2 p-4">
                        <RequestForm onSend={onClickSend} isLoading={isLoading} />
                        <RequestSettings />
                    </section>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <section className="flex flex-col gap-2 min-h-0 flex-1 p-4">
                        <ResponseView response={response} isLoading={isLoading} />
                    </section>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
