import React, { useEffect, useState } from 'react';
import { Text,StatusBar, View,ScrollView, Image,TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../action/UserDataAction';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { color, getThemeStyles } from '../themes/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { fetchshopdata } from '../action/SyncAction';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const Dashboared = () => {
  const navigation = useNavigation();

  const orderData = useSelector(state => state.offlineOrderdetails.orderData);
   
  // dispatch(fetchshopdata(user.dealer_code));
 

  const handleSubmitonline=(shopcreationdata)=>{

  
   
    const dataForm = new FormData();

    for (const key in shopcreationdata) {
      dataForm.append(key, shopcreationdata[key]);
    }

    dataForm.append('status', 'ok'); 
    

    dataForm.append('picture', {
      uri: shopcreationdata.picture,
      type: "image/jpeg",
      name: `${user.user_id}.jpg` // You can specify the desired file name here
    });

    axios
    .post('https://ezzy-erp.com/newapp/api/api_new_shop.php', dataForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('API call success: ', response.data);
  
      // Update the upload_status to '1' when the API call is successful
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE stores SET upload_status = ? WHERE id = ?',
          ['1', shopcreationdata.id], // Assuming you have an 'id' property in shopcreationdata
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Upload status updated to 1');
            } else {
              console.log('No records were updated');
            }
          },
          (error) => {
            console.error('Error updating upload_status:', error);
          }
        );
      });
    })
    .catch((error) => {
      console.error('API call error: ', error);
      // Handle API error
      // setLoading(false);
    });


  }



  const myRepeatingFunction = async () => {
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        orderData.forEach((item, index) => {
          if(item.upload_status==0){
            handleSubmitonline(item);
          }
         
        });// Device is connected, call the online function
      }
    } catch (error) {
      console.error('Error checking internet connection', error);
    }
  };
 


  useEffect(() => {
    
    const state = NetInfo.fetch();
    if (orderData) {
     
      const interval = 15000; // 5 minutes in milliseconds
     
      const repeatingFunction = () => {
      
        myRepeatingFunction();
      };

      const intervalId = setInterval(repeatingFunction, interval);

     return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    }
  }, [orderData]); 
  

  const dispatch = useDispatch();
  // const orderData = useSelector(state => state.offlineOrnder.orderData);
  // console.log(orderData);


  const [userData, setUserData] = useState(null);
  const user = useSelector(state => state.useralldetails.userData);
  const theme = useSelector((state) => state.themecolor.theme);
  const themechoice = color[theme];

  
  // dispatch(fetchshopdata(user.dealer_code));
  // useEffect(() => {
  //   // Perform a SELECT query to retrieve user data from the users table
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM users WHERE isLoggedIn = 1', // Change the condition to match your use case
  //       [],
  //       (tx, results) => {
  //         if (results.rows.length > 0) {
  //           // Get the first row (assuming there's only one user with isLoggedIn = 1)
  //           const user = results.rows.item(0);
            
      
  //           setUserData(user);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error retrieving user data from the database:', error);
  //       }
  //     );
  //   });
  // }, []);

  return (
    <>
      <StatusBar barStyle="default" translucent backgroundColor={themechoice.backgroundColor} />
    <View className="w-full h-full" style={{marginTop:20}}>
      {/* {user ? (
        <View>
          <Text>User ID: {user.user_id}</Text>
          <Text>User: {user.user}</Text>
          <Text>Full Name: {user.full_name}</Text>
          
        </View>
      ) : (
        <Text>No user data found</Text>
      )} */}
<View className="bg-white h-[250px] w-[] p-3">
      <View className="fixed flex flex-row items-center left-4" style={{elevation:10}}>
      <TouchableOpacity className="w-[30px] h-[20px]" onPress={() => navigation.openDrawer()} >
          <FontAwesomeIcon icon={faBars} />
        </TouchableOpacity>
        <Image source={require("../assest/logo1.png")} className="w-[60px] h-[60px]"/>
    <View className="relative">

    <Text className="text-[#2596be]">SECONDARY</Text>
        <View className="flex flex-row">

            {/* <Text  className="text-[#fb7277]">S</Text>
            <Text className="text-[#5fc219]">A</Text>
            <Text className="text-[#c566fb]">L</Text>
            <Text className="text-[#98e124]">E</Text>
            <Text className="text-[#9453fc]">S</Text> */}
            <Text className="text-[#0ca2e7]">SALES</Text>
        </View>
    
    
    </View>

      

      </View>
  <ScrollView
  horizontal
  style={{elevation:10}}
  showsHorizontalScrollIndicator={false}
  className="flex"
  > 
       <View className="w-[230px] m-3 h-[130px] rounded-xl bg-[#f2f2f2]" style={{elevation:10}}></View>
       <View className="w-[200px] m-3 h-[130px] rounded-xl bg-[#f2f2f2]" style={{elevation:10}}></View>
  </ScrollView>
  </View>
      <View
     className="flex flex-row flex-wrap"
       
      >
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
        <View className="w-[100px] h-[100px] rounded-xl bg-white m-3" style={{elevation:10}}><Text></Text></View>
      </View>
    </View>

    </>
  );
};

export default Dashboared;
