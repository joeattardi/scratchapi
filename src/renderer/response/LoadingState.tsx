import { SpinnerBallIcon } from '@phosphor-icons/react';

export default function LoadingState() {
    return (
        <div className="flex flex-col items-center p-4">
            <SpinnerBallIcon size={128} weight="duotone" className="animate-spin text-zinc-300" />
        </div>
    )
}