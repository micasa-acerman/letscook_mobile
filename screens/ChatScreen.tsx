import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import REST from '../api';
import Loading from '../components/Loading';
import Message from '../models/Message';

export default function ChatScreen({navigation,route}:{navigation:any,route:any}) {
  const { title, user_id,update } = route.params;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [message, setMessage] = useState('')
  const [isLoad, setIsLoad] = useState(true);
  const [canSend, setCanSend] = useState(false)

  const renderMessage = ({item}:{item:Message}) => {
    const dateFormatted = moment(item.created, "YYYY-MM-DD hh:mm:ss").format(
      "LT"
    );
    if(item.sender_id == user_id){
        return (
          <View style={[styles.message]}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageDate}>{dateFormatted}</Text>
          </View>
        );
    }
    return (
        <View style={[styles.message,styles.messageMy]}>
          <Text style={[styles.messageText,styles.messageTextMy]}>{item.message}</Text>
          <Text style={[styles.messageDate,styles.messageDateMy]}>{dateFormatted}</Text>
        </View>
      );

  };

  const sendMessage = () => {
      if(canSend && message.length){
        setCanSend(false);
        const msg:Message = {
            id: String(messages.reduce((p,c)=>p<parseInt(c.id)?parseInt(c.id):p,0)+1),
            message,
            sender_id: '0',
            receiver_id: user_id,
            created: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        }

        setMessages([...messages,msg])
        const m = message
        setMessage("")
        REST.sendMessage(user_id, m)
        .then(() => {            
            setCanSend(true)
        })
        .catch(()=>{
            Alert.alert('Ошибка','Не удалось отправить сообщение')
        });
      }
  }

  useEffect(() => {
    navigation.setOptions({ title: title });
    REST.getMessages(user_id).then((payload) => {
      setIsLoad(false);
      setMessages(payload);
      setCanSend(true);
    });
    return ()=>{
        update()
    }
  },[] );
  if(isLoad)
  return(
      <Loading/>
  )
  else
  return (
    <View style={styles.container}>
        <View style={styles.listContainer}></View>
      <FlatList
        renderItem={renderMessage}
        data={messages}
        keyExtractor={(it) => it.id}
      />
      <View style={styles.textContainer}>
          <TextInput style={styles.textInput} onChangeText={(text)=>{setMessage(text)}} value={message} onEndEditing={sendMessage}></TextInput>
          <TouchableOpacity onPress={sendMessage}>
              <Image style={styles.textAction} source={require('../assets/images/ic_send.png')}/>
          </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    textContainer:{
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 6,
        flexDirection: "row"
    },
    textInput:{
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        padding: 4,
        flex: 1,
        color: '#555555',
        marginRight: 10
    },
    textAction:{
        width: 34,
        height: 34
    },
    listContainer:{
        paddingLeft: 8,
        paddingRight: 8
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    message:{
        width: 240,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 15,
        backgroundColor:'#E5E5EA',
        marginTop: 6
    },
    messageMy:{
        alignSelf: 'flex-end',
        backgroundColor:'#EB5757',
    },
    messageTextMy:{
        color: '#fdfefe'
    },
    messageText:{
        fontFamily: 'aqua',
        fontSize: 16,
        color: '#111111'
    },
    messageDateMy:{
        color: '#fdfefe',
        textAlign: "right"
    },
    messageDate:{
        marginTop: 8,
        fontSize: 10,
        color: '#838383'
    }
})
