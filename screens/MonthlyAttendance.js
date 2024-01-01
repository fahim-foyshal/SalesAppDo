import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

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
  

  const renderItem = ({ item }) => (
    <View >
      {/* <Text>Date: {item.date}</Text> */}
    <View className="flex flex-row justify-between">
    <Text className="bg-[hsl(353_100%_78%)] h-8 flex flex-row justify-center p-2 rounded-md text-white font-bold my-2">In Time: {item.intime}</Text>
      <Text className="bg-[hsl(353_100%_78%)] h-8 flex flex-row justify-center p-2 rounded-md text-white font-bold my-2">Out Time: {item.outtime}</Text>
    </View>

      <Text>Note: {item.note}</Text>
    </View>
  );

  const renderDayItem = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const attendanceDataForDay = monthlyData.find((data) => data.date === formattedDate);

    return (
      <View className="bg-white w-[] m-3 rounded-md min-h-28 p-5" style={{elevation:8}} key={formattedDate}>
        <Text>{formattedDate}</Text>
        {attendanceDataForDay ? (
          renderItem({ item: attendanceDataForDay })
        ) : (
          <Text className="text-center">No Attendance</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={daysInMonth}
        renderItem={({ item }) => renderDayItem(item)}
        keyExtractor={(date) => date.toISOString()}
        showsVerticalScrollIndicator={false}
      />
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
