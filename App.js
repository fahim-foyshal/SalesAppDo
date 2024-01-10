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
import BackgroundFetch from 'react-native-background-fetch';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { fahimbackground } from './components/BackgroundTasks';
import Logincheck from './screens/Logincheck';
import MonthlyAttendance from './screens/MonthlyAttendance';
import Organization from './screens/Organization';

import BackgroundService from 'react-native-background-actions';



// import './components/BackgroundTasks.js';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

// const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));




// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).
// const veryIntensiveTask = async (taskDataArguments) => {





//     // Example of an infinite loop task
//     const { delay } = taskDataArguments;
//     await new Promise( async (resolve) => {
//         for (let i = 0; BackgroundService.isRunning(); i++) {
      

// //           console.log("hasannnnnnnnnnnnnnnn");

// Geolocation.getCurrentPosition(info => {
//   console.log(info);

//   const { latitude, longitude, accuracy, altitude, heading, speed } = info.coords;
//   const currentDate = new Date();
//   const locationString = "http://192.144.82.199/~mepgroup/1027/sales_mod/pages/report/view_map.php?lat=" + latitude + "&long=" + longitude;

//   // Format the current time and date separately
//   const currentTime = currentDate.toTimeString().split(' ')[0]; // Format HH:mm:ss
//   const currentDateOnly = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

//   // Create the payload with latitude, longitude, altitude, heading, speed, and accuracy
//   const payload = [{
//       msg: "testgetposition",
//       date: currentDateOnly,
//       time: currentTime,
//       latitude,
//       longitude,
//       altitude,
//       heading,
//       speed,
//       accuracy,
//       locationString
//   }];

//   // Call your API with the modified payload
//   axios.post('https://ezzy-erp.com/newapp/api/api_testAutoBackground.php', payload)
//       .then((response) => {
//           console.log('API Response:', response.data);

//           // Update for ss doDetails in the same transaction
//       })
//       .catch((error) => {
//           console.error('Error sending data to API:', error);
//       });
// });



//             await sleep(delay);
//         }
//     });
// };

// const options = {
//     taskName: 'Example',
//     taskTitle: 'ExampleTask title',
//     taskDesc: 'ExampleTask description',
//     taskIcon: {
//         name: 'ic_launcher',
//         type: 'mipmap',
//     },
//     color: '#ff00ff',
//     linkingURI: 'fahimsalesapp://chat/jane', // See Deep Linking for more info
//     parameters: {
//         delay: 120000,
//     },
// };


const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const Stack = createNativeStackNavigator()


const App = () => {


  const linking = {
    prefixes: ['fahimsalesapp://'], // your custom scheme
    config: {
      screens: {
        Bottomtab: {
          path: 'bottomtab',
          screens: {
            // Define your screens here
            Home: 'home',
            Login: 'login',
            GetOrder: 'getorder', // Adjust the path for other screens as needed
            GetCheckedIndividual: 'getcheckedindividual', // Adjust the path for other screens as needed
          },
        },
        Backgroundlocation:{
          path:"Login",
        }
      },
    },
  };

  // const startBackgroundService = async () => {
  //   await BackgroundService.start(veryIntensiveTask, options);
  // };

  // useEffect(() => {
  //   // startBackgroundService();
  //   console.log("hi i am watch");
  //   const watchId = Geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const currentDate = new Date();
  //       const currentTime = currentDate.toTimeString().split(' ')[0]; // Format HH:mm:ss
  //       const currentDateOnly = currentDate.toISOString().split('T')[0]; 
  //       console.log(currentTime);// Format YYYY-MM-DD
        
      
  //                         // Create the payload with latitude and longitude
  //                     const payload = [{
  //                             msg: "testwatchposition",
  //                             date: currentDateOnly,
  //                             time:currentTime,
  //                             latitude,
  //                             longitude
  //                         }];

  //       axios.post('https://ezzy-erp.com/newapp/api/api_testAutoBackground.php', payload)
  //         .then((response) => {
  //           console.log('Location updated successfully:', response.data);
  //         })
  //         .catch((error) => {
  //           console.error('Error updating location:', error);
  //         });
  //     },
  //     (error) => {
  //       console.log('Error getting location:', error);
  //     },
  //     {
  //       enableHighAccuracy: true, // Use high accuracy mode if available
  //       timeout: 60000, // Set a timeout of 5 seconds
  //       maximumAge: 10000, // Accept a cached position that is at most 10 seconds old
  //       distanceFilter: 10, // Minimum distance (in meters) to trigger an update
  //     }
  //   );

  //   // Clean up the watchId when the component unmounts
  //   return () => {
  //     Geolocation.clearWatch(watchId);
  //   };
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
        'CREATE TABLE IF NOT EXISTS users (user_id TEXT PRIMARY KEY, user TEXT, password TEXT, full_name TEXT, mobile TEXT, dealer_code TEXT, region_id TEXT, zone_id TEXT, area_id TEXT, region_name TEXT, zone_name TEXT, area_name TEXT, user_image TEXT,isLoggedIn TEXT DEFAULT 0)',
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
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ss_attendancesheet(id INTEGER PRIMARY KEY AUTOINCREMENT,    username VARCHAR(255),date DATE,intime TIME, outtime TIME, note TEXT)',
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

    <NavigationContainer  linking={linking} style={{ backgroundColor: 'white' }}>
      {tablesCreated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="logincheck" component={Logincheck}   />
          <Stack.Screen name="Bottomtab" component={BottomTab}   />
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Organization" component={Organization}></Stack.Screen>
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
        <Stack.Screen
          name="MonthlyAttendance"
          component={MonthlyAttendance}
          options={{ headerShown: false, title: '' }}
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