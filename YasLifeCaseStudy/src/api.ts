export const makeRequest = (url: string) =>
	fetch(url).then(response => response.json());
