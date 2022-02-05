import React from "react";
import { View } from "react-native";

import * as S from "./styles";

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined;
};

const BottomMenu: React.FC<Props> = (props) => {
  const noNotifications = props.notifications === "0";

  return (
    <S.Container>
      <S.Title color={props.color}>{props.title}</S.Title>
      {props.notifications && (
        <S.Notification noNotifications={noNotifications}>
          <S.Quantity noNotifications={noNotifications}>
            {props.notifications}
          </S.Quantity>
        </S.Notification>
      )}
    </S.Container>
  );
};

export { BottomMenu };
