import React, { useState ,useEffect} from 'react'
import {View, StyleSheet,StatusBar,Text, TextInput,Touchable, TouchableOpacity,Image,Vibration, Alert, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import { TextInput, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { fetchCartData } from '../action/offlineDataFetchAction';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });
// import { fetchUserRouteListData } from '../action/UserDataAction';

const shopIdentity = [
  { label: 'MEP', value: '1' },
  { label: 'Other', value: '2' },
];
const shopClass = [
  { label: 'GOLD', value: '1' },
  { label: 'DIAMOND', value: '2' },
  { label: 'SILVER', value: '3' },
  { label: 'BRONZE', value: '4' },
  { label: 'PLATINUM', value: '5' },
  { label: 'PLATINUM PLUS', value: '6' },
];
const shopType = [
  { label: 'RETAILER', value: '1' },
  { label: 'WHOLE SALE', value: '2' },
  { label: 'SEMI WHOLE SALER', value: '3' },
];
const shopChannel = [
  { label: 'Electric', value: '1' },
  { label: 'Electronics', value: '2' },
  { label: 'Stationary', value: '3' },
  { label: 'Departmental Store', value: '4' },
  { label: 'Grocery', value: '5' },
  { label: 'Hardware', value: '6' },
  { label: 'Library', value: '7' },
  { label: 'Pharmacy', value: '8' },
];

const shopRouteType = [
  { label: 'BAZAR', value: '1' },
  { label: 'OUTSIDE BAZAR', value: '2' },
 
];


