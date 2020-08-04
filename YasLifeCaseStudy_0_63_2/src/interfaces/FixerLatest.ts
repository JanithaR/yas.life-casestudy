import { Rate } from './FixerRate';

export interface FixerLatest {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Rate;
}

export function instanceOfFixerLatest(object: any): object is FixerLatest {
    return 'rates' in object;
}
