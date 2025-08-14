import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../theme';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Layout() {
  useEffect(() => {
    const subReceived = Notifications.addNotificationReceivedListener(() => {});
    const subResponse = Notifications.addNotificationResponseReceivedListener(
      () => {}
    );
    return () => {
      subReceived.remove();
      subResponse.remove();
    };
  }, []);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Lista de compras',
          tabBarIcon: ({ color, size }) => (
            <Feather name='list' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='counter'
        options={{
          title: 'Contador',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='clockcircleo' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='idea'
        options={{
          title: 'My idea',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='lightbulb' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
