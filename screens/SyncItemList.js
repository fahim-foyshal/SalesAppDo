import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button,StatusBar, Text, TextInput, TouchableOpacity, Image, Vibration, Alert, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const CustomModal = ({ visible, onClose }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
          <Text>Custom Content Goes Here</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    );
  };
  

const SyncItemList = () => {
  const [loadingsync, setLoadingsync] = useState(false);
  const [loadingpressbutton, setLoadingpressbutton] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const callApiForItemList = () => {
    setLoadingpressbutton(false);
       setLoadingsync(true);
    // Make an Axios request to the API with area_id
   
    axios
      .get('https://ezzy-erp.com/newapp/api/api_itemInfo_List.php')
      .then((response) => {
        // Handle the API response data
        const item_list = response.data;
      
        if (item_list && item_list.length > 0) {
            db.transaction((tx) => {
                // Delete existing data from the item_info table
                tx.executeSql('DELETE FROM item_info');
              
                // Insert the new data into the item_info table
                item_list.forEach((item) => {
                  tx.executeSql(
                    'INSERT INTO item_info (item_id, item_name, item_name_short, item_group, category_id, subcategory_id, finish_goods_code, unit_name, pack_size, t_price, vat_per, sales_item_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                      item.item_id,
                      item.item_name,
                      item.item_name_short || '', // If item_name_short is undefined, set it to an empty string
                      item.item_group,
                      item.category_id,
                      item.subcategory_id,
                      item.finish_goods_code,
                      item.unit_name,
                      item.pack_size,
                      item.t_price,
                      item.vat_per,
                      item.sales_item_type || '', // If sales_item_type is undefined, set it to an empty string
                    ]
                  );
                });
            setLoadingsync(false)
            setIsModalVisible(true);

            // Close the modal after 0.5 seconds
            setTimeout(() => {
              setIsModalVisible(false);
              setLoadingpressbutton(true);
              console.log("Data Inset Successfully")
            }, 500);
            
          });
        }

        // navigation.navigate('bottomtab', { screen: 'Home' });
      })
      .catch((error) => {
        setLoadingsync(false)
        setIsModalVisible(true);

        // Close the modal after 0.5 seconds
        setTimeout(() => {
          setIsModalVisible(false);
          setLoadingpressbutton(true);
        }, 5000);
        console.error('API Request Error:', error);
      });
  };



  const handlecreate = () => {
    setLoadingpressbutton(false);
    // setLoadingsync(true);
    setIsModalVisible(true);

    // Close the modal after 0.5 seconds
    setTimeout(() => {
      setIsModalVisible(false);
      setLoadingpressbutton(true);
    }, 500);
  };
const onClose = () => {
    setIsModalVisible(false);
    setLoadingpressbutton(true);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.loadingView, { display: loadingsync ? 'flex' : 'none' }]}>
        <LottieView style={styles.animation} source={require('../animations/syncAnimation.json')} autoPlay loop />
      </View>
    <TouchableOpacity style={[styles.loadingView, { display: loadingpressbutton ? 'flex' : 'none' }]} onPress={callApiForItemList}>
    <View >
        <LottieView style={styles.animation} source={require('../animations/bliping_Button.json')} autoPlay loop />
      </View>
    </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,display: isModalVisible ? 'flex' : 'none' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
        <LottieView style={styles.animation} source={require('../animations/checked.json')} autoPlay loop />
        <View  style={{ alignItems: 'flex-end' }}>
          {/* <TouchableOpacity onPress={onClose}>
            <Text>OK</Text>
          </TouchableOpacity> */}
          {/* <Button title="Close"  /> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 4,
    transform: [{ scale: 0.8 }],
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default SyncItemList;
