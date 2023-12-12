import React from 'react'
// import { COLORS, icons } from "../constants"
import { View ,Text, Image,TouchableOpacity, Button} from 'react-native'
import Home from '../screen/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Cart from '../screen/Cart'
import { Svg,Path } from 'react-native-svg'
// import Svg, { Path } from 'react-native-svg';
const Tab=createBottomTabNavigator();

// const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

//     var isSelected = accessibilityState.selected

//     if (isSelected) {
//         return (

//                 <TouchableOpacity
//                  className='ml-4 flex   -translate-y-[30px] rounded-full shadow-black'
//                  style={{ 
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: 55,
//                     height: 55,
//                     borderRadius: 25,
//                     backgroundColor:COLORS.white,
//                     elevation:10,
                
//                 }}
//                     onPress={onPress}
//                 >
//                 {/* <View className=" transform -translate-y-8 h-[10px] w-[40px] bg-[red]"></View> */}
//                     {children}
//                 </TouchableOpacity>
//             // </View>
//         )
//     } else {
//         return (
//             <TouchableOpacity
//                 style={{
//                     flex: 1,
//                     height: 60,
//                     backgroundColor: COLORS.white
//                 }}
//                 activeOpacity={1}
//                 onPress={onPress}
//             >
//                 {children}
//             </TouchableOpacity>
//         )
//     }
// }
const Tabs = () => {
 

  return (
   <Tab.Navigator
   screenOptions={{
                    headerShown:false,
                    showLabel: false,
                    style: {
                        // position: 'absolute',
                        // left: 0,
                        // bottom: 0,
                        // right: 0,
                        borderTopWidth: 0,
                        backgroundColor: "transparent",
                        elevation: 0
                    }
                }}
   >
                    <Tab.Screen name='Home' component={Home}
                            options={{
                                tabBarIcon: ({focused}) => (
                                <Image
                                source={icons.cutlery}
                                resizeMode='contain'
                                className='w-[25px] h-[25px] bg-[red]'
                                style={{tintColor: focused?COLORS.primary:COLORS.secondary}}
                                />

                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton
                                        {...props}
                                    />
                                )
                            }}/>
                    <Tab.Screen name='Cart' component={Cart}
                            options={{
                                tabBarIcon: ({focused}) => (
                                <Image
                                source={icons.cart}
                                resizeMode='contain'
                                className='w-[25px] h-[25px] bg-[red]'
                                style={{tintColor: focused?COLORS.primary:COLORS.secondary}}
                                />

                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton
                                        {...props}
                                    />
                                )

                            }}/>
                    {/* <Tab.Screen name='Orders' component={Home}
                            options={{
                                tabBarIcon: ({focused}) => (
                                <Image
                                source={icons.orders}
                                resizeMode='contain'
                                className='w-[25px] h-[25px] bg-[red]'
                                style={{tintColor: focused?COLORS.primary:COLORS.secondary}}
                                />

                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton
                                        {...props}
                                    />
                                )
                            }}/>
                    <Tab.Screen name='Profile' component={Cart}
                            options={{
                                tabBarIcon: ({focused}) => (
                                <Image
                                source={icons.user}
                                resizeMode='contain'
                                className='w-[25px] h-[25px] bg-[red]'
                                style={{tintColor: focused?COLORS.primary:COLORS.secondary}}
                                />

                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton
                                        {...props}
                                    />
                                )

                            }}/> */}
  

   </Tab.Navigator>
  )
}

export default Tabs