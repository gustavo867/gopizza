import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { UserStackRoutes } from "./user.stack.routes";

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
};

export { Routes };
