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
import { fetchUserData } from '../action/UserDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });


const Login = () => {


  const dispatch = useDispatch();
 

  const[loading,setLoading]=useState(true);

  // const vibrate = () => {
  //   Vibration.vibrate(50); // Vibrate for 50 milliseconds
  // };
  const[userdata,setUserData]=useState(null)
  
  const API_BASE_URL = 'http://192.168.0.104:8080';
    const darkGreen = '#006A42';
    const [loginData,setLoginData]=useState([{
      user:'',
      password:'',
      organization:''
      
    }]);
    const navigation = useNavigation();
    // const handleInputChange = (name, value) => {
    //   setLoginData({
    //     ...loginData,
    //     [name]: value,
    //   });
    // };
  
    const handleInputChange = (name, value) => {
      setLoginData([{
        ...loginData[0], // Keep the existing object's properties
        [name]: value,   // Update the specified property
      }]);
    };
    
    
    const [location, setLocation] = useState(null);

    const login = () => {
    //  vibrate();
    AsyncStorage.getItem('organizationid').then((organization) => { 
      loginData[0].organization=organization 
      
   
 
  
   
      axios
        .post(`https://ezzy-erp.com/newapp/api/api_users.php`,loginData)
        .then((response) => {
        
          if (response.data) {
            const user = response.data;
            console.log(user);

          
           
            // Save the user data to SQLite
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM users');
              tx.executeSql(
                'INSERT INTO users (user_id, user, password, full_name, mobile, dealer_code, region_id, zone_id, area_id, region_name, zone_name, area_name,user_image, isLoggedIn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                  user.user_id,
                  user.user,
                  user.password,
                  user.full_name,
                  user.mobile,
                  user.dealer_code,
                  user.region_id,
                  user.zone_id,
                  user.area_id,
                  user.region_name,
                  user.zone_name,
                  user.area_name,
                  user.user_image, 
                
                  1,
                  // Set isLoggedIn to 1
                ], // Save the user's username and set isLoggedIn to 1
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    
                    console.log('User data saved to SQLite');
                    callApiWithAreaId(user.area_id);
                  }
                },
                (error) => {
            
                  console.error('Error saving user data to SQLite:', error);
                }
              );
            });
          }else{
            alert("username/password Not match");
          }
        
          
        })
        .catch((error) => {
        
          
           alert(error.response.data.message);
        });
      });
    }

    const callApiWithAreaId = (areaId) => {
      // Make an Axios request to the API with area_id
      const requestData = [{ area_id: areaId }];
      axios
        .post('https://ezzy-erp.com/newapp/api/api_routelist.php', requestData)
        .then((response) => {
          // Handle the API response data
          const routeList = response.data;
          if (routeList && routeList.length > 0) {
            db.transaction((tx) => {
              // Insert the data into the existing routelist table
              routeList.forEach((route) => {
                tx.executeSql(
                  'INSERT INTO routelist (route_id, route_name) VALUES (?, ?)',
                  [route.route_id, route.route_name]
                );
              });
            });
          }
  
          navigation.navigate('Bottomtab', { screen: 'Home' });
        })
        .catch((error) => {
          console.error('API Request Error:', error);
        });
    };

    // useEffect(() => {
    //   if (userdata) {
    //     navigation.navigate('Home', { userInfo: userdata });
    //   }
    // }, [userdata]);
    
  
    useEffect(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
        setLocation(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
    }, []);
    


  return (
<ScrollView>
   <View className="mt-0" style={{height:800}}>
<View className=" -left-5 bg-[#0096FF] h-[30%] w-[110%] rounded-b-[0px]  " style={{  overflow: 'visible'}} >
<View style={{ alignItems: 'flex-start', paddingHorizontal: 30 ,paddingVertical:50}}>
  <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Welcome</Text>
  <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Back</Text>
</View>
</View>
<View className="-left-8 -top-0 w-[100%] bg-white w-[] h-[100%] m-8 rounded-[40px] drop-shadow-[]" style={{elevation:10,marginTop:-40}}>

  {/* <Image source={require("../assest/demo.png")}
  style={{
    width:100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain', // or 'cover', 'stretch', etc., based on your preference
    alignSelf: 'center', // Position it based on your layout requirements
    marginTop: 30, // Adjust the top margin as needed
  }}
  
  /> */}


      <TextInput
         placeholder='  Enter your username'

         placeholderTextColor={'#4169E1'}
         cursorColor={'#808080'}

         onChangeText={(text) => handleInputChange('user', text)}
         
         className=" top-56 left-10 relative w-[90%]  rounded-xl bg-white" 
         style={{elevation:10,height:'11%',
              marginTop:-150,
              color:'#1134A6',
              borderColor: '#0096FF',
              height:'7%',
              marginLeft:-18}}>
        </TextInput>

        <TextInput
         placeholder='  Enter your password'
         placeholderTextColor={'#4169E1'}
         cursorColor={'#808080'}
         onChangeText={(text) => handleInputChange('password', text)}
         className=" top-64 left-10 relative w-[90%] h-10 rounded-xl bg-white" 
         style={{elevation:10,height:'11%',
              color:'#1134A6',
              height:'7%',
              marginLeft:-18}}>
      </TextInput>

  <TouchableOpacity
    onPress={login}
    style={{
      backgroundColor: '#0096FF',
      borderRadius: 10,
      alignItems: 'center',
      width: '90%',
      height:'7%',
      paddingVertical: 5,
      // marginVertical: 10,
      marginTop:350,
      marginLeft:20
      
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

export default Login
