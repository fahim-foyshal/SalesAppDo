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
  

const SyncSubCategory = () => {
  const [loadingsync, setLoadingsync] = useState(false);
  const [loadingpressbutton, setLoadingpressbutton] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const callApiForSubCategory = () => {
    setLoadingpressbutton(false);
       setLoadingsync(true);
    // Make an Axios request to the API with area_id
   
    axios
      .get('https://ezzy-erp.com/newapp/api/api_subCategory.php')
      .then((response) => {
        // Handle the API response data
        const subcategories_list = response.data;
        if (subcategories_list && subcategories_list.length > 0) {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM subcategories');
            // Insert the data into the existing routelist table
            subcategories_list.forEach((category) => {
              tx.executeSql(
                'INSERT INTO subcategories (id, subcategory_name,category_id) VALUES (?,?,?)',
                [category.id, category.subcategory_name,category.category_id]
              ),(error) => {
                console.error('Error something:', error);
              };
            });
            setLoadingsync(false)
            setIsModalVisible(true);

            // Close the modal after 0.5 seconds
            setTimeout(() => {
              setIsModalVisible(false);
              setLoadingpressbutton(true);
            }, 500);
            console.log("Data Inset Successfully")
          });
        }

        // navigation.navigate('bottomtab', { screen: 'Home' });
      })
      .catch((error) => {
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
    <TouchableOpacity style={[styles.loadingView, { display: loadingpressbutton ? 'flex' : 'none' }]} onPress={callApiForSubCategory}>
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

export default SyncSubCategory;
