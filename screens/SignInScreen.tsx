import React, { useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet,Text, Alert, AsyncStorage } from 'react-native'
import LCButton, { ButtonStyle } from '../components/LCButton'
import LoginTextField from '../components/LoginTextField'
import { AxiosError } from 'axios'
import Loading from '../components/Loading'
import ServerError from '../models/ServerError'
import REST from '../api'
import { grantPermissions } from '../constants/Common'



export default function SignInScreen({navigation}:{navigation:any}) {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("546813");
  useEffect(()=>{
    grantPermissions()
      .then(flag=>{
        console.log('Grant',flag);
      })
  },[])

  useEffect(()=>{
    AsyncStorage.getItem('token').then(token=>{
      if(token)
        navigation.push('BottomNavBar');
    })

  },[])
  function attemptSignIn() {
    setIsLoading(true)
    REST.signIn(username, password)
      .then((data) => {
        AsyncStorage.multiSet([
          ["token", data.token!],
          ["display_name", data.user_display_name!],
          ["user_email", data.user_email!],
          ["user_nicename", data.user_nicename!],
        ]);
        setIsLoading(false)
        navigation.push("BottomNavBar");
      })
      .catch((ex: AxiosError) => {
        console.error(ex);
        
        setIsLoading(false)
        const error =
          (ex.response?.data as ServerError)?.message ??
          "Not allowed internet connection";
        Alert.alert("Error", error);
      });
  }
  if(isLoading)
  return(
    <Loading />
  )
  else
  return (
    <ImageBackground
      source={require("../assets/images/sign_in_background.png")}
      style={styles.image}
    >
      <Text style={styles.title}>Let's Cook</Text>
      <LoginTextField
        onChangeText={(text) => setUsername(text)}
        placeholder={"Login"}
        icon={require("../assets/images/ic_login.png")}
        padding={20}
      >
        {username}
      </LoginTextField>
      <LoginTextField
        onChangeText={(text) => setPassword(text)}
        placeholder={"Password"}
        icon={require("../assets/images/ic_password.png")}
        secureTextEntry={true}
        padding={20}
      >
        {password}
      </LoginTextField>
      
      <View style={styles.actionContainer}>
        <LCButton
          containerStyle={styles.action}
          onClick={() => {
            attemptSignIn();
          }}
        >
          Sign in
        </LCButton>
        <LCButton type={ButtonStyle.Link} containerStyle={styles.action} onClick={()=>{
          navigation.navigate('SignUp')
        }}>
          Sign up
        </LCButton>
      </View>
    </ImageBackground>
  );
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