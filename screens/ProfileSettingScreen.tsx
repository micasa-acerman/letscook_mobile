import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import LCButton from "../components/LCButton";
import Loading from "../components/Loading";
import TextField from "../components/TextField";
import User from "../models/User";
import * as ImagePicker from "expo-image-picker";
import REST from "../api";

export default function ProfileSettingScreen({ route }: { route: any }) {
  const user: User = route.params.user;
  const [displayName, setDisplayName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState(user.simple_local_avatar.full);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setLoad(true);
      REST.sendMedia(result.uri)
        .then((media) => REST.attachMedia(user.id, media.id))
        .then(() => {
          setLoad(false);
          setImage(result.uri);
        })
        .catch((ex) => console.error(ex));
    }
  };
  useEffect(() => {
    return () => {
      route.params.setLoad(true);
    };
  }, []);
  const updateProfileData = async () => {
    if (!displayName) {
      Alert.alert("Incorrect fill data", "Please, fill fields");
      return;
    }
    try {
      setLoad(true);
      await REST.updateProfile(user.id, displayName);
      if (password.length && newPassword.length)
        await REST.changePassword(password, newPassword);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoad(false);
    }
  };
  if (load) return <Loading />;
  else
    return (
      <ScrollView style={styles.root}>
        <ImageBackground
          style={styles.background}
          source={{ uri: image }}
          blurRadius={26}
        >
          <View style={styles.content}>
            <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
              <Image source={{ uri: image }} style={styles.avatar}></Image>
            </TouchableOpacity>
            <TextField
              labelText="Display name"
              placeholder="Display name"
              onChangeText={(text) => setDisplayName(text)}
            >
              {displayName}
            </TextField>
            <TextField
              labelText="Current password"
              placeholder="*******"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            >
              {password}
            </TextField>
            <TextField
              labelText="Password"
              placeholder="*******"
              secureTextEntry={true}
              onChangeText={(text) => setNewPassword(text)}
            >
              {newPassword}
            </TextField>
            <LCButton
              containerStyle={{ marginTop: 30 }}
              onClick={updateProfileData}
            >
              Save
            </LCButton>
          </View>
        </ImageBackground>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    marginTop: 140,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
  },
  avatar: {
    alignSelf: "center",
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  avatarWrap: {
    marginTop: -120,
    elevation: 10000,
  },
});
