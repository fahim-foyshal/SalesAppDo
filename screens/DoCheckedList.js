import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import GetLocation from 'react-native-get-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMinus, faPlus, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import { faUserCircle,faAreaChart,faShop,faFileCircleCheck,faPlugCircleBolt,faMoneyBill1,faChartBar,faNewspaper } from '@fortawesome/free-solid-svg-icons';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { fetchDoCheckedData, fetchDoCHECKEDDATA, fetchDoholdData } from '../action/offlineDataFetchAction';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });


const DoCheckedList = () => {
  const dispatch = useDispatch();
//   dispatch(fetchDoCheckedData())
    const navigation = useNavigation();

    const[itemdatalist,setItemdatalist] = useState([]);

    const doHoldData = useSelector(state => state.doCheckedinformationdata.doCheckedData);
    console.log(doHoldData);

  const  handlepressforgetorder = (item)=>{
    navigation.navigate('GetCheckedIndividual', { timestamp:item.do_no ,dealercode:item.dealer_code,shopName:item.shop_name});
  }

    // useEffect(() => {

    //     const formatDateTime = (isoDateTime) => {
    //         const options = {
    //           year: 'numeric',
    //           month: '2-digit',
    //           day: '2-digit',
    //           hour: '2-digit',
    //           minute: '2-digit',
    //           hour12: true, // Use AM/PM format
    //         };
    //         return new Date(isoDateTime).toLocaleString(undefined, options);
    //       };
      
    //     db.transaction((tx) => { 
    //         tx.executeSql(
    //             'SELECT * FROM do_master WHERE status=?',
    //             ['MANUAL'],
    //             (tx, results) => {
    //               const len = results.rows.length;
    //               const items = [];
        
    //               for (let i = 0; i < len; i++) {
    //                 const item = results.rows.item(i);
    //                 console.log(item);
    //                 item.formattedDateTime = formatDateTime(item.do_Date);
    //                 items.push(item);
                    
    //               }
    //             //   console.log(items);
    //               setItemdatalist(items);
    //             },
    //             (error) => console.error('Error executing SQL query', error)
    //           );
    //     });
       

    //   }, []);

      const renderCards = () => {
        return doHoldData.map((item, index) => (

          
          <View key={index} style={styles.card}>
          
            <TouchableOpacity onPress={() => handlepressforgetorder(item)}>
                <View style={styles.cardflex}>
                        <Text style={{color:'#ff8f9c'}}>DO no: {item.do_no}</Text>
                        <Text style={{color:'#ff8f9c'}}>Shop Name: {item.shop_name}</Text>
                </View>
                
                {console.log(item.do_date)}
                <Text>{item.formattedDateTime}</Text>
            
            </TouchableOpacity>

             {/* <Text>Total Unit: {item.total_unit}</Text> */}
            {/*<Text>Total Amount: {item.total_amt}</Text> */}
          </View>
        ));
      }
    

  return (
    <>
            <View className="bg-white h-[120px] w-[] p-3" style={{backgroundColor:"#318CE7"}}>

            <View className="flex flex-row">
            <View
              className="w-[80px] m-3 h-[80px] bg-[#f2f2f2] rounded-full"
              style={{elevation: 0,}}>

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
            <View className="bg-white h-[] w-[] p-3" style={{backgroundColor:"red"}}>
            
<ScrollView>

      {renderCards()}

      {/* Your existing UI components */}
      {/* ... */}
    </ScrollView>
    </View>
     
    </>

  )
}

export default DoCheckedList;

const styles = StyleSheet.create({
    allInput: {
      elevation: 10,
    },
    dropdown: {
      height: 38,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal:8
      },
      addButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
      },
    cardflex:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        
    }
  });
