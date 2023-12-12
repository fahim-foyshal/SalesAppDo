import React from 'react';
import {TextInput} from 'react-native';

export const darkGreen = '#006A42';
const Field = props => {
 ;
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 20,marginRight:42}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};

export default Field;
