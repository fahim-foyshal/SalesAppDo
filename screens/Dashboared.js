import React, {useEffect, useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserData} from '../action/UserDataAction';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {color, getThemeStyles} from '../themes/colors';
//import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faBold} from '@fortawesome/free-solid-svg-icons';
import {fetchshopdata} from '../action/SyncAction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle,faAreaChart,faShop,faFileCircleCheck,faPlugCircleBolt,faMoneyBill1,faChartBar,faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Bold } from 'react-native-feather';
import { amberA700, white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const db = SQLite.openDatabase({name: 'mydatabase.db', location: 'default'});

const Dashboared = () => {
  const navigation = useNavigation();

  const orderData = useSelector(state => state.offlineOrderdetails.orderData);

  // dispatch(fetchshopdata(user.dealer_code));

  const handleSubmitonline = shopcreationdata => {
    const dataForm = new FormData();

    for (const key in shopcreationdata) {
      dataForm.append(key, shopcreationdata[key]);
    }

    dataForm.append('status', 'ok');

    dataForm.append('picture', {
      uri: shopcreationdata.picture,
      type: 'image/jpeg',
      name: `${user.user_id}.jpg`, // You can specify the desired file name here
    });

    axios
      .post('https://ezzy-erp.com/newapp/api/api_new_shop.php', dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('API call success: ', response.data);

        // Update the upload_status to '1' when the API call is successful
        db.transaction(tx => {
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
            error => {
              console.error('Error updating upload_status:', error);
            },
          );
        });
      })
      .catch(error => {
        console.error('API call error: ', error);
        // Handle API error
        // setLoading(false);
      });
  };

  const myRepeatingFunction = async () => {
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        orderData.forEach((item, index) => {
          if (item.upload_status == 0) {
            handleSubmitonline(item);
          }
        }); // Device is connected, call the online function
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
  const theme = useSelector(state => state.themecolor.theme);
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
      <StatusBar
        barStyle="default"
        translucent
        backgroundColor={themechoice.backgroundColor}
      />
      <View className="w-full h-full" style={{marginTop: 20}}>
        {/* {user ? (
        <View>
          <Text>User ID: {user.user_id}</Text>
          <Text>User: {user.user}</Text>
          <Text>Full Name: {user.full_name}</Text>
          
        </View>
      ) : (
        <Text>No user data found</Text>
      )} */}
        <View className="bg-white h-[250px] w-[] p-3" style={{backgroundColor:"rgb(8 145 178)"}}>
          <View className="fixed flex flex-row items-center left-4"
            style={{elevation: 10}}>
            <TouchableOpacity
              className="w-[30px] h-[20px]"
              onPress={() => navigation.openDrawer()}>
              <FontAwesomeIcon icon={faBars} />
            </TouchableOpacity>
            <Image
              source={require('../assest/logo1.png')}
              className="w-[60px] h-[60px]"
            />
            <View className="relative">
              <Text className="text-[#2596be]">SECONDARY</Text>
              <View className="flex flex-row">
                <Text  className="text-[#fb7277]">S</Text>
            <Text className="text-[#5fc219]">A</Text>
            <Text className="text-[#c566fb]">L</Text>
            <Text className="text-[#98e124]">E</Text>
            <Text className="text-[#9453fc]">S</Text>
                {/* <Text className="text-[#0ca2e7]">SALES</Text> */}
              </View>
            </View>
          </View>
          <View className="flex flex-row">
            <View
              className="w-[80px] m-3 h-[80px] bg-[#f2f2f2] rounded-full"
              style={{elevation: 0,}}>
              <Image
                source={require('../assest/images.jpeg')} // Replace with the actual path to your image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 38, // Half of the width and height to make it circular
                }}
              />
            </View>
            <View
              className="w-[130px] m-3 h-[80px] rounded-xl "
              style={{elevation: 0}}>
               <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>kamal hossain</Text>
                <Text style={{ fontSize: 15, color: 'yellow' }}>sales manager</Text>
                <Text style={{ fontSize: 15, color: 'yellow' }}>ID :00155</Text>
              </View>
          </View>
        </View>
        <View className="flex flex-row flex-wrap rounded-[40px]" 
              style={{backgroundColor:'#DBE2E9',
              marginTop:-40,
              height:260,
              paddingTop:13,
              }}>
          <View className="flex flex-row flex-wrap " style={{}} >
            <View style={{  alignItems: 'center', marginLeft:15, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: 'white',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faUserCircle} size={75} color="#E97451" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>


              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#4169E1',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faShop} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>

              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#228B22',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>

              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#E34234',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faAreaChart} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>
          </View>      

          
          
          <View className="flex flex-row flex-wrap " style={{marginTop:20}} >
            <View style={{  alignItems: 'center', marginLeft:15, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#B2BEB5',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faFileCircleCheck} size={45} color="#4169E1" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>


              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#FFC000',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faPlugCircleBolt} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>

              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#DAF7A6',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>

              <View style={{  alignItems: 'center', marginLeft:8, }}>
                  <View
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 50,
                      backgroundColor: '#FF7518',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faChartBar} size={45} color="white" />
                  </View>
                  <Text style={{ fontWeight: 'bold' }}>Manager</Text>
              </View>
          </View> 

          
        </View>
        <View style={{marginTop:20,}}>
          <View className="flex flex-row flex-wrap " style={{}} >
            <View style={{  alignItems: 'center', marginLeft:10, }}>
                  <View
                    style={{
                      width: 115,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: '#FFA500',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faNewspaper} size={25} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Today's Orders</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'white' }}>10</Text>
                  </View>
               
              </View>


              <View style={{  alignItems: 'center', marginLeft:1, }}>
                  <View
                    style={{
                      width: 115,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: '#FF5F1F',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                      fontWeight:'Bold',
                      color:'white'
                    }}
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} size={30} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Orders Amount</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'white' }}>20</Text>
                  </View>
               
              </View>

              <View style={{  alignItems: 'center', marginLeft:1, }}>
                  <View
                    style={{
                      width: 117,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: '#FF7F50',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faShop} size={30} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Total Shop</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'yellow' }}>20</Text>
                  </View>
                 
              </View>


          </View>      
          <View className="flex flex-row flex-wrap " style={{marginTop:20,}} >
            <View style={{  alignItems: 'center', marginLeft:10, }}>
                  <View
                    style={{
                      width: 117,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: '#0096FF',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faMoneyBill1} size={30} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Orders Amount</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'yellow' }}>20</Text>
                  </View>
                 
              </View>


              <View style={{  alignItems: 'center', marginLeft:1, }}>
                  <View
                    style={{
                      width: 117,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: '#4169E1',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft:15,
                    }}
                  >
                    <FontAwesomeIcon icon={faShop} size={30} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Total Shop</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'yellow' }}>20</Text>
                  </View>
                 
              </View>

              <View style={{  alignItems: 'center', marginLeft:10, }}>
                  <View
                    style={{
                      width: 115,
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: 'rgb(8 145 178)',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faNewspaper} size={25} color="white" />
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Today's Orders</Text>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 20, color: 'yellow' }}>10</Text>
                  </View>
               
              </View>


          </View>  
          
        </View>
      </View>
    </>
  );
};

export default Dashboared;
