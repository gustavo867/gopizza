import React from "react";
import { View } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import * as S from "./styles";
import { useTheme } from "styled-components";

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = RectButtonProps & {
  data: ProductProps;
};

const ProductCard: React.FC<Props> = ({ data, ...rest }) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Content {...rest}>
        <S.Image source={{ uri: data.photo_url }} />

        <S.Details>
          <S.Identification>
            <S.Name>{data.name}</S.Name>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.COLORS.SHAPE}
            />
          </S.Identification>

          <S.Description>{data.description}</S.Description>
        </S.Details>
      </S.Content>
      <S.Line />
    </S.Container>
  );
};

export { ProductCard };
