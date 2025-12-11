import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HttpResponse } from '../../shared/types';
import ResponseBody from './ResponseBody';

interface ResponseTabsProps {
    response: HttpResponse;
}

export default function ResponseTabs({ response }: ResponseTabsProps) {
    return (
        <Tabs defaultValue="body">
            <TabsList>
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
            <ResponseBody response={response} />
        </Tabs>
    )
}