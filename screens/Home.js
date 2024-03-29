
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import SQLite from 'react-native-sqlite-storage';
import Dashboared from './Dashboared';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductGroupListData, fetchUserData, fetchUserRouteListData } from '../action/UserDataAction';
import AddShop from './AddShop';
import ShopList from './ShopList';
import offlineOrder from '../reducers/OfflineOrder';
import OrderData from './OrderData';
import OrderList from './OrderList';
import { fetchCartData, uploadAttendance } from '../action/offlineDataFetchAction';
import HomeDashBoard from './HomeDashBoard';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MakeSo from './MakeSo';
import SyncProductGroup from './SyncProductGroup';
import SyncSubCategory from './SyncSubCategory';
import syncItemList from './SyncItemList';
import CustomDrawer from '../navigation/CustomDrawer';
import { fetchshopdata } from '../action/SyncAction';
import DoHoldList from './DoHoldList';
import DoCheckedList from './DoCheckedList';
import BackgroundLocation from '../BackGroundTasks/BackgroundLocation';
import Attendance from './Attendance';
import MonthlyAttendance from './MonthlyAttendance';
import Login from './Login';




const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });




  const Drawer = createDrawerNavigator();




const Home = ({navigation}) => {

  
  const dispatch = useDispatch();
   
  dispatch(fetchUserData());
  dispatch(fetchUserRouteListData());
  dispatch(fetchCartData());
  dispatch(fetchProductGroupListData());
  dispatch(uploadAttendance())
  
  

 
 
 

  useEffect(() => {

  
    // Check if the user is logged in (data is saved in the database)
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE isLoggedIn = 1',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            // User is logged in, retrieve their data
          
            const item = results.rows.item(0);
       
            dispatch(fetchshopdata(item.dealer_code));
         
            
          }
          else{
            
          }
        },
        (error) => {
   
        
        }
      );
    });
  }, []);

  return (

    <Drawer.Navigator initialRouteName="Dashboared"
    drawerContent={(props) => <CustomDrawer {...props} 

  
    />}

    >
      <Drawer.Screen name="Dashboared" component={Dashboared}   options={{ headerShown: false, }}  />
     
      
      <Drawer.Screen name="Add shop" component={AddShop}   />
      <Drawer.Screen name="Shop List" component={ShopList}   />
      <Drawer.Screen name="Login" component={Login}   />
      <Drawer.Screen name="offlineorders" component={OrderData}   />
      <Drawer.Screen name="Order List" component={OrderList}   />
      <Drawer.Screen name="Homedashboard" component={HomeDashBoard}   />
      <Drawer.Screen name="CreateOrder" component={MakeSo}   />
      <Drawer.Screen name="DoHold" component={DoHoldList}   />
      <Drawer.Screen name="DoChecked" component={DoCheckedList}options={{
        headerStyle: {
          backgroundColor: '#318CE7',
        },
        headerTintColor: 'white',
      }}  />
      <Drawer.Screen name="Themes" component={ThemeSwitcher}   />
      <Drawer.Screen name="Category" component={SyncProductGroup}   />
      <Drawer.Screen name="SubCategory" component={SyncSubCategory}   />
      <Drawer.Screen name="ItemList" component={syncItemList}   />
      <Drawer.Screen name="Location" component={BackgroundLocation}   />
      <Drawer.Screen name="Attendance" component={Attendance}   />
      <Drawer.Screen name="Monthly Attendance" component={MonthlyAttendance}
       options={{
        headerStyle: {
          backgroundColor: 'rgb(8 145 178)',
        },
        headerTintColor: 'white',
      }}   />
      
      
      {/* <Drawer.Screen name="StoreAdd" component={StoreAddScreen} initialParams={{ userInfo:userData,location:location}} />
      <Drawer.Screen name="OrderData" component={OrderData} initialParams={{ userInfo:userData,location:location}} /> */}
    </Drawer.Navigator>


      
   
  )
}

export default Home

