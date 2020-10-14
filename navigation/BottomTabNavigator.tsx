import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import CatalogScreen from "../screens/CatalogScreen";
import {
  BottomTabParamList,
  TabHomeParamList,
  TabCatalogParamList,
  TabProfileParamList,
} from "../types";
import ProfileScreen from "../screens/ProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import RecipeScreen from "../screens/RecipeScreen";
import DialogsScreen from "../screens/DialogsScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import ShowRecipesScreen from "../screens/ShowRecipesScreen";
import RootNavigation from '../navigation';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const screenOptions = {
  cardStyle: {
    backgroundColor: "#fff",
  },
};
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: "#EB5757" }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabHomeNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Catalog"
        component={TabCatalogNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-albums" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabProfileNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-information-circle" color={color} />
          ),
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator<TabHomeParamList>();

function TabHomeNavigation() {
  return (
    <TabHomeStack.Navigator screenOptions={screenOptions}>
      <TabHomeStack.Screen
        name="TabHomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
      <TabHomeStack.Screen name="RecipeScreen" component={RecipeScreen} />
      <TabCatalogStack.Screen
        name="ProfileInfoScreen"
        component={ProfileInfoScreen}
        options={{ headerTitle: "Profile Info" }}
      />
      <TabCatalogStack.Screen
        name="ShowRecipesScreen"
        component={ShowRecipesScreen}
        options={{ headerTitle: "Recipes" }}
      />
    </TabHomeStack.Navigator>
  );
}

const TabCatalogStack = createStackNavigator<TabCatalogParamList>();

function TabCatalogNavigation() {
  return (
    <TabCatalogStack.Navigator screenOptions={screenOptions}>
      <TabCatalogStack.Screen
        name="TabCatalogScreen"
        component={CatalogScreen}
        options={{ headerTitle: "Catalog" }}
      />
      <TabCatalogStack.Screen
        name="ShowRecipesScreen"
        component={ShowRecipesScreen}
      />
    </TabCatalogStack.Navigator>
  );
}
const TabProfileStack = createStackNavigator<TabProfileParamList>();

function TabProfileNavigation() {
  return (
    <TabProfileStack.Navigator screenOptions={screenOptions}>
      <TabProfileStack.Screen
        name="TabProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
      <TabProfileStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: "About" }}
      />
      <TabProfileStack.Screen
        name="MyRecipesScreen"
        component={ShowRecipesScreen}
        options={{ headerTitle: "My recipes" }}
      />
      <TabProfileStack.Screen name="RecipeScreen" component={RecipeScreen} />
      <TabProfileStack.Screen
        name="DialogsScreen"
        component={DialogsScreen}
        options={{ headerTitle: "Dialogs" }}
      />
      <TabProfileStack.Screen
        name="SignInScreen"
        component={RootNavigation}
        options={{ headerTitle: "Dialogs" }}
      />
      <TabProfileStack.Screen name="ChatScreen" component={ChatScreen} />
    </TabProfileStack.Navigator>
  );
}
