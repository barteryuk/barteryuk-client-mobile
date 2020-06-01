import React, { useEffect, useState } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage
} from 'react-native'
import { DrawerNavigationItems } from '@react-navigation/drawer'
import { ionicons } from '@expo/vector-icons'
import { Divider } from '@ui-kitten/components'

export default function Sidebar(props) {
  // const [profile, setProfile] = useState('')

  // const fetchAsyncStorage = async() => {
  //   let value = await AsyncStorage.getItem('userLogin')
  //   value = JSON.parse(value)
  //   console.log('sidebar fetch asyncstorage', value)
  //   setProfile(value.userId)
  // }

  // useEffect(() => {
  //   fetchAsyncStorage()
  // }, [])

  return (
  // <ScrollView>
    <View style={{alignItems: 'center'}}>
      <Image source={require('../assets/logo.png')} style={styles.header}></Image>
      {/* <Text style={styles.name}>Account: {profile}</Text> */}
      <Divider style={{borderWidth: 0.05, backgroundColor: 'grey', width: '95%'}}/>
    </View>
  )
  // </ScrollView>
}

const styles = StyleSheet.create({  
  header: {
    alignItems: 'center',
    width: 100,
    height: 100,
    marginVertical: 30
  }
})
