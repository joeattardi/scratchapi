import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface QueryParam {
    id: string;
    key: string;
    value: string;
}

export default function RequestParams() {
    const { t } = useTranslation();

    const [params, setParams] = useState<QueryParam[]>([
        { id: crypto.randomUUID(), key: '', value: '' },
    ]);

    const addParam = () => {
        setParams([...params, { id: crypto.randomUUID(), key: '', value: '' }]);
    };

    const updateParam = (id: string, field: 'key' | 'value', newValue: string) => {
        setParams(params.map(param =>
            param.id === id ? { ...param, [field]: newValue } : param
        ));
    };

    const deleteParam = (id: string) => {
        if (params.length === 1) {
            setParams([{ id: crypto.randomUUID(), key: '', value: '' }]);
        } else {
            setParams(params.filter(param => param.id !== id));
        }
    };

    return (
        <TabsContent value="params">
            <div className="flex flex-col gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('request.params.key')}</TableHead>
                            <TableHead>{t('request.params.value')}</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {params.map((param) => (
                            <TableRow key={param.id}>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder={t('request.params.key')}
                                        value={param.key}
                                        onChange={(e) => updateParam(param.id, 'key', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder={t('request.params.value')}
                                        value={param.value}
                                        onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteParam(param.id)}
                                    >
                                        <XIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={addParam} variant="outline" className="self-start">
                    {t('request.params.add')}
                </Button>
            </div>
        </TabsContent>
    );
}
