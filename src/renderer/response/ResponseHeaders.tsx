import { TabsContent } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { HttpResponse } from '../../shared/types';

interface ResponseHeadersProps {
    response: HttpResponse;
}

export default function ResponseHeaders({ response }: ResponseHeadersProps) {
    const headerEntries = Object.entries(response.headers);

    return (
        <TabsContent value="headers">
            <div className="bg-zinc-50 border border-zinc-200 rounded-md overflow-hidden h-full flex flex-col">
                {headerEntries.length > 0 ? (
                    <div className="overflow-auto flex-1">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3 font-semibold">Name</TableHead>
                                    <TableHead className="font-semibold">Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {headerEntries.map(([name, value]) => (
                                    <TableRow key={name}>
                                        <TableCell className="font-medium text-zinc-700">
                                            {name}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm text-zinc-600 break-words whitespace-normal">
                                            {value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full p-8 text-zinc-400 text-sm">
                        No headers in response
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
