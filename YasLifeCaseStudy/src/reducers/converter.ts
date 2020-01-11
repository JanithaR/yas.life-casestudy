import {ReduxAction} from '../interfaces/index';
import {currencies} from '../config';
import {CHANGE_DESIRED_CURRENCY, CHANGE_USER_INPUT} from '../actions/index';

const defaulState = {
	userInput: 100,
	desiredCurrency: currencies[0].pickerValue
};

const converter = (state = defaulState, action: ReduxAction) => {
	switch (action.type) {
		case CHANGE_DESIRED_CURRENCY:
			return {
				...state,
				desiredCurrency: action.payload
			};
		case CHANGE_USER_INPUT:
			if (action.payload) {
				return {
					...state,
					userInput: action.payload
				};
			}

			return {
				...state,
				userInput: 0
			};
		default:
			return state;
	}
};

export default converter;
