import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import GetLocation from 'react-native-get-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMinus, faPlus, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Screen } from 'react-native-screens';
import { fetchDoholdData } from '../action/offlineDataFetchAction';


const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });


const DoCheckedIndividual = ({ route }) => {
    const { timestamp,dealercode,shopName } = route.params;
    const[itemdatalist,setItemdatalist] = useState([]);
    useEffect(() => {
        // This effect runs whenever `timestamp` changes
        db.transaction((tx) => {
       
          tx.executeSql(
            'SELECT * FROM item_add_info WHERE do_no = ?',
            [timestamp],
            (tx, results) => {
              const len = results.rows.length;
              const items = [];
    
              for (let i = 0; i < len; i++) {
                items.push(results.rows.item(i));
              }
    
              setItemdatalist(items);
            },
            (error) => console.error('Error executing SQL query', error)
          );
  
        });
  
      }, [timestamp]);

      const renderCards = () => {
        let total_amount = 0;
        const cards = [];
      
        itemdatalist.map((item, index) => {
          total_amount += parseFloat(item.total_amt);
      
          cards.push(
            <View className="m-1" key={index} style={styles.card}>
              {/* Add content for each card here */}
              <Text className="text-center text-[#ff8f9c]">{item.item_name}</Text>
              <View>
                <Text className="font-bold">Unit Price: {item.unit_price}</Text>
                <Text className="font-bold">Total Unit: {item.total_unit}</Text>
                <Text className="font-bold">Total Amount: {item.total_amt}</Text>
              </View>
            </View>
          );
        });
        cards.push(
          <View className="m-1" key={-1}  style={styles.card}>
            {/* Add content for each card here */}
            <Text className="text-end text-[#ff8f9c]">Total: {total_amount}</Text>
    
          </View>
        );
        // setItemallTotalamount(total_amount);
        console.log('Total Amount:', total_amount); // Log the total amount for debugging
        return cards;
      };
      
      
  return (
    <>
<View className="bg-[#f2f2f2]">

   <View className="m-auto w-[90%] pt-4 pb-4">
            <View className="flex flex-row items-center justify-between">
                <Text>DO NO: {timestamp}</Text>
                <Text>SHOP NAME: {shopName}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="h-[370px]">
        {renderCards()}
        {/* <View className="m-1"  style={styles.card}>
          <Text className="text-end">Total: {itemallTotalamount}</Text>
        </View> */}
         {/* <View className="my-3 flex flex-row items-center justify-evenly">
         <TouchableOpacity  onPress={handlecancel}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md" >Cancel</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={handlehold}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md">Hold</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={handleconfrim}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md">Confirm</Text>
          </TouchableOpacity>
         </View> */}
        </ScrollView>
   
    </View>

</View>
      
    </>
  )
}

export default DoCheckedIndividual;

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
      },
      addButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
      },
  });
