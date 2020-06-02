import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Animated, AsyncStorage } from "react-native";
import { Layout, Spinner, Button, Divider } from '@ui-kitten/components'

import { Entypo } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks'

export default function Sliding(props) {
  const { status, data, navigation } = props

  const handleBid = () => {
        navigation.navigate('auth')
  }

  return (
  <>
    {/* <Animated.View style={[styles.favoriteIcon]}>
      <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Drag Me!</Text>
    </Animated.View> */}
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{data.title}</Text>
      <View style={{ paddingHorizontal: 30, marginTop: 20, width: '98%' }}>
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
      </View>
    </View>

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
