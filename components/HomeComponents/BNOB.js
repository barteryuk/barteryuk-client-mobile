import React, { useEffect, useState } from 'react'
// import { useQuery } from '@apollo/react-hooks';

import Carousel from '../ProductsByCategory/Carousel'
import TagCategory from '../ProductsByCategory/TagCategory'

import { Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function BNOB(props) {
  const { navigation, products } = props
  const [ BNOBProd, setBNOBProd ] = useState(null)
  // const { loading, error, data } = useQuery(FETCH_MOVIES)
  //   if (error) return <Layout style={styles.containerSpinner}><Text>Error ...</Text></Layout>
    const handleFromChild = (data) => {
      props.cb(data)
    }
    

  
    useEffect(() => {
      let BNOBProd = []
      products.forEach(el => {
        if (el.category === 'BNOB' ) {
          BNOBProd.push(el)
        } 
      })
      setBNOBProd(BNOBProd)
    }, [])
    return (
      <>
        <TagCategory category={"Brand New Open Box"}/>
        <Carousel data={BNOBProd} navigation={navigation} cb={handleFromChild}/>      
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
