export const changeUserInput = (input: number) => ({
	type: CHANGE_USER_INPUT,
	payload: input
});

export const changeDesiredCurrency = (desiredCurrency: string) => ({
	type: CHANGE_DESIRED_CURRENCY,
	payload: desiredCurrency
});

export const CHANGE_USER_INPUT: string = 'CHANGE_USER_INPUT';
export const CHANGE_DESIRED_CURRENCY: string = 'CHANGE_DESIRED_CURRENCY';
