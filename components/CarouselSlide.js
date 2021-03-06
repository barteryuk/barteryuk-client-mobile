import React, { useState } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Card, Button, ButtonGroup } from '@ui-kitten/components';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { Snackbar } from 'react-native-paper';
const { width: screenWidth, height } = Dimensions.get('window')


const BID_ITEM = gql`
    mutation BidItem(
      $itemId: ID!
      $collateralId: ID!
      ) {
      bidItem(
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
          }
      }
    }
`

const SEND_MAIL = gql`
  mutation SendMail($id: ID!){
    sendMail(id: $id){
      status
      message
    } 
  }
`

export default function Slider(props) {
  const { data, wantedProduct, navigation, status } = props
  const [BidItem] = useMutation(BID_ITEM)
  const [SendMail] = useMutation(SEND_MAIL)
  const [doneVisible, setDoneVisible] = useState(false)

  const chooseToBid = (own) => {
    console.log('wanted', wantedProduct._id)
    console.log('wanted data', wantedProduct)
    console.log('own', own._id)
    console.log('dataaaa', own)
    // BidItem({ variables: { itemId: wantedProduct._id, collateralId: own._id }})
    // SendMail({ variables: { id: wantedProduct.userId }})
    setDoneVisible(true)
    console.log('successfully bid')
  }

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <TouchableOpacity
            // onPress={ () => navigation.navigate('detail' , { item, status }) }
            onPress={ () => chooseToBid(item) }
        >
            <View style={styles.item}>
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
            </View>
        </TouchableOpacity>
    )
  } 
  return (
  <>  
    <Carousel
        style={{ flex: 1, justifyContent: "center", alignItems: 'center', padding: 0, backgroundColor: 'black' }}
        sliderWidth={screenWidth - 40}
        sliderHeight={20}
        itemWidth={screenWidth - 120}
        data={data}
        renderItem={renderItem}
        hasParallaxImages={true}
    />
    <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
    <Snackbar visible={doneVisible} onDismiss={() => setDoneVisible(false)} action={{onPress: () => { setDoneVisible(false) }}} style={{backgroundColor: "green", width: '100%'}}
    ><Text style={{textAlign: 'center'}}>Successfully Bid Product</Text></Snackbar>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'black'
  },
  item: {
      // width: screenWidth - 60,
      height: screenWidth - 50,
      marginVertical: 30,
      // backgroundColor: 'white',
      borderRadius: 20
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
