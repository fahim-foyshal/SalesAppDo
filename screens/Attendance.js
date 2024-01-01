import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button,StatusBar, Text, TextInput, TouchableOpacity, Image, Vibration, Alert, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  

const Attendance = () => {

    const user = useSelector(state => state.useralldetails.userData);
  const [loadingsync, setLoadingsync] = useState(false);
  const [loadingpressbutton, setLoadingpressbutton] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Attendance, setAttendancedata] = useState(false);
  const [comments, setComments] = useState('');



  const callApiForAttendance = () => {
    setLoadingpressbutton(false);
    setLoadingsync(true);
  
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(' ')[0]; // Format HH:mm:ss
    const currentDateOnly = currentDate.toISOString().split('T')[0];
  
    const payload = {
      username: user.user,
      note: comments,
      date: currentDateOnly,
      intime: currentTime,
      outtime: currentTime,
    };

 


  
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ss_attendancesheet WHERE username = ? AND date = ?',
        [payload.username, payload.date],
        (_, result) => {
          if (result.rows.length > 0) {
            // If the entry already exists, update the outtime
            tx.executeSql(
              'UPDATE ss_attendancesheet SET outtime = ? WHERE username = ? AND date = ?',
              [payload.outtime, payload.username, payload.date],
              (_, updateResult) => {
                console.log('Attendance updated successfully:', updateResult);
                setAttendancedata(true);
              },
              (updateError) => {
                console.error('Error updating attendance:', updateError);
                setAttendancedata(false);
              }
            );
          } else {
            // If the entry doesn't exist, insert a new entry with intime
            tx.executeSql(
              'INSERT INTO ss_attendancesheet (username, date, intime, outtime, note) VALUES (?, ?, ?, ?, ?)',
              [payload.username, payload.date, payload.intime, '', payload.note],
              (_, insertResult) => {
                console.log('Attendance inserted successfully:', insertResult);
                setAttendancedata(true);
              },
              (insertError) => {
                console.error('Error inserting attendance:', insertError);
                setAttendancedata(false);
              }
            );
          }
        },
        (error) => {
          console.error('Error checking attendance:', error);
          setAttendancedata(false);
        }
      );
    });
  
    setLoadingsync(false);
    setIsModalVisible(true);
  
    // Close the modal after 0.5 seconds
    setTimeout(() => {
      setIsModalVisible(false);
      setLoadingpressbutton(true);
    }, 500);
    console.log("Data Inset Successfully");
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

  const handleInputChange = (fieldName, text) => {
    // setShopcreationdata({
    //   ...shopcreationdata,
    //   [fieldName]: text,
    // });
    setComments(text)
  };

  return (

    <>
    <View className="">
    <TextInput
         label='Shop Name'
         placeholderTextColor={'#808080'}
         placeholder='Comments'
         cursorColor={'#808080'}
         value={comments}
         mode="outlined"
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('shop_name', text)}
         
         className="relative w-[] m-3 h-28 rounded-xl text-center bg-white" style={{elevation:8}}/>
    </View>

          <View style={styles.container}>
      <View style={[styles.loadingView, { display: loadingsync ? 'flex' : 'none' }]}>
        <LottieView style={styles.animation} source={require('../animations/syncAnimation.json')} autoPlay loop />
      </View>

    <TouchableOpacity style={[styles.loadingView, { display: loadingpressbutton ? 'flex' : 'none' }]} onPress={callApiForAttendance}>
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
    </>

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

export default Attendance;
