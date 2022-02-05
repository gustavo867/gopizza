import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs((props) => ({
  colors: props.theme.COLORS.GRADIENT,
}))`
  padding: 34px 0 33px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;

  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TITLE};
`;