const AddShop = ({navigation}) => {

  const user = useSelector(state => state.useralldetails.userData);
  const routes = useSelector(state => state.routedetails.routeData);

  

 

  // const dispatch = useDispatch();

const [shopIdentityid, setShopIdentityid] = useState(null);
const [shopClassid, setShopClassid] = useState(null);
const [shopTypeid, setShopTypeid] = useState(null);
const [shopChannelid, setShopChannelid] = useState(null);
const [shopRouteTypeid, setShopRouteTypeid] = useState(null);


const [shopIdentityid1, setShopIdentityid1] = useState(null);
const [shopClassid1, setShopClassid1] = useState(null);
const [shopTypeid1, setShopTypeid1] = useState(null);
const [shopChannelid1, setShopChannelid1] = useState(null);
const [shopRouteTypeid1, setShopRouteTypeid1] = useState(null);
const [location, setLocation] = useState(null);

  // dispatch(fetchUserRouteListData());

    const [isFocus, setIsFocus] = useState(false);
    const [routeid, setRouteid] = useState(null);
    const [routename, setRouteName] = useState(null);
    const [imagedata, setImagedata] = useState(null);
 
    
    // const routelist= useSelector(state => state.userinformation.routeData);
  






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

    const handleImageUpload = () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 300,
          maxWidth: 300,
        };
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            
            setImagedata(imageUri);

            setShopcreationdata({
              ...shopcreationdata,
              picture:imageUri,
            })
            // console.log(imageUri);
            // setshopcreationdata({
            //   ...shopcreationdata,
            //   picture: imageUri,
            // });
          }
        });
     
      };




      //Data set to send the data to apps

      const[shopcreationdata,setShopcreationdata] = useState({
        shop_name: '',
        shop_owner_name: '',
        manager_name: '',
        manager_mobile: '',
        master_dealer_code: user.dealer_code,
        product_group: '',
        target_shop: '',
        market_id: '',
        route_id: '',
        area_id: user.area_id,
        zone_id: user.zone_id,
        region_id: user.region_id,
        shop_class: '',
        shop_type: '',
        shop_channel: '',
        shop_route_type: '',
        shop_identity: '',
        mobile: '',
        shop_address: '',
        status: 'ok',
        otp: 'N/A',
        latitude: '',
        longitude: '',
        picture:'',
        image_compress: 'N/A',
        copy_done:'N/A',
        entry_by: user.user_id,
        upload_status:0,
      
      });

      const clearState = () => {

        setImagedata(null);
        setShopcreationdata({
          shop_name: '',
          shop_owner_name: '',
          manager_name: '',
          manager_mobile: '',
          master_dealer_code: '',
          product_group: '',
          target_shop: '',
          market_id: '',
          route_id: '',
          area_id: user.area_id,
          zone_id: user.zone_id,
          region_id: user.region_id,
          shop_class: '',
          shop_type: '',
          shop_channel: '',
          shop_route_type: '',
          shop_identity: '',
          mobile: '',
          shop_address: '',
          status: 'ok',
          otp: 'N/A',
          latitude: '',
          longitude: '',
          picture: '',
          image_compress: 'N/A',
          copy_done: 'N/A',
          entry_by: user.user_id,
          upload_status: 0,
        });
        // Clear other state variables as needed
      };
      


    const handleInputChange = (fieldName, text) => {
        setShopcreationdata({
          ...shopcreationdata,
          [fieldName]: text,
        });
      };

  const handleSubmitonline=()=>{

  
    shopcreationdata.route_id=routeid
  
    shopcreationdata.shop_identity=shopIdentityid1
    shopcreationdata.shop_class=shopClassid1
    shopcreationdata.shop_type=shopTypeid1
    shopcreationdata.shop_channel=shopChannelid1
    shopcreationdata.shop_route_type=shopRouteTypeid1
    shopcreationdata.longitude=location.longitude
    shopcreationdata.latitude=location.latitude
    


    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO stores (shop_name,shop_route_name, shop_owner_name, manager_name, manager_mobile, master_dealer_code, product_group, target_shop, market_id, route_id, area_id, zone_id, region_id, shop_class, shop_type, shop_channel, shop_route_type, shop_identity, mobile, shop_address, status, otp, latitude, longitude, picture, image_compress, copy_done, entry_by, datetime,upload_status) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [
          shopcreationdata.shop_name,
          routename,
          shopcreationdata.shop_owner_name,
          shopcreationdata.manager_name,
          shopcreationdata.manager_mobile,
          shopcreationdata.master_dealer_code,
          shopcreationdata.product_group,
          shopcreationdata.target_shop,
          shopcreationdata.market_id,
          shopcreationdata.route_id,
          shopcreationdata.area_id,
          shopcreationdata.zone_id,
          shopcreationdata.region_id,
          shopcreationdata.shop_class,
          shopcreationdata.shop_type,
          shopcreationdata.shop_channel,
          shopcreationdata.shop_route_type,
          shopcreationdata.shop_identity,
          shopcreationdata.mobile,
          shopcreationdata.shop_address,
          shopcreationdata.status,
          shopcreationdata.otp,
          shopcreationdata.latitude,
          shopcreationdata.longitude,
          shopcreationdata.picture,
          shopcreationdata.image_compress,
          shopcreationdata.copy_done,
          shopcreationdata.entry_by,
          new Date().toISOString(),
          1 // or use the appropriate datetime value
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            
              
          clearState();
          
          // Null the state variables
          setRouteid(null);
          setShopIdentityid(null);
          setShopClassid(null);
          setShopTypeid(null);
          setShopChannelid(null);
          setShopRouteTypeid(null);


          

         
            
            // Clear the form or take appropriate action
          } else {
            console.error('Failed to save data to SQLite');
          }
        }
      );
    });




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
        'Content-Type': 'multipart/form-data', // Change the content type to multipart/form-data
      },
    })
    .then((response) => {
      console.log('API call success: ', response.data);

  
          clearState();
          
          // Null the state variables
          setRouteid(null);
          setShopIdentityid(null);
          setShopClassid(null);
          setShopTypeid(null);
          setShopChannelid(null);
          setShopRouteTypeid(null);

        

    })
    .catch((error) => {
      console.error('API call error: ', error);
      // Handle API error
      // setLoading(false);
    });


  }


  const checkInternetConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        handleSubmitonline(); // Device is connected, call the online function
      } else {
        handleSubmitOffline(); // Device is not connected, call the offline function
      }
    } catch (error) {
      console.error('Error checking internet connection', error);
    }
  };


  const handleSubmitOffline = () => {

    console.log("fahjhjj");


    shopcreationdata.route_id=routeid
  
    shopcreationdata.shop_identity=shopIdentityid1
    shopcreationdata.shop_class=shopClassid1
    shopcreationdata.shop_type=shopTypeid1
    shopcreationdata.shop_channel=shopChannelid1
    shopcreationdata.shop_route_type=shopRouteTypeid1
    shopcreationdata.longitude=location.longitude
    shopcreationdata.latitude=location.latitude
   
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO stores (shop_name,shop_route_name, shop_owner_name, manager_name, manager_mobile, master_dealer_code, product_group, target_shop, market_id, route_id, area_id, zone_id, region_id, shop_class, shop_type, shop_channel, shop_route_type, shop_identity, mobile, shop_address, status, otp, latitude, longitude, picture, image_compress, copy_done, entry_by, datetime,upload_status) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [
          shopcreationdata.shop_name,
          routename,
          shopcreationdata.shop_owner_name,
          shopcreationdata.manager_name,
          shopcreationdata.manager_mobile,
          shopcreationdata.master_dealer_code,
          shopcreationdata.product_group,
          shopcreationdata.target_shop,
          shopcreationdata.market_id,
          shopcreationdata.route_id,
          shopcreationdata.area_id,
          shopcreationdata.zone_id,
          shopcreationdata.region_id,
          shopcreationdata.shop_class,
          shopcreationdata.shop_type,
          shopcreationdata.shop_channel,
          shopcreationdata.shop_route_type,
          shopcreationdata.shop_identity,
          shopcreationdata.mobile,
          shopcreationdata.shop_address,
          shopcreationdata.status,
          shopcreationdata.otp,
          shopcreationdata.latitude,
          shopcreationdata.longitude,
          shopcreationdata.picture,
          shopcreationdata.image_compress,
          shopcreationdata.copy_done,
          shopcreationdata.entry_by,
          new Date().toISOString(),
          shopcreationdata.upload_status, // or use the appropriate datetime value
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            
              
          clearState();
          
          // Null the state variables
          setRouteid(null);
          setShopIdentityid(null);
          setShopClassid(null);
          setShopTypeid(null);
          setShopChannelid(null);
          setShopRouteTypeid(null);


          

         
            
            // Clear the form or take appropriate action
          } else {
            console.error('Failed to save data to SQLite');
          }
        }
      );
    });

    navigation.navigate('Home');
    
  };

    

  return (
<SafeAreaView className="bg-[#f2f2f2] h-full">
   <View className=" w-[] rounded-[20px] h-48 flex flex-row justify-between p-3">
                <View className="w-[45%] bg-[#fff] rounded-xl" style={{elevation:10}}>
                {imagedata ? ( 
                    <View style={{position:'relative', alignItems: 'center', marginTop: 10 }}
                            className="-top-1"
                        >
                                
                        <Image className="rounded-md w-[150px] h-full" source={{ uri:imagedata}} />
                            </View> ):
                ( <View className="my-auto mx-auto justify-center">
                <TouchableOpacity
                    onPress={handleImageUpload}
                    style={{
                    backgroundColor: '#84CDEE',
                    borderRadius: 5,
                    alignItems: 'center',
                    width: '50px',
                    padding:5,
                    paddingVertical: 5,
                    // marginVertical: 10,
                   
                    
                    }}
                    >
                    <Text style={{color:'white', fontSize: 20, fontWeight: 'bold'}}>
                    Add Image
                    </Text>
                </TouchableOpacity>
                </View>  )}
                </View>

            <View  className="flex mx-auto justify-center">
        <TextInput
         label='Shop Name'
         placeholderTextColor={'#808080'}
         placeholder='Enter Shop Name'
         cursorColor={'#808080'}
         value={shopcreationdata.shop_name}
         mode="outlined"
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('shop_name', text)}
         
         className="  relative w-[180px] h-11 rounded-xl bg-white" style={styles.textInput}></TextInput>
            </View>
   </View>
  <ScrollView
         contentInsetAdjustmentBehavior="automatic"
       
     
   
  >
   <Text className="relative w-[] m-3 h-11 rounded-xl bg-white p-3" style={{elevation:10}} >{user.region_name}</Text>
   <Text className="relative w-[] m-3 h-11 rounded-xl bg-white p-3" style={{elevation:10}} >{user.zone_name}</Text>
   <Text className="relative w-[] m-3 h-11 rounded-xl bg-white p-3" style={{elevation:10}} >{user.area_name}</Text>

   <View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{elevation:10}}>
  
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#84CDEE' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={routes}
          search
          maxHeight={300}
          labelField="route_name"
          valueField="route_id"
          placeholder={'Enter the Route Name'}
          searchPlaceholder="Search..."
          value={routeid}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRouteid(item.route_id);
            setRouteName(item.route_name);
            setIsFocus(false);
          }}
        />
      </View>

    <View>
      <TextInput
         label='Shop Address'
         placeholderTextColor={'#808080'}
         placeholder='Shop Address'
         cursorColor={'#808080'}
         value={shopcreationdata.shop_address}
         mode="outlined"
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('shop_address', text)}
         
         className="relative w-[] m-3 h-11 rounded-xl bg-white"  style={styles.textInput}/>
      </View>
    <View>
    <TextInput
         label='Shop Owner Name'
         placeholder='Show Owner Name'
         placeholderTextColor={'#808080'}
         cursorColor={'#808080'}
         mode="outlined"
         outlineColor="transparent"
         value={shopcreationdata.shop_owner_name}
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('shop_owner_name', text)}
         
         className="relative w-[] m-3 h-11 rounded-xl bg-white"  style={styles.textInput}/>
         </View>
    <View>
    <TextInput
         label='Shop Owner Mobile'
         placeholder='Shop Owner Mobile'
         placeholderTextColor={'#808080'}
         cursorColor={'#808080'}
         mode="outlined"
         value={shopcreationdata.mobile}
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('mobile', text)}
         
         className="relative w-[] m-3 h-11 rounded-xl bg-white"  style={styles.textInput}/>
    </View>
    <View>
    <TextInput
         label='Manager Name'
         placeholderTextColor={'#808080'}
         placeholder='Manager Name'
         cursorColor={'#808080'}
         mode="outlined"
         value={shopcreationdata.manager_name}
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('manager_name', text)}
         
         className="relative w-[] m-3 h-11 rounded-xl bg-white"  style={styles.textInput}/>
      </View>
      <View>
    <TextInput
         label='Manager Mobile'
         placeholder='Manager Mobile'
         placeholderTextColor={'#808080'}
         cursorColor={'#808080'}
         mode="outlined"
         value={shopcreationdata.manager_mobile}
         outlineColor="transparent"
         activeOutlineColor="#84CDEE"
         onChangeText={(text) => handleInputChange('manager_mobile', text)}
         
         className="relative w-[] m-3 h-11 rounded-xl bg-white p-3"  style={styles.textInput}/>
         </View>


         <View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{ elevation: 10 }}>
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={shopIdentity}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={'Shop Identity'}
    searchPlaceholder="Search..."
    value={shopIdentityid}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setShopIdentityid(item.value);
      setShopIdentityid1(item.label);
      setIsFocus(false);
    }}
  />
