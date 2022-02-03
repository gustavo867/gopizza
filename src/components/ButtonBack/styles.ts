import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;

  justify-content: center;
  align-items: center;

  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_100};
`;
