import { TabsContent } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { HttpResponse } from '../../shared/types';
import { TagIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface ResponseHeadersProps {
    response: HttpResponse;
}

export default function ResponseHeaders({ response }: ResponseHeadersProps) {
    const { t } = useTranslation();
    const headerEntries = Object.entries(response.headers);

    return (
        <TabsContent value="headers">
            <div className="bg-zinc-50 border border-zinc-200 rounded-md overflow-hidden h-full flex flex-col">
                {headerEntries.length > 0 ? (
                    <div className="overflow-auto flex-1">
                        <Table className="table-fixed w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3 font-semibold">
                                        {t('headers.name')}
                                    </TableHead>
                                    <TableHead className="w-2/3 font-semibold">
                                        {t('headers.value')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {headerEntries.map(([name, value]) => (
                                    <TableRow key={name}>
                                        <TableCell className="font-medium text-zinc-700 break-all whitespace-normal flex items-center gap-2">
                                            <TagIcon />
                                            {name}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm text-zinc-600 break-all whitespace-normal">
                                            {value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full p-8 text-zinc-400 text-sm">
                        {t('headers.empty')}
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
