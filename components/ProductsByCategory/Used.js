import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import TagCategory from './TagCategory'

import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function Used(props) {
  const { navigation, products, userId } = props
  const [ UsedProd, setUsedProd ] = useState(null)
  const handleFromChild = (data) => {
    props.cb(data)
  }
  
  
    useEffect(() => {
      let UsedProd = []
      products.forEach(el => {
        if (el.category === 'Used' && el.userId !== userId ) {
          UsedProd.push(el)
        } 
      })
      setUsedProd(UsedProd)
    }, [])

    return (
      <>
        <TagCategory category={"Used"}/>
        { UsedProd ? <Carousel data={UsedProd} navigation={navigation} cb={handleFromChild}/> : <Text>Empty</Text> }     
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
export default Used
