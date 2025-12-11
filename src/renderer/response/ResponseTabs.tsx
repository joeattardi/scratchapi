import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { HttpResponse } from '../../shared/types';
import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';
import ResponseCookies from './ResponseCookies';

interface ResponseTabsProps {
    response: HttpResponse;
}

function countCookies(headers: Record<string, string>): number {
    const setCookieHeader = headers['set-cookie'] || headers['Set-Cookie'];
    if (!setCookieHeader) {
        return 0;
    }
    return setCookieHeader.split('\n').filter(Boolean).length;
}

export default function ResponseTabs({ response }: ResponseTabsProps) {
    const headersCount = Object.keys(response.headers).length;
    const cookiesCount = countCookies(response.headers);
    return (
        <Tabs defaultValue="body">
            <TabsList>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">
                    Headers
                    <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0 bg-zinc-600 text-white">
                        {headersCount}
                    </Badge>
                </TabsTrigger>
                <TabsTrigger value="cookies">
                    Cookies
                    <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0 bg-zinc-600 text-white">
                        {cookiesCount}
                    </Badge>
                </TabsTrigger>
            </TabsList>
            <ResponseBody response={response} />
            <ResponseHeaders response={response} />
            <ResponseCookies response={response} />
        </Tabs>
    )
}