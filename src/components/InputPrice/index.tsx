import React from "react";
import { TextInputProps, View } from "react-native";

import * as S from "./styles";

type Props = TextInputProps & {
  size: string;
};

const InputPrice: React.FC<Props> = ({ size, ...rest }) => {
  return (
    <S.Container>
      <S.Size>
        <S.Label>{size}</S.Label>
      </S.Size>

      <S.Input keyboardType="numeric" {...rest} />
    </S.Container>
  );
};

export { InputPrice };
