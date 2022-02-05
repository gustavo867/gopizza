import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItemSeparator } from "src/components/ItemSeparator";
import { OrderCard, OrderProps } from "src/components/OrderCard";

import firestore from "@react-native-firebase/firestore";

import * as S from "./styles";
import { useAuth } from "src/hooks/auth";

const Orders: React.FC = () => {
  const safeArea = useSafeAreaInsets();
  const [orders, setOrders] = useState([] as OrderProps[]);
  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setOrders(data as OrderProps[]);
      });

    return () => subscribe();
  }, []);

  return (
    <S.Container>
      <S.Header
        style={{
          paddingTop: safeArea.top,
          zIndex: -1,
        }}
      >
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>
      <FlatList
        data={orders}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 125,
          paddingHorizontal: 24,
        }}
        ItemSeparatorComponent={() => <ItemSeparator />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard index={index} data={item} />
        )}
      />
    </S.Container>
  );
};

export { Orders };
