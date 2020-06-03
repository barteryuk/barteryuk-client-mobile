import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Image, Animated, Dimensions, AsyncStorage } from 'react-native'

import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"
import { Layout, Spinner, Button, Divider, Text } from '@ui-kitten/components'
import Carousel from '../components/CarouselSlide'


import { Ionicons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import BNIBProducts from '../components/ProductsByCategory/BNIB'
import BNOBProducts from '../components/ProductsByCategory/BNOB'
import UsedProducts from '../components/ProductsByCategory/Used'
import SlidingUpPanel from 'rn-sliding-up-panel'
const { height, width } = Dimensions.get('window')

const FETCH_OWNITEMS = gql`
  query {
    ownItems {
      _id
      title
      description
      bidProductId {
        _id
      }
      value
      userId
      photo
      category
    }
  }
`

function Detail(props) {
  const { navigation } = props
  const { productDetail } = props.route.params
  const [CarouselVisible, setCarouselVisible] = useState(false)
  const {loading, error, data: myPayload, refetch: refetchOwnItems} = useQuery(FETCH_OWNITEMS)

  const handleBid = () => {
    setCarouselVisible(true)
  }

  if (loading) {
    return <Text>Loading</Text>
  } else {
    return (
      <>
      <View style={styles.container}>
        <View style={styles.containerone}>
          <ImageBackground source={require("../assets/logo.png")} style={styles.imgBackgroundHome}></ImageBackground>
       </View>
        <View style={styles.containertwo}>
          {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20}}> */}
            <ScrollView style={{paddingTop: 40}}>
              { loading ? <Layout style={styles.containerSpinner}><Spinner/></Layout> : 
              <>
              { productDetail !== null ? 
                // <Sliding data={productDetail} status={'homeProduct'}/>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>{productDetail.title}</Text>
                  <View style={{ paddingHorizontal: 30, marginTop: 20, width: '98%' }}>
                    <Divider style={{borderWidth: 0.8}}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                      <Entypo name="address" size={24} color="red" />
                      <Text style={{ marginHorizontal: 15, color: 'black'}}>{productDetail.description}</Text>
                    </View>
                    <Divider style={{borderWidth: 0.8}}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                      <Entypo name="phone" size={24} color="red" />
                      <Text style={{marginLeft: 10, color: 'black'}}>{productDetail.value}</Text>
                    </View>
                    <Divider style={{borderWidth: 0.8}}/>
                    <Button style={{marginTop: 20, borderRadius: 50}} onPress={handleBid}>Bid</Button>
                    {/* <Button style={{marginTop: 20, borderRadius: 50}} onPress={closePanel}>Cancel</Button> */}
                    {CarouselVisible ?  myPayload.ownItems.length !== 0 ? <Carousel data={myPayload.ownItems} wantedProduct={productDetail} navigation={navigation}/> : <Text style={{textAlign: 'center', fontSize: '20', fontWeight: 'bold'}}>You can't bid, please post at least 1 product</Text>  : <></>}
                  </View>
                </View>
                : <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>Click the Product to see its detail</Text> }

              </>}
            </ScrollView>
          {/* </View> */}
        </View> 
        <Button size="tiny" style={{ borderRadius: 50, top: 40, left: 10, position: 'absolute', backgroundColor: '#02c39a', borderWidth: 0}} onPress={() => navigation.navigate('All Products')}><Ionicons name="ios-arrow-back" size={24} color="white" /></Button>
      </View>

      </>
    )
  }
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
    backgroundColor: 'white',
    position: 'relative',
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
export default Detail
