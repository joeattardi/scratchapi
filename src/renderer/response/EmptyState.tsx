import { UploadIcon } from '@phosphor-icons/react';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center gap-4 text-zinc-500 text-sm">
            <UploadIcon className="w-32 h-32 grayscale opacity-25" />
            <span>Send a request to get started.</span>
        </div>
    )
}