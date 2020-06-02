import React, { useEffect, useState } from 'react'
import { Button, Layout, Text, Card, Spinner } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'


const FETCH_MYBIDDERS = gql`
  query product($productid: ID!) {
    product(productid: $productid) {
      _id
      title
      description
      bidProductId {
        _id
      }
      value
      userId
      photo
      category
    }
  }
`;

function CardMyBidders(props) {
  const { productId } = props
  const { loading, client, data } = useQuery(FETCH_MYBIDDERS, {
    variables: { productid: productId },
  });
  if (loading) {
    return <Layout style={styles.containerSpinner}><Spinner/></Layout> 
  } else {
    console.log('myBidders =====> ', data.product)
    return (
      <Card
        style={styles.item}
        status='basic'
      > 
        <Image source={data.product.photo} style={styles.image}></Image>
        <Text>
          {data.product.title}
        </Text>
        <Text>
          {data.product.description}
        </Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  containerSpinner: {
    marginTop: 10, 
    height: 380, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 5,
    shadowOffset: {width:10, height:10}, 
    shadowColor: 'rgba(138,149,158,0.2)',
    shadowOpacity: 1,  
    elevation: 10, 
  },
})

export default CardMyBidders
