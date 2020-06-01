import React from 'react';
import { createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList, } from '@react-navigation/drawer';
import DrawerIcon from '../components/drawerIcons';
import AllProducts from '../views/AllProducts'
import PostProduct from '../views/PostProduct'
import Transaction from '../views/Transaction'
import UserProfile from '../views/UserProfile'
import MyProduct from '../views/MyProduct'
import MyBid from '../views/MyBid'
import Sidebar from '../components/Sidebar'
import { Dimensions } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import { Entypo, Ionicons, FontAwesome, Fontisto, Foundation } from '@expo/vector-icons';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Sidebar/>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerSideNavigator () {
  const Drawer = createDrawerNavigator()
  return (
    <>
    <Drawer.Navigator 
      drawerStyle={{backgroundColor: 'whitesmoke'}}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="All Products" component={AllProducts} options={{
        drawerIcon: ({ focused }) => (
        <Foundation name="home" size={24} color="black" />              ),
      }} />

      <Drawer.Screen name="Post Product" component={PostProduct}  options={{
        drawerIcon: ({ focused }) => (
        <Ionicons name="ios-create" size={24} color="black" />        ),
      }} />


      <Drawer.Screen name="User Profile" component={UserProfile} options={{
        drawerIcon: ({ focused }) => (
          <FontAwesome name="user" size={24} color="black" />
        )
      }} />

      <Drawer.Screen name="Transaction" component={Transaction} options={{
        drawerIcon: ({ focused }) => (
          <Entypo name="wallet" size={24} color="black" />
        )
      }} />

      <Drawer.Screen name="My Product" component={MyProduct} options={{
        drawerIcon: ({ focused }) => (
        <Ionicons name="ios-archive" size={24} color="black" />)
      }}/>
      <Drawer.Screen name="My Bid" component={MyBid} options={{
        drawerIcon: ({ focused }) => (
        <Ionicons name="ios-archive" size={24} color="black" />)
      }} />
    </Drawer.Navigator>
    </>
  )
}

