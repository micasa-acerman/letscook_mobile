import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import REST from '../api'
import Loading from '../components/Loading'
import Dialog from '../models/Dialog'

export default function DialogsScreen({ navigation }: { navigation: any }) {
  const renderItem = ({ item }: { item: Dialog }) => {
    const dateFormatted = moment(
      item.last_message_date,
      "YYYY-MM-DD hh:mm:ss"
    ).format("LT");
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ChatScreen", {
            user_id: item.user_id,
            title: item.display_name,
            update: ()=>{
              setIsLoad(true)
            }
          });
        }}
        underlayColor="transparent"
        activeOpacity={0.8}
      >
        <View style={styles.container}>
          <Image source={{ uri: item.avatar["full"] }} style={styles.avatar} />
          <View style={styles.group}>
            <Text style={styles.name}>{item.display_name}</Text>
            <Text numberOfLines={1} style={styles.message}>
              {item.message}
            </Text>
          </View>
          <Text style={styles.date}>{dateFormatted}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  const separator = () => {
    return <View style={styles.separator}></View>;
  };

  const [data, setData] = useState<Array<Dialog>>([]);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    if(isLoad){
      REST.getDialogs().then((result) => {
        setData(result);
        setIsLoad(false);
      });
    }
  }, [isLoad]);

  if (isLoad) {
    return <Loading />;
  } else {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    );
  }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:8,
        paddingBottom:8,
        paddingRight:16,
        paddingLeft:16,
        flexDirection:"row"
    },
    group:{
        marginLeft:16
    },
    name:{
        fontFamily: 'aqua',
        fontSize:16
    },
    avatar:{
        width:56,
        height:56,
        borderRadius: 28
    },
    message:{
        color: '#969696',
        fontSize:12,
        fontFamily:'aqua'
    },
    date:{
        flex:1,
        marginTop: 10,
        textAlign:"right",
        fontFamily:'aqua',
        fontSize:14,
        color: '#969696'
    },
    separator:{
      height:1,
      alignSelf: "stretch",
      backgroundColor: '#eee',
      marginLeft: 80,
      marginRight: 8
    }
})
