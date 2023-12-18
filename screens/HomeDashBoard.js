import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';

const HomeDashBoard = () => {
  
 console.log("hi");

  return (
    <WebView
    source={{ uri: 'https://mepgrouperp.com/ss/sec_mobile_app/index.php?username=3508&password=1234'}}
    style={{ marginTop: 20 }}
  />
  )
}

export default HomeDashBoard
