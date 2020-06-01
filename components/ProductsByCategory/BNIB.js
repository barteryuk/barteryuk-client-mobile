import React from 'react'
// import { useQuery } from '@apollo/react-hooks';

import Carousel from './Carousel'
import TagCategory from './TagCategory'

import { Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native'

function BNIB(props) {
  const { navigation, products } = props
  // const { loading, error, data } = useQuery(FETCH_MOVIES)
  //   if (error) return <Layout style={styles.containerSpinner}><Text>Error ...</Text></Layout>
  const handleFromChild = (data) => {
    props.cb(data)
  }
    return (
      <>
        <TagCategory category={"Brand New In Box"}/>
        <Carousel data={products} navigation={navigation} cb={handleFromChild}/>
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
