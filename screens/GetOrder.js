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
import { fetchDoCheckedData, fetchDoholdData } from '../action/offlineDataFetchAction';


const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const GetOrder = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
    const { timestamp,dealercode,shopName } = route.params;
    const [IsFocus, setIsFocus] = useState(null);
    const [IsFocusroute, setIsFocusroute] = useState(null);

    const[itemdatalist,setItemdatalist] = useState([]);
    const newCardItem = {
            do_no: timestamp,
            do_date: new Date().toISOString(),
            item_id: '',
            item_name:'',
            dealer_code: '',
            t_price: '',
            nsp_per:'',
            pack_size:'',
            unit_price:'',
            total_unit:'',
            total_amt:'',
            upload_status: 0,
          }

      
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
    
    const productcategory = useSelector(state => state.productcategory.productGroupData);
    const [productcategoryid, setProductcategoryid] = useState(null);
    const [selectedsubcategory, setSelectedsubcategory] = useState([]);
    const [selectedsubcategoryid, setSelectedsubcategoryid] = useState([]);
    const [selectedproductitemlist, setSelectedproductitemlist] = useState([]);
    const [selectedproductitem, setSelectedproductitem] = useState([]);
    const [selectedproductitemid, setSelectedproductitemid] = useState([]);
    const [itemdiscountpercentage, setItemdiscountpercentage] = useState([]);
    const [itemQuantity, setItemquantity] = useState(1); 
    const [itemTotalamount,setItemTotalamount] = useState(0.00); 
    const [itemallTotalamount,setItemallTotalamount] = useState(0.00);
    const [isPlusOpen,setIsPlusOpen] = useState(false);

    useEffect(() => {
      // This effect runs whenever `timestamp` changes
      let total=(selectedproductitem.t_price*((100-itemdiscountpercentage)/100))*itemQuantity;
           
   
      setItemTotalamount(total)

    }, [itemQuantity,itemdiscountpercentage]);
    

    const handleInputChange = (fieldName, text) => {
        const enteredValue = parseFloat(text); // Convert input to a number

        if (isNaN(enteredValue) || enteredValue < 0) {
          // If not a valid number or less than zero, set to zero
          setItemdiscountpercentage("0");
        } else if (enteredValue > selectedproductitem.nsp_per) {
          // If greater than selectedproductitem.nsp_per, set to selectedproductitem.nsp_per
          setItemdiscountpercentage(selectedproductitem.nsp_per.toString());
        } else {
          // Otherwise, set to the entered value
          setItemdiscountpercentage(enteredValue.toString());
        }
       
        // setDocreationdata({
        //   ...docreationdata,
        //   [fieldName]: text,
        // });
      };
    const handleInputChangeQuantity = (fieldName, text) => {
        // const enteredValue = parseFloat(text); // Convert input to a number
          //  if(enteredValue>=0){
            let total=(selectedproductitem.t_price*((100-itemdiscountpercentage)/100))*text;
            setItemTotalamount(total)
            setItemquantity(text)
       
          //  }else{
          //   setItemquantity(1)
          //  }
      };

  const handleconfrim=()=>{
    db.transaction((tx) => {  // Update upload status in the same transaction
      tx.executeSql(
        'UPDATE do_master SET status=? WHERE do_no = ?',
        ['CHECKED',timestamp],
        (_, results) => {
          alert('fdfdf')
        //  dispatch(fetchDoholdData());
         dispatch(fetchDoCheckedData());
        
          navigation.navigate('Bottomtab', {
            screen: 'Home',
            params: {
              screen: 'CreateOrder',
            },
          });
        },
        (error) => {
          console.error('Error updating upload status:', error);
        }
      );
    });
  }
  const handlehold=()=>{
  
    // navigation.navigate('bottomtab', { screen: 'Home' });
    navigation.navigate('Bottomtab', {
      screen: 'Home',
      params: {
        screen: 'CreateOrder',
      },
    });
  }
  const handlecancel=()=>{
    db.transaction((tx) => {  // Update upload status in the same transaction
      tx.executeSql(
        'DELETE FROM do_master WHERE do_no = ?',
        [timestamp],
        (_, results) => {
         dispatch(fetchDoholdData());
          navigation.navigate('Bottomtab', {
            screen: 'Home',
            params: {
              screen: 'CreateOrder',
            },
          });
        },
        (error) => {
          console.error('Error updating upload status:', error);
        }
      );
    });
  }


    

    const handleMinus=()=>{
       
        if(!(itemdiscountpercentage<=0)){
            setItemdiscountpercentage(itemdiscountpercentage-1);
        }
        
    }
    const handlePlus = () => {
        const currentDiscount = parseFloat(itemdiscountpercentage);
      
        if (!(currentDiscount >= selectedproductitem.nsp_per)) {
          setItemdiscountpercentage(currentDiscount + 1);
        }
      };
    const handleQuantityMinus = () => {
        const currentQuantity = parseFloat(itemQuantity);
      
        if((currentQuantity>1)){
          setItemquantity(currentQuantity-1);
      }
      };
    const handleQuantityPlus = () => {
        const currentQuantity = parseFloat(itemQuantity);
      
        // if (!(currentQuantity >= selectedproductitem.nsp_per)) {
          setItemquantity(currentQuantity + 1);
        // }
      };
      const handleAddCard = () => {
        // setCardCount(prevCount => prevCount + 1);
        newCardItem.do_date= new Date().toISOString();
        newCardItem.item_id=selectedproductitem.item_id;
        newCardItem.item_name=selectedproductitem.item_name;
        newCardItem.dealer_code=dealercode;
        newCardItem.t_price=selectedproductitem.t_price;
        newCardItem.nsp_per=selectedproductitem.nsp_per;
        newCardItem.pack_size=selectedproductitem.pack_size;
        newCardItem.unit_price=(selectedproductitem.t_price*((100-itemdiscountpercentage)/100));
        newCardItem.total_unit=itemQuantity;
        newCardItem.total_amt=itemTotalamount;
        
 

        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO item_add_info(do_no, do_date, item_id,item_name, dealer_code, t_price,nsp_per,pack_size,unit_price, total_unit, total_amt, do_synced,upload_status) VALUES (?,?,?,?, ?,?, ?, ?, ?, ?,?, ?,?)',
            [newCardItem.do_no, newCardItem.do_date, newCardItem.item_id, newCardItem.item_name,newCardItem.dealer_code, newCardItem.t_price,newCardItem.nsp_per,newCardItem.pack_size,newCardItem.unit_price, newCardItem.total_unit,newCardItem.total_amt,0,0],
            (tx, results) => {
              // Handle success, e.g., log or dispatch actions
              console.log('Data inserted into do_master table');
            },
            (error) => {
              console.error('Error inserting data into do_master table', error);
            }
          );
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
        // setItemdatalist((prevList) => [...prevList, newCardItem]);
        setIsModalVisible(false);
      };
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
    <View style={{zIndex:20, backgroundColor:'rgba(0, 0, 0, 0.5)',flex: 1,position:'absolute',zIndex:100, justifyContent: 'center', alignItems: 'center' ,display: isModalVisible ? 'flex' : 'none',height:'100%',width:'100%' }}>
    {/* <View > */}
        <View style={{ backgroundColor: 'white', zIndex:200, padding: 20, borderRadius: 10, elevation: 5 ,width:'90%',height:'60%'}} className="flex  justify-evenly">
         <Text className="text-[#ff8f9c]  items-center text-center">{selectedproductitem.item_name}</Text>
         <View className="flex flex-row items-center justify-between">
            <Text className="font-extrabold h-8 rounded-md p-1">Unit Price: {selectedproductitem.t_price}</Text>
            <Text className="font-extrabold h-8 rounded-md p-1 mr-8">UNIT: {selectedproductitem.unit_name}</Text>

         </View>
         <View className="flex flex-row items-center ">
           <Text className="font-extrabold h-8 rounded-md p-1">VAT %</Text>
                <View className="flex flex-row justify-evenly items-center ml-6 ">
                    <TouchableOpacity onPress={handleMinus} className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faMinus} color={'white'} />
                    </TouchableOpacity>
                    <TextInput 
                        placeholderTextColor={'#808080'}
                      //    placeholder="Enter Remarks"
                        cursorColor={'#808080'}
                        mode="outlined"
                        value={itemdiscountpercentage.toString()}
                        outlineColor="transparent"
                        activeOutlineColor="#84CDEE"
                        onChangeText={(text) => handleInputChange('remarks', text)}
                    className="w-[70px] text-center h-8 rounded-md  bg-slate-200"
                    ></TextInput>
                    <TouchableOpacity onPress={handlePlus}  className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faPlus} color={'white'} />
                    </TouchableOpacity>
                </View>
          </View>         
          <View className="flex flex-row items-center">
          <Text className="font-extrabold h-8 rounded-md p-1 ">Quantity:</Text>
                <View className="flex flex-row justify-evenly items-center ml-6 ">
                    <TouchableOpacity onPress={handleQuantityMinus} className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faMinus} color={'white'} />
                    </TouchableOpacity>
                    <TextInput 
                        placeholderTextColor={'#808080'}
                      //    placeholder="Enter Remarks"
                        cursorColor={'#808080'}
                        mode="outlined"
                        value={itemQuantity.toString()}
                        outlineColor="transparent"
                        activeOutlineColor="#84CDEE"
                        onChangeText={(text) => handleInputChangeQuantity('quantity', text)}
                    className="w-[70px] text-center h-8 rounded-md  bg-slate-200"
                    ></TextInput>
                    <TouchableOpacity onPress={handleQuantityPlus}  className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
                    <FontAwesomeIcon icon={faPlus} color={'white'} />
                    </TouchableOpacity>
                </View>
          </View>
          <Text className="font-extrabold h-8 rounded-md p-1">Total: {itemTotalamount}</Text>
          <View className="flex flex-row justify-end">
            <TouchableOpacity onPress={handleAddCard}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md">ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* </View> */}

     <TouchableOpacity className="absolute h-full w-full" onPress={()=>{setIsModalVisible(false)}}>
    
     </TouchableOpacity>

    </View>

 
    <View className="bg-[#f2f2f2]">

      <View className="m-auto w-[90%] pt-4 pb-4">
        <View className="flex flex-row items-center justify-between">
          <Text>DO NO: {timestamp}</Text>
          <Text>SHOP NAME: {shopName}</Text>
        </View>
   
        <View className={``} style={{elevation:10}}>
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
                setItemdiscountpercentage(item.nsp_per)
              
                setSelectedproductitem(item);
                setIsPlusOpen(true)

                // db.transaction((tx) => {
                //   tx.executeSql(
                //     'SELECT * FROM item_add_info',
                //     [],
                //     (tx, results) => {
                //       const len = results.rows.length;
                //       const names = [];
                
                //       for (let i = 0; i < len; i++) {
                //         names.push(results.rows.item(i));
                //       }
                //       console.log(names);
                //     },
                //     (error) => console.error('Error executing SQL query', error)
                //   );
                // });
                
               

              }}
            />
          </View>

          </View>
          <View className="bg-[hsl(353_100%_78%)] w-[] h-1"></View>
          <View className="flex-3 flex-row justify-evenly">
      
            <Text className="font-extrabold h-8 rounded-md p-1 -ml-14">Total Price</Text>         
            <Text className="font-extrabold h-8 rounded-md p-1 ">VAT %</Text>
            <Text className="font-extrabold h-8 rounded-md p-1 ">UNIT</Text>
            <Text></Text>
       
            
          

  
            
          </View>
          <View className="bg-[hsl(353_100%_78%)] w-[] h-1"></View>
          <View className={` flex flex-row ${isPlusOpen?'':'hidden'} items-center justify-evenly m-3`}>
          <Text className="-ml-6">{selectedproductitem.t_price}</Text>
          <View className="flex flex-row justify-evenly items-center ml-6 ">
              {/* <TouchableOpacity onPress={handleMinus} className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
              <FontAwesomeIcon icon={faMinus} color={'white'} />
              </TouchableOpacity> */}
              {/* <TextInput 
                   placeholderTextColor={'#808080'}
                //    placeholder="Enter Remarks"
                   cursorColor={'#808080'}
                   mode="outlined"
                   value={itemdiscountpercentage.toString()}
                   outlineColor="transparent"
                   activeOutlineColor="#84CDEE"
                   onChangeText={(text) => handleInputChange('remarks', text)}
              className="w-[70px] h-8 rounded-md  bg-white"
              ></TextInput> */}
              {/* <TouchableOpacity onPress={handlePlus}  className="w-[30px] mx-2 bg-[#ff8f9c] h-8 rounded-md flex flex-row justify-center items-center">
              <FontAwesomeIcon icon={faPlus} color={'white'} />
              </TouchableOpacity> */}
              <Text className="w-[70px]  rounded-md">{itemdiscountpercentage}</Text>
          </View>
          
          <Text className="">{selectedproductitem.unit_name}</Text>
          <TouchableOpacity onPress={()=>{setIsModalVisible(true)}}  className={`-right-8 z-40 flex flex-row items-center justify-center bg-[#ff8f9c] w-[50px] h-[50px] rounded-full`}  
      style={{
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowOffset: { width: 30, height: 2},
                shadowRadius: 10,
                elevation: 3,
                backgroundColor: '#ff8f9c'
                }}>
          <FontAwesomeIcon icon={faPlus} color={'white'} />
        </TouchableOpacity>  

          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="h-[370px]">
        {renderCards()}
        {/* <View className="m-1"  style={styles.card}>
          <Text className="text-end">Total: {itemallTotalamount}</Text>
        </View> */}
         <View className="my-3 flex flex-row items-center justify-evenly">
         <TouchableOpacity  onPress={handlecancel}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md" >Cancel</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={handlehold}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md">Hold</Text>
          </TouchableOpacity>
         <TouchableOpacity onPress={handleconfrim}>
              <Text className="w-[100px] h-8 bg-[#ff8f9c] text-white font-bold text-center p-1 rounded-md">Confirm</Text>
          </TouchableOpacity>
         </View>
        </ScrollView>
        </View>
        </View>
      
        </>
  )
}

export default GetOrder

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
  