import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Card, Button, ButtonGroup, Modal, Layout } from '@ui-kitten/components';
import axios from 'axios';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const { width: screenWidth, height } = Dimensions.get('window')

export default function Slider(props) {
  const { products, navigation, userId } = props
  // const [visible, setVisible] = useState(false)
  
  // const [payload, setPayload] = useState(null)
  const [MyBidProd, setMyBidProd] = useState(null);

  useEffect(() => {
    let payload = []
    products.forEach(el => {
      if (el.finalBidderId.length !== 0) {
        console.log('BIDDER FINAL ID ========= FROM CarouselBidCard', el.finalBidderId[0]._id)
        console.log('BIDDER email ========= FROM CarouselBidCard', el.finalBidderId[0].email)
        console.log('USER IDNYAA', userId)
        if (el.finalBidderId[0]._id === userId ) {
          payload.push(el)
          console.log('INI ELLLnya', el)
        } 
      }
    })
    console.log('PAYLOADNYAAA', payload)
    setMyBidProd(payload)
  }, [])

  const backToParent = () => {
  }
  // prodId > barang yg gua minat > hape asus
  // collateral > barang milik gua ? gelas

  const [show, setShow] = useState(false)
  const showCarousel = () => {
    setShow(true)
  }
  const giveRating = () => {
    console.log('giveRating')
  }
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
            <Layout style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.photo }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
                <Card style={{borderRadius: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{ item.title }</Text>
                  <Text>{ item.value } IDR</Text>
                  <Button style={{marginTop: 10}} onPress={() => giveRating(item)}>Give Rating</Button>
                </Card>
            </Layout>
    )
  } 
  return (
  <>
    <Layout>
      {show ? <></> : <Button onPress={() => showCarousel()}>Look for My Transaction</Button> }
      {show ? <Carousel
          style={{ flex: 1, justifyContent: "center", alignItems: 'center', padding: 0, backgroundColor: 'black' }}
          sliderWidth={screenWidth - 40}
          sliderHeight={20}
          itemWidth={screenWidth - 70}
          data={MyBidProd}
          renderItem={renderItem}
          hasParallaxImages={true}
      />: <></>}

      {/* <Modal visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
            <Card 
            disabled={true}
            style={styles.cardWrapper}>
              {empty ? <Text>Zero Bidder</Text> :  
              payload.bidProductId.map((el, index) => (
                <Card
                key={index}
                style={styles.card}
                status='basic'
                > 
                  <View>
                    <Image source={{ uri: el.photo }} style={{width: 125, height: 125}}></Image>
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                      {el.title}
                    </Text>
                    <Text>
                      {el.description}
                    </Text>
                    <Text>
                      {el.value} IDR
                    </Text>
                    <Text>
                      {el.status} 
                    </Text>
                  </View>
                  <View style={{position: 'absolute', top: 10, right: 10, flexDirection: "row"}}>
                    <Button size="tiny" onPress={() => closeBid(el._id)} status="success" style={{width: 50, borderRadius: 25}}><Entypo name="check" size={20} color="black" /></Button>
                    <Button size="tiny" onPress={() => rejectBid(el._id)} status="danger" style={{width: 50, borderRadius: 25}}><Entypo name="cross" size={20} color="black" /></Button>
                  </View>
                </Card>
              ))}
              </Card>
      </Modal> */}
    </Layout>

  </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    textAlign: 'center',
    color: 'black'
  },
  cardWrapper: {
    paddingHorizontal: 2,
  },
  item: {
      // width: screenWidth - 60,
      height: screenWidth,
      marginVertical: 30,
      // backgroundColor: 'white',
      borderRadius: 20
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 0,
    shadowOffset: {width:10, height:10}, 
    shadowColor: 'rgba(138,149,158,0.2)',
    shadowOpacity: 1,  
    elevation: 10, 
  },
  imageContainer: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: 'white',
      marginBottom: 10,
      // width: screenWidth - 20
  },
  buttonGroup: {
    margin: 'auto',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#3366FF',
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'center',
      borderRadius: 15
  },
})
