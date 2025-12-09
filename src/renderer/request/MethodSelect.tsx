import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { HttpMethod } from 'src/shared/types';

interface MethodSelectProps {
    value: HttpMethod;
    onChange: (method: HttpMethod) => void;
}

export default function MethodSelect({ value, onChange }: MethodSelectProps) {
    const { t } = useTranslation();

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-32 rounded-tr-none rounded-br-none border-r-0 bg-zinc-100">
                <SelectValue placeholder={t('request.method')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="GET">{t('http.method.GET')}</SelectItem>
                <SelectItem value="POST">{t('http.method.POST')}</SelectItem>
                <SelectItem value="PUT">{t('http.method.PUT')}</SelectItem>
                <SelectItem value="DELETE">{t('http.method.DELETE')}</SelectItem>
                <SelectItem value="PATCH">{t('http.method.PATCH')}</SelectItem>
                <SelectItem value="HEAD">{t('http.method.HEAD')}</SelectItem>
                <SelectItem value="OPTIONS">{t('http.method.OPTIONS')}</SelectItem>
            </SelectContent>
        </Select>
    );
}