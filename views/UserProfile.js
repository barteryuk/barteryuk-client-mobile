import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Switch, Image, AsyncStorage } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { Button } from '@ui-kitten/components'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"


const FETCH_USER= gql`
      query user($email: String!) {
        user(email:$email) {
          status
          message
          user {
            _id
            email
            password
            hp
            rating
            quota
            status
          }
        }
      }
  `;

function Index(props) {
  console.log('aaa')
  console.log('prooop', props)
  const { navigation } = props
  const [email, setEmail] = useState('')
  console.log('email', email)
  const {loading, error, data} = useQuery(FETCH_USER, {
    variables: {email: email}
  })
  console.log('=======================================', data)
  const fetchStorage = async() => {
    let value = await AsyncStorage.getItem('userLogin')
    value = JSON.parse(value)
    console.log('value storage form user profile', value)
    setEmail(value.email)
  }
  useEffect(() => {
    fetchStorage()
  }, [])

  
  const logout = () => {
    AsyncStorage.removeItem('userLogin')
    navigation.navigate('auth')
  }

  if (loading) {
    return <Text>Loading</Text>
  } else {
    console.log('dataaa', data)
    return (
      <View style={{flex: 1, paddingTop: 50, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "#02c39a"}}>
        <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={430}
            cy={530}
            rx={440}
            ry={445}
          ></Ellipse>
        </Svg>
        <View style={{marginTop: 50, marginBottom: 40}}>
          <Image style={styles.photoProfile} source={require('../assets/userProfile.png')}></Image>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
            <MaterialIcons name="email" size={50} color="red" />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 0}}>Email</Text>
              <Text style={{fontSize: 15}}>{data.user.user.email}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '70%', marginTop: 15}}>
        <MaterialIcons name="local-phone" size={50} color="red" />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 0}}>Phone Number</Text>
              <Text style={{fontSize: 15}}>{data.user.user.hp}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: '70%', marginTop: 15}}>
            <MaterialIcons name="account-balance-wallet" size={50} color="red" />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 0}}>Quota</Text>
              <Text style={{fontSize: 15}}>{data.user.user.quota}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Button status="success">Request Quota</Button>
        </View>
        <View>
        </View>
        <View style={{flex: 1, width: '90%', position: 'absolute', bottom: 30}}>
          <Button style={{borderRadius: 40}} onPress={() => logout()}>LOGOUT</Button>
        </View>
        <Button size="tiny" style={{ borderRadius: 50, top: 40, right: 10, position: 'absolute', backgroundColor: '#02c39a', borderWidth: 0}} onPress={() => props.navigation.openDrawer()}><FontAwesome5 name="bars" size={24} color="white" /></Button>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02c39a",
    width: 360,
    height: 660
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 859,
    height: 890,
    position: "absolute"
  },
  // ellipseStack: {
  //   height: 890,
  //   marginTop: 43,
  //   marginLeft: -50,
  //   marginRight: -449
  // },
  photoProfile: {
     resizeMode: 'contain',
     borderRadius: 50,
     width: 200,
     height: 200,
   }
});

export default Index;

// import React from 'react'
// import { View, AsyncStorage, Text, Image, Alert, StyleSheet } from 'react-native'
// import { Button } from '@ui-kitten/components'

// function UserProfile({ navigation }) {
//   const logout = () => {
//     AsyncStorage.removeItem('userLogin')
//     navigation.navigate('auth')
//   }
//   return (
//     <View style={{flex: 1, paddingTop: 50, alignItems: 'center', justifyContent: 'center'}}>
//       <View>
//         <Image style={styles.photoProfile} source={require('../assets/userProfile.png')}></Image>
//       </View>
//       <View>
//         <Text style={{}}>archiafinno@gmail.com</Text>
//       </View>
//       <View>
//       </View>
//       <View>
//       </View>
//     <View style={{flex: 1, paddingTop: 40}}>
//       <Button onPress={() => logout()}>LOGOUT</Button>
//     </View>
//     </View>

//   )
// }

// const styles = StyleSheet.create({
//   photoProfile: {
//     resizeMode: 'contain',
//     borderRadius: 50,
//     width: 250,
//     height: 250
//   }
// })

// export default UserProfile

// email: String!
// hp: String!
// rating: Float!
// quota: Int!
// status: Boolean!