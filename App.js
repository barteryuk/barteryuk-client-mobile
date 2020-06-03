// import React from "react";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import * as eva from "@eva-design/eva";
// import { ApplicationProvider, IconRegistry, Icon } from "@ui-kitten/components";
// import { EvaIconsPack } from "@ui-kitten/eva-icons";
// import TabNavigator from "./components/BottomTab";
// import Drawer from "./navigation/drawer";
// import DrawerAuth from "./navigation/drawerAuth";
// import Home from "./views/Home";
// import { AppRegistry } from "react-native";
// import {
//   ApolloClient,
//   ApolloLink,
//   InMemoryCache,
//   HttpLink,
// } from "apollo-boost";
// import { AsyncStorage } from "react-native";
// const httpLink = new HttpLink({ uri: "http://192.168.43.163:3999" });
// const authLink = new ApolloLink((operation, forward) => {
//   // const token = AsyncStorage.getItem("userLogin");
//   var token = ''
//   AsyncStorage.getItem('userLogin')
//   .then(response => {
//     console.log('==========')
//     console.log(response)
//     response = JSON.parse(response)
//     let input = response.token
//     console.log('inpuuuuut', input)
//     if (input) {
//       operation.setContext({
//         headers: {
//           // access_token: input ? `Bearer ${input}` : "",
//           access_token: input,
//         }
//       });
//     }
//   })
//   // console.log("================ini token================", token);
//   console.log('ini token')
//   console.log(token)
//   // operation.setContext({
//   //   headers: {
//   //     access_token: token ? `Bearer ${token}` : "",
//   //   },
//   // });
//   return forward(operation);
// });
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
// function App() {
//   const { Navigator, Screen } = createStackNavigator();
//   return (
//     <>
//       <ApolloProvider client={client}>
//         <IconRegistry icons={EvaIconsPack} />
//         <ApplicationProvider {...eva} theme={eva.light}>
//           <NavigationContainer>
//             <Navigator>
//               <Screen
//                 name="home"
//                 component={Home}
//                 options={{ headerShown: false }}
//               />
//               <Screen
//                 name="auth"
//                 component={DrawerAuth}
//                 options={{ headerShown: false }}
//               />
//               <Screen
//                 name="root"
//                 component={Drawer}
//                 options={{ headerShown: false }}
//               />
//             </Navigator>
//           </NavigationContainer>
//         </ApplicationProvider>
//       </ApolloProvider>
//     </>
//   );
// }
// export default App;

// import React from 'react';

// import { ApolloProvider } from '@apollo/react-hooks'

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import TabNavigator from './components/BottomTab';
// import Drawer from './navigation/drawer';
// import DrawerAuth from './navigation/drawerAuth';

// import Home from './views/Home'

// import { AppRegistry } from 'react-native';
// import ApolloClient from 'apollo-boost'

// const client = new ApolloClient({
//   uri: 'http://192.168.43.163:3999'
// })

// function App() {
//   const { Navigator, Screen } = createStackNavigator()
//   return (
//   <>
//     <ApolloProvider client={client}>
//       <IconRegistry icons={EvaIconsPack}/>
//       <ApplicationProvider {...eva} theme={eva.light}>
//         <NavigationContainer>
//           <Navigator>
//             <Screen name="home" component={Home} options={{headerShown: false}}/>
//             <Screen name="auth" component={DrawerAuth} options={{headerShown: false}}/>
//             <Screen name="root" component={Drawer} options={{headerShown: false}}/>
//           </Navigator>
//         </NavigationContainer>
//       </ApplicationProvider>
//     </ApolloProvider>
//   </>
//   );
// }

// // AppRegistry.registerComponent('MyApp', () => App);
// export default App

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Icon } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TabNavigator from "./components/BottomTab";
import Drawer from "./navigation/drawer";
import DrawerAuth from "./navigation/drawerAuth";
import Home from "./views/Home";
import { AppRegistry } from "react-native";
// import {
//   ApolloClient,
//   ApolloLink,
//   InMemoryCache,
//   HttpLink,
// } from "apollo-boost";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from "react-native";
// const httpLink = new HttpLink({ uri: "http://192.168.43.163:3999" });
const httpLink = createHttpLink ({ uri: "http://192.168.43.163:4000" });

const authLink = setContext( async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');
  console.log('token blablabla')
  console.log(token)
  // value = JSON.parse(value)
  // const token = value.token
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      access_token: token
    }
  }
});
// const authLink = new ApolloLink((operation, forward) => {
//   // const token = AsyncStorage.getItem("userLogin");
//   console.log("================ini token================", token);
//   let rawToken = getToken()
//   rawToken.then(response => {
//     console.log('response')
//     console.log(response)
//   })
//   console.log('=== ini tokeeeen')
//   // console.log(token)
//   operation.setContext({
//     headers: {
//       access_token: ''
//       // access_token: token ? token : "",
//     },
//   });
//   return forward(operation);
// });
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <>
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <Navigator>
              <Screen
                name="home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Screen
                name="auth"
                component={DrawerAuth}
                options={{ headerShown: false }}
              />
              <Screen
                name="root"
                component={Drawer}
                options={{ headerShown: false }}
              />
            </Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </ApolloProvider>
    </>
  );
}
export default App;