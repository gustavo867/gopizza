import styled from "styled-components/native";

export const Image = styled.Image`
  width: 160px;
  height: 160px;

  border-radius: 80px;
`;

export const PlaceHolder = styled.View`
  height: 160px;
  width: 160px;

  border-radius: 80px;

  justify-content: center;
  align-items: center;

  border: 1px dashed ${(props) => props.theme.COLORS.SECONDARY_900};
`;

export const PlaceHolderTitle = styled.Text`
  font-size: 14px;
  text-align: center;

  font-family: ${(props) => props.theme.FONTS.TEXT};
  color: ${(props) => props.theme.COLORS.SECONDARY_900};
`;
