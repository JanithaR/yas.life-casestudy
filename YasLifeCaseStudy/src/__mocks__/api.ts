export const makeRequest = () => {
	console.log('### mocking make request ###');

	return {
		success: true,
		timestamp: 1578884105,
		base: 'EUR',
		date: '2020-01-13',
		rates: {
			DKK: 7.472523,
			INR: 78.625903,
			USD: 1.11235,
			THB: 33.547923,
			LKR: 201.214097
		}
	};
};
