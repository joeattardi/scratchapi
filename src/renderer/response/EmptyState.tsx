import { UploadIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export default function EmptyState() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center gap-4 text-zinc-500 text-sm mt-16">
            <UploadIcon weight="light" className="w-32 h-32 grayscale opacity-25" />
            <span>{t('response.empty')}</span>
        </div>
    )
}