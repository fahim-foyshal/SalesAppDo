import React, { useEffect,useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NetInfo from '@react-native-community/netinfo';
import Login from './screens/Login';
import test from './screens/test';
import Dashboared from './screens/Dashboared';
import Home from './screens/Home';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAndUploadDoData, fetchAndUploadDoDetailsData, fetchCartData, fetchDoCheckedData, fetchDoData, fetchDoholdData, fetchalldoData } from './action/offlineDataFetchAction';
import BottomTab from './navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetOrder from './screens/GetOrder';
import { callApiForItemList, callApiForProductGroup, callApiForSubCategory, fetchshopdata } from './action/SyncAction';
import DoCheckedIndividual from './screens/DoCheckedIndividual';
// import BackgroundFetch from 'react-native-background-fetch';
import { fahim } from './components/BackgroundTasks';




const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const Stack = createNativeStackNavigator()


const App = () => {
 
  // useEffect(() => {  

  //   BackgroundFetch.configure({
  //     minimumFetchInterval: 15, // Minimum fetch interval in minutes
  //     stopOnTerminate: false, // Whether to stop background fetch on app termination
  //     startOnBoot: true, // Whether to start background fetch on device boot
  //     enableHeadless: true, // Whether to run the task even if the app is not running
  //   }, () => {
  //     fahim();
  //   }, (error) => {
  //     console.log('Background fetch failed to start', error);
  //   });

  // }, []);

  const dispatch = useDispatch();

  
  useEffect(() => {
    // Call the function initially
     NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(fetchAndUploadDoData());

      } });
   
    // dispatch(fetchAndUploadDoDetailsData());

    // Set up an interval to call the function every 5 minutes
    const intervalId = setInterval(() => {
      dispatch(fetchAndUploadDoData());
    }, 2* 60 * 1000);

    // Clear the interval on component unmount
    // return () => clearInterval(intervalId);
  }, [dispatch]);



  const [tablesCreated, setTablesCreated] = useState(false);

  

  // console.log(doData);
 
  

  useEffect(() => {

    checkAndSendApiRequest();
    dispatch(callApiForProductGroup());
    dispatch(fetchDoholdData());
    dispatch(fetchDoCheckedData())
 
    // dispatch(callApiForSubCategory());
    // dispatch(callApiForItemList());
  
    // Create the 'users' table if it doesn't exist and set the default value of isLoggedIn to 0
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (user_id TEXT PRIMARY KEY, user TEXT, password TEXT, full_name TEXT, mobile TEXT, dealer_code TEXT, region_id TEXT, zone_id TEXT, area_id TEXT, region_name TEXT, zone_name TEXT, area_name TEXT, isLoggedIn TEXT DEFAULT 0)',
        []
      );
    });
  
    // Create the 'routelist' table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS routelist (route_id INTEGER, route_name TEXT)', []);
    });
  
    // Create the 'stores' table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS stores (id INTEGER PRIMARY KEY AUTOINCREMENT, shop_name TEXT,shop_route_name TEXT,shop_owner_name TEXT, manager_name TEXT, manager_mobile TEXT, master_dealer_code INTEGER, product_group TEXT, target_shop TEXT, market_id TEXT, route_id INTEGER, area_id INTEGER, zone_id INTEGER, region_id INTEGER, shop_class TEXT, shop_type TEXT, shop_channel TEXT, shop_route_type TEXT, shop_identity TEXT, mobile TEXT, shop_address TEXT, status INTEGER, otp INTEGER, latitude TEXT, longitude TEXT,picture TEXT, image_compress INTEGER, copy_done INTEGER, entry_by INTEGER, datetime DATETIME,upload_status TEXT DEFAULT 0)',
        []
      );
    });
  
    // Create a new table for the provided data
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS product_groups (id INTEGER PRIMARY KEY, group_name TEXT)',
        []
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS subcategories (id INTEGER PRIMARY KEY, subcategory_name TEXT, category_id TEXT)',
        []
      );
    });
    

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS item_info (item_id INTEGER PRIMARY KEY, item_name TEXT, item_name_short TEXT, item_group TEXT, category_id TEXT, subcategory_id TEXT, finish_goods_code TEXT, unit_name TEXT, pack_size TEXT, t_price TEXT, nsp_per TEXT, sales_item_type TEXT)',
        []
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS do_master (do_no TEXT, do_Date DATE, dealer_code TEXT,shop_name TEXT, status TEXT, remarks TEXT, visit TEXT, memo TEXT, longitude TEXT, latitude TEXT, upload_status TEXT)',
        []
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS item_add_info(do_no TEXT, do_date DATE, item_id TEXT, item_name TEXT,dealer_code TEXT, t_price TEXT,nsp_per TEXT,pack_size TEXT,unit_price TEXT, total_unit TEXT, total_amt TEXT, do_synced TEXT,upload_status TEXT)',
        []
      );
    });
    
  
    // After creating tables, set tablesCreated to true
    setTablesCreated(true);
  }, []);
  


  const checkAndSendApiRequest = async () => {
    try {
      // Retrieve the last request timestamp from AsyncStorage
      const lastRequestTimestamp = await AsyncStorage.getItem('lastRequestTimestamp');

      // Get the current date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split('T')[0];

      // If last request was not made today, send API request
      if (lastRequestTimestamp !== currentDate) {
        // TODO: Make your API request here

       
        // Update the last request timestamp in AsyncStorage
        await AsyncStorage.setItem('lastRequestTimestamp', currentDate);

        // Log or dispatch actions as needed
        console.log('API request sent!');
      } else {
        // Log or dispatch actions for when no API request is needed

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (

    <NavigationContainer style={{ backgroundColor: 'white' }}>
      {tablesCreated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Bottomtab" component={BottomTab}   />
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen
          name="GetOrder"
          component={GetOrder}
          options={{ headerShown: true, title: 'Get Order' }}
        ></Stack.Screen>
        <Stack.Screen
          name="GetCheckedIndividual"
          component={DoCheckedIndividual}
          options={{ headerShown: true, title: 'Checked Do List' }}
        ></Stack.Screen>
          
          {/* <Stack.Screen name="Home" component={Home}></Stack.Screen>  */}
          {/* <Stack.Screen name="Dashboared" component={Dashboared}></Stack.Screen>  */}
        </Stack.Navigator>
      ) : (
        <View>
          {/* You can show a loading indicator or some other UI while tables are being created */}
          <Text>Loading...</Text>
        </View>
      )}
    </NavigationContainer>


  );
}

export default App;