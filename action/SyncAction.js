import { useState } from "react";
import { FETCH_ORDEROFFLINE_REQUEST,FETCH_DO_LIST } from "./actionsType";
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });


  

export  const callApiForProductGroup = () => {
    return (dispatch) => {
    // Make an Axios request to the API with area_id
   
    axios
      .get('https://ezzy-erp.com/newapp/api/api_ProductGroup.php')
      .then((response) => {
        // Handle the API response data
        const product_group_list = response.data;
        if (product_group_list && product_group_list.length > 0) {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM product_groups');
            // Insert the data into the existing routelist table
            product_group_list.forEach((group) => {
              tx.executeSql(
                'INSERT INTO product_groups (id, group_name) VALUES (?, ?)',
                [group.id, group.group_name]
              ),(error) => {
                console.error('Error something:', error);
              };
            });
            console.log("Data Inset Successfully")
          });
        }

        // navigation.navigate('bottomtab', { screen: 'Home' });
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
    }
  };

export  const callApiForSubCategory = () => {
    return (dispatch) => {
    // Make an Axios request to the API with area_id
   
    axios
      .get('https://ezzy-erp.com/newapp/api/api_subCategory.php')
      .then((response) => {
        // Handle the API response data
        const subcategories_list = response.data;
        if (subcategories_list && subcategories_list.length > 0) {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM subcategories');
            // Insert the data into the existing routelist table
            subcategories_list.forEach((category) => {
              tx.executeSql(
                'INSERT INTO subcategories (id, subcategory_name,category_id) VALUES (?,?,?)',
                [category.id, category.subcategory_name,category.category_id]
              ),(error) => {
                console.error('Error something:', error);
              };
            });

            console.log("Data Inset Successfully")
          });
        }

        // navigation.navigate('bottomtab', { screen: 'Home' });
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
    }
  };


export const callApiForItemList = () => {
 
    // Make an Axios request to the API with area_id
   
    axios
      .get('https://ezzy-erp.com/newapp/api/api_itemInfo_List.php')
      .then((response) => {
        // Handle the API response data
        const item_list = response.data;
      
        if (item_list && item_list.length > 0) {
            db.transaction((tx) => {
                // Delete existing data from the item_info table
                tx.executeSql('DELETE FROM item_info');
              
                // Insert the new data into the item_info table
                item_list.forEach((item) => {
                  tx.executeSql(
                    'INSERT INTO item_info (item_id, item_name, item_name_short, item_group, category_id, subcategory_id, finish_goods_code, unit_name, pack_size, t_price, nsp_per, sales_item_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                      item.item_id,
                      item.item_name,
                      item.item_name_short || '', // If item_name_short is undefined, set it to an empty string
                      item.item_group,
                      item.category_id,
                      item.subcategory_id,
                      item.finish_goods_code,
                      item.unit_name,
                      item.pack_size,
                      item.t_price,
                      item.nsp_per,
                      item.sales_item_type || '', // If sales_item_type is undefined, set it to an empty string
                    ]
                  ),(error) => {
                    console.error('Error something:', error);
                  };
                });

            
          });
        }

        // navigation.navigate('bottomtab', { screen: 'Home' });
      })
      .catch((error) => {

        console.error('API Request Error:', error);
      });
  };

export const  fetchshopdata=(dealercode)=>{
 
    return (dispatch) => {
      const arrayitem = [{dealer_code:dealercode}];
      axios
        .post('https://ezzy-erp.com/newapp/api/api_findShopByDealer.php', arrayitem)
        .then((response) => {
            fetchshopdata2(response.data)
        

  
        })
        .catch((error) => {
          console.error('Error sending data to API:', error);
        });

    }
   
  }

function fetchshopdata2(data){

    data.forEach((item) => {




      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM stores WHERE upload_status <> 0',
          [// or use the appropriate datetime value
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
               
              // Clear the form or take appropriate action
            } else {
              console.error('Failed to save data to SQLite');
            }
          }
        );
      tx.executeSql(
        'INSERT INTO stores (shop_name,shop_owner_name, manager_name, manager_mobile, master_dealer_code, product_group, target_shop, market_id, route_id, area_id, zone_id, region_id, shop_class, shop_type, shop_channel, shop_route_type, shop_identity, mobile, shop_address, status, otp, latitude, longitude, picture, image_compress, copy_done, entry_by, datetime,upload_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [
          item.shop_name,
          item.shop_owner_name,
          item.manager_name,
          item.manager_mobile,
          item.master_dealer_code,
          item.product_group,
          item.target_shop,
          item.market_id,
          item.route_id,
          item.area_id,
          item.zone_id,
          item.region_id,
          item.shop_class,
          item.shop_type,
          item.shop_channel,
          item.shop_route_type,
          item.shop_identity,
          item.mobile,
          item.shop_address,
          item.status,
          item.otp,
          item.latitude,
          item.longitude,
          item.picture,
          item.image_compress,
          item.copy_done,
          item.entry_by,
          new Date().toISOString(),
          1 // or use the appropriate datetime value
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
             
            // Clear the form or take appropriate action
          } else {
            console.error('Failed to save data to SQLite');
          }
        }
      );
    });



    });
  }

