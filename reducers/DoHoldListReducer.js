import {
    FETCH_DO_HOLD_LIST
} from '../action/actionsType'

const initialState = {
    loading: false,
    doHoldData: null,
    error: null,
   
  };

  const doHoldinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DO_HOLD_LIST:
            
            return {
              ...state,
              loading: true,
              doHoldData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default doHoldinformation;