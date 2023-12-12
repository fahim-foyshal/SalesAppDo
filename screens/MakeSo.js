import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';

const statuslist = [
  { label: 'No Order', value: '1' },
  { label: 'Get Order', value: '2' },
  { label: 'Close', value: '3' },
];

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const MakeSo = () => {

  const currentDate = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [day, month, year] = currentDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setShowDatePicker(false);
      setDate(selectedDate);
      // Handle the selected date
    } else {
      setShowDatePicker(false);
    }
  };


  const [status, setStatus] = useState(null);
  const [IsFocus, setIsFocus] = useState(null);
  const [IsFocusroute, setIsFocusroute] = useState(null);
  const [statuslabel, setStatuslabel] = useState(null);
  const [routeid, setRouteid] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShop, setSelectedshop] = useState([]);
  const [selectedShopdetails, setSelectedshopdetails] = useState([]);
  const [selectedShopid, setSelectedshopid] = useState([]);
  const routes = useSelector((state) => state.routedetails.routeData);

  return (
    <View className="bg-[#f2f2f2]">
      <View className="m-auto w-[90%] pt-4 pb-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="font-bold text-[#000] text-[16px]">Route</Text>
          <View
            className={`${
              IsFocusroute ? 'border-sky-500 border-[2px] ' : ''
            }relative w-[100%]  h-11 rounded-xl mt-1 mb-3 bg-white`}
            style={{ elevation: 10 }}
          >
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={routes}
              search
              maxHeight={300}
              labelField="route_name"
              valueField="route_id"
              placeholder={'Shop Route Type'}
              searchPlaceholder="Search..."
              value={routeid}
              onFocus={() => setIsFocusroute(true)}
              onBlur={() => setIsFocusroute(false)}
              onChange={(item) => {
                setRouteid(item.route_id);

                db.transaction((tx) => {
                  tx.executeSql(
                    'SELECT * FROM stores WHERE route_id = ?',
                    [item.route_id],
                    (tx, results) => {
                      const len = results.rows.length;
                      const names = [];
          
                      for (let i = 0; i < len; i++) {
                        names.push(results.rows.item(i));
                  
                      }
                     console.log(names);
                      setSelectedshop(names);
                    },
                    (error) => console.error('Error executing SQL query', error)
                  );
                });


              }}
            />
          </View>
          <Text className="font-bold text-[#000] text-[16px]">Shop Name</Text>
          <View
            className={`${
              IsFocusroute ? 'border-sky-500 border-[2px] ' : ''
            }relative w-[100%]  h-11 rounded-xl mt-1 mb-3 bg-white`}
            style={{ elevation: 10 }}
          >
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={selectedShop}
              search
              maxHeight={300}
              labelField="shop_name"
              valueField="id"
              placeholder={'Shop Route Type'}
              searchPlaceholder="Search..."
              value={selectedShopid}
              onFocus={() => setIsFocusroute(true)}
              onBlur={() => setIsFocusroute(false)}
              onChange={(item) => {
             
                setSelectedshopid(item.id);
                setSelectedshopdetails(item);


         

              }}
            />
          </View>

{/*           
          <TextInput
            style={styles.allInput}
            placeholderTextColor={'#808080'}
            placeholder="Enter Shop Name"
            cursorColor={'#808080'}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="#84CDEE"
            className="  relative w-[100%] h-11 rounded-xl mt-1 mb-3 bg-white"
          /> */}

          {/* <Text className="font-bold text-[#000] text-[16px]">So No</Text> */}
          <TextInput
            style={styles.allInput}
            placeholderTextColor={'#808080'}
            placeholder="Enter So No"
            cursorColor={'#808080'}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="#84CDEE"
            className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
          />

          <Text className="font-bold text-[#000] text-[16px]">Date</Text>
          <Text className="relative w-[100%] h-11 rounded-xl mt-1 mb-3 p-3 bg-white">
            {formattedDate}
          </Text>

          <Text className="font-bold text-[#000] text-[16px]">Status</Text>
          <View
            className={`${
              IsFocus ? 'border-sky-500 border-[2px] ' : ''
            }relative w-[100%]  h-11 rounded-xl mt-1 mb-3 bg-white`}
            style={{ elevation: 10 }}
          >
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={statuslist}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Shop Route Type'}
              searchPlaceholder="Search..."
              value={status}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setStatus(item.value);
                setStatuslabel(item.label);
              }}
            />
          </View>

          <Text className="font-bold text-[#000] text-[16px]">Note</Text>
          <TextInput
            style={styles.allInput}
            placeholderTextColor={'#808080'}
            placeholder="Enter Remarks"
            cursorColor={'#808080'}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="#84CDEE"
            className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
          />

          <View className="flex flex-row justify-center mt-4 mb-4">
            <Text className="text-[#fff] font-bold bg-[#0d6efd] p-3 m-2 rounded-[10px] text-center w-[40%]">
              View
            </Text>
            <Text className="text-[#fff] font-bold bg-[#0f8122] p-3 m-2 rounded-[10px] text-center w-[40%]">
              Initiate
            </Text>
          </View>

          <View className={`${status == 2 ? '' : 'hidden'}`}>
            <Text className="font-bold text-[#000] text-[16px]">Category</Text>
            <TextInput
              style={styles.allInput}
              placeholderTextColor={'#808080'}
              placeholder="Enter Category"
              cursorColor={'#808080'}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="#84CDEE"
              className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
            />

            <Text className="font-bold text-[#000] text-[16px]">Sub Category</Text>
            <TextInput
              style={styles.allInput}
              placeholderTextColor={'#808080'}
              placeholder="Enter Sub Category"
              cursorColor={'#808080'}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="#84CDEE"
              className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
            />

            <Text className="font-bold text-[#000] text-[16px]">Item</Text>
            <TextInput
              style={styles.allInput}
              placeholderTextColor={'#808080'}
              placeholder="Enter Item"
              cursorColor={'#808080'}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="#84CDEE"
              className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MakeSo;

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
});
