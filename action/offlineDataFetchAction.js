import { useState } from "react";
import { FETCH_ORDEROFFLINE_REQUEST,FETCH_DO_LIST,FETCH_DO_HOLD_LIST,FETCH_DO_CHECKED_LIST } from "./actionsType";
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });



export const fetchDeviceData = (cartData) => ({
    type: FETCH_ORDEROFFLINE_REQUEST,
    payload: cartData,
  });
export const fetchDoHoldDATA = (doholdData) => ({
    type: FETCH_DO_HOLD_LIST,
    payload: doholdData,
  });
export const fetchDoCHECKEDDATA = (docheckedData) => ({
    type: FETCH_DO_CHECKED_LIST,
    payload: docheckedData,
  });
export const fetchDoData = (doData) => ({
    type: FETCH_DO_LIST,
    payload: doData,
  });
  const formatDateTime = (isoDateTime) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use AM/PM format
    };
    return new Date(isoDateTime).toLocaleString(undefined, options);
  };
export const fetchCartData = () => {
   
   
    return (dispatch) => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM stores',
              [],
              (tx, results) => {
              
                const data = [];
               
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  item.formattedDateTime = formatDateTime(item.datetime);
                  data.push(item);
                }
                
                
             
                dispatch(fetchDeviceData(data));
              
                
              },
              (error) => {
                console.error('Error fetching data from SQLite:', error);
              }
            );
          });

    };
  };
export const fetchalldoData = () => {
   
   
    return (dispatch) => {
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM do_master WHERE upload_status==?',
              [0],
              (tx, results) => {
              
                const data = [];
               
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                  item.formattedDateTime = formatDateTime(item.datetime);
                  data.push(item);
                }
                
                
             
                dispatch(fetchDoData(data));
              
                
              },
              (error) => {
                console.error('Error fetching data from SQLite:', error);
              }
            );
          });

    };
  };
//for do master
  export const fetchAndUploadDoData = () => {
    return (dispatch) => {
      db.transaction(
        (tx) => {
       
          tx.executeSql(
            'SELECT * FROM do_master WHERE upload_status == ? and status==?',
            [0,'CHECKED'],
            (tx, results) => {
              
              const data = [];
              for (let i = 0; i < results.rows.length; i++) {
                const item = results.rows.item(i);
  
                data.push({
                  do_no: item.do_no,
                  do_Date: item.do_Date,
                  dealer_code: item.dealer_code,
                  status: item.status,
                  remarks: item.remarks,
                  visit: item.visit,
                  memo: item.memo,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  id: item.do_no, // Assuming do_no is a unique identifier
                });
              }
            if(data.length!=0){
              fetchandUpload2(data);
            }
             
            },
            (error) => {
              console.error('Error fetching data from SQLite:', error);
            }
          );
         
        },
        (error) => {
          console.error('Transaction error:', error);
        },
        () => {
          console.log('Transaction completed.');
          // Additional cleanup or dispatch actions after the transaction is completed
        }
      );
    };
  };
  
function fetchandUpload2(data){
  console.log(data);
  data.forEach((item) => {
    const arrayitem = [item];
    axios
      .post('https://ezzy-erp.com/newapp/api/api_ss_doMaster.php', arrayitem)
      .then((response) => {
    

        db.transaction((tx) => {  // Update upload status in the same transaction
        tx.executeSql(
          'UPDATE do_master SET do_no=?, upload_status = ? WHERE do_no = ?',
          [response.data.do_no, 1, item.id],
          (_, results) => {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx:', item.id, response.data.do_no);
          },
          (error) => {
            console.error('Error updating upload status:', error);
          }
        );
        tx.executeSql(
          'SELECT * FROM item_add_info WHERE do_no=?',
          [item.do_no],
          (tx, results) => {
            console.log(results.rows.length);
        
            const data2 = [];
            for (let i = 0; i < results.rows.length; i++) {

              const dodetailsitems = results.rows.item(i);
      
              console.log(dodetailsitems);
            
              data2.push({
                previous_do:dodetailsitems.do_no,
                do_no: response.data.do_no,
                do_date: dodetailsitems.do_date,
                item_id:dodetailsitems.item_id,
                dealer_code: dodetailsitems.dealer_code,
                t_price: dodetailsitems.t_price,
                nsp_per: dodetailsitems.nsp_per,
                pack_size: dodetailsitems.pack_size,
                unit_price: dodetailsitems.unit_price,
                total_unit: dodetailsitems.total_unit,
                total_amt: dodetailsitems.total_amt,
              });
            }
           
            fetchAndUploadDoDetailsData2(data2);
          },
          (error) => {
            console.error('Error updating upload status:', error);
          }
        );
      });
        // Update for ss doDetails in the same transaction

      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
      });
  });
}

//For do details
// export const fetchAndUploadDoDetailsData = () => {
//   return (dispatch) => {
//     db.transaction(
//       (tx) => {
     
//         tx.executeSql(
//           'SELECT * FROM item_add_info WHERE upload_status == ? and do_synced==?',
//           [0,1],
//           (tx, results) => {
            
//             const data = [];
//             for (let i = 0; i < results.rows.length; i++) {
//               const item = results.rows.item(i);
//               console.log(item);
//               data.push({
//                 do_no: item.do_no,
//                 do_date: item.do_Date,
//                 item_id:item.item_id,
//                 dealer_code: item.dealer_code,
//                 t_price: item.t_price,
//                 unit_price: item.unit_price,
//                 total_unit: item.total_unit,
//                 total_amt: item.total_amt,
//               });
//             }

