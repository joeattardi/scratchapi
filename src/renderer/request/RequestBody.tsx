import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HttpMethod } from 'src/shared/types';
import { HttpHeaderOption } from './types';

interface RequestBodyProps {
    body: string;
    onChange: (body: string) => void;
    headers: HttpHeaderOption[];
    onHeadersChange: (headers: HttpHeaderOption[]) => void;
    method: HttpMethod;
}

type BodyType = 'json' | 'text' | 'xml' | 'html';

const CONTENT_TYPE_MAP: Record<BodyType, string> = {
    json: 'application/json',
    text: 'text/plain',
    xml: 'application/xml',
    html: 'text/html'
};

function getBodyTypeFromHeaders(headers: HttpHeaderOption[]): BodyType {
    const contentTypeHeader = headers.find((h) => h.key.toLowerCase() === 'content-type');
    if (contentTypeHeader) {
        const value = contentTypeHeader.value.toLowerCase();

        if (value.includes('application/json')) {
            return 'json';
        }

        if (value.includes('application/xml')) {
            return 'xml';
        }

        if (value.includes('text/html')) {
            return 'html';
        }

        if (value.includes('text/plain')) {
            return 'text';
        }
    }

    return 'json'; // Default
}

export default function RequestBody({
    body,
    onChange,
    headers,
    onHeadersChange,
    method
}: RequestBodyProps) {
    const { t } = useTranslation();

    const isBodyDisabled = method === 'GET' || method === 'HEAD';
    const bodyType = getBodyTypeFromHeaders(headers);

    // Manage Content-Type header based on body content
    useEffect(() => {
        const contentTypeIndex = headers.findIndex((h) => h.key.toLowerCase() === 'content-type');

        if (!body.trim()) {
            // Remove Content-Type header when body is empty
            if (contentTypeIndex >= 0) {
                const updatedHeaders = headers.filter((_, index) => index !== contentTypeIndex);
                onHeadersChange(updatedHeaders);
            }
        } else if (contentTypeIndex < 0 && !isBodyDisabled) {
            // Add Content-Type header when body has content and no header exists
            const updatedHeaders = [
                ...headers,
                {
                    id: crypto.randomUUID(),
                    key: 'Content-Type',
                    value: CONTENT_TYPE_MAP[bodyType],
                    enabled: true
                }
            ];
            onHeadersChange(updatedHeaders);
        }
    }, [body, headers, onHeadersChange, bodyType, isBodyDisabled]);

    // Clear body when method changes to GET or HEAD
    useEffect(() => {
        if (isBodyDisabled && body.trim()) {
            onChange('');
        }
    }, [isBodyDisabled, body, onChange]);

    const updateContentTypeHeader = (newBodyType: BodyType) => {
        // Find existing content-type header
        const contentTypeIndex = headers.findIndex((h) => h.key.toLowerCase() === 'content-type');

        if (contentTypeIndex >= 0) {
            // Update existing header
            const updatedHeaders = [...headers];
            updatedHeaders[contentTypeIndex] = {
                ...updatedHeaders[contentTypeIndex],
                value: CONTENT_TYPE_MAP[newBodyType],
                enabled: true
            };
            onHeadersChange(updatedHeaders);
        } else {
            // Add new header
            const updatedHeaders = [
                ...headers,
                {
                    id: crypto.randomUUID(),
                    key: 'Content-Type',
                    value: CONTENT_TYPE_MAP[newBodyType],
                    enabled: true
                }
            ];
            onHeadersChange(updatedHeaders);
        }
    };

    const formatJson = () => {
        try {
            const parsed = JSON.parse(body);
            onChange(JSON.stringify(parsed, null, 2));
        } catch (error) {
            // Silently ignore invalid JSON
        }
    };

    const minifyJson = () => {
        try {
            const parsed = JSON.parse(body);
            onChange(JSON.stringify(parsed));
        } catch (error) {
            // Silently ignore invalid JSON
        }
    };

    return (
        <TabsContent value="body">
            <div className="flex flex-col gap-2">
                {isBodyDisabled ? (
                    <div className="flex items-center justify-center min-h-[300px] text-zinc-500 text-sm">
                        <p>{method} requests cannot have a request body.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-2 items-center">
                            <Select
                                value={bodyType}
                                onValueChange={(v) => updateContentTypeHeader(v as BodyType)}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="xml">XML</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                </SelectContent>
                            </Select>

                            {bodyType === 'json' && (
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" onClick={formatJson}>
                                        {t('request.body.format')}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={minifyJson}>
                                        {t('request.body.minify')}
                                    </Button>
                                </div>
                            )}
                        </div>

                        <Textarea
                            value={body}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={t('request.body.placeholder')}
                            className="min-h-[300px] font-mono text-sm"
                            spellCheck={false}
                        />

                        <p className="text-xs text-zinc-500">{t('request.body.hint')}</p>
                    </>
                )}
            </div>
        </TabsContent>
    );
}
