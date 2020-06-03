import React, { useEffect, useState } from 'react'
// import { useQuery } from '@apollo/react-hooks';

import Carousel from './Carousel'
import TagCategory from './TagCategory'

import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function BNIB(props) {
  const { navigation, products, userId } = props
  const [ TopListProd, setTopListProd ] = useState(null)
  const handleFromChild = (data) => {
    props.cb(data)
  }

  useEffect(() => {
    let TopListProd = []
    products.forEach(el => {
      if (el.topListingStatusDate !== '') {
        TopListProd.push(el)
      } 
    })
    setTopListProd(TopListProd)
  }, [])

    return (
      <>
        <TagCategory category={"Top Listing Products"}/>
        { TopListProd ? <Carousel data={TopListProd} navigation={navigation} cb={handleFromChild}/> : <Text>Empty</Text> }
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
export default BNIB
