import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "src/components/Button";
import { ButtonBack } from "src/components/ButtonBack";
import { Input } from "src/components/Input";
import { RadioButton } from "src/components/RadioButton";
import { PIZZA_TYPES } from "src/utils/pizzaTypes";
import { useTheme } from "styled-components";

import * as S from "./styles";

const Order: React.FC = () => {
  const [size, setSize] = useState("");
  const safeArea = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: theme.COLORS.BACKGROUND,
          flexGrow: 0,
        }}
      >
        <S.Header
          style={{
            paddingTop: safeArea.top + 20,
            zIndex: -1,
          }}
        >
          <ButtonBack
            style={{
              marginBottom: 108,
            }}
          />
        </S.Header>

        <S.Photo source={{ uri: "https://github.com/gustavo867.png" }} />

        <S.Form>
          <S.Title>Nome da Pizza</S.Title>
          <S.Label>Selecione o tamanho</S.Label>
          <S.Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                onPress={() => setSize((s) => (s == item.id ? "" : item.id))}
                title={item.name}
                selected={size === item.id}
                key={item.name}
              />
            ))}
          </S.Sizes>
          <S.FormRow>
            <S.InputGroup>
              <S.Label>Número da mesa</S.Label>
              <Input keyboardType="numeric" />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Número da mesa</S.Label>
              <Input keyboardType="numeric" />
            </S.InputGroup>
          </S.FormRow>
          <S.Price>Valor de R$ 0,00</S.Price>

          <Button title="Confirmar pedido" />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
};

export { Order };
