import Axios from "axios"
import { SIGN_IN_URL } from "../constants/Common"
export interface SignInResponse {
    data: SignInData
  }
  
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
    
}