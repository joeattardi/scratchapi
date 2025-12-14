import { SpinnerBallIcon } from '@phosphor-icons/react';

export default function LoadingState() {
    return (
        <div className="flex flex-col items-center p-4 grow mt-8">
            <SpinnerBallIcon size={150} weight="duotone" className="animate-spin text-zinc-300" />
        </div>
    );
}
