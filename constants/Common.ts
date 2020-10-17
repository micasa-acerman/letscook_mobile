import { Platform } from "react-native";

export const DOMAIN = "https://letscook15.000webhostapp.com";
export const SIGN_IN_URL = DOMAIN + "/wp-json/jwt-auth/v1/token";
export const SIGN_UP_URL = DOMAIN + "/wp-json/wp/v2/users/register";
export const GET_POSTS_URL =
  DOMAIN + "/wp-json/wp/v2/posts?_embed&categories_exclude=1";
export const GET_MEDIA_URL = DOMAIN + "/wp-json/wp/v2/media/";
export const GET_MY_INFO = DOMAIN + "/wp-json/wp/v2/users/me?context=edit";
export const GET_DIALOGS = DOMAIN + "/wp-json/conversation/v1/dialogs";
export const GET_CATEGORIES = DOMAIN + "/wp-json/wp/v2/categories";
export const GET_TAGS = DOMAIN + "/wp-json/wp/v2/tags";
export const GET_MEDIA = DOMAIN + "/wp-json/wp/v2/media";
export const GET_USERS = DOMAIN + "/wp-json/wp/v2/users";
export const CHANGE_PASSWORD = DOMAIN + "/wp-json/conversation/v1/password"
import * as ImagePicker from "expo-image-picker";
export const HOME_ITEMS_PER_PAGE = 2;


export const ALLOW_MEDIA_EXTENSIONS = ['.png','.jpg','.jpeg']

export const grantPermissions = async () => {
  if (Platform.OS != "web") {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      return false;
    }
    return true;
  }
};
export function CapalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
