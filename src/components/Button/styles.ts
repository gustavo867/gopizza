import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

export type TypeProps = "primary" | "secondary";

type ContainerProps = {
  type: TypeProps;
};

export const Container = styled(RectButton)<ContainerProps>`
  flex: 1;

  max-height: 56px;
  min-height: 56px;

  border-radius: 12px;

  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.type === "primary"
      ? props.theme.COLORS.SUCCESS_900
      : props.theme.COLORS.PRIMARY_900};
`;

export const Title = styled.Text`
  font-size: 14px;

  ${(props) => css`
    color: ${props.theme.COLORS.TITLE};
    font-family: ${props.theme.FONTS.TEXT};
  `}
`;

export const Load = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.COLORS.TITLE,
}))``;
