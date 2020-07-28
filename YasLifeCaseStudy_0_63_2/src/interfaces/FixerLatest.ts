import { Rate } from './FixerRate';

export interface FixerLatest {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: Rate;
}
