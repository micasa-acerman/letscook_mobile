import Axios from "axios"
import { GET_POSTS_URL, SIGN_IN_URL } from "../constants/Common"

  
export interface SignInData {
    token?: string
    user_email?: string
    user_nicename?: string
    user_display_name?: string
  }
export interface ServerError {
    code: string,
    message: string,
    data: any
  }
export interface Post {
  "id":number,
  "date":string,
  "modified":string,
  "slug":string,
  "status":string,
  "type":string,
  "title":any,
  "content":string,
  "categories":Array<number>,
  "_embedded": any
}
  
export class REST{
    static signIn (username:string,password:string):Promise<SignInData> {
        return Axios
        .request<SignInData>({
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
    static getPosts ():Promise<Array<Post>> {
      return Axios
      .request<Array<Post>>({
        url: GET_POSTS_URL,
        method: "GET",
      })
      .then((response) => {
        return response.data
      })
  }
  
    
}