import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import LCButton, { ButtonStyle } from "../components/LCButton";
import TextField from "../components/LoginTextField";
import REST from "../api";
import Loading from "../components/Loading";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("koha092");
  const [password, setPassword] = useState("111111");
  const [email, setEmail] = useState("koha00922@mail.ru");
  const [image, setImage] = useState<string | null>(null);
  const [load, setLoad] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const sendData = async () => {
    if (!username && !password && !email) {
      Alert.alert("Incorrect fill data", "Please, fill fields");
      return
    }
    if(!image){
      Alert.alert("Incorrect fill data", "Please, choose image");
      return
    }
    try {
      setLoad(true)
      const response = await REST.signUp(username, password, email);
      const auth = await REST.signIn(username, password);
      const media = await REST.sendMedia(image!,auth.token);
      await REST.attachMedia(response.id,media.id,auth.token);
      setLoad(false)
      navigation.pop();
    } catch (error) {
      setLoad(false)
      if(error.response.data){
        Alert.alert('Catch exception',error.response.data.message)
      }else{
        Alert.alert('Catch exception','Internet connection is\'t available')
      }
    }
  };
  if (load) return <Loading />;
  else
    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/sign_up.png")}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }} />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/images/photo_upload.png")}
              />
            )}
          </TouchableOpacity>
          <View>
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
              secureTextEntry={true}
              padding={20}
            >
              {password}
            </TextField>
            <TextField
              onChangeText={(text) => setEmail(text)}
              placeholder={"Email"}
              icon={require("../assets/images/ic_email.png")}
              padding={20}
            >
              {email}
            </TextField>
          </View>
          <View style={styles.actionContainer}>
            <LCButton containerStyle={styles.action} onClick={sendData}>
              Sign up
            </LCButton>
            <LCButton
              type={ButtonStyle.Link}
              containerStyle={styles.action}
              onClick={() => {
                navigation.pop();
              }}
            >
              Go back
            </LCButton>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  actionContainer: {},
  action: {
    marginTop: 20,
  },
  background: {
    flex: 1,
    paddingTop: 100,
  },
  container: {
    alignItems: "stretch",
    paddingLeft: 32,
    paddingRight: 32,
  },
  image: {
    borderRadius: 90,
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 10,
  },
});
