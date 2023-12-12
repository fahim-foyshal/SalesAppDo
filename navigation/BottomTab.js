import React from 'react';
import { createBottomTabNavigator,BottomTabBar } from '@react-navigation/bottom-tabs';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { Image,View,TouchableOpacity } from 'react-native';
import { faHome, faTruck } from '@fortawesome/free-solid-svg-icons';

import * as Icon from "react-native-feather";

import Home from '../screens/Home';
import AddShop from '../screens/AddShop';
import Dashboared from '../screens/Dashboared';
import Delivery from '../screens/Delivery';
import MakeSo from '../screens/MakeSo';
import SvgComponent from './SvgComponent';


const Tab = createBottomTabNavigator();




const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          showLabel: false,
        tabBarStyle: { 
          position: 'relative',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "white",
          elevation: 0
},


        }}
      >
      <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon icon={faHome} color={focused ? '#852e45' : 'black'} />
          ),


          }}
        />
      <Tab.Screen
          name="Delivery"
          component={Delivery}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon icon={faTruck} color={focused ? '#852e45' : 'black'} />
          ),


          }}
        />
      <Tab.Screen
          name="AddOrder"
          component={MakeSo}
          
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon.Plus strokeWidth={3} stroke={focused ? '#852e45' : '#852e45'} />

          ),
          headerShown:false,
          tabBarButton: (props) => (
            <SvgComponent
                {...props}
            />
        )

          }}
        />
      <Tab.Screen
          name="Hold"
          component={MakeSo}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon.ShoppingCart strokeWidth={3} stroke={focused ? '#852e45' : 'black'} />

          ),

          }}
        />
      <Tab.Screen
          name="Reports"
          component={MakeSo}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon.Star strokeWidth={3} stroke={focused ? '#852e45' : 'black'} />

          ),


          }}
        />

      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
