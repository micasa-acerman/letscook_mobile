import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { Platform } from "react-native";
import {
  GET_CATEGORIES,
  GET_DIALOGS,
  GET_MEDIA,
  GET_MY_INFO,
  GET_POSTS_URL,
  GET_TAGS,
  GET_USERS,
  SIGN_IN_URL,
  SIGN_UP_URL,
} from "../constants/Common";
import AuthData from "../models/AuthData";
import Category from "../models/Category";
import Dialog from "../models/Dialog";
import Media from "../models/Media";
import Message from "../models/Message";
import Post from "../models/Post";
import SignUpData from "../models/SignUpData";
import Tag from "../models/Tag";
import User from "../models/User";

export default class REST {
  static signIn(username: string, password: string): Promise<AuthData> {
    return Axios.request<AuthData>({
      url: SIGN_IN_URL,
      method: "POST",
      data: {
        username,
        password,
      },
    }).then((response) => {
      return response.data;
    });
  }
  static getQuery(params: any = {}) {
    return Object.keys(params)
      .map((p) => `${p}=${params[p]}`)
      .join("&");
  }

  static getPosts(params: object={}): Promise<Array<Post>> {
    let url = `${GET_POSTS_URL}`;
    const query = this.getQuery(params);
    if(query)
      url += `&${query}`;
    console.log(url);
    
    return Axios.request<Array<Post>>({
      url: url,
      method: "GET",
    }).then((response) => {
      return response.data;
    });
  }
  static async getMyInfo(): Promise<User> {
    const token = await REST.getToken();
    console.log("Token", token);

    return Axios.request<User>({
      url: GET_MY_INFO,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.data;
    });
  }

  static async getDialogs(): Promise<Array<Dialog>> {
    const token = await REST.getToken();
    const response = await Axios.request<Array<Dialog>>({
      url: GET_DIALOGS,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getMessages(user_id: number): Promise<Array<Message>> {
    const token = await REST.getToken();
    const response = await Axios.request<Array<Message>>({
      url: `${GET_DIALOGS}/${user_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
  static async sendMessage(user_id: number, message: string) {
    const token = await REST.getToken();
    const response = await Axios.request({
      url: GET_DIALOGS,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        to: user_id,
        message,
      },
    });
    return response.data;
  }
  static async getCategories(): Promise<Array<Category>> {
    const token = await REST.getToken();
    const response = await Axios.request<Array<Category>>({
      url: GET_CATEGORIES,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  static async getTags(): Promise<Array<Tag>> {
    const token = await REST.getToken();
    const response = await Axios.request<Array<Tag>>({
      url: GET_TAGS,
      method: "GET",
    });
    return response.data;
  }
  static async sendMedia(uri:string,token?:string|null):Promise<Media> {
    if(!token)
      token = await REST.getToken();
    console.log("sendMedia",token);    
    const fd = new FormData();
    const name = uri.slice(1+uri.lastIndexOf('/'))
    const extension = uri.slice(1+uri.lastIndexOf('.'))
    console.log("NAME",name,extension);    
    fd.append('file',{
      uri: uri,
      type: `image/${extension}`,
      name: name,
    });
    
    const response = await Axios.request<Promise<Media>>({
      url: GET_MEDIA,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
      data:fd
    });
    return response.data;
  }
  
  static async signUp(username:string,password:string,email:string): Promise<SignUpData> {
    const response = await Axios.request<SignUpData>({
      url: SIGN_UP_URL,
      method: "POST",
      data:{
        username,
        password,
        email
      }
    });
    return response.data
  }
  static async attachMedia(user_id:number,media_id:number,token?:string|null): Promise<SignUpData> {
    if(!token)
      token = await REST.getToken();
    const response = await Axios.request<SignUpData>({
      url: `${GET_USERS}/${user_id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:{
        "simple_local_avatar":{
          "media_id": media_id
        }
      }
    });
    return response.data
  }
  
  private static getToken(): Promise<string | null> {
    return AsyncStorage.getItem("token");
  }
}
