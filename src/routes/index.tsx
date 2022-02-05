import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "src/hooks/auth";
import { SignIn } from "src/screens/SignIn";
import { UserStackRoutes } from "./user.stack.routes";

// import { Container } from './styles';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};

export { Routes };
