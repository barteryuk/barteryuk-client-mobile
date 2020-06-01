import React from 'react'
import { Card, Text } from '@ui-kitten/components'
import { Dimensions, StyleSheet, Image, View } from "react-native";


function Cards(props) {
  return (
    <>
      <Card style={styles.cardSlide}>
          <Text style={{fontWeight: 'bold'}}>aaa</Text>
          <Text style={{fontSize: 12}}>bbb</Text>
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  hospitalImg: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  cardSlide: {
    flexDirection: 'row',
    shadowOffset: {width:10, height:10}, 
    shadowColor: 'rgba(138,149,158,0.2)',
    shadowOpacity: 1,  
    elevation: 15, 
    paddingHorizontal: 15,
    marginVertical: 0.5,
    marginHorizontal: 2
  }
})

export default Cards
