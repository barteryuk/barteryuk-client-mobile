import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Animated, AsyncStorage } from "react-native";
import { Layout, Spinner, Button, Divider } from '@ui-kitten/components'
import Cards from './Cards'
import { ScrollView } from "react-native-gesture-handler";
import Carousel from './CarouselSlide'
import axios from 'axios'

import { Entypo } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

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
export default function Sliding(props) {
  const { status, data, navigation } = props
  // const [myPayload, setMyPayload] = useState([])
  const [CarouselVisible, setCarouselVisible] = useState(false)
  const {loading, error, data: myPayload} = useQuery(FETCH_OWNITEMS)

  const handleBid = async() => {
    try {
      let value = await AsyncStorage.getItem('userLogin')
      value = JSON.parse(value)
      if (value) {
        console.log('already auth, proceed')
        // let userId = value.userId
        // console.log('userrr', userId)
        // axios.get('http://192.168.43.163:3000/products')
        // .then(({ data }) => {
        //   let filtered = data.filter(el => el.userId === userId)
        //   console.log('filtered product', filtered)
        //   setMyPayload(filtered)
          setCarouselVisible(true)
        // })
      } else {
        navigation.navigate('auth')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const closePanel = () => {
  //   props.cb('closePanel')
  // }
  // const handleBid = async () => {
  //   try {
  //     let value = await AsyncStorage.getItem('userStorage')
  //     value = JSON.parse(value)
  //     if (value) {
  //       console.log('successfully bid')
  //     } else {
  //       navigation.navigate('auth')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
  <>
    { status === 'myProduct' ? <><Animated.View style={[styles.favoriteIcon]}>
      <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Le</Text>
    </Animated.View>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{detail.name}</Text>
      <Button style={{marginTop: 20, borderRadius: 50}} onPress={() => launchMap(detail.geometry.location.lat, detail.geometry.location.lng, 'drive')}>Direction</Button>
      <View style={{ paddingHorizontal: 30, marginTop: 20}}>
        <Divider/>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Entypo name="address" size={24} color="red" />
          <Text style={{ marginHorizontal: 15}}>{detail.vicinity}</Text>
        </View>
        <Divider/>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Entypo name="phone" size={24} color="red" />
          <Text style={{marginLeft: 10}}>{detail.international_phone_number}</Text>
        </View>
        <Divider/>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 18}}>Reviews :</Text>
      </View> */}
      {/* <ScrollView style={{width: '100%', height: 360}}>
        { detail.reviews ? 
        detail.reviews.map((review, index) => (
          <Cards key={index} review={review}/>
        )) : <></>}
      </ScrollView> */}
    </View></> : <>
    {/* <Animated.View style={[styles.favoriteIcon]}>
      <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Drag Me!</Text>
    </Animated.View> */}
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{data.title}</Text>
      <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
        <Divider/>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Entypo name="address" size={24} color="red" />
          <Text style={{ marginHorizontal: 15}}>{data.description}</Text>
        </View>
        <Divider/>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
          <Entypo name="phone" size={24} color="red" />
          <Text style={{marginLeft: 10}}>{data.value}</Text>
        </View>
        <Divider/>
        <Button style={{marginTop: 20, borderRadius: 50}} onPress={handleBid}>Bid</Button>
        {/* <Button style={{marginTop: 20, borderRadius: 50}} onPress={closePanel}>Cancel</Button> */}
        {CarouselVisible ?  myPayload.ownItems.length !== 0 ? <Carousel data={myPayload.ownItems} wantedProduct={data} navigation={navigation}/> : <Text style={{textAlign: 'center', fontSize: '20', fontWeight: 'bold'}}>You can't bid, please post at least 1 product</Text>  : <></>}
      </View>
    </View></>}

  </>
  );
}

const styles = StyleSheet.create({
  containerSpinner: {
    marginTop: 10, 
    // height: height-20, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    left: 24,
    backgroundColor: 'black',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
    shadowColor: '#555556', 
    shadowOffset: { width: 5, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 7,
  }
});
