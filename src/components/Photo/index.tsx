import React from "react";
import { View } from "react-native";

import * as S from "./styles";

type Props = {
  uri: string | null;
};

const Photo: React.FC<Props> = ({ uri }) => {
  if (uri) {
    return <S.Image source={{ uri }} />;
  }

  return (
    <S.PlaceHolder>
      <S.PlaceHolderTitle>Nenhuma foto{"\n"}carregada</S.PlaceHolderTitle>
    </S.PlaceHolder>
  );
};

export { Photo };
