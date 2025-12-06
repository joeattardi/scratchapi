import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

export default function App() {
    return (
        <main className="p-4">
            <div className="flex items-center gap-2">
                <Input type="text" placeholder="Enter URL" />
                <Button>Send</Button>
            </div>
        </main>
    );
}
