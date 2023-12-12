import {
    FETCH_ROUTELIST_REQUEST
} from '../action/actionsType'

const initialState = {
    loading: false,
    routeData: null,
    error: null,
   
  };

  const routeinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROUTELIST_REQUEST:
            
            return {
              ...state,
              loading: true,
              routeData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default routeinformation;