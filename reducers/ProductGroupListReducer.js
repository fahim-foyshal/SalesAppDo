import {
    FETCH_PRODUCT_CATEGORY_LIST
} from '../action/actionsType'

const initialState = {
    loading: false,
    productGroupData: null,
    error: null,
   
  };

  const productgroupinformation = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_CATEGORY_LIST:
            
            return {
              ...state,
              loading: true,
              productGroupData:action?.payload,
              error: null,
            };
        default:
            return state;

    }
  }

  export default productgroupinformation;