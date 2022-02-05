import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { useAuth } from "src/hooks/auth";
import { Home } from "src/screens/Home";
import { Order } from "src/screens/Order";
import { Orders } from "src/screens/Orders";
import { Product } from "src/screens/Product";
import { UserTabRoutes } from "./usertab.routes";

// import { Container } from './styles';

const Stack = createNativeStackNavigator();

const UserStackRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    {user?.isAdmin ? (
        <Stack.Group>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="product" component={Product} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Stack.Screen name="order" component={Order} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export { UserStackRoutes };
