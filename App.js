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
import Login from './screens/Login';
import test from './screens/test';
import Dashboared from './screens/Dashboared';
import Home from './screens/Home';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData } from './action/offlineDataFetchAction';
import BottomTab from './navigation/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';




const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const Stack = createNativeStackNavigator()


const App = () => {
 
 

  const dispatch = useDispatch();




  const [tablesCreated, setTablesCreated] = useState(false);

 
 
  

  useEffect(() => {
    checkAndSendApiRequest();
  
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
        'CREATE TABLE IF NOT EXISTS item_info (item_id INTEGER PRIMARY KEY, item_name TEXT, item_name_short TEXT, item_group TEXT, category_id TEXT, subcategory_id TEXT, finish_goods_code TEXT, unit_name TEXT, pack_size TEXT, t_price TEXT, vat_per TEXT, sales_item_type TEXT)',
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

         alert(<View>
          <Text>fsdfdfsdfs</Text>
         </View>);

        // Update the last request timestamp in AsyncStorage
        await AsyncStorage.setItem('lastRequestTimestamp', currentDate);

        // Log or dispatch actions as needed
        console.log('API request sent!');
      } else {
        // Log or dispatch actions for when no API request is needed
        alert(<View>
          <Text>fsdfdfsdfs</Text>
         </View>);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (

    <NavigationContainer style={{ backgroundColor: 'white' }}>
      {tablesCreated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="bottomtab" component={BottomTab}   />
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          
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