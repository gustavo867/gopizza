import React from "react";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";

import { ThemeProvider } from "styled-components/native";

import AppLoading from "expo-app-loading";

import theme from "./src/theme";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "src/hooks/auth";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "src/routes";
import { Order } from "src/screens/Order";

export default function App() {
  const [loaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSans_400Regular,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
