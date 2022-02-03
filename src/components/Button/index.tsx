import React from "react";
import { View } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

type Props = RectButtonProps & {
  title: string;
  type?: S.TypeProps;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  type = "primary",
  title,
  isLoading = false,
  ...rest
}) => {
  return (
    <S.Container enabled={!isLoading} type={type} {...rest}>
      {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
    </S.Container>
  );
};

export { Button };
