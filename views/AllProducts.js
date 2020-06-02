import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Image, Animated, Dimensions, AsyncStorage } from 'react-native'

import axios from 'axios'

import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

import { Layout, Spinner } from '@ui-kitten/components';
import { Button, Text } from '@ui-kitten/components';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import BNIBProducts from '../components/ProductsByCategory/BNIB'
import BNOBProducts from '../components/ProductsByCategory/BNOB'
import UsedProducts from '../components/ProductsByCategory/Used'
// import allData from '../sample.json'
import SlidingUpPanel from 'rn-sliding-up-panel'
import Sliding from '../components/Sliding'
const { height, width } = Dimensions.get('window')

// import { Snackbar } from 'react-native-paper';
// import {
//   useFocusEffect
// } from '@react-navigation/native';

const FETCH_PRODUCTS = gql`
  query {
    products {
      _id
      title
      description
      bidProductId {
        _id
        title
        description
        value
        userId
        photo
        category
        tags
      }
      value
      userId
      photo
      category
    }
  }
`

function AllProducts(props) {
  // const { userId } = props.route.params
  const { navigation } = props
  const [productDetail, setProductDetail] = useState(null)
  // const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')

  const {loading, error, data} = useQuery(FETCH_PRODUCTS)
  // const [visible, setVisible] = useState(false)
  // const [payload, setPayload] = useState('')

  // useEffect(() => {
  //   if (props.route.params) {
  //     console.log('params route', props.route.params)
  //     setVisible(true)
  //     setPayload(props.route.params.payload)
  //     props.route.params = null
  //   } 
  // }, [props.route.params])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       setVisible(false)
  //     };
  //   }, [])
  // );
  const fetchHooks = async() => {
    try {
      let value = await AsyncStorage.getItem('userLogin')
      value = JSON.parse(value)
      let userId = value.userId
      console.log('userrr', userId)
      setUserId(userId)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchHooks()
  }, [])

  const handleFromChild = (data) => {
    setProductDetail(data)
  }
  const draggedValue = new Animated.Value(120)
  return (
      <>
      <View style={styles.container}>
        <View style={styles.containerone}>
          <ImageBackground source={require("../assets/logo.png")} style={styles.imgBackgroundHome}></ImageBackground>
       </View>
        <View style={styles.containertwo}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20}}>
            <ScrollView>
              { loading ? <Layout style={styles.containerSpinner}><Spinner/></Layout> : 
              <>
              <BNIBProducts navigation={props.navigation} products={data.products} userId={userId} cb={handleFromChild}/>
              <BNOBProducts navigation={props.navigation} products={data.products} userId={userId} cb={handleFromChild}/>
              <UsedProducts navigation={props.navigation} products={data.products} userId={userId} cb={handleFromChild}/>
              </>}
            </ScrollView>
          </View>
        </View> 
        <Button size="tiny" style={{ borderRadius: 50, top: 40, right: 10, position: 'absolute', backgroundColor: '#02c39a', borderWidth: 0}} onPress={() => props.navigation.openDrawer()}><FontAwesome5 name="bars" size={24} color="white" /></Button>
        <SlidingUpPanel showBackdrop={false} draggableRange={{ top: height - 60, bottom: 20 }} animatedValue={draggedValue}>
          <View style={styles.panel}>
              { productDetail !== null ? 
                <Sliding data={productDetail} status={'homeProduct'}/>
                : <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Click the Product to see its detail</Text> }
          </View>
        </SlidingUpPanel>
      </View>

      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02c39a',
    paddingTop: 20
  },
  imgBackgroundHome: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginVertical: 20,
    justifyContent: 'center'
  },
  containerone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertwo: {
    flex: 9,
    backgroundColor: 'whitesmoke',
    // backgroundColor: '#dcdece',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  panel: {
    paddingTop: 35,
    paddingBottom: 20,
    flex: 1,
    // borderWidth: 2,
    // backgroundColor: 'rgba(219, 219, 219, 1)',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    backgroundColor: '#02c39a',
    position: 'relative',
    height: 100,
    shadowColor: '#555556', 
    shadowOffset: { width: 5, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 7,
  },
  containerSpinner: {
    marginTop: 10, 
    height: 380, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  }
  
})
export default AllProducts
