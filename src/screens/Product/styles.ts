import { LinearGradient } from "expo-linear-gradient";
import { Button } from "src/components/Button";
import styled, { css } from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs((props) => ({
  colors: props.theme.COLORS.GRADIENT,
}))`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0px 20px 24px;
`;

export const Title = styled.Text`
  font-size: 24px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const DeleteLabel = styled.Text`
  font-size: 14px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Upload = styled.View`
  width: 100%;

  flex-direction: row;

  justify-content: center;
  align-items: center;

  margin: 32px 0;
`;

export const PickImageButton = styled(Button)`
  max-width: 90px;
  margin-left: 32px;
`;

export const Form = styled.View`
  width: 100%;
  padding: 24px;
`;

export const Label = styled.Text`
  margin-bottom: 12px;
  font-size: 14px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const InputGroup = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
  width: 100%;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const MaxCharacters = styled.Text`
  font-size: 10px;

  margin-bottom: 12px;

  font-family: ${(props) => props.theme.FONTS.TEXT};
  color: ${(props) => props.theme.COLORS.SECONDARY_900};
`;
