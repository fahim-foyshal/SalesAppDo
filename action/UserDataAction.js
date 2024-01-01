import { useState } from "react";
import SQLite from 'react-native-sqlite-storage';
import { FETCH_ROUTELIST_REQUEST, FETCH_USERDATA_REQUEST,FETCH_PRODUCT_CATEGORY_LIST } from "./actionsType";

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

export const fetchUserPayloadData = (userData) => ({
    type: FETCH_USERDATA_REQUEST,
    payload: userData,
  });
export const fetchUserRouteData = (routeData) => ({
    type: FETCH_ROUTELIST_REQUEST,
    payload: routeData,
  });
export const fetchCategoryData = (productcategorydata) => ({
    type: FETCH_PRODUCT_CATEGORY_LIST,
    payload: productcategorydata,
  });


  export const fetchUserData = () => {
    const [storedData, setStoredData] = useState([]);
   
    return (dispatch) => {
 
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM users WHERE isLoggedIn = 1', // Change the condition to match your use case
              [],
              (tx, results) => {
                if (results.rows.length > 0) {
                  // Get the first row (assuming there's only one user with isLoggedIn = 1)
                  const user = results.rows.item(0);
                  console.log("bbbbbbbbbbbbbbb"+user)
                  dispatch(fetchUserPayloadData(user));
                 
                }
              },
              (error) => {
                console.error('Error retrieving user data from the database:', error);
              }
            );
          });

    };
  };

  export const fetchUserRouteListData = () => {
   
   
    return (dispatch) => {
 
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM routelist', // Change the condition to match your use case
              [],
              (tx, results) => {
                const data = [];
               
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                 
                  data.push(item);
                }
                dispatch(fetchUserRouteData(data));

              },
              (error) => {
                console.error('Error retrieving user data from the database:', error);
              }
            );
          });

    };
  };
  export const fetchProductGroupListData = () => {
   
   
    return (dispatch) => {
 
        db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM product_groups', // Change the condition to match your use case
              [],
              (tx, results) => {
                const data = [];
               
                for (let i = 0; i < results.rows.length; i++) {
                  const item = results.rows.item(i);
                 
                  data.push(item);
                }
                dispatch(fetchCategoryData(data));

              },
              (error) => {
                console.error('Error retrieving user data from the database:', error);
              }
            );
          });

    };
  };