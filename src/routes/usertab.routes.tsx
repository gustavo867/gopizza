import React from "react";

import { Platform } from "react-native";

import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "src/screens/Home";
import { Orders } from "src/screens/Orders";
import { BottomMenu } from "src/components/BottomMenu";
import { UserStackRoutes } from "./user.stack.routes";

const Tab = createBottomTabNavigator();

const UserTabRoutes: React.FC = () => {
  const theme = useTheme();

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
        component={UserStackRoutes}
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
            <BottomMenu title="Pedidos" color={color} notifications="0" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { UserTabRoutes };
