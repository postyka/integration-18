import { SELECT_CURRENCY } from '../actions/types';

const INITIAL_STATE = {
	activeCurrency: 'ETH',
    currencies : {
	    'ETH': {
		    name: 'ETH',
		    data: [],
	    },
	    'BTC': {
		    name: 'BTC',
		    data: [],
	    },
	    'LTC': {
		    name: 'LTC',
		    data: [],
	    }
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
	    case SELECT_CURRENCY:
	    	return {
			    ...state,
			    activeCurrency: action.payload.currency,
			    currencies: {
				    ...state.currencies,
				    [action.payload.currency]: {
					    ...state.currencies[action.payload.currency],
					    ...{ data : action.payload.data }
				    }
			    }
		    }
		    break;
        default:
            return state;
    }
};