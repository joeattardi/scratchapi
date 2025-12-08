import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HttpMethod } from 'src/shared/types';

interface MethodSelectProps {
    value: HttpMethod;
    onChange: (method: HttpMethod) => void;
}

export default function MethodSelect({ value, onChange }: MethodSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-32 rounded-tr-none rounded-br-none border-r-0">
                <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="HEAD">HEAD</SelectItem>
                <SelectItem value="OPTIONS">OPTIONS</SelectItem>
            </SelectContent>
        </Select>
    );
}