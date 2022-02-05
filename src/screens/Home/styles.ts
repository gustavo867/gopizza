import { LinearGradient } from "expo-linear-gradient";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "src/components/Button";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs((props) => ({
  colors: props.theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 33px 24px 58px;
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;

  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${(props) => props.theme.COLORS.TITLE};
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.COLORS.SHAPE};
`;

export const MenuItemsNumber = styled.Text`
  font-size: 14px;

  font-family: ${(props) => props.theme.FONTS.TEXT};
  color: ${(props) => props.theme.COLORS.SECONDARY_900};
`;

export const MenuItemsTitle = styled.Text`
  font-size: 20px;
  line-height: 20px;

  font-family: ${(props) => props.theme.FONTS.TITLE};
  color: ${(props) => props.theme.COLORS.SECONDARY_900};
`;

export const NewProductButton = styled(Button)`
  margin: 0 24px 0;
  margin-bottom: 12px;
`;
