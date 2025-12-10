import { useState, useCallback } from 'react';
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
    TableRow,
} from '@/components/ui/table';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface QueryParam {
    id: string;
    key: string;
    value: string;
    enabled?: boolean;
}

interface RequestParamsProps {
    url: string;
    onUrlChange: (url: string) => void;
}

// Utility functions for URL parsing and serialization
function parseQueryParams(url: string, existingParams?: QueryParam[]): QueryParam[] {
    try {
        const urlObj = new URL(url);
        const params: QueryParam[] = [];
        const existingParamsMap = new Map(existingParams?.map(p => [p.key, p]) ?? []);

        urlObj.searchParams.forEach((value, key) => {
            const existing = existingParamsMap.get(key);
            params.push({
                id: existing?.id ?? crypto.randomUUID(),
                key,
                value,
                enabled: existing?.enabled ?? true
            });
        });

        // Always have at least one empty row
        if (params.length === 0) {
            params.push({ id: crypto.randomUUID(), key: '', value: '', enabled: true });
        }

        return params;
    } catch {
        // If URL is invalid, return empty params
        return [{ id: crypto.randomUUID(), key: '', value: '', enabled: true }];
    }
}

function buildUrlWithParams(baseUrl: string, params: QueryParam[]): string {
    try {
        const urlObj = new URL(baseUrl);

        // Clear existing query params
        urlObj.search = '';

        // Add new params (only if they have a key and are enabled)
        params.forEach(param => {
            if (param.key.trim() && param.enabled !== false) {
                urlObj.searchParams.append(param.key, param.value);
            }
        });

        return urlObj.toString();
    } catch {
        // If URL is invalid, return as-is
        return baseUrl;
    }
}

function getBaseUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        urlObj.search = '';
        return urlObj.toString();
    } catch {
        return url;
    }
}

export default function RequestParams({ url, onUrlChange }: RequestParamsProps) {
    const { t } = useTranslation();
    // Track the URL when we initiated an update to detect external changes
    const [lastInternalUrl, setLastInternalUrl] = useState(url);
    const [paramOverrides, setParamOverrides] = useState<QueryParam[] | null>(null);
    
    // Derive params: use overrides if we have them, otherwise parse from URL
    const params = paramOverrides !== null ? paramOverrides : parseQueryParams(url);

    // When the parent URL changes externally (not from our update), clear overrides
    if (url !== lastInternalUrl && paramOverrides !== null) {
        setParamOverrides(null);
    }

    const updateParamsAndUrl = useCallback((updatedParams: QueryParam[]) => {
        // Store the updated params locally
        setParamOverrides(updatedParams);
        // Build and send the new URL
        const newUrl = buildUrlWithParams(getBaseUrl(url), updatedParams);
        setLastInternalUrl(newUrl);
        onUrlChange(newUrl);
    }, [url, onUrlChange]);

    const addParam = () => {
        updateParamsAndUrl([...params, { id: crypto.randomUUID(), key: '', value: '', enabled: true }]);
    };

    const updateParam = useCallback((id: string, field: 'key' | 'value', newValue: string) => {
        const updatedParams = params.map(param =>
            param.id === id ? { ...param, [field]: newValue } : param
        );
        updateParamsAndUrl(updatedParams);
    }, [params, updateParamsAndUrl]);

    const toggleParam = useCallback((id: string) => {
        const updatedParams = params.map(param =>
            param.id === id ? { ...param, enabled: !param.enabled } : param
        );
        updateParamsAndUrl(updatedParams);
    }, [params, updateParamsAndUrl]);

    const deleteParam = useCallback((id: string) => {
        let updatedParams = params.filter(param => param.id !== id);

        // Always have at least one empty row
        if (updatedParams.length === 0) {
            updatedParams = [{ id: crypto.randomUUID(), key: '', value: '', enabled: true }];
        }

        updateParamsAndUrl(updatedParams);
    }, [params, updateParamsAndUrl]);

    return (
        <TabsContent value="params">
            <div className="flex flex-col gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead className="w-64">{t('request.params.key')}</TableHead>
                            <TableHead>{t('request.params.value')}</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {params.map((param) => {
                            const isEnabled = param.enabled !== false;
                            return (
                                <TableRow key={param.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={isEnabled}
                                            onCheckedChange={() => toggleParam(param.id)}
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Input
                                            type="text"
                                            placeholder={t('request.params.key')}
                                            value={param.key}
                                            onChange={(e) => updateParam(param.id, 'key', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Input
                                            type="text"
                                            placeholder={t('request.params.value')}
                                            value={param.value}
                                            onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={isEnabled ? '' : 'opacity-40'}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteParam(param.id)}
                                        >
                                            <XIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Button onClick={addParam} variant="outline" className="self-start">
                    {t('request.params.add')}
                </Button>
            </div>
        </TabsContent>
    );
}
