import {AppRegistry} from 'react-native';
import { useEffect,useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/configure';
import App from './App';
import GetLocation from 'react-native-get-location'
import Geolocation from '@react-native-community/geolocation';
import BackgroundFetch from "react-native-background-fetch";
import {name as appName} from './app.json';
const ReduxApp = () => (

  
    <Provider store={store}>

         <App />

    </Provider>
  );

  Geolocation.setRNConfiguration({
    skipPermissionRequests: false, // Set to true if you handle permissions manually
    authorizationLevel: 'auto', // You can set this according to your needs
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto', // You can set this to 'playServices' or 'android' based on your requirements
  });

  // useEffect(() => {  



  // }, []);

  // let MyHeadlessTask = async (event) => {
  //   // Get task id from event {}:
  //   console.log("hi i am inside headless")
  //   // let taskId = event;
  //   // let isTimeout = event.timeout;  // <-- true when your background-time has expired.
  //   // if (isTimeout) {
  //   //   console.log("hi i am inside istimeout")
  //   //   // This task has exceeded its allowed running-time.
  //   //   // You must stop what you're doing immediately finish(taskId)
  //   //   console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
  //   //   BackgroundFetch.finish(taskId);
  //   //   return;
  //   // }
  //   console.log("hi i am outside headless")
  //   console.log('[BackgroundFetch HeadlessTask] start: ');
  
  //   // Perform an example HTTP request.
  //   // Important:  await asychronous tasks when using HeadlessJS.
  //   let response = await fetch('https://reactnative.dev/movies.json');
  //   console.log("hi i am below api call")
  //   let responseJson = await response.json();
  //   console.log('[BackgroundFetch HeadlessTask] response: ', responseJson);

  //   console.log("hi i am after json response")
  
  //   // Required:  Signal to native code that your task is complete.
  //   // If you don't do this, your app could be terminated and/or assigned
  //   // battery-blame for consuming too much time in background.
  //   // BackgroundFetch.finish(taskId);
  // }
  

//   let MyHeadlessTask = async (event) => {
//     console.log('hi i am inside headless');
//     console.log('[BackgroundFetch HeadlessTask] start: ');
  
//     try {
//       const location = await GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 60000,
//       });
  
//       const { latitude, longitude } = location;
//       console.log(`Current Latitude: ${latitude}, Longitude: ${longitude}`);
//       // Now you can use latitude and longitude in your task logic
//     } catch (error) {
//       console.error(`Error getting location: ${error.message}`);
//     }
  
//     // Perform other tasks if needed
  
//     console.log('hi i am after getting location');
  
//     // BackgroundFetch.finish(taskId); // Uncomment this line if needed
//   };

//   BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15,
//       enableHeadless: true,
//       forceAlarmManager: true,
//       stopOnTerminate: false,
//       startOnBoot: true,
//       requiresCharging: false, // Default
//       requiresDeviceIdle: false, // Default
//       requiresBatteryNotLow: false, // Default
//       requiresStorageNotLow: false, // Default
//     },
//     async taskId => {
//       // const result = await MyHeadlessTask(taskId);
//       // console.log('- result: ', result);
//       // BackgroundFetch.finish(taskId);
//       console.log("hi i aM FAHIM MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
//     },
//     taskId => {
//       console.log(`Task ${taskId} timed out`);
//       BackgroundFetch.finish(taskId);
//     },
//   );

// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => ReduxApp);
