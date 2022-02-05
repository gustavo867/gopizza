import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useAuth } from "src/hooks/auth";
import { SignIn } from "src/screens/SignIn";
import { UserStackRoutes } from "./user.stack.routes";
import { UserTabRoutes } from "./usertab.routes";

// import { Container } from './styles';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserTabRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};

export { Routes };
