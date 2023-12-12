import { useState } from "react";
import { FETCH_ORDEROFFLINE_REQUEST } from "./actionsType";

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });



export const fetchDeviceData = (cartData) => ({
    type: FETCH_ORDEROFFLINE_REQUEST,
    payload: cartData,
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