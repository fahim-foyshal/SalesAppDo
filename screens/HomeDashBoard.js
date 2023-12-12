import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';

const HomeDashBoard = () => {
  
 console.log("hi");

  return (
    <WebView
    source={{ uri: 'https://www.cloudhrm.com.bd/ERPAppsLogin/EmployeePortal/index.php'}}
    style={{ marginTop: 20 }}
  />
  )
}

export default HomeDashBoard
