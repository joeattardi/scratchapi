import { TabsContent } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { HttpResponse } from '../../shared/types';
import { CookieIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface ResponseCookiesProps {
    response: HttpResponse;
}

interface ParsedCookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: string;
    httpOnly: boolean;
    secure: boolean;
}

function parseCookies(headers: Record<string, string>): ParsedCookie[] {
    const setCookieHeader = headers['set-cookie'] || headers['Set-Cookie'];

    if (!setCookieHeader) {
        return [];
    }

    // Set-Cookie can be a single string or multiple cookies separated by newlines
    const cookieStrings = setCookieHeader.split('\n').filter(Boolean);

    return cookieStrings.map(cookieString => {
        const parts = cookieString.split(';').map(p => p.trim());
        const [nameValue, ...attributes] = parts;
        const [name, value] = nameValue.split('=').map(p => p.trim());

        const cookie: ParsedCookie = {
            name: name || '',
            value: value || '',
            httpOnly: false,
            secure: false,
        };

        attributes.forEach(attr => {
            const [key, val] = attr.split('=').map(p => p.trim());
            const lowerKey = key.toLowerCase();

            if (lowerKey === 'domain') {
                cookie.domain = val;
            } else if (lowerKey === 'path') {
                cookie.path = val;
            } else if (lowerKey === 'expires') {
                cookie.expires = val;
            } else if (lowerKey === 'max-age') {
                const seconds = parseInt(val, 10);
                if (!isNaN(seconds)) {
                    const expiryDate = new Date(Date.now() + seconds * 1000);
                    cookie.expires = expiryDate.toUTCString();
                }
            } else if (lowerKey === 'httponly') {
                cookie.httpOnly = true;
            } else if (lowerKey === 'secure') {
                cookie.secure = true;
            }
        });

        return cookie;
    });
}

export default function ResponseCookies({ response }: ResponseCookiesProps) {
    const { t } = useTranslation();
    const cookies = parseCookies(response.headers);

    return (
        <TabsContent value="cookies">
            <div className="bg-zinc-50 border border-zinc-200 rounded-md overflow-hidden h-full flex flex-col">
                {cookies.length > 0 ? (
                    <div className="overflow-auto flex-1 p-4">
                        <div className="space-y-4">
                            {cookies.map((cookie, index) => (
                                <Card key={`${cookie.name}-${index}`} className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <CookieIcon size={24} />
                                            <span>{cookie.name}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div>
                                            <div className="text-xs font-medium text-zinc-500 mb-1">{t('cookies.value')}</div>
                                            <div className="font-mono text-sm text-zinc-700 break-words">
                                                {cookie.value}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            {cookie.domain && (
                                                <div>
                                                    <div className="text-xs font-medium text-zinc-500 mb-1">{t('cookies.domain')}</div>
                                                    <div className="text-sm text-zinc-700">{cookie.domain}</div>
                                                </div>
                                            )}
                                            {cookie.path && (
                                                <div>
                                                    <div className="text-xs font-medium text-zinc-500 mb-1">{t('cookies.path')}</div>
                                                    <div className="text-sm text-zinc-700">{cookie.path}</div>
                                                </div>
                                            )}
                                        </div>

                                        {cookie.expires && (
                                            <div className="pt-1">
                                                <div className="text-xs font-medium text-zinc-500 mb-1">{t('cookies.expires')}</div>
                                                <div className="text-sm text-zinc-700 break-words">{cookie.expires}</div>
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-2">
                                            {cookie.httpOnly && (
                                                <div className="flex items-center gap-1.5 text-sm">
                                                    <span className="text-green-600 font-semibold">✓</span>
                                                    <span className="text-zinc-600">{t('cookies.httpOnly')}</span>
                                                </div>
                                            )}
                                            {cookie.secure && (
                                                <div className="flex items-center gap-1.5 text-sm">
                                                    <span className="text-green-600 font-semibold">✓</span>
                                                    <span className="text-zinc-600">{t('cookies.secure')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full p-8 text-zinc-400 text-sm">
                        {t('cookies.empty')}
                    </div>
                )}
            </div>
        </TabsContent>
    );
}
