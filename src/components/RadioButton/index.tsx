import React from "react";
import { TouchableOpacityProps, View } from "react-native";

import * as S from "./styles";

type Props = TouchableOpacityProps &
  S.RadioButtonProps & {
    title: string;
  };

const RadioButton: React.FC<Props> = ({ selected = false, title, ...rest }) => {
  return (
    <S.Container selected={selected} {...rest}>
      <S.Radio>{selected && <S.Selected />}</S.Radio>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export { RadioButton };
