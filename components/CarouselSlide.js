import React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Card, Button, ButtonGroup } from '@ui-kitten/components';
import axios from 'axios';
const { width: screenWidth, height } = Dimensions.get('window')

export default function Slider(props) {
  const { data, wantedProduct ,navigation, status } = props

  const chooseToBid = () => {
    axios({
      method: 'PUT',
      url: (`http://192.168.43.163:3000/products/${wantedP}`)
    })
  }
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
        <TouchableOpacity
            // onPress={ () => navigation.navigate('detail' , { item, status }) }
            onPress={ () => chooseToBid() }
        >
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text> */}
                <Card style={{borderRadius: 20}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>{ item.title }</Text>
                  <Text>{ item.value } IDR</Text>
                  {/* <Text>Status: { item.status }</Text> */}
                  {/* <View style={{alignItems: 'center', marginVertical: 10}}>
                    <View style={styles.controlContainer}>  
                      <ButtonGroup style={styles.buttonGroup} status='control'>
                        {item.tag.map((val, index) => (
                          <Button key={index}>{ val }</Button>
                        ))}
                      </ButtonGroup>
                    </View>
                  </View> */}
                  {/* <Text>rating: { item.rating }</Text> */}
                </Card>
            </View>
        </TouchableOpacity>
    )
  } 
  return (
  <>
    <Carousel
        style={{ flex: 1, justifyContent: "center", alignItems: 'center', padding: 0, backgroundColor: 'black' }}
        sliderWidth={screenWidth - 40}
        sliderHeight={20}
        itemWidth={screenWidth - 120}
        data={data}
        renderItem={renderItem}
        hasParallaxImages={true}
    />
  </>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'black'
  },
  item: {
      // width: screenWidth - 60,
      height: screenWidth - 50,
      marginVertical: 30,
      // backgroundColor: 'white',
      borderRadius: 20
  },
  imageContainer: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: 'white',
      marginBottom: 10,
      // width: screenWidth - 20
  },
  buttonGroup: {
    margin: 'auto',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#3366FF',
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'center',
      borderRadius: 15
  },
})
