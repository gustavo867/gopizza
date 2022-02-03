import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export type TypeProps = "primary" | "secondary";

type Props = {
  type: TypeProps;
};

export const Container = styled(TextInput).attrs<Props>((props) => ({
  placeholderTextColor:
    props.type === "primary"
      ? props.theme.COLORS.SECONDARY_900
      : props.theme.COLORS.PRIMARY_50,
}))<Props>`
  width: 100%;
  height: 56px;

  align-self: center;

  background-color: transparent;

  border-radius: 12px;

  padding: 7px 0;
  padding-left: 20px;

  margin-bottom: 16px;

  font-size: 15px;

  ${(props) => css`
    font-family: ${props.theme.FONTS.TEXT};

    border: 1px solid ${props.theme.COLORS.SHAPE};

    color: ${props.type === "primary"
      ? props.theme.COLORS.SECONDARY_900
      : props.theme.COLORS.TITLE};
  `}
`;
