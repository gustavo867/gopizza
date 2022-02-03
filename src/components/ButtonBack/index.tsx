import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import * as S from "./styles";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps;

const ButtonBack: React.FC<Props> = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={theme.COLORS.TITLE} />
    </S.Container>
  );
};

export { ButtonBack };
