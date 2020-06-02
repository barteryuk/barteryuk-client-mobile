import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions, Image, Animated } from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'

import { Button, Layout, Text, Spinner, Modal, Card } from '@ui-kitten/components';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import Sliding from '../components/Sliding'
import CarouselCollection from '../components/myCollection'


const { height, width } = Dimensions.get('window')
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"
import CardMyBidders from '../components/CardMyBidders';

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

function MyProduct(props) {
  const { navigation } = props
  // const [myProducts, setMyProducts] = useState([])
  const [myBidder, setMyBidder] = useState(null)
  const {loading, error, data: myProducts} = useQuery(FETCH_OWNITEMS)
  const [visible, setVisible] = useState(false);
  const [isBidder, setIsBidder] = useState(false)

  const handleFromChild = (data) => {
    if (data === 'empty') {
      setIsBidder(false)
    } else {
      setIsBidder(true)
    }
    setVisible(true)
  }
  const draggedValue = new Animated.Value(120)
  if (loading) {
    return <Layout style={styles.containerSpinner}><Spinner/></Layout> 
  } else {
    console.log('MY PRODUUUUUCT', myProducts.ownItems)
    return (
      <>
      <Layout style={styles.container}>
        <View style={styles.containerone}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>Your Products</Text>
        </View>
        <View style={styles.containertwo}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
            { myProducts.ownItems ? <CarouselCollection data={myProducts.ownItems} navigation={navigation} cb={handleFromChild}/> : <Text>Empty</Text> }
            {/* <ScrollView>
              <BNIBProducts navigation={props.navigation} products={BNIBProd}/>
              <BNOBProducts navigation={props.navigation} products={BNOBProd}/>
              <UsedProducts navigation={props.navigation} products={UsedProd}/>
            </ScrollView> */}
          </View>
        </View> 
        <Modal visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
          {isBidder ? 
            myProducts.ownItems.bidProductId.map((el, index) => (
              <CardMyBidders key={index} productId={el._id}/>
            )) : <Text>Zero Bidder</Text> }
            </Card>
        </Modal>
        {/* <SlidingUpPanel showBackdrop={false} draggableRange={{ top: height - 130, bottom: 100 }} animatedValue={draggedValue}>
          <View style={styles.panel}>
              { myBidder !== null ? 
                <Sliding data={myBidder} status={'myProduct'}/>
                : <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Click the your Product to see its bidder</Text> }
          </View>
        </SlidingUpPanel> */}
        <Button size="tiny" style={{ borderRadius: 50, top: 40, right: 10, position: 'absolute', backgroundColor: '#02c39a', borderWidth: 0}} onPress={() => navigation.openDrawer()}><FontAwesome5 name="bars" size={24} color="white" /></Button>
      </Layout>

      </>
    )
  }
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#02c39a',
    paddingTop: 20
  },
  containerone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertwo: {
    flex: 9,
    backgroundColor: '#dcdece',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  panel: {
    paddingTop: 50,
    paddingBottom: 150,
    flex: 1,
    // backgroundColor: 'rgba(219, 219, 219, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
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
export default MyProduct
