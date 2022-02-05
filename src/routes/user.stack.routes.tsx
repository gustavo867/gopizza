import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Home } from "src/screens/Home";
import { Order } from "src/screens/Order";
import { Orders } from "src/screens/Orders";
import { Product } from "src/screens/Product";

// import { Container } from './styles';

const Stack = createNativeStackNavigator();

const UserStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="initial" component={Home} />
      <Stack.Screen name="order" component={Order} />
      <Stack.Screen name="product" component={Product} />
    </Stack.Navigator>
  );
};

export { UserStackRoutes };
