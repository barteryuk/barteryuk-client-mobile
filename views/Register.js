import React, { useState } from 'react'
import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground } from 'react-native';
import { Button } from '@ui-kitten/components';
import { Hoshi } from 'react-native-textinput-effects';
import Constants from 'expo-constants'
// import { POST_MOVIE, FETCH_MOVIES, POST_TVSERIE, FETCH_TVSERIES } from '../queries'
// import { useMutation } from '@apollo/react-hooks'
// import { Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Register = (props) => {
  const { navigation } = props
  const [errVisible, setErrVisible] = useState(false)
  const [email, setTitle] = useState('')
  const [password, setOverview] = useState('')
  const [phoneNumber, setPhoneNumbers] = useState('')

  // const [PostMovie] = useMutation(POST_MOVIE, {
  //   update(cache, { data: { postMovie } }) {
  //     const { movies } = cache.readQuery({ query: FETCH_MOVIES })
  //     cache.writeQuery({
  //       query: FETCH_MOVIES,
  //       data: { movies: movies.concat([postMovie]) },
  //     })
  //   }
  // })
  const formSubmit = () => {
    if (title === '' || overview === '' || poster_path === '') {
      console.log('form empty')
      setErrVisible(true)
    } else {
      console.log('login')
    }
  }
  return (
    <>
      
      <KeyboardAwareScrollView style={{backgroundColor: 'whitesmoke', paddingTop: Constants.statusBarHeight + 20}}>
        {/* <View style={{ flex: 1, alignItems: 'center'  }}> */}
        <View style={styles.containerone}>
          <ImageBackground source={require("../assets/logo.png")} style={styles.imgBackgroundLogin}></ImageBackground>
       </View>
       <View style={styles.containertwo}>
        <Hoshi
            onChangeText={text => setTitle(text)}
            value={email}
            label={'Email'}
            inputPadding={14}
            inputStyle={{ color: 'white', width: 400}}
            style={styles.input}
        />
        <Hoshi
            onChangeText={text => setOverview(text)}
            value={password}
            label={'Password'}
            inputPadding={14}
            inputStyle={{ color: 'white', width: 400, height: 200}}
            style={styles.input}
        />
        <Hoshi
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            label={'Phone Number'}
            inputPadding={14}
            inputStyle={{ color: 'white', width: 400, height: 200}}
            style={styles.input}
        />
        <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: 'grey' }}>
                Already have an account?
        </Text>
        <TouchableHighlight underlayColor="#ffffff00" style={{marginLeft: 10}} onPress={() => navigation.navigate('Login')}>
          <Text style={{ textAlign: 'center', fontSize: 14, color: 'midnightblue', fontWeight: '400' }}>
              Login
          </Text>
        </TouchableHighlight>
        </View>
        
        <Button
            onPress={() => formSubmit()}
            type="secondary"
            style={{ width: '90%', marginVertical: 20, borderRadius: 20 }}
        >
          REGISTER
        </Button>
       </View>

            {/* <Snackbar visible={errVisible} onDismiss={() => setErrVisible(false)} action={{onPress: () => { setErrVisible(false) }}} style={{backgroundColor: "red"}}
            ><Text style={{textAlign: 'center'}}>Email/Password Invalid</Text></Snackbar> */}
            {/* <Snackbar visible={doneVisible} onDismiss={() => setDoneVisible(false)} action={{onPress: () => { setDoneVisible(false) }}} style={{backgroundColor: "green"}}
            ><Text style={{textAlign: 'center'}}>Successfully Added</Text></Snackbar> */}
        {/* </View> */}
      </KeyboardAwareScrollView>
      {/* <Button size="tiny" style={{ borderRadius: 50, top: 40, right: 10, position: 'absolute', backgroundColor: 'black', borderWidth: 0}} onPress={() => props.navigation.navigate('home')}><Entypo name="home" size={24} color="red" /></Button> */}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
      width: '90%',
      backgroundColor: '#02c39a',
      borderRadius: 10,
      borderWidth: 0,
      marginVertical: 5
  },
  imgBackgroundLogin: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 20,
    justifyContent: 'center'
  },
  containerone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  containertwo: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center'
  }
})
export default Register
