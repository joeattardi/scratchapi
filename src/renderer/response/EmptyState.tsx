import icon from '../images/icon.svg';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center gap-4 text-zinc-500 text-sm">
            <img src={icon} alt="Network Icon" className="w-32 h-32 grayscale opacity-25" />
            <span>Nothing to show yet. Send a request to get started.</span>
        </div>
    )
}