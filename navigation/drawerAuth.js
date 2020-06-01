// import React from 'react';

// // import { ApolloProvider } from 'react-apollo'
// // import { client } from './config'

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';

// import TabNavigator from './components/BottomTab';
// // import Home from './views/Home'
// import AllProducts from './views/AllProducts'
// import PostProduct from './views/PostProduct'
// import Transaction from './views/Transaction'
// import UserProfile from './views/UserProfile'
// import MyProduct from './views/MyProduct'

// import { AppRegistry } from 'react-native';

// function App() {
//   // const { Navigator, Screen } = createStackNavigator()
//   const Drawer = createDrawerNavigator();
//   return (
//   <>
//     {/* <ApolloProvider client={client}> */}
//       <IconRegistry icons={EvaIconsPack}/>
//       <ApplicationProvider {...eva} theme={eva.light}>
//         <NavigationContainer>
//           <Drawer.Navigator initialRouteName="home">
//             <Drawer.Screen name="home" component={AllProducts}/>
//             <Drawer.Screen name="postProduct" component={PostProduct}/>
//             <Drawer.Screen name="userProfile" component={UserProfile}/>
//             <Drawer.Screen name="transaction" component={Transaction}/>
//             <Drawer.Screen name="myProduct" component={MyProduct}/>
//           </Drawer.Navigator>
//         </NavigationContainer>
//       </ApplicationProvider>
//     {/* </ApolloProvider> */}
//   </>
//   );
// }

// AppRegistry.registerComponent('MyApp', () => App);
// export default App

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerIcon from '../components/drawerIcons';
import Login from '../views/Login'
import Register from '../views/Register'

export default function DrawerSideNavigator () {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerStyle={{backgroundColor: 'whitesmoke'}}>
      <Drawer.Screen name="Login" component={Login} options={{
        drawerIcon: ({ focused }) => (
          <DrawerIcon focused={focused} name="ios-create" />
        ),
      }} />

      <Drawer.Screen name="Register" component={Register}  options={{
        drawerIcon: ({ focused }) => (
          <DrawerIcon focused={focused} name="ios-filing" />
        ),
      }} />
    </Drawer.Navigator>
  )
}

