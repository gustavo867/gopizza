import React from "react";
import { TouchableOpacityProps, View } from "react-native";

import * as S from "./styles";

type Props = TouchableOpacityProps & {
  index: number;
};

const OrderCard: React.FC<Props> = ({ index, ...rest }) => {
  return (
    <S.Container index={index} {...rest}>
      <S.Image source={{ uri: "https://github.com/diego3g.png" }} />

      <S.Name>4 queijos</S.Name>

      <S.Description>Mesa 5 * Qnt: 1</S.Description>

      <S.StatusContainer status="Entregue">
        <S.StatusLabel status="Entregue">Entregue</S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
};

export { OrderCard };
