import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions, Image, Animated } from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'
import axios from 'axios'


import { Button, Layout, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import Sliding from '../components/Sliding'

import allData from '../sample.json'

const { height, width } = Dimensions.get('window')

function MyProduct(props) {
  const [myProducts, setMyProducts] = useState([])
  const [myBidder, setMyBidder] = useState(null)

  useEffect(() => {
    const products = allData.filter(el => el.userId === 1)
    setMyProducts(products)
  }, [])

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button size="tiny" onPress={() => setVisible(true)}><Entypo name="home" size={24} color="white" /></Button>
  );
  const draggedValue = new Animated.Value(120)
  return (
      <>
      <View style={styles.container}>
        <View style={styles.containerone}>
        </View>
        <View style={styles.containertwo}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40}}>
            {/* <ScrollView>
              <BNIBProducts navigation={props.navigation} products={BNIBProd}/>
              <BNOBProducts navigation={props.navigation} products={BNOBProd}/>
              <UsedProducts navigation={props.navigation} products={UsedProd}/>
            </ScrollView> */}
          </View>
        </View> 
        <Layout style={{ borderRadius: 50, top: 40, left: 10, position: 'absolute', backgroundColor: 'black', borderWidth: 0}} level='1'>
          <OverflowMenu
            anchor={renderToggleButton}
            visible={visible}
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            onBackdropPress={() => setVisible(false)}>
            <MenuItem title='myProduct' onPress={() => props.navigation.navigate('myProduct')}/>
            <MenuItem title='myBid' onPress={() => props.navigation.navigate('myBid')}/>
          </OverflowMenu>
        </Layout>
        <SlidingUpPanel showBackdrop={false} draggableRange={{ top: height - 130, bottom: 100 }} animatedValue={draggedValue}>
          <View style={styles.panel}>
              { myBidder !== null ? 
                <Sliding data={myBidder} status={'myProduct'}/>
                : <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Click the your Product to see its bidder</Text> }
          </View>
        </SlidingUpPanel>
      </View>

      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02c39a'
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
  }
})
export default MyProduct
