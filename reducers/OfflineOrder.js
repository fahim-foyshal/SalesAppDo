import {
    FETCH_ORDEROFFLINE_REQUEST
} from '../action/actionsType'

const initialState = {
    loading: false,
    orderData: null,
    error: null,
   
  };

  const offlineOrder = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDEROFFLINE_REQUEST:
            return {
              ...state,
              loading: true,
              orderData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default offlineOrder