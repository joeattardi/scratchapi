import { NetworkIcon } from '@phosphor-icons/react';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center p-4 text-zinc-500 text-sm">
            <NetworkIcon size={128} weight="duotone" className="text-zinc-300" />
            Nothing to show yet. Send a request to get started.
        </div>
    )
}