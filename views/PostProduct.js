import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, AsyncStorage } from 'react-native'
import { Button, Radio, RadioGroup } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker'
import { Hoshi } from 'react-native-textinput-effects';
// import { useMutation } from '@apollo/react-hooks'
// import { Snackbar } from 'react-native-paper';
// import { Container, Header, Content, Text, Button, Toast } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import axios from 'axios'
import FormData from 'form-data'

const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String
    $value: Float!
    $photopath: String!
    $category: String!
  ){
    addProduct(
      title: $title
      description: $description
      value: $value
      photopath: $photopath
      category: $category
    ) {
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
`
const FETCH_PRODUCTS = gql`
  query {
    products {
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
`
function PostProduct(props) {

    const [fileObj, setFileObj] = React.useState("https://clipartart.com/images/image-placeholder-clipart-1.png");
    const [loadingPhoto, setLoadingPhoto] = useState(false)
    const { loading, error, data } = useQuery(FETCH_PRODUCTS);

    function pickImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    })
      .then((result) => {
        
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let photo = { uri: localUri, name: filename, type }
        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('file', { uri: localUri, name: filename, type });
        formData.append('upload_preset', 'dporllohn')
        formData.append("cloud_name", "dporllohn")
        console.log('FORM DATA')
        console.log(formData)
        setLoadingPhoto(true)
        return axios({
          method: 'POST',
          url: "https://api.cloudinary.com/v1_1/dporllohn/image/upload",
          data: formData
        })
      })
      .then(result => {
        console.log('RESSSSUUULT')
        setLoadingPhoto(false)
        setFileObj(result.data.secure_url);
      })
      .catch((e) => {
        console.log('ERRROOOOR')
        setLoadingPhoto(false)
        console.log(e)
        setFileObj(fileObj);
      });
    }

  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [AddProduct] = useMutation(ADD_PRODUCT)


  const [token, setToken] = useState('')
  const fetchStorage = async() => {
    // let value = await AsyncStorage.getItem('userLogin')
    // value = JSON.parse(value)
    // console.log('value storage form postProduct', value)
    // setToken(value.token)
  }
  useEffect(() => {
    fetchStorage()
  }, [])
  const formSubmit = () => {
    let category;
    if (selectedIndex === 0) {
      category = 'BNIB'
    } else if (selectedIndex === 1) {
      category = 'BNOB'
    } else {
      category = 'Used'
    }
    AddProduct({ variables: {title, description, value: parseFloat(value), photopath: fileObj, category}})
    setTitle('')
    setDescription('')
    setValue('')
    setSelectedIndex(0)
    setFileObj("https://clipartart.com/images/image-placeholder-clipart-1.png")
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerone}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Add Product</Text>
      </View>
      <View style={styles.containertwo}>
        <KeyboardAwareScrollView style={{backgroundColor: 'white', paddingTop: 30}}>
        <View style={{ flex: 1, alignItems: 'center'  }}>
            <Hoshi
                onChangeText={text => setTitle(text)}
                value={title}
                label={'Title'}
                inputPadding={14}
                inputStyle={{ color: 'black', width: 400}}
                style={styles.input}
            />
            <Hoshi
                onChangeText={text => setDescription(text)}
                value={description}
                label={'Description'}
                inputPadding={14}
                inputStyle={{ color: 'black', width: 400, height: 200}}
                style={styles.input}
            />
            <Hoshi
                onChangeText={text => setValue(text)}
                value={value}
                label={'Value'}
                inputPadding={14}
                inputStyle={{ color: 'black', width: 400 }}
                style={styles.input}
            />
            <Text category='h5' style={{color: 'black', marginTop: 20 }}>
              Choose Product Category
            </Text>
            <RadioGroup
              style={{flexDirection: 'row', marginBottom: 20}}
              selectedIndex={selectedIndex}
              onChange={index => setSelectedIndex(index)}>
              <Radio style={{color: 'white', marginHorizontal: 8}}>BNIB</Radio>
              <Radio style={{color: 'white', marginHorizontal: 8}}>BNOB</Radio>
              <Radio style={{color: 'white', marginHorizontal: 8}}>Used</Radio>
            </RadioGroup>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button onPress={() => pickImage()}>Pick Image from Library</Button>
            </View>
            { loadingPhoto ? <Button
                status="warning"
                style={{ marginVertical: 50, width: '92%', borderRadius: 20 }}
            >
              Uploading Photo ...
            </Button> : <Button
                onPress={() => formSubmit()}
                status="success"
                style={{ marginVertical: 50, width: '92%', borderRadius: 20 }}
            >
              Save
            </Button> }

            {/* <Snackbar visible={errVisible} onDismiss={() => setErrVisible(false)} action={{onPress: () => { setErrVisible(false) }}} style={{backgroundColor: "red"}}
            ><Text style={{textAlign: 'center'}}>Please fill all the blank form</Text></Snackbar>
            <Snackbar visible={doneVisible} onDismiss={() => setDoneVisible(false)} action={{onPress: () => { setDoneVisible(false) }}} style={{backgroundColor: "green"}}
            ><Text style={{textAlign: 'center'}}>Successfully Added</Text></Snackbar> */}
        </View>
        </KeyboardAwareScrollView>
      </View> 
      <Button size="tiny" style={{ borderRadius: 50, top: 35, right: 10, position: 'absolute', backgroundColor: '#02c39a', borderWidth: 0}} onPress={() => props.navigation.openDrawer()}><FontAwesome5 name="bars" size={24} color="white" /></Button>
      {/* <Container>
        <Header />
        <Content padder>
          <Button
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                duration: 3000
              })}
          >
            <Text>Toast</Text>
          </Button>
        </Content>
      </Container> */}
    </View>
  //   <KeyboardAwareScrollView style={{backgroundColor: 'white', paddingTop: 30}}>
  //   <View style={{ flex: 1, alignItems: 'center'  }}>
  //   <Text style={{color: 'black', fontSize: 30, marginBottom: 20, fontWeight: 'bold'}}>Add Product</Text>
  //       <Hoshi
  //           onChangeText={text => setTitle(text)}
  //           value={title}
  //           label={'Title'}
  //           inputPadding={14}
  //           inputStyle={{ color: 'white', width: 400}}
  //           style={styles.input}
  //       />
  //       <Hoshi
  //           onChangeText={text => setDescription(text)}
  //           value={description}
  //           label={'Description'}
  //           inputPadding={14}
  //           inputStyle={{ color: 'white', width: 400, height: 200}}
  //           style={styles.input}
  //       />
  //       <Hoshi
  //           onChangeText={text => setValue(text)}
  //           value={value}
  //           label={'Value'}
  //           inputPadding={14}
  //           inputStyle={{ color: 'white', width: 400 }}
  //           style={styles.input}
  //       />
  //       <Text category='h5' style={{color: 'black', marginTop: 20 }}>
  //         Choose Product Category
  //       </Text>
  //       <RadioGroup
  //         style={{flexDirection: 'row', marginBottom: 20}}
  //         selectedIndex={selectedIndex}
  //         onChange={index => setSelectedIndex(index)}>
  //         <Radio style={{color: 'white', marginHorizontal: 12}}>BNIB</Radio>
  //         <Radio style={{color: 'white', marginHorizontal: 12}}>BNOB</Radio>
  //         <Radio style={{color: 'white', marginHorizontal: 12}}>Used</Radio>
  //       </RadioGroup>
  //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //         <Button onPress={() => pickImage()}>Pick Image from Library</Button>
  //       </View>
  //       <Button
  //           onPress={() => formSubmit()}
  //           status="success"
  //           style={{ marginVertical: 50, width: '80%', borderRadius: 20 }}
  //       >
  //         Save
  //       </Button>
  //       {/* <Snackbar visible={errVisible} onDismiss={() => setErrVisible(false)} action={{onPress: () => { setErrVisible(false) }}} style={{backgroundColor: "red"}}
  //       ><Text style={{textAlign: 'center'}}>Please fill all the blank form</Text></Snackbar>
  //       <Snackbar visible={doneVisible} onDismiss={() => setDoneVisible(false)} action={{onPress: () => { setDoneVisible(false) }}} style={{backgroundColor: "green"}}
  //       ><Text style={{textAlign: 'center'}}>Successfully Added</Text></Snackbar> */}
  //   </View>
  // </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#02c39a',
    paddingTop: 20
  },
  imgBackgroundHome: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginVertical: 20,
    justifyContent: 'center'
  },
  containerone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertwo: {
    flex: 9,
    paddingTop: 50,
    backgroundColor: 'white',
    // backgroundColor: '#dcdece',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
});
export default PostProduct

// const [selectedImage, setSelectedImage] = React.useState(null);

// let openImagePickerAsync = async () => {
//   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

//   if (permissionResult.granted === false) {
//     alert('Permission to access camera roll is required!');
//     return;
//   }

//   let pickerResult = await ImagePicker.launchImageLibraryAsync();

//   if (pickerResult.cancelled === true) {
//     return;
//   }

//   setSelectedImage({ uri: pickerResult.uri });
// };

// if (selectedImage !== null) {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: selectedImage.uri }}
//         style={styles.thumbnail}
//       />
//     </View>
//   );
// }