</View>

<View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{ elevation: 10 }}>
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={shopClass}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={'Shop Class'}
    searchPlaceholder="Search..."
    value={shopClassid}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setShopClassid(item.value);
      setShopClassid1(item.label);
      setIsFocus(false);
    }}
  />
</View>

<View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{ elevation: 10 }}>
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={shopType}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={'Shop Type'}
    searchPlaceholder="Search..."
    value={shopTypeid}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setShopTypeid(item.value);
      setShopTypeid1(item.label);
      setIsFocus(false);
    }}
  />
</View>

<View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{ elevation: 10 }}>
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={shopChannel}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={'Shop Channel'}
    searchPlaceholder="Search..."
    value={shopChannelid}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setShopChannelid(item.value);
      setShopChannelid1(item.label);
      setIsFocus(false);
    }}
  />
</View>

<View className="relative w-[] m-3 h-11 rounded-xl bg-white" style={{ elevation: 10 }}>
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={shopRouteType}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={'Shop Route Type'}
    searchPlaceholder="Search..."
    value={shopRouteTypeid}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
      setShopRouteTypeid(item.value);
      setShopRouteTypeid1(item.label);
      setIsFocus(false);
    }}
  />
</View>
{location?(<View>
  <Text className="relative w-[] m-3 h-11 rounded-xl bg-white p-3" style={{elevation:10}} >LONGITUDE :{location.longitude}</Text>
   <Text className="relative w-[] m-3 h-11 rounded-xl bg-white p-3" style={{elevation:10}} >LATITUDE : {location.latitude}</Text>
</View>):
(<View>
  <Text>loading</Text>
</View>)}

         

<TouchableOpacity
                    onPress={checkInternetConnection}
                    style={{
                    backgroundColor: '#84CDEE',
                    borderRadius: 5,
                    alignItems: 'center',
                    width: '50px',
                    padding:5,
                    paddingVertical: 5,
                    margin:10,
                    // marginVertical: 10,
                   
                    
                    }}
                    >
                    <Text style={{color:'white', fontSize: 20, fontWeight: 'bold'}}>
                    Add Shop
                    </Text>
                </TouchableOpacity>     
      </ScrollView>

</SafeAreaView>
  )
}

export default AddShop


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 43,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
textcontainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 16,
    elevation:10
  },
  
});
