

import React from 'react';
import { View, Button } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';



Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));




// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).
const veryIntensiveTask = async (taskDataArguments) => {





    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
      

//           console.log("hasannnnnnnnnnnnnnnn");

Geolocation.getCurrentPosition(info => {
  console.log(info);

  const { latitude, longitude, accuracy, altitude, heading, speed } = info.coords;
  const currentDate = new Date();
  const locationString = "http://192.144.82.199/~mepgroup/1027/sales_mod/pages/report/view_map.php?lat=" + latitude + "&long=" + longitude;

  // Format the current time and date separately
  const currentTime = currentDate.toTimeString().split(' ')[0]; // Format HH:mm:ss
  const currentDateOnly = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

  // Create the payload with latitude, longitude, altitude, heading, speed, and accuracy
  const payload = [{
      msg: "testgetposition",
      date: currentDateOnly,
      time: currentTime,
      latitude,
      longitude,
      altitude,
      heading,
      speed,
      accuracy,
      locationString
  }];

  // Call your API with the modified payload
  axios.post('https://ezzy-erp.com/newapp/api/api_testAutoBackground.php', payload)
      .then((response) => {
          console.log('API Response:', response.data);

          // Update for ss doDetails in the same transaction
      })
      .catch((error) => {
          console.error('Error sending data to API:', error);
      });
});



            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'fahimsalesapp://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 120000,
    },
};

const BackgroundLocation = () => {
  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const stopBackgroundService = async () => {
    await BackgroundService.stop();
  };

  return (
    <View>
      <Button title="Start Background Service" onPress={startBackgroundService} />
      <Button title="Stop Background Service" onPress={stopBackgroundService} />
    </View>
  );
};

export default BackgroundLocation;