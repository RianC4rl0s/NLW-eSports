import { useRef, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Background } from './src/components/Background';

import {
  useFonts,
  Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
} from "@expo-google-fonts/inter"

// import {Home} from "./src/screens/Home"
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import * as Notifications from 'expo-notifications';
import { Subscription } from "expo-modules-core"
import { getPushNotificationToken } from "./src/services/getPushNotificationToken"


export default function App() {

  const getPushNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken()
  }, [])

  useEffect(() => {
    getPushNotificationListener.current = Notifications
      .addNotificationReceivedListener(
        (notification) => {
          console.log(notification)
        }
      )
    responseNotificationListener.current = Notifications
      .addNotificationReceivedListener((response) => {

      });
    return () => {
      if (getPushNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getPushNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
  })

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      ></StatusBar>
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}




