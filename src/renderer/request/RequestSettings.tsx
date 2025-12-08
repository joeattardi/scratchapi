import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestBody from './RequestBody';
import RequestHeaders from './RequestHeaders';
import RequestParams from './RequestParams';

export default function RequestSettings() {
    return (
        <div>
            <Tabs defaultValue="params">
                <TabsList>
                    <TabsTrigger value="params">Params</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>
                <RequestParams />
                <RequestHeaders />
                <RequestBody />
            </Tabs>
        </div>
    )
}
