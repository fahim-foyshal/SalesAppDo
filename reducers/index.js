import { combineReducers } from 'redux';
import offlineOrder from './OfflineOrder';
import userinformation from './userDataReducer';
import routeinformation from './routeListReducer';
import themeReducer from './themeReducer';


const rootReducer = combineReducers({
  useralldetails:userinformation,
  routedetails:routeinformation,
  offlineOrderdetails:offlineOrder,
  themecolor:themeReducer,

});

export default rootReducer;