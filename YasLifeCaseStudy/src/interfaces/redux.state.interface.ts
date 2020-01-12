import { FixerLatest } from './fixer.latest.interface';
import { Rate } from './fixer.rate.interface';

export interface ReduxState {
	userInput: number;
	desiredCurrency: string;
	isFetchingLatestRates: boolean;
	latestRatesFetchError: string | null;
	latestRatesFetchResponse: FixerLatest | null;
	outputs: Rate | null;
}
