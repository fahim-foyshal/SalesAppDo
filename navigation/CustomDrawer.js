import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { Text ,View} from 'react-native'
import { Drawer } from 'react-native-paper'

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView>
   
     <DrawerItemList {...props}/>
     <DrawerItem
     label={"gggggggg"}
     />
    </DrawerContentScrollView>
      
  )
}

export default CustomDrawer
