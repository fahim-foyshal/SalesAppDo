import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData } from '../action/offlineDataFetchAction';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const OrderData = () => {

  const[loading,setLoading]=useState(true);
  const orderData = useSelector(state => state.offlineOrderdetails.orderData);
 
  const [storedData, setStoredData] = useState([]);
 


  useEffect(() => {

   
  }, []);

  const formatDateTime = (isoDateTime) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use AM/PM format
    };
    return new Date(isoDateTime).toLocaleString(undefined, options);
  };

  const fetchDataFromSQLite = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM stores',
        [],
        (tx, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; i++) {
            const item = results.rows.item(i);
            item.formattedDateTime = formatDateTime(item.datetime);
            data.push(item);
          }
          setStoredData(data);
        },
        (error) => {
          console.error('Error fetching data from SQLite:', error);
        }
      );
    });
  };

  return (
    <ScrollView>
      {orderData.map((item) => (
        <View key={item.id} className="bg-white m-4 rounded-xl flex flex-row" style={{elevation:10}}>
      {item.upload_status==1 && <View style={{zIndex:4}} className={`absolute -top-14 left-10 transform scale-[0.8]  bg-transparent ${loading?'visible':'hidden z-50'}`}>
               <LottieView  style={{position:'absolute',width:300,height:300}} source={require('../animations/checked.json')} autoPlay loop />
        </View>} 

          <View className="w-[55%]  m-3" style={{elevation:10}}>
            <Text>
              <Text className="font-extrabold text-base" style={{elevation:10}}>Shop Name:</Text>{' '}
              {item.shop_name}
            </Text>

            <Text>
              <Text className="font-extrabold text-base">Phone:</Text>{' '}
              {item.mobile}
            </Text>
            <Text>
              <Text className="font-extrabold text-base">Shop Type:</Text>{' '}
              {item.shop_route_name}
            </Text>
            <Text>
              <Text className="font-extrabold text-base">Date:</Text>{' '}
              {item.formattedDateTime} {/* Display the formatted date and time */}
            </Text>
            <Text>
              <Text className="font-extrabold text-base">Address: </Text>
              {item.shop_address}
            </Text>
          </View>
          <View className="m-2 relative top-3 rounded-md">
            <Image
              source={{ uri: item.picture }}
              style={{ width: 120, height: 120 }}
              className="rounded-md"
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderData;
