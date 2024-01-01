import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import {View, StatusBar,Text, Touchable, TouchableOpacity,Image, TextInput,Vibration, Alert, SafeAreaView, ScrollView} from 'react-native';
import Btn from '../components/Btn';
import Field from '../components/Field';
// import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserData } from '../action/UserDataAction';


const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });


const Organization = () => {


  const dispatch = useDispatch();
 

  const[loading,setLoading]=useState(true);

  // const vibrate = () => {
  //   Vibration.vibrate(50); // Vibrate for 50 milliseconds
  // };
  const[userdata,setUserData]=useState(null)
  
  const API_BASE_URL = 'http://192.168.0.104:8080';
    const darkGreen = '#006A42';
    const [organizaationData,setOrganizaationData]=useState('');
    const navigation = useNavigation();
 
  
    const handleInputChange = (name, value) => {
      setOrganizaationData(value);
    }
    const [location, setLocation] = useState(null);

    const loginOrganization = () => {
        if(organizaationData!=''){
            AsyncStorage.setItem('organizationid', organizaationData);
            navigation.navigate('Login')
        }
      
 
    
    }

  return (
<ScrollView>
   <View className="mt-0" style={{height:800}}>
<View className=" -left-5 bg-[#852e45] h-[36%] w-[110%] rounded-b-[80px]  " >
  <Text className="text-center text-4xl font-extrabold relative top-28 text-white rou">Login</Text>
</View>
<View className="fixed -top-36 bg-white w-[] h-[60%] m-8 rounded-[80px] drop-shadow-[]" style={{elevation:10}}>

      <View style={{zIndex:4}} className={`  left-10 transform scale-[0.8] absolute bg-transparent ${loading?'visible':'hidden z-50'}`}>
        <LottieView  style={{position:'absolute',width:300,height:300}} source={require('../animations/welcome.json')} autoPlay loop />
        </View>
        <TextInput
         placeholder='Enter your Organizaation Id'
         placeholderTextColor={'#808080'}
         cursorColor={'#808080'}
         onChangeText={(text) => handleInputChange('user', text)}
         className=" top-56 left-10 relative w-[78%] h-10 rounded-xl bg-white" style={{elevation:10}}></TextInput>
        {/* <TextInput
         placeholder='Enter your password'
         placeholderTextColor={'#808080'}
         cursorColor={'#808080'}
         onChangeText={(text) => handleInputChange('password', text)}
         className=" top-64 left-10 relative w-[78%] h-10 rounded-xl bg-white" style={{elevation:10}}></TextInput> */}
  <TouchableOpacity
    onPress={loginOrganization}
    style={{
      backgroundColor: '#852e45',
      borderRadius: 5,
      alignItems: 'center',
      width: '78%',
      paddingVertical: 5,
      // marginVertical: 10,
      marginTop:300,
     marginLeft:40
      
    }}>
    <Text style={{color:'white', fontSize: 25, fontWeight: 'bold'}}>
      Login
    </Text>
  </TouchableOpacity>
</View>


      
</View>

</ScrollView>

  )
}

export default Organization;
