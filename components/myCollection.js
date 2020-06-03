import React, { useState } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Card, Button, ButtonGroup, Modal, Layout } from '@ui-kitten/components';
import axios from 'axios';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';


const { width: screenWidth, height } = Dimensions.get('window')


const CLOSE_BID = gql`
    mutation CloseBid(
      $itemId: ID!
      $collateralId: ID!
      ) {
      closeBid(
        itemId: $itemId
        collateralId: $collateralId
      ) {
          message
          result {
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
            status
          }
      }
    }
`

const REJECT_BID = gql`
    mutation RejectBid(
      $itemId: ID!
      $collateralId: ID!
      ) {
      rejectBid(
        itemId: $itemId
        collateralId: $collateralId
      ) {
          message
          result {
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
            status
          }
      }
    }
`


export default function Slider(props) {
  const { data, navigation, status } = props
  const [visible, setVisible] = useState(false)
  const [empty, setEmpty] = useState(true)
  const [payload, setPayload] = useState(null)
  const [CloseBid] = useMutation(CLOSE_BID)
  const [RejectBid] = useMutation(REJECT_BID)
  

  const backToParent = (item) => {
    console.log('leeeenght', item.bidProductId.length)
    if (item.bidProductId.length === 0) {
      setVisible(true)
      setEmpty(true)
    } else {
      setPayload(item)
      setVisible(true)
      setEmpty(false)
    }
  }

  const closeBid = (prodId) => {
    CloseBid({ variables: { itemId: prodId, collateralId: payload._id }})
    setVisible(false)
  }

  const rejectBid = (prodId) => {
    RejectBid({ variables: { itemId: prodId, collateralId: payload._id }})
    setVisible(false)
  }

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
        // <TouchableOpacity
        //     // onPress={ () => navigation.navigate('detail' , { item, status }) }
        // >
            <Layout style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.photo }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text> */}
                <Card style={{borderRadius: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{ item.title }</Text>
                  <Text>{ item.value } IDR</Text>
                  <Button style={{marginTop: 10}} onPress={() => backToParent(item)}>See Bidders</Button>
                  {/* <Text>Status: { item.status }</Text> */}
                  {/* <View style={{alignItems: 'center', marginVertical: 10}}>
                    <View style={styles.controlContainer}>  
                      <ButtonGroup style={styles.buttonGroup} status='control'>
                        {item.tag.map((val, index) => (
                          <Button key={index}>{ val }</Button>
                        ))}
                      </ButtonGroup>
                    </View>
                  </View> */}
                  {/* <Text>rating: { item.rating }</Text> */}
                </Card>
            </Layout>
        // </TouchableOpacity>
    )
  } 
  return (
  <>
    <Layout>
      <Carousel
          style={{ flex: 1, justifyContent: "center", alignItems: 'center', padding: 0, backgroundColor: 'black' }}
          sliderWidth={screenWidth - 40}
          sliderHeight={20}
          itemWidth={screenWidth - 70}
          data={data}
          renderItem={renderItem}
          hasParallaxImages={true}
      />
      <Modal visible={visible}
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
                  </View>
                  <View style={{position: 'absolute', top: 10, right: 10, flexDirection: "row"}}>
                    <Button size="tiny" onPress={() => closeBid(el._id)} status="success" style={{width: 50, borderRadius: 25}}><Entypo name="check" size={20} color="black" /></Button>
                    <Button size="tiny" onPress={() => rejectBid(el._id)} status="danger" style={{width: 50, borderRadius: 25}}><Entypo name="cross" size={20} color="black" /></Button>
                  </View>
                </Card>
              ))}
              </Card>
      </Modal>
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
