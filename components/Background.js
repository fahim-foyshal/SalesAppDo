import React from 'react'
import {View, ImageBackground,StatusBar,ScrollView} from 'react-native';

const Background = ({children}) => {
  return (
    <View>
       <StatusBar barStyle="default" translucent backgroundColor="transparent" />
    <ImageBackground source={require("../assest/leaves.jpg")} style={{ height: '100%' }} />
    <View style={{ position: "absolute" }}>
      {children}
    </View>
  </View>
  )
}

export default Background
