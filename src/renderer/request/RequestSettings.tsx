import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestBody from './RequestBody';
import RequestHeaders from './RequestHeaders';
import RequestParams from './RequestParams';
import { useTranslation } from 'react-i18next';

export default function RequestSettings() {
    const { t } = useTranslation();

    return (
        <div>
            <Tabs defaultValue="params">
                <TabsList>
                    <TabsTrigger value="params">{t('request.params.title')}</TabsTrigger>
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
