import React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonBack } from "src/components/ButtonBack";
import { ItemSeparator } from "src/components/ItemSeparator";
import { OrderCard } from "src/components/OrderCard/idnex";

import * as S from "./styles";

const Orders: React.FC = () => {
  const safeArea = useSafeAreaInsets();

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
        data={["1", "2", "3"]}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 125,
          paddingHorizontal: 24,
        }}
        ItemSeparatorComponent={() => <ItemSeparator />}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <OrderCard index={index} />}
      />
    </S.Container>
  );
};

export { Orders };
