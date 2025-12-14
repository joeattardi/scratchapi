import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestBody from './RequestBody';
import RequestHeaders from './RequestHeaders';
import RequestParams from './RequestParams';
import { useTranslation } from 'react-i18next';
import type { HttpMethod } from 'src/shared/types';

interface RequestSettingsProps {
    url: string;
    onUrlChange: (url: string) => void;
    headers: { id: string; key: string; value: string; enabled?: boolean }[];
    onHeadersChange: (
        headers: { id: string; key: string; value: string; enabled?: boolean }[]
    ) => void;
    body: string;
    onBodyChange: (body: string) => void;
    method: HttpMethod;
}

export default function RequestSettings({
    url,
    onUrlChange,
    headers,
    onHeadersChange,
    body,
    onBodyChange,
    method
}: RequestSettingsProps) {
    const { t } = useTranslation();

    return (
        <div>
            <Tabs defaultValue="params">
                <TabsList>
                    <TabsTrigger value="params">{t('request.params.title')}</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                    <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>
                <RequestParams url={url} onUrlChange={onUrlChange} />
                <RequestHeaders headers={headers} onChange={onHeadersChange} />
                <RequestBody
                    body={body}
                    onChange={onBodyChange}
                    headers={headers}
                    onHeadersChange={onHeadersChange}
                    method={method}
                />
            </Tabs>
        </div>
    );
}
