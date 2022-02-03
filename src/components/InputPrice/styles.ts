import { TextInput } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 56px;

  border: 1px solid ${(props) => props.theme.COLORS.SHAPE};
  border-radius: 12px;

  margin-bottom: 8px;

  flex-direction: row;

  align-items: center;
`;

export const Size = styled.View`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  border-right-width: 1px;
  border-right-color: ${(props) => props.theme.COLORS.SHAPE};

  margin-right: 10px;
`;

export const Label = styled.Text`
  font-size: 14px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Input = styled(TextInput)`
  flex: 1;
`;
