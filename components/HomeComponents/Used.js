import React, { useEffect, useState } from 'react'
// import { useQuery } from '@apollo/react-hooks';
// import { FETCH_MOVIES } from '../queries'

import Carousel from '../ProductsByCategory/Carousel'
import TagCategory from '../ProductsByCategory/TagCategory'

import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function Used(props) {
  const { navigation, products } = props
  const [ UsedProd, setUsedProd ] = useState(null)
  // const { loading, error, data } = useQuery(FETCH_MOVIES)
  //   if (error) return <Layout style={styles.containerSpinner}><Text>Error ...</Text></Layout>
  const handleFromChild = (data) => {
    props.cb(data)
  }

  useEffect(() => {
    let UsedProd = []
    products.forEach(el => {
      if (el.category === 'Used' ) {
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
