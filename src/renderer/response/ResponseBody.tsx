import { TabsContent } from '@/components/ui/tabs';
import { HttpResponse } from '../../shared/types';

interface ResponseBodyProps {
    response: HttpResponse;
}

export default function ResponseBody({ response }: ResponseBodyProps) {
    return (
        <TabsContent value="body">
            <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-md text-sm min-h-0 flex-1 h-full flex flex-col">
                <pre className="overflow-auto flex-1 min-h-0 whitespace-pre-wrap wrap-break-word">{response.body}</pre>
            </div>
        </TabsContent>
    );
}
