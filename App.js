import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Biometrics from "./screens/Biometrics";
import QRScan from "./screens/QRScan";
import AdminSignout from "./screens/AdminSignout";
import ListStatus from "./screens/ListStatus";
import Splash from "./screens/Splash";
import DemoScreen from "./screens/Demo";

const Stack = createNativeStackNavigator();

export default function App() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Demo"
          component={DemoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Admin"
          component={AdminSignout}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ListStatus"
          component={ListStatus}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Bio"
          component={Biometrics}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="QR"
          component={QRScan}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )}
