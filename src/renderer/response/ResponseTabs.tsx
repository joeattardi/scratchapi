import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HttpResponse } from '../../shared/types';
import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';
import ResponseCookies from './ResponseCookies';

interface ResponseTabsProps {
    response: HttpResponse;
}

export default function ResponseTabs({ response }: ResponseTabsProps) {
    return (
        <Tabs defaultValue="body">
            <TabsList>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="cookies">Cookies</TabsTrigger>
            </TabsList>
            <ResponseBody response={response} />
            <ResponseHeaders response={response} />
            <ResponseCookies response={response} />
        </Tabs>
    )
}