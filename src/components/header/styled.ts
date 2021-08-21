import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2% 0;
`;

export const H1 = styled.h1`
  color: ${props => props.theme.colors.text};
  align-self: center;
`;

export const Img = styled.img`
  width: 20%;
  max-width: 150px;
`;

export const Adjust = styled.div`
  width: 20%;
  max-width: 150px;
  display: flex:
  justify-content: center;
  align-items: center;
`;