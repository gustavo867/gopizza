import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "src/components/Button";
import { ButtonBack } from "src/components/ButtonBack";
import { Input } from "src/components/Input";
import { RadioButton } from "src/components/RadioButton";
import { PIZZA_TYPES } from "src/utils/pizzaTypes";
import { useTheme } from "styled-components";

import firestore from "@react-native-firebase/firestore";

import * as S from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "src/@types/navigation";
import { ProductProps } from "src/components/ProductCard";
import { useAuth } from "src/hooks/auth";

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: string;
  };
};

const Order: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  const [pizza, setPizza] = useState({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [sendingOrder, setSendingOrder] = useState(false);
  const [size, setSize] = useState("");

  const { goBack } = useNavigation();

  const authContext = useAuth();

  const safeArea = useSafeAreaInsets();
  const theme = useTheme();

  const amount = size
    ? parseInt(pizza?.prices_sizes[size]?.replace("R$", "")) * quantity
    : "0,00";

  async function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o número da mesa");
    }

    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade");
    }

    setSendingOrder(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: authContext.user?.id,
        image: pizza.photo_url,
      })
      .then(() => {
        goBack();
      })
      .catch((err) => {
        Alert.alert("Pedido", "Não foi possível realizar o pedido");
        setSendingOrder(false);
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((res) => {
          const data: PizzaResponse = res.data() as unknown as any;

          setPizza(data);
        })
        .catch(() =>
          Alert.alert("Pedido", "Não foi possível carregar o produto")
        );
    }
  }, [id]);

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

        <S.Photo source={{ uri: pizza.photo_url }} />

        <S.Form>
          <S.Title>{pizza.name}</S.Title>
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
              <Input
                keyboardType="numeric"
                value={tableNumber}
                onChangeText={setTableNumber}
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Quantidade</S.Label>
              <Input
                keyboardType="numeric"
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text))}
              />
            </S.InputGroup>
          </S.FormRow>
          <S.Price>Valor de R$ {amount}</S.Price>

          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
};

export { Order };
