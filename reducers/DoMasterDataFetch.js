import {
    FETCH_DO_LIST
} from '../action/actionsType'

const initialState = {
    loading: false,
    doData: null,
    error: null,
   
  };

  const doinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DO_LIST:
            
            return {
              ...state,
              loading: true,
              doData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default doinformation;