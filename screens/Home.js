
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
import { fetchUserData, fetchUserRouteListData } from '../action/UserDataAction';
import AddShop from './AddShop';
import offlineOrder from '../reducers/OfflineOrder';
import OrderData from './OrderData';
import { fetchCartData } from '../action/offlineDataFetchAction';
import HomeDashBoard from './HomeDashBoard';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MakeSo from './MakeSo';
import SyncProductGroup from './SyncProductGroup';
import SyncSubCategory from './SyncSubCategory';
import syncItemList from './SyncItemList';



const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });




  const Drawer = createDrawerNavigator();




const Home = ({navigation}) => {
  const dispatch = useDispatch();
   
  dispatch(fetchUserData());
  dispatch(fetchUserRouteListData());
  dispatch(fetchCartData());
  

 
 
 

  useEffect(() => {

  
    // Check if the user is logged in (data is saved in the database)
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE isLoggedIn = 1',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            // User is logged in, retrieve their data
          

         
            
          }
          else{
            navigation.navigate('Login')
          }
        },
        (error) => {
          navigation.navigate('Login')
        
        }
      );
    });
  }, []);

  return (

    <Drawer.Navigator initialRouteName="Dashboared">
      <Drawer.Screen name="Dashboared" component={Dashboared}   options={{ headerShown: false }} />
     
      
      <Drawer.Screen name="Addshop" component={AddShop}   />
      <Drawer.Screen name="offlineorders" component={OrderData}   />
      <Drawer.Screen name="Homedashboard" component={HomeDashBoard}   />
      <Drawer.Screen name="CreateOrder" component={MakeSo}   />
      <Drawer.Screen name="Themes" component={ThemeSwitcher}   />
      <Drawer.Screen name="Category" component={SyncProductGroup}   />
      <Drawer.Screen name="SubCategory" component={SyncSubCategory}   />
      <Drawer.Screen name="ItemList" component={syncItemList}   />
      
      {/* <Drawer.Screen name="StoreAdd" component={StoreAddScreen} initialParams={{ userInfo:userData,location:location}} />
      <Drawer.Screen name="OrderData" component={OrderData} initialParams={{ userInfo:userData,location:location}} /> */}
    </Drawer.Navigator>


      
   
  )
}

export default Home

