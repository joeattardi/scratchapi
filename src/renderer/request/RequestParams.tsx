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

interface QueryParam {
    id: string;
    key: string;
    value: string;
}

export default function RequestParams() {
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
                            <TableHead>Key</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {params.map((param) => (
                            <TableRow key={param.id}>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="Key"
                                        value={param.key}
                                        onChange={(e) => updateParam(param.id, 'key', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="Value"
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
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={addParam} variant="outline" className="self-start">
                    Add Parameter
                </Button>
            </div>
        </TabsContent>
    );
}
