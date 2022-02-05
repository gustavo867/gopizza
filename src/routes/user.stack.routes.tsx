import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Home } from "src/screens/Home";
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
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="product" component={Product} />
    </Stack.Navigator>
  );
};

export { UserStackRoutes };
