import { baseApiUrl, latestEndpoint, fixerKey } from 'src/config';
import { getCommaSeparatedCurrencyCodes } from 'src/utils';
import { FixerLatest } from 'src/interfaces';

export function callApi(url: string): Promise<FixerLatest> {
    return fetch(url).then((response) => response.json());
}

export function composeLatestEndpointUrl(): string {
    return `${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${getCommaSeparatedCurrencyCodes()}`;
}
