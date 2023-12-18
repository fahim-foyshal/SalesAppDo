import { combineReducers } from 'redux';
import offlineOrder from './OfflineOrder';
import userinformation from './userDataReducer';
import routeinformation from './routeListReducer';
import themeReducer from './themeReducer';
import productgroupinformation from './ProductGroupListReducer';
import doinformation from './DoMasterDataFetch';
import doHoldinformation from './DoHoldListReducer';
import doCheckedinformation from './DoCheckedListReducer';


const rootReducer = combineReducers({
  useralldetails:userinformation,
  routedetails:routeinformation,
  offlineOrderdetails:offlineOrder,
  productcategory:productgroupinformation,
  doinformationdata:doinformation,
  doholdinformationdata:doHoldinformation,
  doCheckedinformationdata:doCheckedinformation,
  themecolor:themeReducer,

});

export default rootReducer;