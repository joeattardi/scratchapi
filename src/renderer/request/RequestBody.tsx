import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { HttpMethod } from 'src/shared/types';
import { HttpHeaderOption } from './types';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { html } from '@codemirror/lang-html';
import type { Extension } from '@codemirror/state';

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

function getLanguageExtension(bodyType: BodyType): Extension[] {
    switch (bodyType) {
        case 'json':
            return [json()];
        case 'xml':
            return [xml()];
        case 'html':
            return [html()];
        case 'text':
            return [];
    }
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

    // Add Content-Type header when body has content and no header exists
    useEffect(() => {
        const contentTypeIndex = headers.findIndex((h) => h.key.toLowerCase() === 'content-type');

        if (body.trim() && contentTypeIndex < 0 && !isBodyDisabled) {
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
                        <p>{t('request.noBody', { method })}</p>
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
                                    <SelectItem value="json">{t('request.body.type.json')}</SelectItem>
                                    <SelectItem value="text">{t('request.body.type.text')}</SelectItem>
                                    <SelectItem value="xml">{t('request.body.type.xml')}</SelectItem>
                                    <SelectItem value="html">{t('request.body.type.html')}</SelectItem>
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

                        <CodeMirror
                            value={body}
                            onChange={onChange}
                            extensions={getLanguageExtension(bodyType)}
                            placeholder={t('request.body.placeholder')}
                            className="border rounded-md overflow-hidden"
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightSpecialChars: true,
                                foldGutter: true,
                                drawSelection: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                bracketMatching: true,
                                closeBrackets: true,
                                autocompletion: true,
                                rectangularSelection: true,
                                crosshairCursor: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                closeBracketsKeymap: true,
                                searchKeymap: true,
                                foldKeymap: true,
                                completionKeymap: true,
                                lintKeymap: true
                            }}
                            style={{ minHeight: '300px', fontSize: '14px' }}
                        />
                    </>
                )}
            </div>
        </TabsContent>
    );
}
