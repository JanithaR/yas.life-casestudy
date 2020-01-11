import { Rate } from './fixer.rate.interface';

export interface FixerLatest {
	success: string;
	timestamp: number;
	base: string;
	date: string;
	rates: Rate[];
}
