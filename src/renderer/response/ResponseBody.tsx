import { TabsContent } from '@/components/ui/tabs';
import { HttpResponse } from '../../shared/types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

interface ResponseBodyProps {
    response: HttpResponse;
}

function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

export default function ResponseBody({ response }: ResponseBodyProps) {
    const isJson = isJsonString(response.body);
    const formattedBody = isJson ? JSON.stringify(JSON.parse(response.body), null, 2) : response.body;

    return (
        <TabsContent value="body">
            <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm min-h-0 flex-1 h-full flex flex-col">
                {isJson ? (
                    <SyntaxHighlighter
                        language="json"
                        style={github}
                        customStyle={{
                            margin: 0,
                            padding: 0,
                            background: 'transparent',
                            fontSize: '0.875rem',
                            flex: 1,
                            minHeight: 0,
                            overflow: 'auto'
                        }}
                    >
                        {formattedBody}
                    </SyntaxHighlighter>
                ) : (
                    <pre className="overflow-auto flex-1 min-h-0 whitespace-pre-wrap wrap-break-word text-sm">{response.body}</pre>
                )}
            </div>
        </TabsContent>
    );
}
