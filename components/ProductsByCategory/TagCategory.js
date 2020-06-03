import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider } from '@ui-kitten/components';

function TagCategory (props) {
  const { category } = props
  return (
    <>
      <TouchableOpacity>
        <Text style={{ marginBottom : 1, marginTop : 15, marginLeft: 30, fontWeight : "bold" , fontSize : 23, color : 'grey', textAlign: 'left' }}>{category}</Text>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Divider style={{marginBottom: 15, borderWidth: 1.25, backgroundColor: 'grey', width: '92%'}}/>
      </View>
      
    </>

  )
}

export default TagCategory