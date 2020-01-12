import { Rate } from './fixer.rate.interface';

export interface FixerLatest {
	success: boolean;
	timestamp: number;
	base: string;
	date: string;
	rates: Rate;
}
