// ThemeSwitcher.js
import React, { useEffect, useState } from 'react';
import { View, Button,Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setTheme } from '../action/themeAction';


const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [switch1open, setSwitch1open] = useState(false);
  const [switch2open, setSwitch2open] = useState(false);
  const [switch3open, setSwitch3open] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem('theme').then((savedTheme) => {
      if (savedTheme) {
        switch (savedTheme) {
          case 'theme1':
            setSwitch1open(true);
            return;
          case 'theme2':
            setSwitch2open(true);
            return;
          default:
            return;
        }
      }
    });
  }, []); 

  

  const toggleSwitch1 = (theme) => {
    setSwitch1open(!switch1open)
    setSwitch2open(false)
    setSwitch3open(false)
    setSelectedTheme(theme);
    if(!switch1open){
      
      dispatch(setTheme(theme));
    }else{
  
      dispatch(setTheme('default'));
    }
   
  };
  const toggleSwitch2 = (theme) => {
    setSwitch2open(!switch2open)
    setSwitch1open(false)
    setSwitch3open(false)
    setSelectedTheme(theme);
    if(!switch2open){
      
      dispatch(setTheme(theme));
    }else{
  
      dispatch(setTheme('default'));
    }
  };
  const toggleSwitch3 = (theme) => {
    setSwitch3open(!switch3open)
    setSwitch2open(false)
    setSwitch3open(false)
    setSelectedTheme(theme);
    if(switch3open){
      dispatch(setTheme(theme));
    }else{
      dispatch(setTheme('default'));
    }
    setSelectedTheme(theme);
    
  };

  return (
    <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',margin:15 }} >
             <View style={{flexDirection:'row',justifyContent: 'space-around', alignItems: 'center'}}>
             <Text  style={{backgroundColor:'red',height:20,width:20,borderRadius:10,margin:4}}></Text>
              <Text  style={{backgroundColor:'red',height:20,width:20,borderRadius:10}}></Text>
             </View>
         
              <Switch
                  style={{height:20,width:70,marginLeft:30}}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  // thumbColor={selectedTheme === 'theme1' ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch1('theme1')}
                 value={switch1open}
        />
      </View>

      <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          // thumbColor={selectedTheme === 'theme2' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch2('theme2')}
          value={switch2open}
        />
      <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          // thumbColor={selectedTheme === 'theme1' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch3('theme2')}
          value={switch3open}
        />
    </View>
  );
};

export default ThemeSwitcher; 
