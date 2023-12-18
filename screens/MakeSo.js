import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import GetLocation from 'react-native-get-location';
import { useNavigation } from '@react-navigation/native';

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

const statuslist = [
  { label: 'No Order', value: '1' },
  { label: 'Get Order', value: '2' },
  { label: 'Close', value: '3' },
];

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });



const MakeSo = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const user = useSelector(state => state.useralldetails.userData);
  const productcategory = useSelector(state => state.productcategory.productGroupData);
  const [productcategoryid, setProductcategoryid] = useState(null);
  const [selectedsubcategory, setSelectedsubcategory] = useState([]);
  const [selectedsubcategoryid, setSelectedsubcategoryid] = useState([]);
  const [selectedproductitemlist, setSelectedproductitemlist] = useState([]);
  const [selectedproductitem, setSelectedproductitem] = useState([]);
  const [selectedproductitemid, setSelectedproductitemid] = useState([]);

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


  const currentDate = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });



  const handleInputChange = (fieldName, text) => {
    setDocreationdata({
      ...docreationdata,
      [fieldName]: text,
    });
  };

  const[docreationdata,setDocreationdata] = useState({
    do_no: '',
    do_Date:  new Date().toISOString(),
    dealer_code: '',
    shop_name:'',
    status: '',
    remarks: '',
    visit: '',
    memo:'',
    longitude: '',
    latitude: '',
    upload_status:0,
  
  });

  const [day, month, year] = currentDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  



  const [status, setStatus] = useState(null);
  const [openitemlist, setOpenitemlist] = useState(false);
  const [IsFocus, setIsFocus] = useState(null);
  const [IsFocusroute, setIsFocusroute] = useState(null);
  const [statuslabel, setStatuslabel] = useState(null);
  const [routeid, setRouteid] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShop, setSelectedshop] = useState([]);
  const [selectedShopdetails, setSelectedshopdetails] = useState([]);
  const [selectedShopid, setSelectedshopid] = useState([]);
  const routes = useSelector((state) => state.routedetails.routeData);
  useEffect(() => {
    // This effect runs whenever `timestamp` changes
    if (timestamp !== '') {
      // Add the logic you want to execute after `timestamp` is set properly
      console.log('Timestamp is set properly:', timestamp);
      
    if(status==2){
        docreationdata.do_no=timestamp;
        docreationdata.dealer_code=user.dealer_code;
        docreationdata.shop_name=selectedShopdetails.shop_name;
        docreationdata.status= "MANUAL";
        docreationdata.visit="1"
        docreationdata.memo="1"
        docreationdata.longitude= location.longitude;
        docreationdata.latitude= location.latitude;
   
  
      console.log(docreationdata);
    
    setOpenitemlist(true);
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO do_master (do_no, do_Date, dealer_code,shop_name, status, remarks, visit, memo, longitude, latitude, upload_status) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          docreationdata.do_no,
          docreationdata.do_Date, // Convert date to string if needed
          docreationdata.dealer_code,
          docreationdata.shop_name,
          docreationdata.status,
          docreationdata.remarks,
          docreationdata.visit,
          docreationdata.memo,
          docreationdata.longitude,
          docreationdata.latitude,
          docreationdata.upload_status.toString(), // Convert upload_status to string if needed
        ],
        (tx, results) => {
          // Handle the result of the SQL execution if needed
          console.log('Insert success:', results);
          navigation.navigate('GetOrder', { timestamp ,dealercode:docreationdata.dealer_code,shopName:selectedShopdetails.shop_name});
        },
        (error) => {
          console.error('Error executing SQL query', error);
        }
      );
    });
  }

    }
  }, [timestamp]);
  
  const submitDo = () => {

    var currentTimestamp = new Date().getTime();
   

// Convert to string
   var timestampString = currentTimestamp.toString();
   setTimestamp(timestampString);

}





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
              placeholder={'Shop Name'}
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
          {/* <TextInput
            style={styles.allInput}
            placeholderTextColor={'#808080'}
            placeholder="Enter So No"
            cursorColor={'#808080'}
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="#84CDEE"
            className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
          /> */}

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
              placeholder={'Status'}
              searchPlaceholder="Search..."
              value={status}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setStatus(item.value);
                setStatuslabel(item.label);
                if(item.value != 2){
                setOpenitemlist(false)
                }
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
            onChangeText={(text) => handleInputChange('remarks', text)}
            className="  relative w-[100%] h-11 rounded-xl  mt-1 mb-3 bg-white"
          />

          <View className="flex flex-row justify-center">
            <Text className="text-[#fff] font-bold bg-[#0d6efd] p-3 m-2 rounded-[10px] text-center w-[40%] h-12">
              View
            </Text>
            <TouchableOpacity onPress={submitDo} className="font-bold bg-[#0f8122]  m-2 rounded-[10px]  w-[40%] h-12">
            <Text className="p-3 text-center text-[#fff] ">
              Initiate
            </Text>
            </TouchableOpacity>

          </View>

          <View className={`${openitemlist  && status==2? 'hidden' : 'hidden'} w-[] m-2 bg-white p-2 rounded-md`} style={{elevation:10}}>
            <Text className="font-bold text-[#000] text-[16px]">Category</Text>
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
              data={productcategory}
              search
              maxHeight={300}
              labelField="group_name"
              valueField="id"
              placeholder={'Select Category'}
              searchPlaceholder="Search..."
              value={productcategoryid}
              onFocus={() => setIsFocusroute(true)}
              onBlur={() => setIsFocusroute(false)}
              onChange={(item) => {
                setProductcategoryid(item.id);

                db.transaction((tx) => {
                  tx.executeSql(
                    'SELECT * FROM subcategories WHERE category_id = ?',
                    [item.id],
                    (tx, results) => {
                      const len = results.rows.length;
                      const names = [];
          
                      for (let i = 0; i < len; i++) {
                        names.push(results.rows.item(i));
                  
                      }
                     console.log(names);
                      setSelectedsubcategory(names);
                    },
                    (error) => console.error('Error executing SQL query', error)
                  );
                });


              }}
            />
          </View>


            <Text className="font-bold text-[#000] text-[16px]">Sub Category</Text>
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
              data={selectedsubcategory}
              search
              maxHeight={300}
              labelField="subcategory_name"
              valueField="id"
              placeholder={'Select sub-category'}
              searchPlaceholder="Search..."
              value={selectedsubcategoryid}
              onFocus={() => setIsFocusroute(true)}
              onBlur={() => setIsFocusroute(false)}
              onChange={(item) => {
                setSelectedsubcategoryid(item.id);

                db.transaction((tx) => {
                  tx.executeSql(
                    'SELECT * FROM item_info WHERE category_id = ? and subcategory_id=?',
                    [productcategoryid, item.id],
                    (tx, results) => {
                      const len = results.rows.length;
                      const names = [];
          
                      for (let i = 0; i < len; i++) {
                        names.push(results.rows.item(i));
                  
                      }
                     console.log(names);
                      setSelectedproductitemlist(names);
                    },
                    (error) => console.error('Error executing SQL query', error)
                  );
                });


              }}
            />
          </View>


            <Text className="font-bold text-[#000] text-[16px]">Item</Text>
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
              data={selectedproductitemlist}
              search
              maxHeight={300}
              labelField="item_name"
              valueField="item_id"
              placeholder={'Select Item'}
              searchPlaceholder="Search..."
              value={selectedproductitemid}
              onFocus={() => setIsFocusroute(true)}
              onBlur={() => setIsFocusroute(false)}
              onChange={(item) => {
                setSelectedproductitemid(item.item_id);
                setSelectedproductitem(item);
                console.log(item);

                // db.transaction((tx) => {
                //   tx.executeSql(
                //     'SELECT * FROM subcategories WHERE category_id = ?',
                //     [item.id],
                //     (tx, results) => {
                //       const len = results.rows.length;
                //       const names = [];
          
                //       for (let i = 0; i < len; i++) {
                //         names.push(results.rows.item(i));
                  
                //       }
                //      console.log(names);
                      
                //     },
                //     (error) => console.error('Error executing SQL query', error)
                //   );
                // });

               

              }}
            />
          </View>

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
