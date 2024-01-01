
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

import SQLite from 'react-native-sqlite-storage';
import { fetchshopdata } from '../action/SyncAction';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';




const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const Logincheck = () => {

    const navigation = useNavigation();
    
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
                navigation.navigate('Bottomtab', { screen: 'Home' });
           

         
             
                
              }
              else{
                navigation.navigate('Organization')
              }
            },
            (error) => {
              navigation.navigate('Organization')
            
            }
          );
        });
      }, []);



  return (
    <View>
    {/* You can show a loading indicator or some other UI while tables are being created */}
    <Text>Loading...</Text>
  </View>
  )
}

export default Logincheck;
