import { useCallback } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface Header {
    id: string;
    key: string;
    value: string;
    enabled?: boolean;
}

interface RequestHeadersProps {
    headers: Header[];
    onChange: (headers: Header[]) => void;
}

export default function RequestHeaders({ headers, onChange }: RequestHeadersProps) {
    const { t } = useTranslation();

    const addHeader = useCallback(() => {
        onChange([...headers, { id: crypto.randomUUID(), key: '', value: '', enabled: true }]);
    }, [headers, onChange]);

    const updateHeader = useCallback(
        (id: string, field: 'key' | 'value', newValue: string) => {
            onChange(headers.map((h) => (h.id === id ? { ...h, [field]: newValue } : h)));
        },
        [headers, onChange]
    );

    const toggleHeader = useCallback(
        (id: string) => {
            onChange(headers.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h)));
        },
        [headers, onChange]
    );

    const deleteHeader = useCallback(
        (id: string) => {
            const next = headers.filter((h) => h.id !== id);
            onChange(
                next.length
                    ? next
                    : [{ id: crypto.randomUUID(), key: '', value: '', enabled: true }]
            );
        },
        [headers, onChange]
    );

    return (
        <TabsContent value="headers">
            <div className="flex flex-col gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead className="w-64">{t('request.headers.key')}</TableHead>
                            <TableHead>{t('request.headers.value')}</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {headers.map((h) => {
                            const isEnabled = h.enabled !== false;
                            return (
                                <TableRow key={h.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={isEnabled}
                                            onCheckedChange={() => toggleHeader(h.id)}
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Input
                                            type="text"
                                            placeholder={t('request.headers.key')}
                                            value={h.key}
                                            onChange={(e) =>
                                                updateHeader(h.id, 'key', e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Input
                                            type="text"
                                            placeholder={t('request.headers.value')}
                                            value={h.value}
                                            onChange={(e) =>
                                                updateHeader(h.id, 'value', e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteHeader(h.id)}
                                        >
                                            <XIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Button onClick={addHeader} variant="outline" className="self-start">
                    {t('request.headers.add')}
                </Button>
            </div>
        </TabsContent>
    );
}
