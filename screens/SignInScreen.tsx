import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet,Text } from 'react-native'
import LCButton, { ButtonStyle } from '../components/LCButton'
import TextField from '../components/TextField'
import {REST, ServerError} from '../api'
import { AxiosError } from 'axios'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigationContainerProps, NavigationHelpers, NavigationProp } from '@react-navigation/native'



export default function SignInScreen({navigation}:{navigation:any}) {
  navigation.replace('BottomNavBar')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('546813')

  function attemptSignIn(){
    REST.signIn(username, password)
      .then((data) => {
        console.log(data)
        
      })
      .catch((ex: AxiosError) => {
        const error =
          (ex.response?.data as ServerError)?.message ??
          "Not allowed internet connection"
        console.log(error)
      })
   
  }
    return (
      <ImageBackground
        source={require("../assets/images/sign_in_background.png")}
        style={styles.image}
      >
        <Text style={styles.title}>Let's Cook</Text>
        <TextField
          onChangeText={(text) => setUsername(text)}
          placeholder={"Login"}
          icon={require("../assets/images/ic_login.png")}
          padding={20}
        >
          {username}
        </TextField>
        <TextField
          onChangeText={(text) => setPassword(text)}
          placeholder={"Password"}
          icon={require("../assets/images/ic_password.png")}
          padding={20}
        >
          {password}
        </TextField>
        <View style={styles.actionContainer}>
          <LCButton containerStyle={styles.action} onClick={() => {attemptSignIn()}}>
            Sign in
          </LCButton>
          <LCButton type={ButtonStyle.Link} containerStyle={styles.action}>
            Forgot password?
          </LCButton>
        </View>
      </ImageBackground>
    )
  
}

const styles = StyleSheet.create({
  actionContainer:{
    marginTop: 20
  },
  action:{
    marginTop: 20
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 30
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  },
  title: {
    fontSize: 48,
    color: '#dddddd',
    textAlign: "center",
    fontFamily: "obla"
  }
})