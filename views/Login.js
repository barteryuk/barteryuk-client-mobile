import React, { useState } from 'react'
import { 
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage } from 'react-native';
import { Button } from '@ui-kitten/components';
// import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kaede } from 'react-native-textinput-effects';
import Constants from 'expo-constants'
// import { POST_MOVIE, FETCH_MOVIES, POST_TVSERIE, FETCH_TVSERIES } from '../queries'
import { useMutation } from '@apollo/react-hooks'
import { gql } from "apollo-boost"
// import { Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LOGINUSER= gql`
      mutation($email: String!, $password: String!){
        login(email:$email, password:$password){
          status
          message
          email
          userId
          access_token
        }
      }
  `;
const Login = (props) => {
  const { navigation } = props
  const [errVisible, setErrVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [LoginMutation] = useMutation(LOGINUSER)
  // const [PostMovie] = useMutation(POST_MOVIE, {
  //   update(cache, { data: { postMovie } }) {
  //     const { movies } = cache.readQuery({ query: FETCH_MOVIES })
  //     cache.writeQuery({
  //       query: FETCH_MOVIES,
  //       data: { movies: movies.concat([postMovie]) },
  //     })
  //   }
  // })
  const storeUserData = async (storage) => {
    try {
      const coba = await AsyncStorage.setItem('userLogin', JSON.stringify(storage))
      const token = await AsyncStorage.setItem('token', storage.token)
      return token
    } catch (error) {
      console.log(error)
    }
  }

  const formSubmit = () => {
    if (email === '' || password === '' ) {
      console.log('form empty')
      // navigation.navigate('root')
      // setErrVisible(true)
    } else {
      const payload = {
        email, password
      }
      LoginMutation({ variables: payload})
      .then(({ data }) => {
        console.log(data)
        const storage = {
          email: data.login.email,
          userId: data.login.userId,
          token: data.login.access_token
        }
        console.log('wanna set token', storage)
        storeUserData(storage)
        navigation.navigate('root')
        setEmail('')
        setPassword('')
      })
    }
  }
  return (
    <>
      
      <KeyboardAwareScrollView style={{backgroundColor: 'white', paddingTop: Constants.statusBarHeight + 20}}>
        {/* <View style={{ flex: 1, alignItems: 'center'  }}> */}
        <View style={styles.containerone}>
          <ImageBackground source={require("../assets/logo.png")} style={styles.imgBackgroundLogin}></ImageBackground>
       </View>
       <View style={styles.containertwo}>
        <Kaede
            onChangeText={text => setEmail(text)}
            value={email}
            label={'Email'}
            inputPadding={14}
            inputStyle={{ color: 'black', width: 400}}
            style={styles.input}
        />
        <Kaede
            onChangeText={text => setPassword(text)}
            value={password}
            label={'Password'}
            inputPadding={14}
            inputStyle={{ color: 'black', width: 400, height: 200}}
            style={styles.input}
            secureTextEntry={true}
        />
        <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: 'grey' }}>
                Don't have an account yet?
        </Text>
        <TouchableHighlight underlayColor="#ffffff00" style={{marginLeft: 10}} onPress={() => navigation.navigate('Register')}>
          <Text style={{ textAlign: 'center', fontSize: 14, color: 'midnightblue', fontWeight: '400' }}>
              Register Here
          </Text>
        </TouchableHighlight>
        </View>
        
        <Button
            onPress={() => formSubmit()}
            type="secondary"
            style={{ width: '90%', marginVertical: 30, borderRadius: 20 }}
        >
          LOGIN
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
      borderWidth: 1,
      marginVertical: 10
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
    backgroundColor: 'white',
    alignItems: 'center'
  }
})
export default Login
