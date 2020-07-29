import { FixerLatest } from 'src/interfaces';

export function callApi(url: string): Promise<FixerLatest> {
    return fetch(url).then((response) => response.json());
}
