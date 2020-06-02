import React, { useEffect, useState } from 'react'
// import { useQuery } from '@apollo/react-hooks';

import Carousel from '../ProductsByCategory/Carousel'
import TagCategory from '../ProductsByCategory/TagCategory'

import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function BNIB(props) {
  const { navigation, products } = props
  const [ BNIBProd, setBNIBProd ] = useState(null)
  // const { loading, error, data } = useQuery(FETCH_MOVIES)
  //   if (error) return <Layout style={styles.containerSpinner}><Text>Error ...</Text></Layout>
  const handleFromChild = (data) => {
    props.cb(data)
  }

  useEffect(() => {
    let BNIBProd = []
    products.forEach(el => {
      if (el.category === 'BNIB' ) {
        BNIBProd.push(el)
      } 
    })
    setBNIBProd(BNIBProd)
  }, [])

    return (
      <>
        <TagCategory category={"Brand New In Box"}/>
        { BNIBProd ? <Carousel data={BNIBProd} navigation={navigation} cb={handleFromChild}/> : <Text>Empty</Text> }
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