//             fetchAndUploadDoDetailsData2(data);
//           },
//           (error) => {
//             console.error('Error fetching data from SQLite:', error);
//           }
//         );
       
//       },
//       (error) => {
//         console.error('Transaction error:', error);
//       },
//       () => {
//         console.log('Transaction completed.');
//         // Additional cleanup or dispatch actions after the transaction is completed
//       }
//     );
//   };
// };

function fetchAndUploadDoDetailsData2(data){

  data.forEach((item) => {

  
    const arrayitem = [item];
    axios
      .post('https://ezzy-erp.com/newapp/api/api_doDetails.php', arrayitem)
      .then((response) => {
        console.log('API Response:', response.data);

        db.transaction((tx) => {  // Update upload status in the same transaction
        tx.executeSql(
          'UPDATE item_add_info SET do_no = ?,do_synced = ?, upload_status = ? WHERE do_no = ?',
          [item.do_no,1,1, item.previous_do],
          (_, results) => {
            console.log('Upload status updated to 1 for id:fggggggggggiiiiiiiiiii');
          },
          (error) => {
            console.error('Error updating upload status:', error);
          }
        );
        // tx.executeSql(
        //   'UPDATE item_add_info SET do_no=?,do_synced=? WHERE do_no=?',
        //   [response.data.do_no, 1, item.do_no],
        //   (_, results) => {
        //     console.log('Upload status updated to 1 for id:', item.id);
        //   },
        //   (error) => {
        //     console.error('Error updating upload status:', error);
        //   }
        // );
      });
        // Update for ss doDetails in the same transaction

      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
      });
  });
}




export const fetchDoholdData = () => {
  return (dispatch) => {
    db.transaction((tx) => { 
      tx.executeSql(
          'SELECT * FROM do_master WHERE status=?',
          ['MANUAL'],
          (tx, results) => {
            const len = results.rows.length;
            const items = [];
  
            for (let i = 0; i < len; i++) {
              const item = results.rows.item(i);
             
              item.formattedDateTime = formatDateTime(item.do_Date);
              items.push(item);
              
            }
          //   console.log(items);
            dispatch(fetchDoHoldDATA(items))
          },
          (error) => console.error('Error executing SQL query', error)
        );
  });
  };
};
export const fetchDoCheckedData = () => {
  return (dispatch) => {
    db.transaction((tx) => { 
      tx.executeSql(
          'SELECT * FROM do_master WHERE status=?',
          ['CHECKED'],
          (tx, results) => {
            const len = results.rows.length;
            const items = [];
  
            for (let i = 0; i < len; i++) {
              const item = results.rows.item(i);
              console.log(item);
              item.formattedDateTime = formatDateTime(item.do_Date);
              items.push(item);
              
            }
          //   console.log(items);
            dispatch(fetchDoCHECKEDDATA(items))
          },
          (error) => console.error('Error executing SQL query', error)
        );
  });
  };
};


// export const uploadAttendance=(data)=>{



  
 
//     axios
//       .post('https://ezzy-erp.com/newapp/api/api_ss_attendance.php', arrayitem)
//       .then((response) => {
//         console.log('API Response:', response.data);

//         db.transaction((tx) => {  // Update upload status in the same transaction
//         tx.executeSql(
//           'UPDATE item_add_info SET do_no = ?,do_synced = ?, upload_status = ? WHERE do_no = ?',
//           [item.do_no,1,1, item.do_no],
//           (_, results) => {
//             console.log('Upload status updated to 1 for id:fggggggggggiiiiiiiiiii');
//           },
//           (error) => {
//             console.error('Error updating upload status:', error);
//           }
//         );
//         // tx.executeSql(
//         //   'UPDATE item_add_info SET do_no=?,do_synced=? WHERE do_no=?',
//         //   [response.data.do_no, 1, item.do_no],
//         //   (_, results) => {
//         //     console.log('Upload status updated to 1 for id:', item.id);
//         //   },
//         //   (error) => {
//         //     console.error('Error updating upload status:', error);
//         //   }
//         // );
//       });
//         // Update for ss doDetails in the same transaction

//       })
//       .catch((error) => {
//         console.error('Error sending data to API:', error);
//       });
 
// }


export const uploadAttendance = () => {
  return (dispatch) => {

 console.log("fsssssssssssssssssssssssssssssssssssssssss")

  const currentDate = new Date();
  const currentTime = currentDate.toTimeString().split(' ')[0]; // Format HH:mm:ss
  const currentDateOnly = currentDate.toISOString().split('T')[0];

  // Fetch data from SQLite database
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM ss_attendancesheet WHERE date = ?',
      [currentDateOnly],
      (_, result) => {
        if (result.rows.length > 0) {
          const attendanceData = result.rows.item(0);

          console.log(attendanceData);
          

          // Make API call to send attendance data
          axios.post('https://ezzy-erp.com/newapp/api/api_ss_attendance.php', [{
            username: attendanceData.username,
            note: attendanceData.note,
            date: attendanceData.date,
            intime: attendanceData.intime,
            outtime: attendanceData.outtime,
          }])
            .then(response => {
              console.log('Attendance data sent successfully:', response.data);
            })
            .catch(error => {
              console.error('Error sending attendance data:', error);
            });
        } else {
          console.log('No attendance data found for the current date.');
        }
      },
      (error) => {
        console.error('Error fetching attendance data:', error);
      }
    );
  });


  console.log("Data Inserted Successfully");
}
};
