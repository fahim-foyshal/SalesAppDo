import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import {faBars, faBold} from '@fortawesome/free-solid-svg-icons';
import {fetchshopdata} from '../action/SyncAction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

const MonthlyAttendance = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Get the current date
    const currentDate = new Date();
  
    // Get the first day of the current month
    console.log(currentDate);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
     
    console.log(firstDayOfMonth);
    // Calculate the last day of the current month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
   
    console.log(lastDayOfMonth);
    // Generate an array with all the days of the month
    const daysArray = [];
    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
      daysArray.push(new Date(day)); // Store the actual date
    }
    setDaysInMonth(daysArray);
  
    // Fetch attendance data for the current month
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ss_attendancesheet WHERE strftime("%Y-%m", date) = strftime("%Y-%m", "now", "localtime") ORDER BY date DESC',
        [],
        (_, result) => {
          const data = [];
          for (let i = 0; i < result.rows.length; i++) {
            data.push(result.rows.item(i));
          }
          setMonthlyData(data);
        },
        (error) => {
          console.error('Error fetching monthly attendance data:', error);
        }
      );
    });
  };
  

  const renderItem = ({ date}) => {
    const formattedDate = date.toISOString().split('T')[0];
    const attendanceDataForDay = monthlyData.find((data) => data.date === formattedDate);
    const day = new Date(formattedDate).getDate();
    const year = new Date(formattedDate).getFullYear();
    const monthIndex = new Date(formattedDate).getMonth() + 1;

    const monthName = new Date(formattedDate).toLocaleDateString('en-US', { month: 'short' }).split(',')[0];
    return (
    <View className="bg-white p-2  rounded-md  m-3" style={{elevation:8}} key={formattedDate}>
   <View  className=" flex flex-row " >
   <View 
    className=" flex flex-col justify-center items-center w-16 h-16 rounded-full bg-cyan-600 "
 
              >
                {/* <FontAwesomeIcon icon={faMoneyBill1} size={30} color="white" /> */}
                {/* <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>{formattedDate}</Text> */}
            <Text style={{ fontFamily: 'Roboto',fontWeight:'bold', fontSize: 22, color: 'white' }}>{day}</Text>
             <Text style={{ fontFamily: 'Roboto', color: 'white', marginTop: 5 }}>{monthName}</Text>
           
      </View>  
      <View className="flex flex-row flex-wrap"style={{
                width: 117,
                justifyContent: 'center',
                alignItems: 'center',
               // backgroundColor:'red',
                marginLeft:25,
                marginTop:5
                }}
      
      >
            <FontAwesomeIcon icon={faClock} size={20} color="green" />
            
            <Text style={{ fontFamily: 'Roboto', fontSize: 18,marginLeft:10 }}>{attendanceDataForDay.intime}</Text>
            <Text style={{ fontFamily: 'Roboto', marginLeft:10 }}>CLOCK-IN</Text>
        
      </View>
    
      <View className="flex flex-row flex-wrap"style={{
                width: 117,
                justifyContent: 'center',
                alignItems: 'center',
               // backgroundColor:'yellow',
                marginLeft:15,
                marginTop:5
              
                }}
      
      >
            <FontAwesomeIcon icon={faClock} size={20} color="red" />
            <Text style={{ fontFamily: 'Roboto', fontSize: 18,marginLeft:10 }}>{attendanceDataForDay.outtime}</Text>
            <Text style={{ fontFamily: 'Roboto',marginLeft:10 }}>CLOCK-OUT</Text>
        
      </View> 
    </View>     

   <View>
    <Text>{attendanceDataForDay.note}</Text>
   </View>



    
    {/* <Text>{formattedDate}</Text>
    {attendanceDataForDay ? (
      renderItem({ item: attendanceDataForDay })
    ) : (
      <Text className="text-center">absent</Text>
    )} */}
  </View>
    

  );
  }

  const renderDayItem = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const attendanceDataForDay = monthlyData.find((data) => data.date === formattedDate);
    const day = new Date(formattedDate).getDate();
    const year = new Date(formattedDate).getFullYear();
    const monthIndex = new Date(formattedDate).getMonth() + 1; // Adding 1 to get the correct month
    const monthName = new Date(formattedDate).toLocaleDateString('en-US', { month: 'short' }).split(',')[0];

    
    return (
      // <View className="bg-white w-[] rounded-md    flex flex-row flex-wrap" style={{elevation:8,height:72,}} key={formattedDate}>
        
      //   <View style={{
      //                 width: 62,
      //                 height: 62,
      //                 borderRadius: 50,
      //                 backgroundColor: '#0F52BA',
      //                 elevation: 10,
      //                 justifyContent: 'center',
      //                 alignItems: 'center',
      //                 marginLeft:25,
      //                 marginTop:5
      //               }}
      //             >
      //               {/* <FontAwesomeIcon icon={faMoneyBill1} size={30} color="white" /> */}
      //               {/* <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>{formattedDate}</Text> */}
      //           <Text style={{ fontFamily: 'Roboto',fontWeight:'bold', fontSize: 22, color: 'white' }}>{day}</Text>
      //           <Text style={{ fontFamily: 'Roboto',  color: 'white' }}>{formattedDate}</Text>
               
      //     </View>  
      //     <View className="flex flex-row flex-wrap"style={{
      //               width: 117,
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //              // backgroundColor:'red',
      //               marginLeft:25,
      //               marginTop:5
      //               }}
          
      //     >
      //           <FontAwesomeIcon icon={faClock} size={20} color="green" />
                
      //           <Text style={{ fontFamily: 'Roboto', fontSize: 18,marginLeft:10 }}>08:05 AM</Text>
      //           <Text style={{ fontFamily: 'Roboto', marginLeft:10 }}>CLOCK-IN</Text>
            
      //     </View>
        
      //     <View className="flex flex-row flex-wrap"style={{
      //               width: 117,
      //               justifyContent: 'center',
      //               alignItems: 'center',
      //              // backgroundColor:'yellow',
      //               marginLeft:15,
      //               marginTop:5
                  
      //               }}
          
      //     >
      //           <FontAwesomeIcon icon={faClock} size={20} color="red" />
      //           <Text style={{ fontFamily: 'Roboto', fontSize: 18,marginLeft:10 }}>08:05 AM</Text>
      //           <Text style={{ fontFamily: 'Roboto',marginLeft:10 }}>CLOCK-OUT</Text>
            
      //     </View> 

 


        
      //   {/* <Text>{formattedDate}</Text>
      //   {attendanceDataForDay ? (
      //     renderItem({ item: attendanceDataForDay })
      //   ) : (
      //     <Text className="text-center">absent</Text>
      //   )} */}
      // </View>
      <>
     

      {/* <Text>{formattedDate}</Text> */}
      {attendanceDataForDay ? (
        renderItem({ date: date,attendanceDataForDay:attendanceDataForDay })
      ) : (
        <View className="bg-white w-[] flex flex-row items-center  m-3 rounded-md min-h-28 p-5" style={{elevation:8}} key={formattedDate}>
              <View 
              className=" flex flex-col justify-center items-center w-16 h-16 rounded-full bg-cyan-600 "
 
              >
                {/* <FontAwesomeIcon icon={faMoneyBill1} size={30} color="white" /> */}
                {/* <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>{formattedDate}</Text> */}
            <Text style={{ fontFamily: 'Roboto',fontWeight:'bold', fontSize: 22, color: 'white' }}>{day}</Text>
             <Text style={{ fontFamily: 'Roboto', color: 'white', marginTop: 5 }}>{monthName}</Text>
           
      </View>  
        <Text className="text-center ml-16">No Attendance</Text>
        </View>
      )}
   
    </>
    );
  };

  return (


    <View style={{}}>
      <View className=" h-[150px] w-[] bg-cyan-600" style={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}>
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
               <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Nitol Arafat</Text>
                <Text style={{ fontSize: 15, color: 'yellow' }}>Sales Manager</Text>
                <Text style={{ fontSize: 15, color: 'yellow' }}>ID : 0078</Text>
              </View>
          </View>

      </View >
      <View style={{marginTop:0,borderRadius:50}}>
      <FlatList
        data={daysInMonth}
        renderItem={({ item }) => renderDayItem(item)}
        keyExtractor={(date) => date.toISOString()}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  dayItem: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    margin: 4,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MonthlyAttendance;
