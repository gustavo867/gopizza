import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Input } from "components/Input";

import * as S from "./styles";
import { Button } from "src/components/Button";
import { KeyboardAvoidingView, Platform } from "react-native";

import brandIMG from "assets/brand.png";
import { useAuth } from "src/hooks/auth";

const SignIn: React.FC = () => {
  const context = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    context.signIn(email, password);
  }

  function handleForgotPassword() {
    context.forgotPassword(email);
  }

  return (
    <S.Container>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <S.Content>
            <S.Brand source={brandIMG} />
            <S.Title>Login</S.Title>
            <Input
              placeholder="E-mail"
              type="secondary"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              type="secondary"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={() => handleSignIn()}
            />
            <S.ForgotPasswordButton onPress={() => handleForgotPassword()}>
              <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
            </S.ForgotPasswordButton>
            <Button
              title="Entrar"
              type="secondary"
              onPress={() => handleSignIn()}
              isLoading={context.isLogging}
            />
          </S.Content>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </S.Container>
  );
};

export { SignIn };
