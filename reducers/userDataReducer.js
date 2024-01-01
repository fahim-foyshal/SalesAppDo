import {
    FETCH_USERDATA_REQUEST
} from '../action/actionsType'

const initialState = {
    loading: false,
    userData: null,
    error: null,
   
  };

  const userinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERDATA_REQUEST:
          
            return {
              ...state,
              loading: true,
              userData:action?.payload,
              error: null,
            };
        
        default:
            return state;

    }
  }

  export default userinformation;