import React, { useEffect, useState } from "react";

import { Platform } from "react-native";

import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "src/screens/Home";
import { Orders } from "src/screens/Orders";
import { BottomMenu } from "src/components/BottomMenu";
import { useAuth } from "src/hooks/auth";

import firestore from "@react-native-firebase/firestore";

const Tab = createBottomTabNavigator();

const UserTabRoutes: React.FC = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .onSnapshot((querySnapshot) => {
        setNotifications(querySnapshot.docs?.length);
      });

    return () => subscribe();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title="Pedidos"
              color={color}
              notifications={String(notifications)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { UserTabRoutes };
