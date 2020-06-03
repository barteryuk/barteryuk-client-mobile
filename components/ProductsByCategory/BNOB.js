import React, { useEffect, useState } from 'react'

import Carousel from './Carousel'
import TagCategory from './TagCategory'

import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function BNOB(props) {
  const { navigation, products, userId } = props
  const [ BNOBProd, setBNOBProd ] = useState(null)
  const handleFromChild = (data) => {
    props.cb(data)
  }
  
  useEffect(() => {
    let BNOBProd = []
    products.forEach(el => {
      if (el.category === 'BNOB' && el.userId !== userId && el.status === 'open' && el.topListingStatusDate === '') {
        BNOBProd.push(el)
      } 
    })
    setBNOBProd(BNOBProd)
  }, [])
    return (
      <>
        <TagCategory category={"Brand New Open Box"}/>
        { BNOBProd ? <Carousel data={BNOBProd} navigation={navigation} cb={handleFromChild}/> : <Text>Empty</Text> }     
      </>
    )
}

const styles = StyleSheet.create({
  containerSpinner: {
    marginTop: 10, 
    height: 380, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'black'
  }
})
export default BNOB
