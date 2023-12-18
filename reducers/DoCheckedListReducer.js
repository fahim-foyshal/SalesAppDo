import {
    FETCH_DO_CHECKED_LIST
} from '../action/actionsType'

const initialState = {
    loading: false,
    doCheckedData: null,
    error: null,
   
  };

  const doCheckedinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DO_CHECKED_LIST:
            
            return {
              ...state,
              loading: true,
              doCheckedData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default doCheckedinformation;