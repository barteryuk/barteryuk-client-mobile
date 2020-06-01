import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import AllProducts from '../views/AllProducts'
import PostProduct from '../views/PostProduct'
import Transaction from '../views/Transaction'
import UserProfile from '../views/UserProfile'
import MyProduct from '../views/MyProduct'
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const postIcon = (props) => (
  <AntDesign name="form" size={24} color="white" />
);

const walletIcon = (props) => (
  <Entypo name="wallet" size={24} color="white" />
);

const userIcon = (props) => (
  <FontAwesome name="user" size={24} color="white" />
);

const allProductsIcon = (props) => (
  <MaterialCommunityIcons name="home" size={24} color="white" />
);

const myProduct = (props) => (
  <Entypo name="box" size={24} color="white" />
);

const myBid = (props) => (
  <Entypo name="box" size={24} color="white" />
);



const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    style={{backgroundColor: 'black'}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={allProductsIcon}/>
    <BottomNavigationTab icon={postIcon}/>
    <BottomNavigationTab icon={userIcon}/>
    <BottomNavigationTab icon={walletIcon}/>
    <BottomNavigationTab icon={myProduct}/>

  </BottomNavigation>
);

const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name='allProducts' component={AllProducts}/>
    <Tab.Screen name='postProduct' component={PostProduct}/>
    <Tab.Screen name='userProfile' component={UserProfile}/>
    <Tab.Screen name='transaction' component={Transaction}/>
    <Tab.Screen name='myProduct' component={MyProduct}/>
  </Tab.Navigator>
);

export default TabNavigator