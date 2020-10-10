import AsyncStorage from "@react-native-community/async-storage"
import Axios from "axios"
import { GET_MY_INFO, GET_POSTS_URL, SIGN_IN_URL } from "../constants/Common"
import AuthData from "../models/AuthData"
import User from "../models/User"

export class REST{
    static signIn (username:string,password:string):Promise<AuthData> {
        return Axios
        .request<AuthData>({
          url: SIGN_IN_URL,
          method: "POST",
          data: {
            username,
            password
          },
        })
        .then((response) => {
          return response.data
        })
    }
    static getPosts ():Promise<Array<AuthData>> {
      return Axios.request<Array<AuthData>>({
        url: GET_POSTS_URL,
        method: "GET",
      }).then((response) => {
        return response.data;
      });
    }
    static async getMyInfo():Promise<User> {
      const token = await REST.getToken();
      return Axios.request<User>({
        url: GET_MY_INFO,
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response);
        
        return response.data;
      });
    }
  

    private static getToken():Promise<string|null>{
      return AsyncStorage.getItem('token')
    }
    
}