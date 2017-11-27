import { SELECT_CURRENCY } from './types';

export const selectCurrency = currency => dispatch => {
	fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currency}&tsym=USD&limit=60`)
        .then(response => {
	        response.json().then(data => {
		        dispatch({
			        type: SELECT_CURRENCY,
			        payload: {
			          currency,
                      data: data.Data,
                    },
		        });
	        });
    })
};
